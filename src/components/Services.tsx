import React, { type JSX } from "react";
import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";
import Data from "../utils/data";
import ServiceCard from "./ServiceCard";

interface CardDataItem {
  id: string | number;
  Image: string | React.ReactNode;
  [key: string]: unknown;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export default function Services(): JSX.Element {
  const { t, i18n } = useTranslation();
  // نقل المعرف ليكون داخل المكون حتى يتحدث فور تغيير اللغة
  const lang = i18n.language; 

  return (
    <section
      id="Services"
      className="relative bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* قسم العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--color-brand-red)] leading-tight">
            {t("Services-h")}
          </h2>
          <div className="h-1.5 w-16 bg-[var(--color-brand-red)] rounded-full mx-auto mt-4" />
        </motion.div>

        {/* شبكة البطاقات */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {(Data as CardDataItem[]).map((cardItem, index) => {
            const cardNum = index + 1;
            
            // جلب قيمة السطر الثاني والتحقق مما إذا كانت تحتوي على نص حقيقي
            const secondaryTitle = t(`Services-card${cardNum}T2`, { defaultValue: "" });
            const hasSecondaryTitle = Boolean(secondaryTitle && secondaryTitle.trim() !== "");

            return (
              <motion.div
                key={cardItem.id ?? index}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-[0_2px_2px_rgba(0,0,0)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-red-600 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* رقم البطاقة */}
                  <span className="absolute top-8 right-8 z-10 text-4xl font-extrabold text-gray-200/80 group-hover:text-[var(--color-brand-red)] transition-colors duration-300 pointer-events-none select-none">
                    {cardNum < 10 ? `0${cardNum}` : cardNum}
                  </span>

                  {/* الصورة */}
                  <div className="mb-6 w-full">
                    <ServiceCard image={cardItem.Image} />
                  </div>

                  {/* العناوين */}
                  <div className="mb-4 space-y-1">
                    <h3
                      lang={lang}
                      className={`${lang === "ja" || lang === "en" ? "text-[22px]" : "text-2xl"} font-bold text-[var(--color-brand-red)] transition-colors duration-300 leading-snug`}
                    >
                      {t(`Services-card${cardNum}T`)}
                    </h3>

                    {/* إظهار السطر الثاني تلقائياً إذا كان متوفراً في ملف الترجمة */}
                    {hasSecondaryTitle && (
                      <h4
                        lang={lang}
                        className={`${lang === "ja" || lang === "en" ? "text-[22px]" : "text-2xl"} font-semibold text-[var(--color-brand-red)] leading-snug`}
                      >
                        {secondaryTitle}
                      </h4>
                    )}
                  </div>

                  {/* الوصف */}
                  <p
                    lang={lang}
                    className="text-gray-600 text-xl leading-relaxed font-normal"
                  >
                    {t(`Services-card${cardNum}`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}