import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "هل هذا البرنامج عبارة عن قرض؟",
      answer: "لا نهائياً، هذا البرنامج هو نظام تأمين وتراكم استثماري خالص وليس قرضاً. لا يوجد أي فوائد بنكية مدينة أو التزامات اقتراض، بل هو صندوق ادخاري خاص تقوم فيه بادخار مبلغ شهري تختاره بمحض إرادتك، وتستلمه بالكامل مضافاً إليه الأرباح الاستثمارية المتراكمة عند نهاية الخدمة أو انتهاء المدة المتفق عليها."
    },
    {
      question: "هل يمكنني تصفية الوثيقة أو السحب المبكر؟",
      answer: "نعم، تتيح الوثيقة مرونة عالية تضمن لك حق الاسترداد أو تصفية العقد بدءاً من نهاية السنة التأمينية الثانية أو الثالثة وفقاً لقيم الاسترداد وجداول التصفية المعتمدة بشركة قناة السويس لتأمينات الحياة. كما يمكنك الحصول على قرض بضمان الوثيقة لمدد قصيرة دون تصفيتها."
    },
    {
      question: "كيف يتم حساب وتوزيع الأرباح الاستثمارية؟",
      answer: "تستثمر الأقساط في الأنشطة الاقتصادية الآمنة وقوية العائد لشركة قناة السويس لتأمينات الحياة، وتتقاضى الوثائق أرباحاً سنوية مركبة يتم إضافتها الكترونياً لحسابك التأميني، مما يرفع القيمة الاستردادية للوثيقة لتشكل مكافأة مالية ضخمة تحميك من التضخم."
    },
    {
      question: "ما نوع ومعايير التأمين المشمول على الحياة؟",
      answer: "البرنامج يقدم تغطية تأمينية فورية وعاجلة من اليوم الأول؛ في حالة الوفاة الطبيعية للعميل المؤمن عليه، يتوقف سداد الأقساط فوراً ويتم صرف كامل مبلغ التأمين المتفق عليه مع الأرباح الاستثمارية للورثة لضمان حماية الأسرة مالياً. أما في حالة الوفاة الناجمة عن حادث، فيتم صرف ضعف مبلغ التأمين فوراً."
    },
    {
      question: "كيف يتم صرف مكافأة نهاية الخدمة؟",
      answer: "عند الوصول لتاريخ استحقاق الوثيقة، تمنحك شركة قناة السويس كامل الحرية في اختيار وسيلة الصرف المناسبة لك: إما صرف المدخرات والأرباح كدفعة واحدة نقدية متكاملة لتبدأ بها مشروعك الخاص، أو تحويل المبلغ كمعاش شهري أو ربع سنوي مضمون يضمن لك ولأسرتك دخلاً ثابتاً ومستقراً ومريحاً."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? "bg-slate-50 border-teal-100 shadow-md" : "bg-white hover:border-slate-200"
            }`}
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-5 text-right outline-none cursor-pointer"
            >
              <span className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-teal-600" : "text-slate-400"}`}>
                <ChevronDown className="w-5 h-5 font-bold" />
              </span>
              <span className="flex items-center gap-3 font-bold text-slate-800 text-sm sm:text-base">
                {item.question}
                <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-teal-600" : "text-slate-400"}`} />
              </span>
            </button>

            {/* Answer animation Wrapper */}
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0"
              }`}
            >
              <p className="p-5 text-slate-600 text-sm sm:text-base leading-relaxed text-right bg-white">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
