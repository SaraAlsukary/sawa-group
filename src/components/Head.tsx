import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom"; // أو استخراج window.location.pathname

interface HeadProps {
  serviceName?: string;
}

export default function Head({ serviceName }: HeadProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const baseUrl = "https://sawagroup.co.jp";
  
  // بناء الرابط الكامل للمسار الحالي (مع تنظيف السلاش المزدوج إن وجد)
  const currentPath = location.pathname.startsWith("/") 
    ? location.pathname 
    : `/${location.pathname}`;
    
  const canonicalUrl = `${baseUrl}${currentPath}`;

  const pageTitle = serviceName ? t(`${serviceName}T`, t("title")) : t("title");

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.language === "ar" ? "rtl" : "ltr"} />

      <title>{pageTitle}</title>
      <meta name="description" content={t("About-p")} />

      {/* رابط Canonical للصفحة الحالية */}
      <link rel="canonical" href={canonicalUrl} />

      {/* روابط hreflang الديناميكية حسب المسار الحالي */}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ja" href={canonicalUrl} />

      <meta name="keywords" content={t("keywords")} />
      
      {/* تحديث og:url ديناميكياً أيضاً */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={t("About-p")} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}/Logo/logo.webp`} />
    </Helmet>
  );
}