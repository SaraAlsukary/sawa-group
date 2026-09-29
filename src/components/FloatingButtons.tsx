import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaComments,
    FaArrowUp,
    FaTimes,
} from "react-icons/fa";

export default function FloatingButtons() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // بيانات التواصل
    const contactData = {
        whatsapp: "https://api.whatsapp.com/message/T2H6NIFBRUIJG1?autoload=1&app_absent=0",
        phone: "tel:+81090-1840-9625",
        email: "mailto:contact@sawagroup.co.jp",
    };

    // إظهار زر العودة للأعلى عند التمرير لأسفل (بعد 300 بكسل)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // دالة العودة لأعلى الصفحة بشكل سلس
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // قائمة وسائل التواصل (الأيقونات فقط)
    const contactActions = [
        {
            id: "whatsapp",
            icon: <FaWhatsapp className="text-2xl" />,
            href: contactData.whatsapp,
            bgColor: "bg-green-500 hover:bg-green-600",
            textColor: "text-white",
        },
        {
            id: "phone",
            icon: <FaPhoneAlt className="text-xl" />,
            href: contactData.phone,
            bgColor: "bg-blue-600 hover:bg-blue-700",
            textColor: "text-white",
        },
        {
            id: "email",
            icon: <FaEnvelope className="text-xl" />,
            href: contactData.email,
            bgColor: "bg-red-600 hover:bg-red-700",
            textColor: "text-white",
        },
    ];

    return (
        <>
            {/* 1. زر العودة لأعلى الصفحة (على اليسار مع أنيميشن الصعود والنزول) */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -10, 0], // حركة الصعود والنزول
                        }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                            y: {
                                repeat: Infinity, // تكرار لا نهائي
                                duration: 1.8,   // سرعة الحركة بالشغف السلس
                                ease: "easeInOut",
                            },
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        aria-label="العودة لأعلى الصفحة"
                        className="fixed bottom-30 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-colors duration-300 hover:bg-red-700 border-2 border-white/20"
                    >
                        <FaArrowUp className="text-2xl" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* 2. قائمة أزرار التواصل العائمة (على اليمين - أحمر وأسود) */}
            <div className="fixed bottom-40 right-6 z-50 flex flex-col items-center gap-3">
                {/* الأزرار المنبثقة (واتساب، اتصال، إيميل) */}
                <AnimatePresence>
                    {isContactOpen && (
                        <div className="flex flex-col items-center gap-3 mb-1">
                            {contactActions.map((action, index) => (
                                <motion.a
                                    key={action.id}
                                    href={action.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.8 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="group flex items-center justify-center"
                                >
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 ${action.bgColor} ${action.textColor}`}
                                    >
                                        {action.icon}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* الزر الرئيسي لفتح/إغلاق القائمة (أحمر وأسود) */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    aria-label="تواصل معنا"
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 border-2 border-white/20 ${isContactOpen
                            ? "bg-black text-red-500 rotate-90 border-red-600"
                            : "bg-gradient-to-r from-red-600 to-black animate-pulse hover:from-red-700 hover:to-gray-900"
                        }`}
                >
                    {isContactOpen ? (
                        <FaTimes className="text-2xl" />
                    ) : (
                        <FaComments className="text-2xl" />
                    )}
                </motion.button>
            </div>
        </>
    );
}