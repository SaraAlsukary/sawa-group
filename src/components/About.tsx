import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function About() {
    const { t, i18n } = useTranslation();

    // التحقق من اتجاه اللغة (RTL للغة العربية، LTR للغات الأخرى)
    const isRtl = i18n.dir() === "rtl";
    // التحقق إذا كانت اللغة يابانية لتكبير حجم الفقرات درجتين
    const isJapanese = (i18n.resolvedLanguage || i18n.language)?.startsWith("ja");
    const paragraphSizeClass = isJapanese ? "text-xl sm:text-xl" : "text-lg sm:text-xl";

    return (
        <section id="about" className="relative w-full bg-white text-slate-900 overflow-hidden">
            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`space-y-10 ${isRtl ? "text-right" : "text-left"}`}
                >
                    {/* القسم الأول: About */}
                    <div className="relative">
                        {/* خط جانبي جمالي متكيف ديناميكياً مع الاتجاه */}
                        <div
                            className={`absolute top-6 w-1.5 h-16 bg-gradient-to-b from-red-600 to-red-400 ${isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                                }`}
                        />

                        {/* العنوان الرئيسي */}
                        <motion.h2
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`text-[25px] sm:text-4xl md:text-5xl font-bold pt-5 text-[var(--color-brand-red)] leading-tight ${isRtl ? "pr-4" : "pl-4"
                                }`}
                        >
                            {t("About-h")}
                        </motion.h2>

                        {/* النص التعريفي */}
                        <motion.p
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`${paragraphSizeClass} text-black font-bold leading-relaxed ${isRtl ? "pr-4" : "pl-4"
                                }`}
                        >
                            {t("About-p")}
                        </motion.p>
                    </div>

                    {/* القسم الثاني: Vision */}
                    <div className="relative">
                        {/* خط جانبي جمالي طويل متكيف ديناميكياً مع الاتجاه */}
                        <div
                            className={`absolute top-2 w-1.5 h-24 bg-gradient-to-b from-red-600 to-red-400 ${isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                                }`}
                        />

                        {/* العنوان الرئيسي */}
                        <motion.h2
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`text-[25px] sm:text-4xl md:text-5xl font-bold text-[var(--color-brand-red)] leading-tight ${isRtl ? "pr-4" : "pl-4"
                                }`}
                        >
                            {t("Vision-h")}
                        </motion.h2>

                        {/* النص التفصيلي */}
                        <motion.p
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`${paragraphSizeClass} text-black font-bold leading-relaxed ${isRtl ? "pr-4" : "pl-4"
                                }`}
                            lang={i18n.language}
                        >
                            {t("Vision-p")}
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}