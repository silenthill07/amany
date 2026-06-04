import React, { useState } from "react";
import { User, Phone, MapPin, Calendar, Coins, CheckCircle, ShieldCheck } from "lucide-react";
import { EGYPTIAN_GOVERNORATES } from "../data/governorates";

interface LeadFormProps {
  initialBudget?: number;
  initialAge?: number;
  onSuccessSubmit?: (lead: any) => void;
}

export default function LeadForm({ initialBudget = 1000, initialAge = 35, onSuccessSubmit }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(initialAge.toString());
  const [governorate, setGovernorate] = useState("القاهرة");
  const [budget, setBudget] = useState(initialBudget.toString());
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("الرجاء إدخال الاسم بالكامل");
      return;
    }
    if (name.trim().length < 5) {
      setErrorMsg("الرجاء إدخال اسم ثلاثي أو ثنائي كامل");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("الرجاء إدخال رقم الهاتف");
      return;
    }
    
    // Egyptian mobile validation (usually starts with 010, 011, 012, 015 and is 11 digits)
    const egPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    const generalPhoneRegex = /^[0-9+\s-]{8,15}$/;
    
    if (!generalPhoneRegex.test(phone.trim().replace(/\s/g, ""))) {
      setErrorMsg("الرجاء إدخال رقم هاتف صحيح");
      return;
    }

    const numAge = parseInt(age);
    if (isNaN(numAge) || numAge < 18 || numAge > 70) {
      setErrorMsg("يجب أن يكون العمر بين 18 و 70 سنة للمشاركة في الوثيقة");
      return;
    }

    const numBudget = parseFloat(budget);
    if (isNaN(numBudget) || numBudget < 500) {
      setErrorMsg("الحد الأدنى للميزانية الشهرية المقبولة هو 500 جنيه مصري");
      return;
    }

    // Success payload
    const newLead = {
      id: "lead_" + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      age: numAge,
      governorate,
      budget: numBudget,
      date: new Date().toISOString(),
      status: "جديد", // "جديد" | "تم التواصل" | "حجز موعد" | "أرشيف"
      source: "Landing Page Form"
    };

    // Save lead to local storage
    try {
      const existingLeads = JSON.parse(localStorage.getItem("suez_canal_leads") || "[]");
      existingLeads.unshift(newLead);
      localStorage.setItem("suez_canal_leads", JSON.stringify(existingLeads));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    // Callback
    if (onSuccessSubmit) {
      onSuccessSubmit(newLead);
    }

    // Reset inputs & trigger visual modal
    setName("");
    setPhone("");
    setShowModal(true);
  };

  return (
    <div id="lead-form-section" className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden max-w-xl mx-auto">
      {/* Visual Accent Top Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-700"></div>

      <div className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 text-teal-600 rounded-full mb-3">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">احجز استشارة مجانية الآن</h3>
          <p className="text-slate-500 text-sm mt-1">تخطيط مالي مخصص ومجاني بنسبة 100%</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium text-slate-700">الاسم بالكامل</label>
            <div className="relative">
              <input
                type="text"
                placeholder="أحمد محمد السيد"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-right outline-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-11 text-slate-800 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all placeholder:text-slate-400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium text-slate-700">رقم الهاتف (يفضل واتساب)</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="01100686120"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-left outline-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 text-slate-800 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all placeholder:text-left placeholder:text-slate-400"
                dir="ltr"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Phone className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Grid for Age and Governorate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <label className="block text-right text-sm font-medium text-slate-700">العمر الحالي (سنة)</label>
              <div className="relative">
                <input
                  type="number"
                  min="18"
                  max="70"
                  placeholder="35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full text-right outline-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-11 text-slate-800 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Calendar className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Governorate */}
            <div className="space-y-2">
              <label className="block text-right text-sm font-medium text-slate-700">المحافظة</label>
              <div className="relative">
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full text-right outline-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-11 text-slate-800 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all appearance-none cursor-pointer"
                >
                  {EGYPTIAN_GOVERNORATES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <MapPin className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Budget */}
          <div className="space-y-2">
            <label className="block text-right text-sm font-medium text-slate-700">الميزانية الشهرية المقترحة للادخار</label>
            <div className="relative">
              <input
                type="number"
                min="500"
                step="100"
                placeholder="1000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-right outline-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-11 pl-20 text-slate-800 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Coins className="w-5 h-5" />
              </span>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                جنيه / شهرياً
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-teal-700/20 hover:shadow-teal-700/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer block text-center"
          >
            احجز استشارة مجانية
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
          🔒 بياناتك مشفرة ومحمية بالكامل ببروتوكولات الأمان لشركة قناة السويس لتأمينات الحياة.
        </p>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-teal-50 shadow-2xl text-center transform scale-y-100 transition-all">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-bold text-slate-800 mb-2">تم استلام طلبك بنجاح!</h4>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 text-sm text-slate-600 space-y-1">
              <p className="font-semibold text-teal-600">شكراً لاهتمامك ببرنامج الحماية والاستثمار</p>
              <p>مستشارة التأمين والمبيعات <strong>أماني السيد</strong> ستقوم بدراسة طلبك</p>
              <p className="text-emerald-700 font-bold mt-2">وسيتم التواصل معك خلال 24 ساعة</p>
            </div>
            
            <button
              onClick={() => setShowModal(false)}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl transition-all cursor-pointer w-full text-center"
            >
              موافق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
