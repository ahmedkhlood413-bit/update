import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// الداتا المحدثة لكل الفعاليات
const mockEventsData = {
  1: {
    title: "مزاد إيجي هورسياس الماسي",
    startDate: "2025-10-12",
    endDate: "2025-10-13",
    time: "4:00 PM - 10:00 PM",
    location: "Rababa Stud, Abu El Numrus, Giza",
    email: "info@thestud.net",
    phone: "0110000000",
    imageUrl: "/events/auction1.jpg",
    description: "مزاد كبير لبيع أفضل الخيول العربية الأصيلة.",
    results: [
      { name: "كحيل بسيوني", closingPrice: 95000, openingPrice: 90000, buyer: "عزوز عبد القادر", sold: true, birthDate: "2024-10-02", colour: "أسود", father: "عنتر بسيوني", mother: "غيداء زينة", gender: "ذكر" },
      { name: "وود اليهجة", closingPrice: 20000, openingPrice: 29000, buyer: "مصطفى فهمي", sold: true },
    ],
  },
  2: {
    title: "بطولة المراسم رباب",
    startDate: "2025-10-09",
    endDate: "2025-10-10",
    time: "5:00 PM - 9:00 PM",
    location: "مربط رباب - الجيزة",
    email: "rababa@gmail.com",
    phone: "0100000000",
    imageUrl: "/events/championship1.jpg",
    description: "بطولة خاصة بعرض أجمل الخيول العربية برعاية دولية.",
    results: [
      { name: "صقر الجيزة", closingPrice: 150000, openingPrice: 120000, buyer: "مربط الصقر", sold: true, birthDate: "2023-01-01", colour: "أشقر", father: "مروان الشقب", mother: "عالية", gender: "ذكر" },
      { name: "لؤلؤة المراسم", closingPrice: 0, openingPrice: 80000, buyer: null, sold: false, birthDate: "2022-05-12", colour: "رمادي", father: "فارس", mother: "نجمة", gender: "أنثى" },
    ],
  },
  3: {
    title: "North Coast Championship",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    time: "6:00 PM - 12:00 AM",
    location: "North Coast - Sidi Abdel Rahman",
    email: "northcoast@horses.com",
    phone: "0120000000",
    imageUrl: "/events/northcoast.jpg",
    description: "البطولة الصيفية السنوية لجمال الخيل العربية في الساحل الشمالي.",
    results: [
      { name: "نسيم البحر", closingPrice: 200000, openingPrice: 150000, buyer: "أحمد علي", sold: true, birthDate: "2021-06-20", colour: "أبيض", father: "بحر", mother: "موج", gender: "ذكر" },
    ],
  },
};

const AuctionDetails = () => {
  const { id } = useParams(); // قراءة الـ ID من الرابط
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [selectedHorse, setSelectedHorse] = useState(null);

  const auction = mockEventsData[id];

  // إذا لم يتم العثور على المزاد
  if (!auction) {
    return (
      <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold dark:text-white">عفواً، المزاد غير موجود</h1>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeUpHeavy { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalBounce { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .animate-fade-heavy { animation: fadeUpHeavy 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-modal { animation: modalBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen text-right transition-colors duration-500" dir="rtl">
        <Navbar />

        {/* هيدر المزاد */}
        <div className="relative h-[350px] flex items-center justify-center bg-cover bg-center animate-fade-heavy" style={{ backgroundImage: `url(${auction.imageUrl})` }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
          <div className="relative z-10 text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">{auction.title}</h1>
            <div className="flex gap-4 justify-center flex-wrap">
              <span className="bg-emerald-600/80 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500">بداية: {auction.startDate}</span>
              <span className="bg-gray-800/80 px-4 py-2 rounded-full text-sm font-bold border border-gray-600">نهاية: {auction.endDate}</span>
            </div>
          </div>
        </div>

        {/* التابز */}
        <section className="container mx-auto px-4 md:px-16 py-12">
          <div className="flex justify-center gap-4 md:gap-12 border-b border-gray-200 dark:border-gray-800 mb-12">
            {["info", "live", "results"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-6 font-black text-lg transition-all ${
                  activeTab === tab ? "text-emerald-600 border-b-4 border-emerald-600" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
              >
                {tab === "info" ? "معلومات" : tab === "live" ? "مباشر" : "النتائج"}
              </button>
            ))}
          </div>

          <div className="animate-fade-heavy">
            {activeTab === "info" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-10 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-black mb-8 dark:text-white">تفاصيل التواصل</h2>
                  <div className="space-y-6 text-gray-700 dark:text-gray-300 font-bold">
                    <p className="flex items-center gap-3"><span className="text-emerald-600 text-xl">📧</span> {auction.email}</p>
                    <p className="flex items-center gap-3"><span className="text-emerald-600 text-xl">📞</span> {auction.phone}</p>
                    <p className="flex items-center gap-3"><span className="text-emerald-600 text-xl">📍</span> {auction.location}</p>
                    <p className="flex items-center gap-3"><span className="text-emerald-600 text-xl">⏰</span> {auction.time}</p>
                  </div>
                </div>
                <div className="bg-emerald-900 text-white rounded-[2rem] p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                  <h2 className="text-2xl font-black mb-6 relative z-10">وصف المزاد</h2>
                  <p className="leading-relaxed text-lg relative z-10 opacity-90">{auction.description}</p>
                </div>
              </div>
            )}

            {activeTab === "live" && (
              <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="w-4 h-4 bg-emerald-600 rounded-full animate-ping"></span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-black text-xl">سيتم تفعيل البث المباشر فور انطلاق المزاد</p>
              </div>
            )}

            {activeTab === "results" && (
              <div className="grid gap-6">
                {auction.results.length > 0 ? (
                  auction.results.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedHorse(item)}
                      className="w-full flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-[1.01] transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <h3 className="text-2xl font-black dark:text-white">{item.name}</h3>
                        {item.sold && <span className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-black">تم البيع SOLD</span>}
                      </div>
                      <div className="flex gap-10 mt-4 md:mt-0 font-bold dark:text-gray-300">
                        <p><span className="text-gray-400 ml-2">الإغلاق:</span> {item.closingPrice?.toLocaleString()} ج.م</p>
                        <p><span className="text-gray-400 ml-2">الافتتاح:</span> {item.openingPrice?.toLocaleString()} ج.م</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-12 font-bold">لا توجد نتائج متاحة حالياً.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Modal تفاصيل الحصان */}
        {selectedHorse && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 max-w-lg w-full relative animate-modal border border-white/20">
              <button onClick={() => setSelectedHorse(null)} className="absolute top-6 left-6 text-gray-400 hover:text-red-500 transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>
              <h2 className="text-3xl font-black mb-8 text-center dark:text-white">{selectedHorse.name}</h2>
              <div className="space-y-4 dark:text-gray-200">
                {[{l:"تاريخ الميلاد",v:selectedHorse.birthDate}, {l:"اللون",v:selectedHorse.colour}, {l:"الأب",v:selectedHorse.father}, {l:"الأم",v:selectedHorse.mother}, {l:"الجنس",v:selectedHorse.gender}, {l:"المشتري",v:selectedHorse.buyer}].map((info, i) => (
                  info.v && <div key={i} className="flex justify-between border-b dark:border-gray-800 pb-2"><span className="text-gray-400 font-bold">{info.l}:</span><span className="font-black">{info.v}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default AuctionDetails;