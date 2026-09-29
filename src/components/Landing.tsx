// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronRight, FaChevronLeft, FaArrowLeft } from "react-icons/fa";

// // استيراد الصور
// import img1 from "/Services/من نحن_.webp";
// import img2 from "/Services/img3 (1).webp";
// import img3 from "/Services/اعمالنا .webp";

// // بيانات الشرائح مع النصوص والأزرار
// const slides = [
//     {
//         id: 1,
//         image: img1,
//         badge: "من نحن",
//         title: "نبتكر الحلول لنصنع المستقبل",
//         description:
//             "مجموعة سوا تقدم أفضل الخدمات الاحترافية بأعلى معايير الجودة والابتكار لنلبي كافة طموحاتك وتطلعاتك.",
//         primaryBtn: "استكشف خدماتنا",
//         secondaryBtn: "تواصل معنا",
//         link: "#Services",
//     },
//     {
//         id: 2,
//         image: img2,
//         badge: "رؤيتنا الإستراتيجية",
//         title: "خبرة عريقة برؤية عالمية متجددة",
//         description:
//             "نرافق الشركات والأفراد في رحلة النمو والتوسع من خلال تقديم حلول مخصصة وشاملة تناسب كافة القطاعات.",
//         primaryBtn: "تعرف على خدماتنا",
//         secondaryBtn: "اطلب استشارة",
//         link: "#about",
//     },
//     {
//         id: 3,
//         image: img3,
//         badge: "معرض الأعمال",
//         title: "مشاريع نَفْخَرُ بإنجازها معكم",
//         description:
//             "استعرض قائمة من أحدث مشاريعنا الناجحة والحلول المبتكرة التي أحدثت فارقاً حقيقياً في شركائنا.",
//         primaryBtn: "مشاهدة الأعمال",
//         secondaryBtn: "ابدأ مشروعك",
//         link: "#Contact",
//     },
// ];

// export default function Landing() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isHovered, setIsHovered] = useState(false);

//     // التبديل التلقائي مع إيقافه عند توجيه المؤشر فوق العرض (Pause on Hover)
//     useEffect(() => {
//         if (isHovered) return;

//         const interval = setInterval(() => {
//             handleNext();
//         }, 5000); // 5 ثوانٍ لكل شريحة

//         return () => clearInterval(interval);
//     }, [currentIndex, isHovered]);

//     const handleNext = () => {
//         setCurrentIndex((prev) => (prev + 1) % slides.length);
//     };

//     const handlePrev = () => {
//         setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//     };

//     const currentSlide = slides[currentIndex];

//     return (
//         <section
//             className="container mx-auto px-4 py-6"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             <div className="relative h-[75vh] min-h-[550px] max-h-[750px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black">

//                 {/* 1. خلفية الصور المتحركة (Image Slider with Ken Burns Effect) */}
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={currentSlide.id}
//                         initial={{ opacity: 0, scale: 1.1 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 1.05 }}
//                         transition={{ duration: 1.2, ease: "easeOut" }}
//                         className="absolute inset-0 h-full w-full"
//                     >
//                         <img
//                             src={currentSlide.image}
//                             alt={currentSlide.title}
//                             className="h-full w-full object-cover object-center"
//                         />
//                     </motion.div>
//                 </AnimatePresence>

//                 {/* 2. طبقات التدرج والظلال الفخمة (Overlays) */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent" />

//                 {/* 3. محتوى الشريحة النصي (Animated Content) */}
//                 <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-12 md:px-16 lg:px-20">
//                     <div className="max-w-2xl text-right">

//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={currentSlide.id}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.6, delay: 0.2 }}
//                                 className="space-y-4 md:space-y-6"
//                             >
//                                 {/* الشارة (Badge) */}
//                                 <span className="inline-block rounded-full bg-red-600/90 px-4 py-1.5 text-xs md:text-sm font-black text-white shadow-lg backdrop-blur-md border border-red-400/30">
//                                     {currentSlide.badge}
//                                 </span>

//                                 {/* العنوان الرئيسي */}
//                                 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-md">
//                                     {currentSlide.title}
//                                 </h1>

//                                 {/* الوصف */}
//                                 <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed drop-shadow">
//                                     {currentSlide.description}
//                                 </p>

//                                 {/* أزرار الدعوة للإجراء (CTA Buttons) */}
//                                 <div className="flex flex-wrap items-center gap-4 pt-2">
//                                     <a
//                                         href={currentSlide.link}
//                                         className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 text-base md:text-lg font-bold text-white shadow-xl shadow-red-600/30 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
//                                     >
//                                         <span>{currentSlide.primaryBtn}</span>
//                                         <FaArrowLeft className="text-sm rtl:rotate-180" />
//                                     </a>

//                                     <a
//                                         href="#Contact"
//                                         className="rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3.5 text-base md:text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-gray-900 active:scale-95"
//                                     >
//                                         {currentSlide.secondaryBtn}
//                                     </a>
//                                 </div>
//                             </motion.div>
//                         </AnimatePresence>

//                     </div>
//                 </div>

//                 {/* 4. أزرار التنقل الزجاجية (Navigation Arrows) */}
//                 <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-3">
//                     <button
//                         onClick={handlePrev}
//                         className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:border-red-600 active:scale-90"
//                         aria-label="Previous Slide"
//                     >
//                         <FaChevronRight className="text-lg" />
//                     </button>
//                     <button
//                         onClick={handleNext}
//                         className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-red-600 hover:border-red-600 active:scale-90"
//                         aria-label="Next Slide"
//                     >
//                         <FaChevronLeft className="text-lg" />
//                     </button>
//                 </div>

//                 {/* 5. مؤشر التقدم والتنقل بالنطاق (Pagination Indicators) */}
//                 <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-2.5">
//                     {slides.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentIndex(index)}
//                             className={`h-2.5 rounded-full transition-all duration-500 ${index === currentIndex
//                                 ? "w-10 bg-red-600 shadow-lg shadow-red-600/50"
//                                 : "w-2.5 bg-white/40 hover:bg-white/80"
//                                 }`}
//                             aria-label={`Go to slide ${index + 1}`}
//                         />
//                     ))}
//                 </div>

//                 {/* 6. شريط تقدم زمني أسفل السلايدر (Progress Bar) */}
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
//                     <motion.div
//                         key={currentIndex}
//                         initial={{ width: "0%" }}
//                         animate={{ width: isHovered ? "0%" : "100%" }}
//                         transition={{ duration: 5, ease: "linear" }}
//                         className="h-full bg-gradient-to-r from-red-600 to-yellow-500"
//                     />
//                 </div>

//             </div>
//         </section>
//     );
// }
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// استيراد الصور
import img1 from "/Services/s1.png";
import img2 from "/Services/s2.png";
import img3 from "/Services/s1.png";

const images = [img1, img2, img3];

export default function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // التبديل التلقائي السلس كل 4.5 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // حساب مؤشرات الصورة السابقة والتالية للعرض ثلاثي الأبعاد
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <section id="home" className="relative w-full py-6 sm:py-10 md:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950 px-3 sm:px-6">

      {/* 1. الإشعاع الضوئي الخلفي التكيفي (Ambient Glow) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 flex items-center justify-center blur-3xl pointer-events-none"
        >
          <img
            src={images[currentIndex]}
            alt=""
            className="w-[90vw] sm:w-[70vw] h-[30vh] sm:h-[50vh] object-cover rounded-full opacity-60"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. حاوية المسرح البصري ثلاثي الأبعاد - الارتفاع معدل للموبايل */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-[260px] xs:h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] flex items-center justify-center perspective-1000">

        {/* الصورة السابقة (تظهر في الكمبيوتر فقط) */}
        <motion.div
          animate={{
            scale: 0.75,
            x: "-60%",
            rotateY: 25,
            opacity: 0.4,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute hidden md:block w-[55%] h-[75%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 backdrop-blur-sm pointer-events-none"
        >
          <img
            src={images[prevIndex]}
            alt=""
            className="w-full h-full object-cover filter brightness-75"
          />
        </motion.div>

        {/* الصورة الرئيسية (تغطي الموبايل بجمالية وبدون قص) */}
        <div className="relative w-full sm:w-[85%] md:w-[65%] h-full rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-br from-white/20 via-white/5 to-red-600/30 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl">

          <div className="relative w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-gray-950">

            {/* العرض المتحرك للصورة الرئيسية */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={images[currentIndex]}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* لمعة ضوئية متحركة تمر فوق الصورة */}
            <motion.div
              key={`sheen-${currentIndex}`}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20"
            />

            {/* حواف تظليل سينمائية دقيقة */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>

        </div>

        {/* الصورة التالية (تظهر في الكمبيوتر فقط) */}
        <motion.div
          animate={{
            scale: 0.75,
            x: "60%",
            rotateY: -25,
            opacity: 0.4,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute hidden md:block w-[55%] h-[75%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 backdrop-blur-sm pointer-events-none"
        >
          <img
            src={images[nextIndex]}
            alt=""
            className="w-full h-full object-cover filter brightness-75"
          />
        </motion.div>

      </div>

      {/* 3. شريط زمني بصري متوهج لتدفق الوقت */}
      <div className="relative z-20 mt-5 sm:mt-8 flex items-center justify-center gap-2.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-700 ${idx === currentIndex ? "w-12 sm:w-16 bg-white/20" : "w-2.5 sm:w-3 bg-white/10"
              }`}
          >
            {idx === currentIndex && (
              <motion.div
                key={`progress-${currentIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-red-600 via-yellow-400 to-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              />
            )}
          </div>
        ))}
      </div>

    </section>
  );
}