import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import "./App.css";
import i18next from "i18next";

// استدعاء الصفحة بشكل كسول (Lazy Loading) لتحسين السرعة
const Home = lazy(() => import("./pages/Home"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentLang = i18next.language

  useEffect(() => {
    if (currentLang === "en" || currentLang === "ar") {
      document.body.style.fontFamily = " var(--font-arabic)"
    } else {
      document.body.style.fontFamily = " var(--font-japanese)"

    }





    // محاكاة تحضير البيانات أو انتظار تحميل التطبيق بالكامل
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  // 1. عرض شاشة التحميل عند فتح الموقع لأول مرة
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      {/* 2. استخدام Suspense لعرض شاشة التحميل أثناء التنقل بين الصفحات */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;