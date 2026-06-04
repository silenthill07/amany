import React, { useState, useEffect } from "react";
import { 
  Shield, 
  CheckCircle, 
  ArrowLeft, 
  Phone, 
  HelpCircle, 
  Calculator as CalcIcon, 
  TrendingUp, 
  Heart, 
  Award, 
  Coins, 
  ArrowUpRight, 
  Calendar, 
  Users, 
  Compass, 
  Clock, 
  MapPin, 
  Locate, 
  Lock, 
  Star, 
  MessageCircle,
  AlertCircle,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import LeadForm from "./components/LeadForm";
import Calculator from "./components/Calculator";
import AdminPanel from "./components/AdminPanel";
import FAQ from "./components/FAQ";

// Simple custom animated counter component for Egypt statistics
function AnimatedCounter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    // speed up for large numbers
    const step = Math.ceil(end / (totalMiliseconds / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span className="font-mono font-bold">{count.toLocaleString()}{suffix}</span>;
}

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState({ budget: 1500, age: 35 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-set the document title for search engines
  useEffect(() => {
    document.title = "شركة قناة السويس لتأمينات الحياة | أماني السيد";
  }, []);

  // Show a mini-toast after a lead is captured
  const handleLeadSuccess = (lead: any) => {
    setToastMessage(`شكراً يا ${lead.name}. تم تسجيل طلب الاستشارة لميزانية ${lead.budget} ج.م شهرياً.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Pre-fill the budget + age from calculator and slide down to lead form
  const handleCalculatorMaturityClick = (budget: number, age: number) => {
    setLeadFormData({ budget, age });
    const targetElement = document.getElementById("lead-form-section");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 left-6 md:left-auto bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl shadow-2xl z-[99999] flex items-center gap-3 animate-bounce">
          <div className="bg-emerald-500 text-white p-1 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">تم حفظ طلبك بنجاح!</p>
            <p className="text-xs text-slate-400 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* --- HEADER PART --- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Action CTAs in Header */}
          <div className="flex items-center gap-2.5">
            <a 
              href="#calculator-section" 
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-teal-700/10 transition-all cursor-pointer"
            >
              احسب مكافأتك
            </a>
            <a 
              href="#lead-form-section" 
              className="hidden sm:inline-block border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
            >
              احجز استشارة
            </a>
            
            {/* Direct Admin board Link */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-400 hover:text-teal-600 p-2 rounded-lg transition-all cursor-pointer"
              title="لوحة تحكم المستشار"
            >
              <Lock className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Brand/Consultant info */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <h1 className="text-sm sm:text-base font-black text-slate-800">أماني السيد</h1>
              <p className="text-xs text-slate-400 font-medium">مستشار تأمين واستثمار معتمد</p>
            </div>
            
            {/* Suez Canal life logo */}
            <div className="bg-white p-1 rounded-xl shadow-inner border border-slate-100">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_EuXvThjt28MT2xoeAa2lhbm2OItSZ7f4MQ&s" 
                alt="قناة السويس لتأمينات الحياة Logo"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // fallback display in case of network restriction
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          </div>

        </div>
      </header>


      {/* --- SECTION 1: HERO --- */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Background Ambient Mesh */}
        <div className="absolute inset-0 opacity-10 bg-gradient-radial from-teal-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right Column: Hero copy */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-right">
              
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full px-4 py-2 text-xs sm:text-sm font-bold">
                <span>شركة قناة السويس لتأمينات الحياة</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                  أكبر برنامج استثماري وتأميني في مصر
                </h2>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  وثيقة الحماية والاستثمار – مكافأة نهاية الخدمة
                </p>
              </div>

              {/* Crucial policy distinction notice */}
              <div className="bg-emerald-950/40 border border-emerald-500/25 rounded-2xl p-4 inline-block text-right max-w-xl">
                <p className="text-sm font-semibold text-emerald-300 leading-relaxed flex items-center gap-2.5 justify-center lg:justify-start">
                  <Star className="w-5 h-5 text-emerald-400 shrink-0 fill-emerald-400" />
                  <span>تنويه هام للغاية: هذا البرنامج تأمين واستثمار وليس قرضاً بنكياً. مدخراتك تنمو بأمان تام مع توزيع أرباح سنوية مركبة.</span>
                </p>
              </div>

              {/* Hero Call To Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <a 
                  href="#calculator-section"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:shadow-xl hover:shadow-emerald-500/10 font-black text-lg px-8 py-4 rounded-2xl transition-all cursor-pointer"
                >
                  احسب مكافأتك الآن
                </a>
                
                <a 
                  href="https://wa.me/201100686120"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  تواصل واتساب
                  <MessageCircle className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                </a>
              </div>

            </div>

            {/* Left Column: Consultant Avatar Profile Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                
                {/* Decorative glowing gradient borders */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-700 rounded-3xl blur-md opacity-35 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 text-center space-y-6">
                  
                  {/* Photo Profile Illustration / Presentation Frame */}
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-slate-800 shadow-xl bg-gradient-to-b from-teal-800 to-emerald-950 flex items-center justify-center">
                    {/* Visual representative avatar since portrait will be provided later */}
                    <Users className="w-16 h-16 text-teal-300 animate-pulse" />
                    <div className="absolute bottom-2 bg-emerald-500 text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-extrabold shadow-md">
                      متصل الآن
                    </div>
                  </div>

                  {/* Representative Details */}
                  <div>
                    <h3 className="text-2xl font-black text-white">أماني السيد</h3>
                    <p className="text-teal-400 font-bold text-sm mt-1">مستشار تأمين واستثمار معتمد</p>
                    <p className="text-slate-400 text-xs mt-1.5">شركة قناة السويس لتأمينات الحياة</p>
                  </div>

                  {/* Bullet badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-right">
                      <span className="text-slate-500 block">الهاتف المباشر</span>
                      <span className="text-slate-200 font-bold font-mono">01100686120</span>
                    </div>

                    <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-right">
                      <span className="text-slate-500 block">موقع الاستشارة</span>
                      <span className="text-teal-400 font-bold font-mono text-[11px]">amanyelsayed.online</span>
                    </div>
                  </div>

                  {/* Certification / Trust seal */}
                  <div className="bg-teal-950/40 border border-teal-900/40 p-3.5 rounded-2xl flex items-center gap-3 text-right">
                    <Shield className="w-10 h-10 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">وثائق معتمدة ورسمية</h4>
                      <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5">
                        خاضعة لرقابة الهيئة العامة للرقابة المالية في جمهورية مصر العربية.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- SECTION 2: WHO IS THIS PROGRAM FOR & SECTION 3: PROBLEM AWARENESS (Combined into a glorious bento layout) --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">خيارات ملائمة لجميع الفئات</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">لمن تم تصميم هذا البرنامج التأميني؟</h2>
            <p className="text-slate-500 text-base sm:text-lg">
              مهما كان مسارك المهني أو مصدر دخلك، نوفر لك حماية مالية تضمن نمو مدخراتك وتؤمن لك ولعائلتك مستقبلاً سعيداً ومستقراً.
            </p>
          </div>

          {/* SECTION 2: 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: أصحاب المهن الحرة */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl text-right hover:shadow-xl hover:bg-white hover:border-teal-500/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/5 to-transparent rounded-bl-full"></div>
              <div className="bg-teal-500/10 text-teal-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">أصحاب المهن الحرة</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                هل تعمل كطبيب، مهندس، تاجر أو صاحب مشروع خاص؟ نوفر لك بديلاً حقيقياً وموثوقاً للتأمينات الحكومية لتضمن معاشاً ثابتاً ومكافأة نهاية خدمة ضخمة تبني بها مشاريعك القادمة.
              </p>
            </div>

            {/* Card 2: موظفو القطاع الخاص */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl text-right hover:shadow-xl hover:bg-white hover:border-teal-500/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full"></div>
              <div className="bg-emerald-500/10 text-emerald-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">موظفو القطاع الخاص</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                معاشات التأمين الاجتماعي غير كافية لمواجهة ضغوط الحياة والتضخم المتسارع. صممنا لك برنامجاً ادخارياً يمنحك مكافأة استثنائية تسندك عند التقاعد لتعيش بمستوى لائق.
              </p>
            </div>

            {/* Card 3: موظفو القطاع الحكومي */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl text-right hover:shadow-xl hover:bg-white hover:border-teal-500/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full"></div>
              <div className="bg-blue-500/10 text-blue-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">موظفو القطاع الحكومي</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                استكمل تغطيتك التأمينية وضاعف مدخراتك. احصل على أرباح سنوية تفوق أي فوائد بنكية عادية، وادخر للمستقبل بأقساط مرنة تناسب دخلك الشهري الحالي دون أي ضغوط مالية.
              </p>
            </div>

          </div>

          {/* SECTION 3: PROBLEM AWARENESS PANEL */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-4 text-center lg:text-right space-y-3">
                <span className="text-teal-400 font-extrabold text-xs uppercase tracking-widest">تساؤلات حيوية تمس مستقبلك</span>
                <h3 className="text-2xl sm:text-3xl font-black">هل تشعر بالقلق تجاه الغد؟</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  معظمنا يواجه هذه المخاوف بشكل دوري، والتأخر في التخطيط هو السبب الرئيسي لتراجع جودة المعيشة عند التقاعد.
                </p>
              </div>

              {/* 5 Questions Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {[
                  "شغال حر ومحتاج تأمين حقيقي لمستقبلك وعملك؟",
                  "خايف المعاش الحكومي مايكفيش احتياجاتك مستقبلاً؟",
                  "عايز توفر مبلغ محترم تضمن بيه زواج أو تعليم أولادك؟",
                  "بتدور على استثمار آمن ومضمون يحميك من تقلبات السوق؟",
                  "عايز تضمن مكافأة نهاية خدمة تليق بسنوات تعبك وعطائك؟"
                ].map((q, idx) => (
                  <div key={idx} className="bg-slate-950/75 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between gap-4 text-right">
                    <span className="text-sm font-bold text-slate-200">{q}</span>
                    <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      ؟
                    </span>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* --- SECTION 4: PROGRAM BENEFITS (Bento Style Grid) --- */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">مميزات وحلول حصرية للمشتركين</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">مزايا لا حصر لها في وثيقة واحدة</h2>
            <p className="text-slate-500 text-base sm:text-lg">
              نوفر لك توازناً مثالياً يجمع بين الإدخار الاستثماري الذكي والتغطية التأمينية الشاملة لحماية أسلوب حياتك.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              {
                title: "صرف كامل قيمة الوثيقة",
                desc: "استرجع كامل مدخراتك وأقساطك المدفوعة دون أي نقصان عند نهاية مدة التعاقد.",
                icon: <Coins className="w-5 h-5 text-emerald-600" />
              },
              {
                title: "صرف الأرباح الاستثمارية",
                desc: "احصل على أرباح سنوية تراكمية مضافة لحسابك بفائدة مركبة تعزز قيمة أموالك.",
                icon: <TrendingUp className="w-5 h-5 text-teal-600" />
              },
              {
                title: "جوائز ربع سنوية",
                desc: "سحوبات مميزة تمنحك فرصاً للفوز بجوائز نقدية دورية كبرى طوال فترة الإدخار.",
                icon: <Sparkles className="w-5 h-5 text-indigo-600" />
              },
              {
                title: "حماية مالية للأسرة",
                desc: "تأمين معيشة كريمة لأبنائك وعائلتك من خلال تغطية الفواتير في أي ظروف طارئة.",
                icon: <Heart className="w-5 h-5 text-rose-600" />
              },
              {
                title: "استثمار طويل الأجل",
                desc: "صندوق استثماري تحت إدارة خبراء للتأكد من نمو أموالك بأقصى معدل أمان تأميني.",
                icon: <Compass className="w-5 h-5 text-blue-600" />
              },
              {
                title: "تأمين متكامل على الحياة",
                desc: "غطاء حماية تأميني وفوري طوال مدة الوثيقة للحد من المخاطر والأزمات المفاجئة.",
                icon: <Shield className="w-5 h-5 text-amber-600" />
              },
              {
                title: "مكافأة نهاية خدمة",
                desc: "تأسيس خزان مالي مستقل عند التقاعد يغنيك عن الاقتراض والديون في كبر السن.",
                icon: <Award className="w-5 h-5 text-purple-600" />
              },
              {
                title: "مرونة في اختيار القسط",
                desc: "تحكم كامل بقسطك الشهري وسداده حسب قدرتك؛ يبدأ الحد الأدنى من 500 ج.م فقط.",
                icon: <Clock className="w-5 h-5 text-sky-600" />
              }
            ].map((b, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/50 hover:border-teal-500/20 hover:shadow-lg hover:scale-[1.01] transition-all text-right">
                <div className="bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-base">{b.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mt-2">{b.desc}</p>
              </div>
            ))}

          </div>

          <div className="text-center mt-12">
            <a 
              href="#lead-form-section" 
              className="inline-flex items-center gap-1 bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 px-8 rounded-xl shrink-0 transition-all shadow-md cursor-pointer"
            >
              انضم للبرنامج اليوم
              <ChevronLeft className="w-4 h-4 font-bold" />
            </a>
          </div>

        </div>
      </section>


      {/* --- SECTION 5: HOW IT WORKS --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">خطوات بسيطة وسريعة</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">كيف يعمل برنامج الحماية والاستثمار؟</h2>
            <p className="text-slate-500 text-base sm:text-lg">
              لا تعقيدات ولا مستندات مهلكة؛ 4 خطوات مدروسة تفصلك عن الحماية المالية الأكبر لأسرتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Visual connecting line indicator for wider screens */}
            <div className="hidden md:block absolute top-1/3 left-12 right-12 h-0.5 bg-slate-100 -z-0"></div>

            {[
              {
                step: "01",
                title: "اختر القسط المناسب",
                desc: "حدد حجم الادخار الشهري المريح لميزانيتك باستخدام الحاسبة المتطورة بمرونة."
              },
              {
                step: "02",
                title: "ادفع القسط شهرياً",
                desc: "استمر في الإيداع والادخار بانتظام لتبني حساباً استثمارياً ذا أرباح مركبة متسارعة."
              },
              {
                step: "03",
                title: "استمتع بالتأمين الفوري",
                desc: "تخضع للتغطية التأمينية الكاملة على الحياة من أول قسط مدفوع لتأمين أسرتك."
              },
              {
                step: "04",
                title: "استلم المكافأة والأرباح",
                desc: "عند نهاية المدة، استلم المحفظة بالكامل زائد الأرباح المركبة دفعة واحدة بفخر."
              }
            ].map((s, idx) => (
              <div key={idx} className="relative bg-slate-50 p-6 rounded-2xl border border-slate-100 text-right z-10 flex flex-col justify-between">
                <div>
                  <span className="font-mono font-black text-3xl text-teal-400 block mb-4">{s.step}</span>
                  <h3 className="font-bold text-slate-800 text-base">{s.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mt-2">{s.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* --- SECTION 6: EXAMPLE CALCULATIONS & SECTION 14: TRUST BUILDERS --- */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right: Example Calculations & Interactive Counters */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-teal-600 font-bold text-sm uppercase tracking-widest block">أمثلة حسابية مبسطة للادخار</span>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">ابدأ من 1000 جنيه شهرياً واحصل على عائد استشهادي هائل</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                انظر كيف تتراكم وتتضاعف مساهماتك البسيطة لتتحول إلى ملاذ أمان مالي مركب يحميك ويحمي أبناءك من قسوة الأيام:
              </p>

              <div className="space-y-4">
                
                {/* Save 1000 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 flex justify-between items-center text-right">
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 block">المكافأة المتوقعة لمستفيد 25 سنة</span>
                    <span className="text-xl font-bold text-emerald-600 block">مئات الآلاف ج.م</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">ادخر 1,000 ج.م شهرياً</h4>
                    <p className="text-slate-400 text-xs mt-1">القسط السنوي: 12,000 ج.م</p>
                  </div>
                </div>

                {/* Save 2000 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 flex justify-between items-center text-right">
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 block">المكافأة المتوقعة لمستفيد 35 سنة</span>
                    <span className="text-xl font-bold text-emerald-600 block">ما يقارب نصف مليون ج.م</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">ادخر 2,000 ج.م شهرياً</h4>
                    <p className="text-slate-400 text-xs mt-1">القسط السنوي: 24,000 ج.م</p>
                  </div>
                </div>

                {/* Save 3000 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 flex justify-between items-center text-right">
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 block">المكافأة المتوقعة لمستفيد 45 سنة</span>
                    <span className="text-xl font-bold text-emerald-600 block">أكثر من مليون ج.م</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">ادخر 3,000 ج.م شهرياً</h4>
                    <p className="text-slate-400 text-xs mt-1">القسط السنوي: 36,000 ج.م</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Left: Statistics Dashboard & Live Tickers */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-8 text-right relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
              
              <div className="space-y-3">
                <span className="text-teal-400 font-extrabold text-xs uppercase tracking-widest block">قوة الاستدامة والنمو</span>
                <h3 className="text-2xl sm:text-3xl font-black">أرقام وإحصائيات قناة السويس</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  تعد شركة قناة السويس لتأمينات الحياة إحدى ركائز الأمن والاستثمار المالي في الشرق الأوسط منذ نشأتها.
                </p>
              </div>

              {/* Grid of counters */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    <AnimatedCounter target={15000} suffix="+" />
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">عملاء سعداء</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">
                    <AnimatedCounter target={18400} suffix="+" />
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">وثائق صادرة</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center col-span-2 md:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                    <AnimatedCounter target={43} suffix=" سنة" />
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">سنوات الخبرة</span>
                </div>

              </div>

              {/* Customer Testimonial Bubble */}
              <div className="bg-slate-950/85 border border-slate-850 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-yellow-400 flex gap-0.5" dir="ltr">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                  </div>
                  <h4 className="font-bold text-slate-200 text-xs">قصة نجاح حقيقية</h4>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed italic">
                  \"كصاحب ورشة خراطة خفت من اليوم اللي مقدرش أشتغل فيه. اشتركت مع الأستاذة أماني من 10 سنين والنهارده مدخراتي بتكبر بانتظام ومرتاح الضمير لإسعاف عيالي في أي ظرف.\"
                </p>
                <div className="text-left font-bold text-teal-400 text-[10px]">— م. محمود جابر، ورشة خراطة حرة، الجيزة</div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* --- SECTION 7: INSURANCE COVERAGE --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-600 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-600" />
              تأمين معزز شامل للورثة والأسرة
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">آلية التغطية التأمينية للحياة والوفاة</h2>
            <p className="text-slate-500 text-base sm:text-lg">
              وثيقة تضع معايير استباقية بالغة القوة والوفاء لحماية الأسرة فوراً في حال حدوث مكروه، ليعم السلام المالي والأمان.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Case: Natural Death */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-right relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 bg-slate-200 text-slate-700 text-xs font-bold py-1 px-4 rounded-tr-xl rounded-bl-xl font-mono">
                صرف أساسي
              </div>
              <div className="space-y-4">
                <div className="h-10 w-10 bg-slate-200/50 text-slate-700 rounded-xl flex items-center justify-center font-bold">
                  ١
                </div>
                <h3 className="text-2xl font-black text-slate-800">في حالة الوفاة الطبيعية</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  إذا وافت المؤمن عليه المنية كقضاء وقدر طبيعي، يلتزم البرنامج بحماية أسرته وإرسال التعويض المالي المناسب:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>إيقاف سداد جميع الأقساط المتبقية فوراً ومعها الورثة.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>صرف كامل مبلغ الحماية التأمينية (نصف مليون أو مليون ج.م).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>صرف كافة الأرباح السنوية التراكمية المؤمنة حتى تاريخ الوفاة.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Case: Accidental Death */}
            <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-8 text-right relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 bg-emerald-600 text-white text-xs font-bold py-1 px-4 rounded-tr-xl rounded-bl-xl font-mono">
                ضاعف التعويض
              </div>
              <div className="space-y-4">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                  ٢
                </div>
                <h3 className="text-2xl font-black text-slate-800">في حالة الوفاة بحادث ⚠️</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  إذا وقعت الوفاة جراء حادث طريق أو موقع عمل، يرتفع التعويض التأميني المقدم للأسرة بأقصى سرعة إغاثة:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-705 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>إعفاء وتبرئة الورثة نهائياً من سداد باقي قيم الأقساط.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-emerald-700">صرف ضعف مبلغ التأمين الشامل (200% من التعويض).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>إضافة وصرف كافة الأرباح الاستثمارية المتراكمة للورثة فوراً.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* --- SECTION 8: REWARDS SYSTEM --- */}
      <section className="py-25 bg-gradient-to-br from-teal-900 to-emerald-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 text-emerald-300 rounded-full mb-3">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-3">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">تتويج مستمر لحاملي الوثيقة</span>
            <h2 className="text-3xl sm:text-4xl font-black">نظام جوائز وسحوبات قناة السويس كل 3 شهور</h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              كل 3 شهور، تدخل وثيقتك السحب الأكتواري تلقائياً لتنافس على مئات الجوائز المالية التشجيعية الإضافية طوال مدة ادخارك، دون أن يؤثر ذلك على أرباحك وعوائد تصفيتك.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide block mb-1">فرص مستمرة</span>
              <h4 className="font-bold text-slate-100 text-sm sm:text-base">سحب دوري كل 3 أشهر</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">فرصة فوز متجددة تلقائياً بانتظام مع التزامك بسداد أقساط الادخار.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide block mb-1">عوائد نقدية</span>
              <h4 className="font-bold text-slate-100 text-sm sm:text-base">جوائز مالية متعددة بالفروع</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">تقدر الجوائز بمكافآت نقدية كبيرة تُضاف مباشرة لدفترك أو تُصرف فوراً.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide block mb-1">مزية ترحيبية</span>
              <h4 className="font-bold text-slate-100 text-sm sm:text-base">استمرار السحوبات للمستقبل</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">لا تخرج من السحب حتى لو فزت في المرة الأولى، مئات الفرص في انتظارك.</p>
            </div>

          </div>

        </div>
      </section>


      {/* --- SECTION 9: RETIREMENT PROGRAM --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 sm:p-14 border border-slate-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left CTA */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl w-full max-w-sm text-center space-y-4">
                  <h4 className="font-bold text-slate-300 text-sm">احجز الآن لمعرفة تفاصيل المعاشات</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    من خلال استشارتنا المجانية ستعرض عليك المستشارة خيارات الصرف والرواتب التقاعدية الحية.
                  </p>
                  <a 
                    href="#lead-form-section"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm py-3 px-6 rounded-xl block cursor-pointer"
                  >
                    اعرف تفاصيل البرنامج
                  </a>
                </div>
              </div>

              {/* Right content */}
              <div className="lg:col-span-7 text-center lg:text-right space-y-6">
                <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 font-extrabold text-xs uppercase px-3.5 py-1.5 rounded-full inline-block">
                  تأمين تقاعدي استثنائي
                </span>
                
                <h3 className="text-3xl sm:text-4xl font-black leading-tight">
                  برنامج المعاش التكميلي – معاشك أمانك
                </h3>
                
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  احصل على دخل إضافي محترم وكريم عند رغبتك في التقاعد عن العمل. صُمم هذا المسار بميزات حماية أكتوارية فائقة لتأسيس خزان مالي مستقل يتيح لك ولزوجك/زوجتك راتباً شهرياً متزايداً يواجه غلاء المعيشة بلا قلق.
                </p>

                <div className="grid grid-cols-2 gap-4 text-right pt-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>تأمين دخل تكميلي دائم ومستمر.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>خيار التحويل لمعاش شهري عند سن الـ 60.</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* --- SECTION 10: ADVANCED CALCULATOR WRAP --- */}
      <section id="calculator-section" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-teal-400 font-bold text-sm uppercase tracking-widest">تحكم مالي تام بنقرات واضحة</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">الحاسبة التفاعلية المباشرة للوثيقة</h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              جرّب بتعديل ميزانيتك الشهرية أو عمرك لترى فوراً كيف يتفاعل الغطاء التأميني للوفاة والمكافآت التقديرية لنهاية الخدمة.
            </p>
          </div>

          <Calculator onNavigateToForm={handleCalculatorMaturityClick} />

        </div>
      </section>


      {/* --- SECTION 11: LEAD FORM WRAP & CONVERSIONS --- */}
      <section id="lead-form-section" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right details of consultant credibility */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-right">
              <span className="text-teal-600 font-bold text-sm uppercase tracking-widest block">درع حماية وأمان معتمد</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">ابدأ خطوتك الأولى لحماية عائلتك اليوم</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                ستقوم مستشارة مبيعات شركة قناة السويس لتأمينات الحياة <strong>أماني السيد</strong> بفلترة طلبك ومراجعة عمرك للوصول للبرنامج الاسترشادي المطلوب؛ احجز استشارة هاتفية مجانية وتلقى رداً وافياً خلال أقل من 24 ساعة.
              </p>

              {/* Mini Credentials table */}
              <div className="space-y-4 max-w-lg">
                <div className="flex gap-4 items-start bg-white p-4.5 rounded-2xl border border-slate-200">
                  <div className="bg-teal-50 p-2.5 rounded-xl text-teal-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-slate-800 text-sm">هاتف وواتساب مباشر</h4>
                    <p className="text-slate-500 text-xs mt-1">تواصل تليفونياً أو نصياً عبر الرقم الرسمي: <strong className="font-mono text-teal-600">01100686120</strong></p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4.5 rounded-2xl border border-slate-200">
                  <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-slate-800 text-sm">شركة مرخصة رسمياً</h4>
                    <p className="text-slate-500 text-xs mt-1">المعاملات المالية والادخارية محمية بموجب قانون الهيئة العامة للرقابة المالية المصرية بموثوقية تامة.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Left conversion LeadForm with initial states mapped from calculator interaction */}
            <div className="lg:col-span-6">
              <LeadForm 
                initialBudget={leadFormData.budget} 
                initialAge={leadFormData.age}
                onSuccessSubmit={handleLeadSuccess} 
              />
            </div>

          </div>
        </div>
      </section>


      {/* --- SECTION 15: FAQ --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">إجابات الخبراء</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">الأسئلة الشائعة والمعلومات الهامة</h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              جمعنا لك إجابات وافية ومبسطة لأبرز الاستفسارات المطروحة من المهتمين ببرامج الادخار والاستثمار.
            </p>
          </div>

          <FAQ />

        </div>
      </section>


      {/* --- SECTION 13: CONTACT INFO & MAP OUTLINE --- */}
      <section className="py-20 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
            
            {/* Column 1: Suez Canal Info and Logo */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-white text-base">قناة السويس لتأمينات الحياة</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                رمز استثماري وتأميني شامخ يمتد لأكثر من أربعة عقود في خدمة أسر مصر وتأمين مستقبل الأجيال.
              </p>
              <div className="pt-2">
                <span className="text-slate-400 text-xs leading-relaxed">مستشار تأمينات مبيعات معتمد:</span>
                <p className="text-teal-400 font-bold text-sm mt-1">أماني السيد</p>
              </div>
            </div>

            {/* Column 2: Working Hours */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm pb-1 border-b border-slate-800">مواعيد العمل والمتابعة</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center justify-between gap-2">
                  <span>يومياً (من السبت إلى الخميس)</span>
                  <span className="font-bold text-slate-300">طوال الأسبوع</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>ساعات الاتصال والمتابعة</span>
                  <span className="font-bold text-slate-350">10:00 ص — 10:00 م</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>استقبال الشكاوى والاستشارت</span>
                  <span className="font-bold text-teal-400">واتساب 24/7</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Telephones & Official Contacts */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm pb-1 border-b border-slate-800">أرقام التواصل وحجز المكاتب</h4>
              <ul className="space-y-3 text-xs text-slate-400 font-mono">
                <li>
                  <span className="text-slate-550 block text-[10px] font-sans">تليفون الاستدعاء المباشر</span>
                  <a href="tel:+201100686120" className="text-white hover:text-teal-400 text-sm font-bold block mt-0.5">
                    +20 11 00686120
                  </a>
                </li>
                <li>
                  <span className="text-slate-550 block text-[10px] font-sans">رابط المراسلة السريع</span>
                  <a href="https://wa.me/201100686120" target="_blank" referrerPolicy="no-referrer" className="text-emerald-400 hover:underline block mt-0.5">
                    واتساب: +20 11 00686120
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Location of branches */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm pb-1 border-b border-slate-800">فرع القاهرة وكل المحافظات</h4>
              <div className="flex gap-2 items-start text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  تغطية شاملة ومصادر وثائق معتمدة لجميع المحافظات (القاهرة، الجيزة، الإسكندرية، الدلتا وصعيد مصر) أونلاين وبالمقر الإداري.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* --- SECTION 16: FINAL CTA --- */}
      <section className="py-20 bg-gradient-to-r from-teal-950 via-slate-950 to-emerald-950 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-radial-pattern"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            ابدأ التخطيط لمستقبلك ومستقبل أبنائك من اليوم
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            لا تترك مصير أسرتك المالي للصدفة والمفاجآت؛ احصل على استشارة مجانية مدروسة ومخصصة وتعرف على مكافأة نهاية الخدمة الخاصة بك.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a 
              href="#calculator-section" 
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-lg px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              احسب مكافأتك
            </a>
            
            <a 
              href="https://wa.me/201100686120"
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-transparent border border-slate-700 hover:bg-slate-900 text-white font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              تواصل واتساب
              <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            </a>
          </div>

          <div className="text-xs text-slate-500 pt-3">
            المستشارة أماني السيد | شركة قناة السويس لتأمينات الحياة | جميع الحقوق محفوظة © {new Date().getFullYear()}
          </div>

        </div>
      </section>


      {/* --- SECTION 12: STICKY FLOATING WHATSAPP BUTTON --- */}
      <div className="fixed bottom-6 left-6 z-[99999] group">
        <a 
          href="https://wa.me/201100686120"
          target="_blank"
          referrerPolicy="no-referrer"
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center gap-3 px-5 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle pulsative green beacon effect */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
          
          <span className="hidden md:inline font-black text-sm pr-1">تواصل الآن مع أماني السيد</span>
          <MessageCircle className="w-6 h-6 fill-white" />
        </a>
      </div>


      {/* --- PRIVATE ADMINISTRATIVE PANEL FOR AMANY --- */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

    </div>
  );
}
