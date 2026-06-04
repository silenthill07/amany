import React, { useState, useEffect } from "react";
import { 
  calculateInsuranceProgram, 
  CalculationResult 
} from "../lib/insurance_tables";
import { 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Coins, 
  Calendar, 
  User,
  Info
} from "lucide-react";

interface CalculatorProps {
  onCalculate?: (results: CalculationResult) => void;
  onNavigateToForm?: (budget: number, age: number) => void;
}

export default function Calculator({ onCalculate, onNavigateToForm }: CalculatorProps) {
  // Inputs
  const [calcMode, setCalcMode] = useState<"premium" | "coverage">("premium");
  const [age, setAge] = useState<number>(35);
  const [term, setTerm] = useState<number>(15);
  const [monthlyPremium, setMonthlyPremium] = useState<number>(1500);
  const [sumAssured, setSumAssured] = useState<number>(250000);

  // Output State
  const [results, setResults] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const valueToUse = calcMode === "premium" ? monthlyPremium : sumAssured;
    const computed = calculateInsuranceProgram({
      age,
      term,
      type: calcMode,
      inputValue: valueToUse
    });
    setResults(computed);

    if (onCalculate) {
      onCalculate(computed);
    }
  }, [age, term, calcMode, monthlyPremium, sumAssured]);

  return (
    <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 p-6 border-b border-slate-800 text-center">
        <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-xs uppercase px-3 py-1 rounded-full">
          الأكثر دقة في مصر 🇪🇬
        </span>
        <h3 className="text-2xl font-bold mt-2">الحاسبة الاستثمارية والتأمينية المتطورة</h3>
        <p className="text-slate-400 text-sm mt-1">تعتمد على الجداول الأكتوارية المباشرة لشركة قناة السويس لتأمينات الحياة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
        
        {/* Left Column (Inputs) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          
          {/* Mode Switcher */}
          <div className="space-y-2">
            <span className="block text-right text-xs font-bold text-slate-400 uppercase tracking-widest">
              طريقة الحساب المفضلة
            </span>
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setCalcMode("premium")}
                className={`py-3 px-4 font-bold rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                  calcMode === "premium"
                    ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-md shadow-teal-700/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                أريد تحديد الادخار الشهري
              </button>
              <button
                type="button"
                onClick={() => setCalcMode("coverage")}
                className={`py-3 px-4 font-bold rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                  calcMode === "coverage"
                    ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-md shadow-teal-700/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                أريد تحديد مبلغ التأمين المطلوب
              </button>
            </div>
          </div>

          {/* Age Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-teal-400">{age} سنة</span>
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                العمر الحالي
                <User className="w-4 h-4 text-slate-400" />
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="60"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>60 سنة</span>
              <span>18 سنة</span>
            </div>
          </div>

          {/* Term Segmented Card */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-teal-400">{term} سنوات</span>
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                مدة الوثيقة (الادخار)
                <Calendar className="w-4 h-4 text-slate-400" />
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTerm(t)}
                  className={`border py-3.5 px-2 rounded-xl text-center font-bold text-sm transition-all duration-200 cursor-pointer ${
                    term === t
                      ? "border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-inner"
                      : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {t} سنة
                </button>
              ))}
            </div>
            <p className="text-right text-[11px] text-slate-500">
              💡 كلما زادت مدة الاستثمار، ضوعفت الأرباح وتزايدت مكافأة نهاية الخدمة بشكل مركب.
            </p>
          </div>

          {/* Interactive Calculator Dynamic Input */}
          {calcMode === "premium" ? (
            /* Monthly Savings Input Slider */
            <div className="space-y-2 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-sm">
                <span className="font-extrabold text-teal-400 text-lg">
                  {monthlyPremium.toLocaleString()} جنيه
                </span>
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  قدرتك على الادخار شهرياً
                  <Coins className="w-4 h-4 text-teal-400" />
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={monthlyPremium}
                onChange={(e) => setMonthlyPremium(parseInt(e.target.value))}
                className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>10,000 جنيه</span>
                <span>500 جنيه</span>
              </div>
            </div>
          ) : (
            /* Sum Assured Input Slider */
            <div className="space-y-2 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between items-center text-sm">
                <span className="font-extrabold text-teal-400 text-lg">
                  {sumAssured.toLocaleString()} جنيه
                </span>
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  التغطية التأمينية المطلوبة في حالة الوفاة
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="50000"
                value={sumAssured}
                onChange={(e) => setSumAssured(parseInt(e.target.value))}
                className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>2,000,000 جنيه</span>
                <span>50,000 جنيه</span>
              </div>
            </div>
          )}

          {/* Egyptian disclaimer */}
          <div className="flex items-start gap-2 bg-blue-950/30 border border-blue-900/50 p-3 rounded-xl text-slate-400 text-xs">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-right leading-relaxed">
              تنويه: هذه الأرقام تقديرية ومبنية على التوزيعات المتوقعة لشركة قناة السويس لتأمينات الحياة، وقد تختلف القيم الرسمية المصدرة بالوثيقة حسب التقييم النهائي والجداول الطبية المعتمدة للشركة.
            </p>
          </div>

        </div>

        {/* Right Column (Outputs & Visual Gauges) */}
        <div className="lg:col-span-5 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            <h4 className="text-right text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-3">
              النتائج المالية والغطاء التأميني المتوقع
            </h4>

            {results && (
              <div className="space-y-5">
                
                {/* Expected Portfolio Maturity / End of Service Reward */}
                <div className="bg-gradient-to-br from-teal-900/40 to-slate-900 border border-teal-500/20 rounded-2xl p-5 text-center">
                  <span className="text-slate-400 text-xs flex items-center justify-center gap-1">
                    مكافأة نهاية الخدمة المقدرة (الوثيقة + الأرباح)
                    <Award className="w-4 h-4 text-emerald-400" />
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mt-1 font-mono">
                    {results.expectedMaturityValue.toLocaleString()} <span className="text-sm font-sans text-emerald-400">جنيه</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    أرباح استثمارية صافية متوقعة: <span className="text-emerald-400 font-bold">+{results.earningsYield.toLocaleString()} جنيه</span>
                  </div>
                </div>

                {/* Grid for other outputs */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Monthly Premium Output Card */}
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
                    <span className="text-slate-500 text-[11px] block">القسط الشهري</span>
                    <span className="text-lg font-bold text-slate-200 block mt-1 font-mono">
                      {results.monthlyPremium.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">ج.م / شهرياً</span>
                  </div>

                  {/* Annual Premium Output Card */}
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-center">
                    <span className="text-slate-500 text-[11px] block">القسط السنوي</span>
                    <span className="text-lg font-bold text-slate-200 block mt-1 font-mono">
                      {results.annualPremium.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">ج.م / سنوياً</span>
                  </div>

                </div>

                {/* Insurance Coverage / Death Guarantee */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4.5 rounded-2xl">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="text-teal-400 font-bold">تغطية فورية آمنة</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      قيمة التغطية التأمينية للحياة
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                    </span>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                      <span className="text-[10px] text-slate-500 block">وفاة طبيعية</span>
                      <span className="text-sm font-bold text-slate-200 block mt-0.5 font-mono">
                        {results.sumAssured.toLocaleString()} ج.م
                      </span>
                    </div>

                    <div className="bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-900/40">
                      <span className="text-[10px] text-emerald-500/70 block">وفاة بحادث ⚠️</span>
                      <span className="text-sm font-extrabold text-emerald-400 block mt-0.5 font-mono">
                        {(results.sumAssured * 2).toLocaleString()} ج.م
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-500 text-right mt-3 leading-relaxed">
                    🛡️ بمجرد تفعيل الوثيقة وسداد القسط الأول تخضع للتغطية التأمينية الكاملة فوراً.
                  </p>
                </div>

              </div>
            )}
          </div>

          {/* Lead Capture CTA */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <button
              onClick={() => onNavigateToForm && onNavigateToForm(results?.monthlyPremium || 1000, age)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer block text-center"
            >
              احجز موعد لتأكيد التفاصيل وإصدار البرنامج
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2.5">
              سيتم نقل القيم المحددة تلقائياً لطلب الاستشارة المجانية
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
