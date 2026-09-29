import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaFolderPlus, FaTrash, FaPaperPlane } from "react-icons/fa";

export default function Contact(): React.JSX.Element {
    const [t] = useTranslation();
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setAttachedFile(file);
    };

    const handleFileDelete = () => {
        setAttachedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <section id="Contact" className="relative bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* حاوية النموذج بأنيميشن ودخول ناعم */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-[0_2px_3px_0px_red]"
                >
                    <form
                        method="POST"
                        action="https://formsubmit.co/contact@arabicsc.com"
                        encType="multipart/form-data"
                        id="Contact"
                        className="space-y-6"
                    >
                        {/* حقل الاسم */}
                        <div>
                            <label className="block text-2xl font-bold text-gray-900 mb-2">
                                {t("Name-form")}
                            </label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* حقل البريد الإلكتروني */}
                        <div>
                            <label className="block text-2xl font-bold text-gray-900 mb-2">
                                {t("Email-form")}
                            </label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* حقل رقم الهاتف */}
                        <div>
                            <label className="block text-2xl font-bold text-gray-900 mb-2">
                                {t("Phone-form")}
                            </label>
                            <input
                                type="tel"
                                name="user_number"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* حقل نص الرسالة */}
                        <div>
                            <label className="block text-2xl font-bold text-gray-900 mb-2">
                                {t("Textarea-form")}
                            </label>
                            <textarea
                                name="message"
                                rows={5}
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200 resize-none"
                            ></textarea>
                        </div>

                        {/* شريط المرفقات وزر الإرسال */}
                        <div className="pt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-gray-100">
                            {/* قسم إرفاق الملف */}
                            <div className="flex-1">
                                <label className="block text-2xl font-bold text-gray-900 mb-3">
                                    {t("File-form")}
                                </label>

                                <div className="flex flex-wrap items-center gap-4">
                                    {/* زر رفع الملف المخصص */}
                                    <label
                                        htmlFor="btnfolder"
                                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xl cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300 active:scale-95"
                                    >
                                        <FaFolderPlus className="text-3xl text-[var(--color-brand-red)]" />
                                    </label>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        id="btnfolder"
                                        name="attachment"
                                        accept="image/png, image/jpeg, image/jpg, .xlsx, .pdf, .docx, .doc"
                                        onChange={handleFileChange}
                                    />

                                    {/* شارة الملف المرفق مع حركة ظهور واختفاء ناعمة */}
                                    <AnimatePresence>
                                        {attachedFile && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, x: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-[var(--color-brand-red)]"
                                            >
                                                <span className="text-lg font-medium truncate max-w-[200px] sm:max-w-[280px]">
                                                    {attachedFile.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={handleFileDelete}
                                                    className="p-1.5 rounded-xl hover:bg-red-100 text-red-600 transition-colors duration-200"
                                                >
                                                    <FaTrash className="text-lg" />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* زر الإرسال التفاعلي */}
                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-[var(--color-brand-red)] hover:bg-red-700 text-white font-bold text-xl shadow-lg shadow-red-500/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    <FaPaperPlane className="text-lg" />
                                    <span>{t("Send-form")}</span>
                                </motion.button>
                            </div>
                        </div>

                        <input type="hidden" name="_captcha" value="false" />
                    </form>
                </motion.div>
            </div>
        </section>
    );
}