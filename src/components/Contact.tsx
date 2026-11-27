import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaFolderPlus, FaTrash, FaPaperPlane, FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/contact@sawagroup.co.jp";
const MAX_FILE_SIZE_MB = 5;

export default function Contact(): React.JSX.Element {
    const { t } = useTranslation();
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (!file) {
            setAttachedFile(null);
            return;
        }

        const sizeInMb = file.size / (1024 * 1024);
        if (sizeInMb > MAX_FILE_SIZE_MB) {
            toast.error(
                t(
                    "File-size-error",
                    `حجم الملف يتجاوز ${MAX_FILE_SIZE_MB} ميجابايت، يرجى اختيار ملف أصغر.`
                )
            );
            event.target.value = "";
            setAttachedFile(null);
            return;
        }

        setAttachedFile(file);
    };

    const handleFileDelete = () => {
        setAttachedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        formData.append("_subject", "رسالة جديدة من نموذج التواصل");
        formData.append("_template", "table");

        try {
            const response = await fetch(FORMSUBMIT_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.success !== "false") {
                toast.success(t("Form-success-message", "تم إرسال رسالتك بنجاح!"));

                if (formRef.current) {
                    formRef.current.reset();
                }
                handleFileDelete();
            } else {
                console.error("FormSubmit response error:", result);
                toast.error(
                    result?.message ||
                        t("Form-error-message", "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.")
                );
            }
        } catch (error) {
            console.error("Network/Submit error:", error);
            toast.error(t("Form-error-message", "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="Contact" className="relative bg-white py-16 px-3 sm:px-2 lg:px-3 overflow-hidden">
            <Toaster position="bottom-center" reverseOrder={false} />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-3xl p-3 sm:p-2 border border-gray-100 shadow-[0_2px_3px_0px_red]"
                >
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        {/* حقل الاسم */}
                        <div>
                            <label className="block text-xl font-bold text-black mb-2">
                                {t("Name-form")}
                            </label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-lg md:text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* حقل البريد الإلكتروني */}
                        <div>
                            <label className="block text-lg md:text-xl font-bold text-black mb-2">
                                {t("Email-form")}
                            </label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-lg md:text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* حقل رقم الهاتف */}
                        <div>
                            <label className="block text-lg md:text-xl font-bold text-black mb-2">
                                {t("Phone-form")}
                            </label>
                            <input
                                type="tel"
                                name="user_number"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-lg md:text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200"
                            />
                        </div>

                        {/* حقل نص الرسالة */}
                        <div>
                            <label className="block text-lg md:text-xl font-bold text-black mb-2">
                                {t("Textarea-form")}
                            </label>
                            <textarea
                                name="message"
                                rows={5}
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50/60 border border-gray-200 text-lg md:text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-500/10 transition-all duration-200 resize-none"
                            ></textarea>
                        </div>

                        {/* شريط المرفقات وزر الإرسال */}
                        <div className="pt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-gray-100">
                            <div className="flex-1">
                                <label className="block text-lg md:text-xl font-bold text-black mb-3">
                                    {t("File-form")}
                                </label>

                                <div className="flex flex-wrap items-center gap-4">
                                    <label
                                        htmlFor="btnfolder"
                                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg md:text-xl cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300 active:scale-95"
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

                            <div>
                                <motion.button
                                    whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-[var(--color-brand-red)] hover:bg-red-700 disabled:bg-gray-400 text-white font-bold text-xl shadow-lg shadow-red-500/20 hover:shadow-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="text-lg animate-spin" />
                                            <span>{t("Sending-form", "جاري الإرسال...")}</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-lg" />
                                            <span>{t("Send-form")}</span>
                                        </>
                                    )}
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