import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { MdOutlineLanguage } from "react-icons/md";
import { FiAlignJustify, FiX } from "react-icons/fi";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("#");
    const langDropdownRef = useRef<HTMLDivElement>(null);

    // 1. مصفوفة اللغات
    const languages = [
        { code: "ar", name: "العربية", font: "font-arabic" },
        { code: "en", name: "English", font: "font-sans" },
        { code: "ja", name: "日本語", font: "font-japanese" },
    ];

    const currentLangCode = i18n.language?.split("-")[0] || "ar";
    const currentLang =
        languages.find((l) => l.code === currentLangCode) || languages[0];

    // 2. روابط القائمة الرئيسية
    const navLinks = [
        { href: "#home", label: t("Navbar-Home"), icon: <FaHome /> },
        { href: "#about", label: t("Navbar-about"), icon: <IoPerson /> },
        { href: "#Services", label: t("Navbar-Services"), icon: <GrServices /> },
        { href: "#Contact", label: t("Navbar-contact"), icon: <FaPhoneAlt /> },
    ];

    // 3. تحديث الرابط النشط عند السكرول
    useEffect(() => {
        const sectionIds = ["home", "about", "Services", "Contact"];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const section of sectionIds) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveNav(`#${section}`);
                        return;
                    }
                }
            }
            if (window.scrollY < 100) {
                setActiveNav("#");
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 4. إغلاق القائمة المنسدلة عند النقر خارجها
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                langDropdownRef.current &&
                !langDropdownRef.current.contains(event.target as Node)
            ) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 5. ضبط اتجاه وفونت الصفحة
    useEffect(() => {
        const isArabic = currentLangCode === "ar";
        const dir = isArabic ? "rtl" : "ltr";

        document.documentElement.dir = dir;
        document.documentElement.lang = currentLangCode;

        document.documentElement.classList.remove(
            "font-arabic",
            "font-japanese",
            "font-sans"
        );
        document.documentElement.classList.add(currentLang.font);
    }, [currentLangCode, currentLang.font]);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsLangDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    // دالة النقر للتنقل السلس (بدون خصم هيدر ثابت لأن الهيدر غير ثابت)
    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        setActiveNav(href);
        setIsMobileMenuOpen(false);

        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const targetId = href.replace("#", "");
        const targetElement =
            document.getElementById(targetId) ||
            document.getElementById(targetId.toLowerCase());

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header
            className={`relative z-50 w-full shadow-xl bg-white ${currentLang.font}`}
        >
            {/* 1. الشريط العلوي فوق النافبار: Header-p بخلفية بيضاء ولون أصفر */}
            <div className="relative z-10 bg-white text-yellow-500 py-2.5 md:py-3 border-b border-gray-200">
                <div className="container mx-auto flex items-center justify-center px-4 sm:px-6 text-center">
                    <span className="font-extrabold text-sm sm:text-base md:text-xl text-red-500 drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.25)] mx-2">
                        SAWA GROUP
                    </span>
                    <span className="font-extrabold text-sm sm:text-base md:text-xl text-yellow-500 drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.25)]">
                        {t("Header-p")}
                    </span>
                </div>
            </div>

            {/* 2. شريط الملاحة الرئيسي Main Navigation Bar */}
            <div className="relative z-30 bg-white border-b border-gray-100">
                <div className="container mx-auto flex items-center justify-between px-4 py-3.5">
                    {/* اللوجو والعنوان */}
                    <a
                        href="#"
                        onClick={(e) => handleNavClick(e, "#")}
                        className="flex items-center gap-3 group"
                    >
                        <motion.img
                            whileHover={{ scale: 1.08, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            src="/Logo/logo.png"
                            alt="Sawa Group Logo"
                            className="h-12 w-auto object-contain sm:h-14 drop-shadow-md"
                        />
                        <span className="text-2xl md:text-3xl pr-2 font-black font-arabic bg-[linear-gradient(-40deg,#eab308_35%,#dc2626_70%)] drop-shadow-[0_0px_0.5px_rgba(0,0,0,0.8)] bg-clip-text text-transparent hover:brightness-125 transition-all tracking-tight hidden sm:block">
                            {t("Header-h")}
                        </span>
                    </a>

                    {/* روابط الكمبيوتر */}
                    <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
                        {navLinks.map((link, idx) => {
                            const isActive = activeNav === link.href;
                            return (
                                <a
                                    key={idx}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`flex items-center gap-2.5 px-5 py-2.5 text-xl font-bold rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105"
                                        : "text-gray-800 hover:bg-red-50 hover:text-red-600 hover:scale-105"
                                        }`}
                                >
                                    <span
                                        className={`text-xl transition-colors ${isActive ? "text-white" : "text-red-600"
                                            }`}
                                    >
                                        {link.icon}
                                    </span>
                                    <span>{link.label}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* محول اللغات وزر الموبايل */}
                    <div className="flex items-center gap-3">
                        <div className="relative z-40" ref={langDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center gap-2 px-1 py-2 text-base font-bold text-gray-900 bg-gray-50 border-2 border-red-600/30 rounded-xl shadow-sm hover:border-red-600 hover:bg-red-50 transition-all active:scale-95"
                            >
                                <MdOutlineLanguage className="text-2xl text-red-600" />
                                <span className={`${currentLang.font} hidden lg:block`}>{currentLang.name}</span>
                                <FaChevronDown
                                    className={`text-xs text-red-600 transition-transform duration-300 ${isLangDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {isLangDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute end-0 mt-2 z-[9999] w-44 overflow-hidden rounded-2xl border-2 border-red-600/20 bg-white p-2 shadow-2xl"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                type="button"
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-base font-bold transition-all ${lang.font
                                                    } ${currentLangCode === lang.code
                                                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                                                        : "text-gray-800 hover:bg-red-50 hover:text-red-600"
                                                    }`}
                                            >
                                                <span>{lang.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white text-2xl shadow-lg shadow-red-600/30 lg:hidden hover:bg-red-700 active:scale-95 transition-all"
                            aria-label="Toggle Navigation"
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiAlignJustify />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. شريط أسفل النافبار: Main بخلفية بيضاء ولون أصفر */}
            

            {/* 4. قائمة الموبايل */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative z-20 overflow-hidden border-t-2 border-red-600 bg-black text-white lg:hidden shadow-2xl"
                    >
                        <div className="container mx-auto space-y-2 px-4 py-5">
                            {navLinks.map((link, idx) => {
                                const isActive = activeNav === link.href;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className={`flex items-center gap-4 rounded-xl px-5 py-3.5 text-xl font-bold transition-all ${isActive
                                                ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                                                : "text-gray-200 hover:bg-red-600/30 hover:text-white"
                                                }`}
                                        >
                                            <span
                                                className={`text-2xl ${isActive ? "text-white" : "text-yellow-400"
                                                    }`}
                                            >
                                                {link.icon}
                                            </span>
                                            <span>{link.label}</span>
                                        </a>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}