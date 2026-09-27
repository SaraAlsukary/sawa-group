import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "./components/Loading";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    // 1. تطبيق الخط المناسب بناءً على اللغة الحالية
    const currentLang = i18n.language;
    if (currentLang === "en" || currentLang === "ar") {
      document.body.style.fontFamily = "var(--font-arabic)";
    } else {
      document.body.style.fontFamily = "var(--font-japanese)";
    }

    // 2. وقت انتظار أدنى لمنع حدوث وميض سريع للـ Loader
    const minTimer = new Promise((resolve) => setTimeout(resolve, 800));

    // 3. التحقق من جاهزية واجهة تحميل الخطوط في المتصفح
    const fontsLoaded = "fonts" in document ? document.fonts.ready : Promise.resolve();

    // 4. دمج الانتظار: لن يتم إخفاء التحميل إلا بعد اكتمال تنزيل كافة الخطوط ووقت Timer الأدنى
    Promise.all([fontsLoaded, minTimer])
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("حدث خطأ أثناء تحميل الخطوط:", err);
        setIsLoading(false); // إخفاء الشاشة حتى لو حدث خطأ لضمان عدم تعليق المستعرض
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;