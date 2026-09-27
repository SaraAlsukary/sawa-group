import i18next, { t } from "i18next";

export default function Loading() {
    const currentLang = i18next.language
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-brand-main,#f8f3f0)] transition-opacity duration-500">
            <div className="relative flex items-center justify-center">

                {/* 1. حلقة النبض الخارجي التفاعلية */}
                <div className="absolute h-36 w-36 animate-ping rounded-full bg-[var(--color-brand-red,#cb011a)]/15 opacity-75"></div>

                {/* 2. الإطار الدوار الخارجي */}
                <div className="h-32 w-32 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-brand-red,#cb011a)] border-r-[var(--color-brand-red,#cb011a)]/30"></div>

                {/* 3. حاوية اللوجو مع إضاءة ناعمة */}
                <div className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-white p-3 shadow-lg shadow-[var(--color-brand-red,#cb011a)]/10 ring-1 ring-black/5">
                    <img
                        src="/Logo/logo.webp"
                        alt="Sawa Group Logo"
                        className="h-auto w-full max-w-[60px] animate-pulse object-contain"
                    />
                </div>
            </div>

            {/* 4. نص التحميل مع مؤشر النقاط المتحركة */}
            <div className="mt-8 flex items-center gap-1.5 font-medium text-[var(--color-brand-dark,#000000)]" style={currentLang === "ar" ? { direction: "rtl", textAlign: "right" } : { direction: "ltr", textAlign: "left" }}>
                <span className="text-xl tracking-wider opacity-80 font-bold">{t('loading')} </span>
                <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-brand-red,#cb011a)] [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-brand-red,#cb011a)] [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-brand-red,#cb011a)]"></span>
                </div>
            </div>
        </div>
    );
}