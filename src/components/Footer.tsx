import { type JSX } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RiHomeOfficeLine } from "react-icons/ri";
import { FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "/Logo/logo.webp";

export default function Footer(): JSX.Element {
    const [t, i18n] = useTranslation();
    const currentYear = new Date().getFullYear();

    const contactLinks = [
        {
            href: "tel:+81050-6866-1791",
            icon: <RiHomeOfficeLine className="text-xl sm:text-2xl text-[var(--color-brand-red)] group-hover:scale-110 transition-transform duration-300" />,
            label: t("Office"),
        },
        {
            href: "tel:+81090-1840-9625",
            icon: <FaMobileAlt className="text-xl sm:text-2xl text-[var(--color-brand-red)] group-hover:scale-110 transition-transform duration-300" />,
            label: t("Phone"),
        },
        {
            href: "mailto:contact@sawagroup.co.jp",
            icon: <MdEmail className="text-xl sm:text-2xl text-[var(--color-brand-red)] group-hover:scale-110 transition-transform duration-300" />,
            label: t("Email"),
        },
    ];

    return (
        <footer className="relative bg-black text-white border-t border-neutral-800 pt-16 pb-8 overflow-hidden">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                    {/* قسم الشعار */}
                    <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className="h-35 sm:h-40 w-auto object-contain brightness-110"
                            src={logo}
                            alt="Sawa Group Logo"
                        />
                    </div>

                    {/* قسم معلومات التواصل */}
                    <div className="md:col-span-8 lg:col-span-9 w-full">
                        <h5
                            lang={i18n.language}
                            className="text-2xl font-bold text-white mb-6 text-center md:text-start"
                        >
                            {t("Adress")}
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {contactLinks.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-800/80 transition-all duration-300 shadow-lg min-w-0"
                                >
                                    <div className="p-3 rounded-xl bg-neutral-800/80 shadow-sm border border-neutral-700/60 group-hover:border-red-500/30 transition-colors duration-300 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="block text-base sm:text-lg font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 truncate">
                                            {item.label}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* شريط حقوق النشر السفلي */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center  justify-center gap-4 text-center"
                >
                    <p className="text-base sm:text-lg text-center text-gray-400 font-normal">
                        Copyright © {currentYear} Sawa Group. All Rights Reserved
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}