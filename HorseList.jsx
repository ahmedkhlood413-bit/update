import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// --- بيانات المرابط وفروعها المتاحة ---
const studsData = {
    'الشحانية':['الفرع الرئيسي', 'فرع الريان'],
    'مربط العرب':['فرع القاهرة', 'فرع الإسكندرية', 'فرع الجيزة'],
    'إسطبلات نجد':['الفرع الرئيسي', 'فرع الجيزة', 'فرع زايد'],
    'مربط الريان':['الفرع الرئيسي', 'فرع الإسكندرية'],
    'مربط البادية':['فرع الجيزة', 'فرع الفيوم', 'فرع سقارة'],
    'مزرعة رباب': ['الفرع الرئيسي', 'فرع سقارة'],
    'مربط صقر':['الفرع الرئيسي', 'فرع المنصورية'],
    'أخرى': ['الفرع الرئيسي']
};

const HorseList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    
    const[isModalOpen, setIsModalOpen] = useState(false);

    const [horses, setHorses] = useState([
        { id: 'H001', name: 'أسطورة الشحانية', type: 'فحل', breed: 'صقلاوي', color: 'أشقر', birth: 'مارس 2018', img: '/horses/profile_main.png', owner: 'إسطبلات الدوحة', studName: 'الشحانية', branch: 'الفرع الرئيسي', breeder: 'الشحانية', sire: 'مروان', dam: 'عليا', isActive: true, isFeatured: true },
        { id: 'H002', name: 'وردة الصحراء', type: 'فرس', breed: 'صقلاوي جدراني', color: 'رمادي', birth: 'مايو 2019', img: '/auctions/card_1.png', owner: 'مربط العرب', studName: 'مربط العرب', branch: 'فرع القاهرة', breeder: 'مربط العرب', sire: 'العديات', dam: 'نجمة', isActive: true, isFeatured: false },
        { id: 'H003', name: 'فجر العرب', type: 'فحل', breed: 'كحيلان', color: 'بني', birth: 'يناير 2020', img: '/auctions/card_2.png', owner: 'إسطبلات نجد', studName: 'إسطبلات نجد', branch: 'فرع الجيزة', breeder: 'نجد', sire: 'جسار', dam: 'أصيلة', isActive: true, isFeatured: true },
        { id: 'H004', name: 'أميرة الوادي', type: 'مهرة', breed: 'عبية الشراك', color: 'أبيض', birth: 'فبراير 2022', img: '/auctions/hero.png', owner: 'مربط الريان', studName: 'مربط الريان', branch: 'فرع الإسكندرية', breeder: 'الريان', sire: 'فهد', dam: 'غزالة', isActive: false, isFeatured: false },
        { id: 'H005', name: 'أدهم البادية', type: 'فحل', breed: 'صقلاوي', color: 'أدهم (أسود)', birth: 'مارس 2018', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=500', owner: 'مربط البادية', studName: 'مربط البادية', branch: 'فرع الجيزة', breeder: 'البادية', sire: 'مروان', dam: 'عليا', isActive: true, isFeatured: true },
        { id: 'H006', name: 'وردة رباب', type: 'فرس', breed: 'صقلاوي جدراني', color: 'أشعل (رمادي)', birth: 'مايو 2019', img: 'https://images.unsplash.com/photo-1598974357801-cb8107292211?auto=format&fit=crop&q=80&w=500', owner: 'مزرعة رباب', studName: 'مزرعة رباب', branch: 'فرع سقارة', breeder: 'رباب', sire: 'العديات', dam: 'نجمة', isActive: true, isFeatured: false },
        { id: 'H007', name: 'فخر صقر', type: 'فحل', breed: 'كحيلان', color: 'كميت (بني)', birth: 'يناير 2020', img: 'https://images.unsplash.com/photo-1519664824819-01f653457199?auto=format&fit=crop&q=80&w=500', owner: 'مربط صقر', studName: 'مربط صقر', branch: 'الفرع الرئيسي', breeder: 'صقر', sire: 'جسار', dam: 'أصيلة', isActive: true, isFeatured: true },
    ]);

    const[newHorse, setNewHorse] = useState({
        name: '', type: 'فحل', breed: '', color: '', birth: '', 
        img: '', owner: '', studName: '', branch: '', breeder: '', sire: '', dam: '', pedigreeImg: '', healthRecordPdf: null
    });

    const featuredHorses = horses.filter(h => h.isFeatured);
    const filteredHorses = horses.filter(h => 
        h.name.includes(searchTerm) || h.id.includes(searchTerm) || h.owner.includes(searchTerm) || h.branch.includes(searchTerm)
    );

    const handleDeleteHorse = (id, e) => {
        e.preventDefault();
        const confirmDelete = window.confirm('هل أنت متأكد من رغبتك في حذف هذا الحصان؟');
        if (confirmDelete) {
            setHorses(horses.filter(horse => horse.id !== id));
        }
    };

    const handleFormChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            if (files && files[0]) {
                if (name === 'healthRecordPdf') {
                    setNewHorse({ ...newHorse, [name]: files[0] });
                } else {
                    setNewHorse({ ...newHorse, [name]: URL.createObjectURL(files[0]) });
                }
            }
            return;
        }

        const textOnlyFields =['name', 'color', 'breeder', 'owner', 'sire', 'dam'];
        
        if (textOnlyFields.includes(name)) {
            if (value !== '' && !/^[\u0600-\u06FFa-zA-Z\s]+$/.test(value)) {
                return;
            }
        }

        setNewHorse({ ...newHorse, [name]: value });
    };

    const handleStudChange = (e) => {
        const selectedStud = e.target.value;
        setNewHorse({ ...newHorse, studName: selectedStud, branch: '' });
    };

    const handleAddHorse = (e) => {
        e.preventDefault();
        
        if (!newHorse.pedigreeImg || !newHorse.healthRecordPdf) {
            alert("يرجى التأكد من رفع جميع الملفات المطلوبة (صورة النسب وملف السجلات الصحية).");
            return;
        }

        const newHorseData = {
            id: `H00${horses.length + 1}`,
            ...newHorse,
            isActive: true,
            isFeatured: false
        };
        setHorses([newHorseData, ...horses]);
        setIsModalOpen(false);
        setNewHorse({ name: '', type: 'فحل', breed: '', color: '', birth: '', img: '', owner: '', studName: '', branch: '', breeder: '', sire: '', dam: '', pedigreeImg: '', healthRecordPdf: null });
    };

    const HorseCard = ({ horse, index }) => (
        <Link 
            to={`/horse/${horse.id}`} 
            className="animate-fade-in-up opacity-0 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(26,71,49,0.12)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden flex flex-col group transform hover:-translate-y-2 block"
            style={{ animationDelay: `${index * 0.15}s` }} 
        >
            <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img 
                    src={horse.img || 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=500'} 
                    alt={horse.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=500' }} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <button 
                    onClick={(e) => handleDeleteHorse(horse.id, e)} 
                    title="حذف الحصان"
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>

                <div className={`absolute top-4 left-4 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm ${horse.isActive ? 'bg-white/90 dark:bg-gray-800/90 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'bg-gray-800/80 text-white border border-gray-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${horse.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-xs font-bold">{horse.isActive ? 'نشط' : 'غير نشط'}</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative bg-white dark:bg-gray-800">
                <div className="text-center mb-5 pb-5 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-black text-2xl text-gray-900 dark:text-white mb-2">{horse.name}</h3>
                    <p className="text-xs text-stone-600 dark:text-gray-300 font-bold bg-stone-50 dark:bg-gray-700 inline-block px-4 py-1.5 rounded-full border border-stone-200 dark:border-gray-600">
                        {horse.sire} × {horse.dam}
                    </p>
                </div>
                
                <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-2"><i className="fas fa-dna text-emerald-700 dark:text-emerald-400"></i> الرَّسَن:</span>
                        <span className="font-medium">{horse.breed}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-2"><i className="fas fa-user-tie text-emerald-700 dark:text-emerald-400"></i> المُربّي:</span>
                        <span className="font-medium">{horse.breeder}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-2"><i className="fas fa-crown text-emerald-700 dark:text-emerald-400"></i> المالك:</span>
                        <span className="font-medium truncate max-w-[120px]">{horse.owner}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-800 dark:text-emerald-400 pt-3 mt-1 border-t border-dashed border-gray-200 dark:border-gray-700">
                        <span className="font-bold flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> المربط والفرع:</span>
                        <span className="font-bold truncate max-w-[140px] bg-emerald-50 dark:bg-emerald-900/40 px-2 py-1 rounded-md">{horse.studName} - {horse.branch}</span>
                    </div>
                </div>

                <div className="mt-auto pt-2">
                    <div className="w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 shadow-[0_4px_15px_rgba(6,78,59,0.3)] hover:shadow-[0_8px_25px_rgba(6,78,59,0.4)] flex items-center justify-center gap-2">
                        <span>عرض التفاصيل</span>
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="bg-[#FAF9F6] dark:bg-gray-900 min-h-screen font-sans text-right selection:bg-emerald-200/50 relative overflow-x-hidden transition-colors duration-300" dir="rtl">
            
            <style>{`
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes modalEntry { 0% { opacity: 0; transform: scale(0.95) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                .animate-modal { animation: modalEntry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>

            <Navbar />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-[2rem] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-modal border border-white/20 dark:border-gray-700">
                        
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-l from-emerald-900 to-emerald-800">
                            <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                <i className="fas fa-plus-circle text-emerald-200"></i> إضافة حصان جديد
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#FAF9F6] dark:bg-gray-900">
                            <form id="addHorseForm" onSubmit={handleAddHorse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm md:col-span-2">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">صورة الحصان</label>
                                    <div className="flex items-center justify-center w-full mt-1">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-emerald-600 dark:text-emerald-400">اضغط لرفع صورة</span> أو اسحب وأفلت</p>
                                            </div>
                                            <input type="file" required name="img" accept="image/*" onChange={handleFormChange} className="hidden" />
                                        </label>
                                    </div>
                                    {newHorse.img && (
                                        <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md">
                                            <img src={newHorse.img} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                {[
                                    { label: 'اسم الحصان', name: 'name', type: 'text', placeholder: 'مثال: أدهم البادية' },
                                    { label: 'اللون', name: 'color', type: 'text', placeholder: 'مثال: أشعل، أشقر، كميت...' },
                                    { label: 'تاريخ الميلاد', name: 'birth', type: 'text', placeholder: 'مثال: مايو 2021' },
                                    { label: 'المُربّي (Breeder)', name: 'breeder', type: 'text', placeholder: 'من قام بتوليد الحصان' },
                                    { label: 'المالك الحالي', name: 'owner', type: 'text', placeholder: 'اسم المالك' },
                                ].map((field, idx) => (
                                    <div key={idx} className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                        <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">{field.label}</label>
                                        <input 
                                            required type={field.type} name={field.name} value={newHorse[field.name]} onChange={handleFormChange} 
                                            className="w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white placeholder-gray-400 dark:placeholder-gray-500" 
                                            placeholder={field.placeholder} 
                                        />
                                    </div>
                                ))}

                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">اسم المربط</label>
                                    <select required name="studName" value={newHorse.studName} onChange={handleStudChange} className="w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white">
                                        <option value="">اختر المربط...</option>
                                        {Object.keys(studsData).map(stud => (
                                            <option key={stud} value={stud}>{stud}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">فرع المزرعة</label>
                                    <select required name="branch" value={newHorse.branch} onChange={handleFormChange} disabled={!newHorse.studName} className={`w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white ${!newHorse.studName ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <option value="">{newHorse.studName ? 'اختر الفرع...' : 'اختر المربط أولاً'}</option>
                                        {newHorse.studName && studsData[newHorse.studName].map(branch => (
                                            <option key={branch} value={branch}>{branch}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">النوع</label>
                                    <select required name="type" value={newHorse.type} onChange={handleFormChange} className="w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white">
                                        <option value="فحل">فحل (ذكر بالغ)</option>
                                        <option value="فرس">فرس (أنثى بالغة)</option>
                                        <option value="مهر">مهر (ذكر صغير)</option>
                                        <option value="مهرة">مهرة (أنثى صغيرة)</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">الرَّسَن (السلالة)</label>
                                    <select required name="breed" value={newHorse.breed} onChange={handleFormChange} className="w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white">
                                        <option value="">اختر الرسن...</option>
                                        <option value="صقلاوي">صقلاوي</option>
                                        <option value="صقلاوي جدراني">صقلاوي جدراني</option>
                                        <option value="كحيلان">كحيلان</option>
                                        <option value="عبيان">عبيان</option>
                                        <option value="عبية الشراك">عبية الشراك</option>
                                        <option value="حمداني">حمداني</option>
                                        <option value="هدبان">هدبان</option>
                                        <option value="شويمان">شويمان</option>
                                        <option value="معنقي">معنقي</option>
                                        <option value="أخرى">أخرى</option>
                                    </select>
                                </div>

                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">اسم الأب (Sire)</label>
                                    <input required type="text" name="sire" value={newHorse.sire} onChange={handleFormChange} className="w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white placeholder-gray-400" placeholder="اسم الأب" />
                                </div>

                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">اسم الأم (Dam)</label>
                                    <input required type="text" name="dam" value={newHorse.dam} onChange={handleFormChange} className="w-full px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all dark:text-white placeholder-gray-400" placeholder="اسم الأم" />
                                </div>

                                {/* --- حقل السجلات الصحية (أصبح بكلمة "ملف" بدل PDF وإجباري) --- */}
                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm md:col-span-2">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">ملف السجلات الصحية</label>
                                    <div className="flex items-center w-full mt-1">
                                        <label className="flex items-center justify-center w-full h-14 border border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 transition-colors px-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <i className="fas fa-file-alt text-emerald-600 text-xl"></i>
                                                <span className="text-sm text-gray-600 dark:text-gray-300 font-bold truncate max-w-[200px] sm:max-w-xs">
                                                    {newHorse.healthRecordPdf ? newHorse.healthRecordPdf.name : 'اضغط لاختيار الملف'}
                                                </span>
                                            </div>
                                            <input type="file" required name="healthRecordPdf" accept="application/pdf" onChange={handleFormChange} className="hidden" />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm md:col-span-2">
                                    <label className="text-sm font-bold text-emerald-900 dark:text-emerald-400">صورة شجرة النسب (Pedigree)</label>
                                    <div className="flex items-center justify-center w-full mt-1">
                                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                                <i className="fas fa-sitemap text-2xl mb-2 text-gray-500 dark:text-gray-400"></i>
                                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-emerald-600 dark:text-emerald-400">اضغط لرفع شهادة / صورة النسب</span></p>
                                            </div>
                                            <input type="file" required name="pedigreeImg" accept="image/*" onChange={handleFormChange} className="hidden" />
                                        </label>
                                    </div>
                                    {newHorse.pedigreeImg && (
                                        <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md">
                                            <img src={newHorse.pedigreeImg} alt="Pedigree Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                            </form>
                        </div>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-8 py-3.5 rounded-2xl font-bold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                إلغاء
                            </button>
                            <button type="submit" form="addHorseForm" className="px-10 py-3.5 rounded-2xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                حفظ الحصان
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pb-20 pt-10">
                <div className="container mx-auto px-4 lg:px-16 mb-16 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-emerald-50 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white md:w-20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                            <span className="md:-rotate-90 whitespace-nowrap font-black tracking-widest text-xl relative z-10">الخيل المميزة</span>
                        </div>
                        <div className="flex-1 p-8 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] dark:bg-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {featuredHorses.map((horse, idx) => <HorseCard key={`featured-${horse.id}`} horse={horse} index={idx} />)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">سجل الخيل في مصر</h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">استعرض وابحث في أكبر قاعدة بيانات للخيل العربية</p>
                        </div>
                        
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="w-full sm:w-auto bg-gray-800 dark:bg-emerald-800 hover:bg-gray-900 dark:hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-gray-800/30 dark:shadow-emerald-900/30 hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            <i className="fas fa-plus"></i> إضافة حصان جديد
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-3 rounded-[2rem] shadow-lg shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-emerald-800 dark:text-emerald-400">
                                <i className="fas fa-search text-lg"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="ابحث باسم الحصان، المالك، السلالة، أو الفرع..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-6 pr-14 py-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:ring-4 focus:ring-emerald-600/10 border border-transparent focus:border-emerald-200 dark:focus:border-emerald-600 text-gray-800 dark:text-white font-bold transition-all dark:placeholder-gray-400"
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-10 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all duration-300 ${showFilters ? 'bg-emerald-800 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            <i className="fas fa-sliders-h"></i> تصفية
                        </button>
                    </div>

                    <div className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[1000px] opacity-100 mb-10' : 'max-h-0 opacity-0 mb-0'}`}>
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8 rounded-[2rem] shadow-xl shadow-gray-200/30 dark:shadow-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl -z-10"></div>
                            
                            {[
                                { label: 'المربي', placeholder: 'اسم المربي...' },
                                { label: 'المالك', placeholder: 'اسم المالك...' },
                                { label: 'الأب (Sire)', placeholder: 'اسم الأب...' },
                                { label: 'الأم (Dam)', placeholder: 'اسم الأم...' },
                                { label: 'الفرع التابع له', placeholder: 'الفرع (مثال: الجيزة)...' }
                            ].map((filter, i) => (
                                <div key={i}>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{filter.label}</label>
                                    <input type="text" placeholder={filter.placeholder} className="w-full border border-gray-200 dark:border-gray-600 rounded-xl py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-colors font-medium dark:text-white dark:placeholder-gray-400" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اللون</label>
                                <select className="w-full border border-gray-200 dark:border-gray-600 rounded-xl py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-colors font-medium text-gray-700 dark:text-white">
                                    <option value="">جميع الألوان</option><option value="grey">رمادي (أشعل)</option><option value="chestnut">أشقر</option><option value="bay">بني (كميت)</option><option value="black">أسود (أدهم)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredHorses.length > 0 ? (
                            filteredHorses.map((horse, idx) => <HorseCard key={horse.id} horse={horse} index={idx} />)
                        ) : (
                            <div className="col-span-full text-center py-24 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm animate-fade-in-up">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-gray-700 text-emerald-800 dark:text-emerald-400 mb-5">
                                    <i className="fas fa-search text-3xl"></i>
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">لا توجد نتائج مطابقة</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">حاول البحث بكلمات مختلفة أو قم بإزالة بعض الفلاتر.</p>
                            </div>
                        )}
                    </div>

                    {filteredHorses.length > 0 && (
                        <div className="flex justify-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                            <button className="group flex items-center justify-center gap-3 px-10 py-4 bg-white dark:bg-gray-800 border-2 border-emerald-800 dark:border-emerald-600 text-emerald-800 dark:text-emerald-500 font-black rounded-full shadow-lg hover:shadow-emerald-900/20 hover:bg-emerald-800 hover:text-white dark:hover:bg-emerald-700 dark:hover:text-white transition-all duration-300">
                                <span>تحميل المزيد من الخيل</span>
                                <i className="fas fa-chevron-down transform group-hover:translate-y-1 transition-transform"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HorseList;