import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { MdOutlineLanguage } from "react-icons/md";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

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

    const currentLang =
        languages.find((l) => l.code === i18n.language) || languages[0];

    // 2. تحديث الرابط النشط تلقائياً عند السكرول في الصفحة
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
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

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 3. إغلاق القائمة المنسدلة عند النقر خارجها
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

    // 4. ضبط اتجاه وفونت الصفحة تلقائياً
    useEffect(() => {
        const isArabic = i18n.language === "ar";
        const dir = isArabic ? "rtl" : "ltr";

        document.documentElement.dir = dir;
        document.documentElement.lang = i18n.language;

        document.documentElement.classList.remove("font-arabic", "font-japanese", "font-sans");
        document.documentElement.classList.add(currentLang.font);
    }, [i18n.language, currentLang.font]);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsLangDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    // روابط القائمة الرئيسية
    const navLinks = [
        { href: "#", label: t("Navbar-Home"), icon: <FaHome /> },
        { href: "#about", label: t("Navbar-about"), icon: <IoPerson /> },
        { href: "#Services", label: t("Navbar-Services"), icon: <GrServices /> },
        { href: "#Contact", label: t("Navbar-contact"), icon: <FaPhoneAlt /> },
    ];

    return (
        <header className={`sticky top-0 z-50 w-full shadow-xl backdrop-blur-xl bg-white/95 ${currentLang.font}`}>

            {/* 1. الشريط العلوي المكبر الفخم (Announcement Bar) */}
            <div className="bg-gradient-to-r from-gray-950 via-red-950 to-gray-950 text-white py-3.5 md:py-4 border-b-2 border-red-600 shadow-inner">
                <div className="container mx-auto flex flex-row md:flex-col flex-wrap items-center  justify-center px-4 sm:px-6 gap-3">

                    <div className="flex items-center  gap-3 md:gap-4">
                        <span className="bg-red-600 text-white-300 px-3.5 py-1.5 rounded-lg text-xs md:text-base font-black uppercase tracking-wider shadow-lg border border-yellow-400/30">
                            {t("Header-h")}
                        </span>
                        <span className="text-white-400 font-extrabold text-base md:text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {t("Header-p")}
                        </span>
                    </div>

                    <div className="text-xs md:text-base font-black text-yellow-300 bg-white/10 px-4 py-1.5 rounded-full border border-yellow-400/40 shadow-inner">
                        {t("Main")}
                    </div>
                </div>
            </div>

            {/* 2. شريط الملاحة الرئيسي Main Navigation Bar */}
            <div className="container mx-auto flex items-center justify-between px-4 py-3.5">

                {/* اللوجو والعنوان */}
                <Link to="#" onClick={() => setActiveNav("#")} className="flex items-center gap-3 group">
                    <motion.img
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        src={"/Logo/logo.png"}
                        alt="Sawa Group Logo"
                        className="h-12 w-auto object-contain sm:h-14 drop-shadow-md"
                    />
                    <span className="text-2xl md:text-3xl font-black font-arabic bg-[linear-gradient(-40deg,#eab308_35%,#dc2626_70%)] drop-shadow-[0_0px_0.5px_rgba(0,0,0,0.8)] bg-clip-text text-transparent hover:brightness-125 transition-all tracking-tight hidden sm:block">
                        {t("Header-h")}
                    </span>
                </Link>

                {/* روابط الكمبيوتر مع التلوين النشط وتأثير الضغط والوقوف */}
                <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
                    {navLinks.map((link, idx) => {
                        const isActive = activeNav === link.href;
                        return (
                            <Link
                                key={idx}
                                to={link.href}
                                onClick={() => setActiveNav(link.href)}
                                className={`flex items-center gap-2.5 px-5 py-2.5 text-xl font-bold rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105"
                                    : "text-gray-800 hover:bg-red-50 hover:text-red-600 hover:scale-102"
                                    }`}
                            >
                                <span
                                    className={`text-xl transition-colors ${isActive ? "text-white" : "text-red-600 group-hover:text-red-600"
                                        }`}
                                >
                                    {link.icon}
                                </span>
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* محول اللغات وزر الموبايل */}
                <div className="flex items-center gap-3">

                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 text-base font-bold text-gray-900 bg-gray-50 border-2 border-red-600/30 rounded-xl shadow-sm hover:border-red-600 hover:bg-red-50 transition-all active:scale-95"
                        >
                            <MdOutlineLanguage className="text-2xl text-red-600" />
                            <span className={currentLang.font}>{currentLang.name}</span>
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
                                    className="absolute end-0 mt-2 z-50 w-44 overflow-hidden rounded-2xl border-2 border-red-600/20 bg-white p-2 shadow-2xl"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-base font-bold transition-all ${lang.font} ${i18n.language === lang.code
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
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white text-2xl shadow-lg shadow-red-600/30 lg:hidden hover:bg-red-700 active:scale-95 transition-all"
                        aria-label="Toggle Navigation"
                    >
                        {isMobileMenuOpen ? <FiX /> : <FiAlignJustify />}
                    </button>
                </div>
            </div>

            {/* 3. قائمة الموبايل مع تلوين الرابط النشط */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t-2 border-red-600 bg-black text-white lg:hidden shadow-2xl"
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
                                        <Link
                                            to={link.href}
                                            onClick={() => {
                                                setActiveNav(link.href);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-4 rounded-xl px-5 py-3.5 text-xl font-bold transition-all ${isActive
                                                ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                                                : "text-gray-200 hover:bg-red-600/30 hover:text-white"
                                                }`}
                                        >
                                            <span className={`text-2xl ${isActive ? "text-white" : "text-yellow-400"}`}>
                                                {link.icon}
                                            </span>
                                            <span>{link.label}</span>
                                        </Link>
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