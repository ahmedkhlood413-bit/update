import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const initialEvents =[
  { eventId: 1, title: 'مزاد إيجي هورسياس الماسي', startDate: '2025-10-12', location: 'القاهرة - مصر', description: 'مزاد لبيع الخيول العربية الأصيلة ونخبة من الأبطال.' },
  { eventId: 2, title: 'بطولة المراسم رباب', startDate: '2025-10-09', location: 'الجيزة - سقارة', description: 'بطولة دولية لجمال الخيول العربية برعاية مزرعة رباب.' },
  { eventId: 3, title: 'North Coast Championship', startDate: '2025-07-10', location: 'الساحل الشمالي', description: 'Arabian Horses Championship at the heart of North Coast.' }
];

const Auctions = () => {
  const [events, setEvents] = useState(initialEvents);
  
  // التحكم في القائمة العائمة (الزرار اللي تحت)
  const [isFabOpen, setIsFabOpen] = useState(false);
  
  // التحكم في النافذة المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(''); // 'add', 'edit', 'delete'
  const [selectedEventId, setSelectedEventId] = useState(''); // الـ ID بتاع المزاد اللي اختارناه من القائمة

  const [formData, setFormData] = useState({
    title: '', startDate: '', location: '', description: ''
  });

  // فتح المودال بناءً على الأكشن (إضافة - تعديل - حذف)
  const openActionModal = (mode) => {
    setModalMode(mode);
    setIsFabOpen(false); // نقفل القائمة العائمة
    setSelectedEventId(''); // نصفر الاختيار
    setFormData({ title: '', startDate: '', location: '', description: '' }); // نفضي الفورم
    setIsModalOpen(true); // نفتح النافذة
  };

  // لما نختار مزاد من القائمة المنسدلة (علشان نعدله أو نحذفه)
  const handleSelectChange = (e) => {
    const id = parseInt(e.target.value);
    setSelectedEventId(id);
    
    if (id) {
      // لو اختار مزاد، نجيب بياناته ونحطها في الفورم
      const selectedEvent = events.find(ev => ev.eventId === id);
      if (selectedEvent) {
        setFormData({
          title: selectedEvent.title,
          startDate: selectedEvent.startDate,
          location: selectedEvent.location,
          description: selectedEvent.description
        });
      }
    } else {
      setFormData({ title: '', startDate: '', location: '', description: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,[name]: value });
  };

  // دالة الحفظ (سواء بيضيف، بيعدل، أو بيحذف)
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (modalMode === 'add') {
      const newAuction = {
        eventId: Date.now(), 
        title: formData.title,
        startDate: formData.startDate,
        location: formData.location,
        description: formData.description
      };
      setEvents([newAuction, ...events]);

    } else if (modalMode === 'edit') {
      setEvents(events.map(event => 
        event.eventId === selectedEventId ? { ...event, ...formData } : event
      ));

    } else if (modalMode === 'delete') {
      if(window.confirm('هل أنت متأكد من حذف هذا المزاد نهائياً؟')) {
        setEvents(events.filter(event => event.eventId !== selectedEventId));
      } else {
        return; // لو داس كنسل، ميقفلش المودال
      }
    }

    setIsModalOpen(false); // قفل النافذة بعد ما نخلص
  };

  return (
    <>
      <style>{`
        @keyframes fadeUpHeavy { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-heavy { animation: fadeUpHeavy 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        .bg-pattern { background-image: url('https://www.transparenttextures.com/patterns/arabesque.png'); }
      `}</style>

      <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen text-right font-sans transition-colors duration-500 relative overflow-x-hidden" dir="rtl">
        <div className="absolute inset-0 bg-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

        <Navbar />

        <section className="relative z-10 container mx-auto px-4 lg:px-16 pt-28 pb-12 text-center animate-fade-heavy">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 relative inline-block">
              المزادات والفعاليات
              <span className="absolute -bottom-3 right-0 w-1/2 h-1.5 bg-emerald-600 rounded-full"></span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-6 font-bold text-lg">تابعي أحدث فعاليات ومزادات الخيل العربية الأصيلة</p>
          </div>
        </section>

        <section className="relative z-10 container mx-auto px-4 lg:px-16 pb-24">
          <div className="max-w-5xl mx-auto space-y-8">
            {events.length === 0 ? (
              <p className="text-center text-gray-500 font-bold text-xl py-10">لا توجد مزادات حالياً.</p>
            ) : (
              events.map((event, index) => (
                <div 
                  key={event.eventId} 
                  className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl border border-white dark:border-gray-800 hover:shadow-2xl transition-all duration-500 group animate-fade-heavy"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-28 h-28 md:w-32 md:h-32 min-w-[112px] md:min-w-[128px] bg-emerald-50 dark:bg-emerald-900/30 rounded-[2rem] flex flex-col items-center justify-center border-2 border-emerald-100 dark:border-emerald-800 transition-transform group-hover:scale-105 mt-6 md:mt-0">
                    <span className="text-3xl md:text-4xl font-black text-emerald-700 dark:text-emerald-400 leading-none">
                      {new Date(event.startDate).getDate() || '-'}
                    </span>
                    <span className="text-sm md:text-base font-black text-emerald-900 dark:text-emerald-200 mt-1 uppercase">
                      {event.startDate ? new Date(event.startDate).toLocaleString('ar-EG', { month: 'short' }) : 'غير محدد'}
                    </span>
                  </div>

                  <div className="flex-1 text-center md:text-right w-full">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{event.title}</h3>
                    <div className="mt-3">
                      <p className="text-emerald-800 dark:text-emerald-400 font-bold mb-1">📍 {event.location || 'غير محدد'}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">{event.description || 'لا يوجد وصف'}</p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <Link
                      to={`/auction/${event.eventId}`}
                      className="flex items-center justify-center gap-3 bg-gray-900 dark:bg-emerald-800 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl transition-all duration-300 hover:-translate-x-2"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        
        <Footer />

        {/* ================= الزر العائم والقائمة (Floating Action Menu) ================= */}
        <div className="fixed bottom-10 left-10 z-40 flex flex-col-reverse items-center gap-4">
          
          {/* الزر الرئيسي */}
          <button 
            onClick={() => setIsFabOpen(!isFabOpen)}
            title="إدارة المزادات"
            className={`flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ${isFabOpen ? 'bg-gray-800 rotate-45' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <span className="text-4xl text-white font-light mb-1">+</span>
          </button>

          {/* الأزرار الفرعية (تظهر عند الضغط) */}
          <div className={`flex flex-col gap-3 transition-all duration-300 absolute bottom-20 ${isFabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <button 
              onClick={() => openActionModal('add')} 
              className="group flex items-center gap-3 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg justify-center hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors"
              title="إضافة مزاد جديد"
            >
              <span className="text-emerald-600 text-xl">➕</span>
            </button>
            <button 
              onClick={() => openActionModal('edit')} 
              className="group flex items-center gap-3 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg justify-center hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
              title="تعديل مزاد"
            >
              <span className="text-blue-600 text-xl">✏️</span>
            </button>
            <button 
              onClick={() => openActionModal('delete')} 
              className="group flex items-center gap-3 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg justify-center hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
              title="حذف مزاد"
            >
              <span className="text-red-600 text-xl">🗑️</span>
            </button>
          </div>
        </div>

        {/* ================= النافذة المنبثقة الشاملة (Modal) ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-fade-heavy" dir="rtl">
              
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 left-6 text-gray-400 hover:text-red-500 transition-colors text-2xl font-black">✕</button>

              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 border-b-2 border-emerald-100 dark:border-emerald-900 pb-4">
                {modalMode === 'add' && 'إضافة مزاد جديد'}
                {modalMode === 'edit' && 'تعديل بيانات مزاد'}
                {modalMode === 'delete' && 'حذف مزاد'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5 text-right">
                
                {/* قائمة اختيار المزاد (تظهر فقط في التعديل والحذف) */}
                {(modalMode === 'edit' || modalMode === 'delete') && (
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">اختر المزاد</label>
                    <select 
                      value={selectedEventId}
                      onChange={handleSelectChange}
                      required
                      className="w-full bg-emerald-50 dark:bg-gray-800 border border-emerald-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all font-bold"
                    >
                      <option value="" disabled>-- اختر المزاد من هنا --</option>
                      {events.map(ev => (
                        <option key={ev.eventId} value={ev.eventId}>{ev.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* حقول البيانات (تظهر في الإضافة، وفي التعديل بشرط يكون في مزاد تم اختياره) */}
                {(modalMode === 'add' || (modalMode === 'edit' && selectedEventId !== '')) && (
                  <>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">اسم المزاد / الفعالية</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">تاريخ البدء</label>
                      <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">المكان <span className="text-sm font-normal text-gray-400">(اتركه فارغاً لحذفه)</span></label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">الوصف <span className="text-sm font-normal text-gray-400">(اتركه فارغاً لحذفه)</span></label>
                      <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all resize-none"></textarea>
                    </div>
                  </>
                )}

                {/* رسالة تأكيد الحذف (تظهر في الحذف فقط) */}
                {modalMode === 'delete' && selectedEventId !== '' && (
                  <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 font-bold text-center">
                    ⚠️ هل أنت متأكد أنك تريد حذف هذا المزاد بالكامل من النظام؟ لا يمكن التراجع عن هذه الخطوة.
                  </div>
                )}

                {/* أزرار الحفظ (تتغير بناءً على الـ Mode) */}
                <div className="flex gap-4 mt-8 pt-4">
                  <button 
                    type="submit"
                    disabled={modalMode !== 'add' && selectedEventId === ''} // تعطيل الزر لو مفيش حاجة مختارة
                    className={`flex-1 font-black py-3 rounded-xl transition-all text-white
                      ${modalMode === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}
                      ${(modalMode !== 'add' && selectedEventId === '') ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {modalMode === 'add' && 'إضافة المزاد'}
                    {modalMode === 'edit' && 'حفظ التعديلات'}
                    {modalMode === 'delete' && 'حذف المزاد نهائياً'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Auctions;