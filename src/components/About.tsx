import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function About() {
    const { t, i18n } = useTranslation();
    //                              ${lang === "ja" || "ar" ? "text-justify" : ""} 

    // التحقق من اتجاه اللغة (RTL للغة العربية، LTR للغات الأخرى)
    const isRtl = i18n.dir() === "rtl";
    // const lang = i18n.language
    return (
        <section id="about" className="relative w-full py-20 sm:py-32 bg-slate-50/50 text-slate-900 overflow-hidden">

            {/* خلفية جمالية بتأثير الإشعاعات المتدرجة */}
            <div className="absolute top-1/3 -right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-slate-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`relative p-8 sm:p-14 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-6 ${isRtl ? "text-right" : "text-left"
                        }`}
                >
                    {/* خط جانبي جمالي متكيف ديناميكياً مع الاتجاه */}
                    <div
                        className={`absolute top-12 w-1.5 h-16 bg-gradient-to-b from-red-600 to-red-400 ${isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                            }`}
                    />


                    {/* العنوان الرئيسي */}
                    <motion.h2
                        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-brand-red)] leading-tight ${isRtl ? "pr-4" : "pl-4"
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
                        className={`text-lg sm:text-xl text-slate-600 font-normal leading-relaxed ${isRtl ? "pr-4" : "pl-4"
                            }`}
                    >
                        {t("About-p")}
                    </motion.p>
                </motion.div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`relative p-8 sm:p-14 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-6 ${isRtl ? "text-right" : "text-left"
                        }`}
                >
                    {/* خط جانبي جمالي طويل متكيف ديناميكياً مع الاتجاه */}
                    <div
                        className={`absolute top-10 w-1.5 h-24 bg-gradient-to-b from-red-600 to-red-400 ${isRtl ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                            }`}
                    />

                    {/* العنوان الرئيسي */}
                    <motion.h2
                        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-brand-red)] leading-tight ${isRtl ? "pr-4" : "pl-4"
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
                        className={`text-lg sm:text-xl text-slate-600 font-normal leading-relaxed
                        ${isRtl ? "pr-4" : "pl-4"
                            }`}
                        lang={i18n.language}
                    >
                        {t("Vision-p")}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}