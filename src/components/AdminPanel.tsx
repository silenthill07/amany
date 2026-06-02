import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  Key, 
  Download, 
  PhoneCall, 
  TrendingUp, 
  BookOpen, 
  RefreshCw,
  FileSpreadsheet,
  X,
  CheckCircle,
  HelpCircle,
  FolderMinus
} from "lucide-react";

export default function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [errorMsg, setErrorMsg] = useState("");

  const DEFAULT_PIN = "448892";

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("suez_canal_leads") || "[]");
      setLeads(stored);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setErrorMsg("");
      loadLeads();
    } else {
      setErrorMsg("رمز المرور خاطئ! جرب رمز '448892' للمراجعة");
    }
  };

  const generateMockLeads = () => {
    const mock = [
      {
        id: "mock_1",
        name: "عبد الرحمن محمود الشافعي",
        phone: "01099882211",
        age: 32,
        governorate: "القاهرة",
        budget: 2000,
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: "جديد",
        source: "الحاسبة الأكتوارية"
      },
      {
        id: "mock_2",
        name: "منى عبد العزيز التهامي",
        phone: "01200554433",
        age: 28,
        governorate: "الإسكندرية",
        budget: 1500,
        date: new Date(Date.now() - 3600000 * 12).toISOString(),
        status: "تم التواصل",
        source: "نموذج الاستشارة"
      },
      {
        id: "mock_3",
        name: "إبراهيم خالد الجبالي",
        phone: "01122334455",
        age: 45,
        governorate: "الجيزة",
        budget: 3000,
        date: new Date(Date.now() - 3600000 * 30).toISOString(),
        status: "حجز موعد",
        source: "الحاسبة الأكتوارية"
      },
      {
        id: "mock_4",
        name: "هيثم فتحي الجارحي",
        phone: "01555443322",
        age: 38,
        governorate: "الدقهلية",
        budget: 1000,
        date: new Date(Date.now() - 3600000 * 50).toISOString(),
        status: "جديد",
        source: "نموذج الاستشارة"
      },
      {
        id: "mock_5",
        name: "فاطمة أحمد الزيات",
        phone: "01125253636",
        age: 50,
        governorate: "المنوفية",
        budget: 5000,
        date: new Date(Date.now() - 3600000 * 100).toISOString(),
        status: "أرشيف",
        source: "برنامج المعاش"
      }
    ];
    localStorage.setItem("suez_canal_leads", JSON.stringify(mock));
    setLeads(mock);
  };

  const handleUpdateStatus = (leadId: string, newStatus: string) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem("suez_canal_leads", JSON.stringify(updated));
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العميل نهائياً؟")) {
      const filtered = leads.filter(l => l.id !== leadId);
      setLeads(filtered);
      localStorage.setItem("suez_canal_leads", JSON.stringify(filtered));
    }
  };

  const handleClearAll = () => {
    if (confirm("تحذير! هل تريد تفريغ كل بيانات العملاء دفعة واحدة؟")) {
      localStorage.setItem("suez_canal_leads", "[]");
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    // Arabic CSV formation with Safe BOM header for MS Excel reading
    let csvContent = "\uFEFF"; // BOM header
    csvContent += "الاسم,رقم الهاتف,العمر,المحافظة,الميزانية المقترحة,تاريخ الطلب,حالة التواصل,المصدر\n";
    
    leads.forEach(l => {
      csvContent += `"${l.name}","${l.phone}",${l.age},"${l.governorate}",${l.budget},"${new Date(l.date).toLocaleDateString("ar-EG")}","${l.status}","${l.source}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `عملاء_قناة_السويس_أماني_محمد_${new Date().toLocaleDateString("ar-EG")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computation
  const activeLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.phone.includes(search) || 
                          l.governorate.includes(search);
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === "جديد").length;
  const contactedCount = leads.filter(l => l.status === "تم التواصل").length;
  const bookedCount = leads.filter(l => l.status === "حجز موعد").length;

  const totalMonthlyBudgetPotential = leads.reduce((sum, l) => sum + (Number(l.budget) || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-6 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 p-2.5 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h3 className="text-lg font-bold">لوحة إدارة عملاء المستشارة</h3>
              <p className="text-xs text-slate-400 mt-0.5">مستندات حية لعملاء المحفظة الحالية</p>
            </div>
            <div className="bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 text-teal-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Authentication Form */
          <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto p-8 text-center space-y-6">
            <div className="bg-teal-500/15 p-4 rounded-full border border-teal-500/30 text-teal-400 animate-bounce">
              <Key className="w-8 h-8" />
            </div>
            
            <div>
              <h4 className="text-xl font-bold">تسجيل الدخول الآمن</h4>
              <p className="text-sm text-slate-400 mt-2">متاح فقط للمستشارة أماني محمد لحماية سرية وخيارات بيانات العملاء</p>
            </div>

            {errorMsg && (
              <div className="bg-red-950/40 border border-red-900/60 text-red-400 p-3 rounded-xl text-xs w-full">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                placeholder="أدخل رمز المرور الأمني (PIN)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center outline-none bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white hover:border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-900/50 transition-all font-mono placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer"
              >
                دخول
              </button>
            </form>

            <div className="text-xs text-slate-500">
              💡 رمز المرور للمطوّر والمراجعين هو: <span className="font-bold text-teal-400 font-mono">448892</span>
            </div>
          </div>
        ) : (
          /* Real Admin Panel Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-950/30 border-b border-slate-800/60 shrink-0">
              
              <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between text-right">
                <div>
                  <span className="text-3xl font-extrabold font-mono text-white">{totalLeadsCount}</span>
                  <span className="text-xs text-slate-400 block mt-1">إجمالي العملاء</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between text-right">
                <div>
                  <span className="text-3xl font-extrabold font-mono text-amber-400">{newLeadsCount}</span>
                  <span className="text-xs text-slate-400 block mt-1">طلبات جديدة</span>
                </div>
                <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">
                  <RefreshCw className="w-5 h-5 animate-spin-slow" />
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between text-right">
                <div>
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">{bookedCount}</span>
                  <span className="text-xs text-slate-400 block mt-1">مواعيد مؤكدة</span>
                </div>
                <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between text-right">
                <div>
                  <span className="text-2xl font-extrabold font-mono text-teal-400">{totalMonthlyBudgetPotential.toLocaleString()} ج.م</span>
                  <span className="text-xs text-slate-400 block mt-1">المحفظة الشهرية</span>
                </div>
                <div className="bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 text-teal-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

            </div>

            {/* Controls Ribbon */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between shrink-0">
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، الهاتف، المحافظة..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 text-right bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 pr-10 text-xs focus:border-teal-500 outline-none placeholder:text-slate-600"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-right rounded-xl py-2 px-3 text-xs text-slate-300 outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="all">كل الحالات</option>
                  <option value="جديد">جديد</option>
                  <option value="تم التواصل">تم التواصل</option>
                  <option value="حجز موعد">تم حجز موعد</option>
                  <option value="أرشيف">أرشيف (غير مهتم)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {leads.length === 0 && (
                  <button
                    onClick={generateMockLeads}
                    className="bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    توليد عملاء تجريبيين
                  </button>
                )}

                <button
                  onClick={handleExportCSV}
                  disabled={leads.length === 0}
                  className="bg-teal-700 hover:bg-teal-600 disabled:opacity-40 disabled:hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  تصدير لملف Excel
                </button>

                <button
                  onClick={handleClearAll}
                  disabled={leads.length === 0}
                  className="bg-red-950/60 hover:bg-red-950 text-red-400 border border-red-900/40 font-bold text-xs py-2 px-3 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  حذف الكل
                </button>
              </div>

            </div>

            {/* Leads Table Container */}
            <div className="flex-1 overflow-auto p-6">
              
              {activeLeads.length === 0 ? (
                <div className="text-center py-16 text-slate-500 space-y-4">
                  <FolderMinus className="w-16 h-16 mx-auto text-slate-700" />
                  <div>
                    <p className="text-lg font-medium">لا توجد سجلات عملاء حالياً</p>
                    <p className="text-xs text-slate-600 mt-1">املأ استمارة الهبوط لتجربة حفظ البيانات والظهور المباشر هنا!</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/20">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs border-b border-slate-800 font-semibold">
                        <th className="p-4">تاريخ الطلب</th>
                        <th className="p-4">الاسم بالكامل</th>
                        <th className="p-4">رقم الهاتف</th>
                        <th className="p-4">العمر</th>
                        <th className="p-4">المحافظة</th>
                        <th className="p-4">الميزانية</th>
                        <th className="p-4">حالة التواصل</th>
                        <th className="p-4 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {activeLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-all">
                          {/* Calendar date */}
                          <td className="p-4 text-slate-400 text-xs font-mono">
                            {new Date(lead.date).toLocaleDateString("ar-EG", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>

                          {/* Full Name */}
                          <td className="p-4 font-bold text-slate-200">
                            {lead.name}
                          </td>

                          {/* Phone */}
                          <td className="p-4">
                            <a 
                              href={`https://wa.me/${lead.phone.replace(/^[0]/, "20")}`}
                              target="_blank" 
                              referrerPolicy="no-referrer"
                              className="text-teal-400 hover:underline font-mono inline-flex items-center gap-1"
                            >
                              {lead.phone}
                              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                            </a>
                          </td>

                          {/* Age */}
                          <td className="p-4 text-slate-300 font-mono">
                            {lead.age} سنة
                          </td>

                          {/* Governorate */}
                          <td className="p-4 text-slate-300">
                            {lead.governorate}
                          </td>

                          {/* Budget */}
                          <td className="p-4 text-emerald-400 font-bold font-mono">
                            {lead.budget.toLocaleString()} ج.م
                          </td>

                          {/* Communications Status Selector */}
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              className={`text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none cursor-pointer text-center ${
                                lead.status === "جديد"
                                  ? "bg-amber-950/60 border border-amber-900/40 text-amber-400"
                                  : lead.status === "تم التواصل"
                                  ? "bg-blue-950/60 border border-blue-900/40 text-blue-400"
                                  : lead.status === "حجز موعد"
                                  ? "bg-emerald-950/60 border border-emerald-900/40 text-emerald-400"
                                  : "bg-slate-900/80 border border-slate-800 text-slate-400"
                              }`}
                            >
                              <option value="جديد">جديد</option>
                              <option value="تم التواصل">تم التواصل</option>
                              <option value="حجز موعد">حجز موعد</option>
                              <option value="أرشيف">أرشيف</option>
                            </select>
                          </td>

                          {/* Operations */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/20 transition-all cursor-pointer"
                              title="حذف العميل"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
            </div>

            {/* Footer with safety note */}
            <div className="bg-slate-950 border-t border-slate-800 p-4 text-center text-xs text-slate-600 flex justify-between items-center px-6">
              <span>قناة السويس لتأمينات الحياة - حماية الخصوصية الرقمية معززة</span>
              <span>تستخدم لوحة التحكم الذاكرة الآمنة المتطابقة بالمتصفح</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
