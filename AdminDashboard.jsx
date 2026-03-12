import React, { useState, useEffect, useRef } from 'react';

export default function Dashboard() {
  // ================= 1. States الأساسية للتنقل =================
  const [activeSidebarPage, setActiveSidebarPage] = useState('dashboard'); // 'dashboard', 'orders', 'horses', 'medical', 'settings'
  const [activeTab, setActiveTab] = useState('البائعين'); 
  
  // ================= 2. States الإشعارات =================
  const[isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);

  // ================= 3. States الفلترة والبحث =================
  const [searchQuery, setSearchQuery] = useState('');
  const[filterStatus, setFilterStatus] = useState('الكل');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    setFilterStatus('الكل');
    setSearchQuery('');
  }, [activeTab, activeSidebarPage]);

  // ================= 4. قواعد البيانات (States) =================
  const [sellersData, setSellersData] = useState([
    { id: 'ORD-#5241', horseImage: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100&h=100&fit=crop', horseName: 'البراق', seller: 'فهد العتيبي', buyer: 'سعود بن عبدالعزيز', vet: 'د. خالد القحطاني', vetStatus: 'active', status: 'مكتمل', date: '2023/10/24' },
    { id: 'ORD-#5242', horseImage: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=100&h=100&fit=crop', horseName: 'الريم', seller: 'مربط الصقور', buyer: 'محمد جاسم', vet: 'غير معين', vetStatus: 'inactive', status: 'قيد الانتظار', date: '2023/10/25' },
    { id: 'ORD-#5243', horseImage: 'https://images.unsplash.com/photo-1534005081014-99d75b33190e?w=100&h=100&fit=crop', horseName: 'سيف', seller: 'سارة الشمري', buyer: 'فيصل الراجحي', vet: 'د. ليلى عبدالله', vetStatus: 'active', status: 'ملغى', date: '2023/10/26' },
    { id: 'ORD-#5244', horseImage: 'https://images.unsplash.com/photo-1550508688-661cd8968aa8?w=100&h=100&fit=crop', horseName: 'شهاب', seller: 'خالد منصور', buyer: 'أحمد علي', vet: 'د. خالد القحطاني', vetStatus: 'active', status: 'مكتمل', date: '2023/10/27' }
  ]);

  const[buyersData, setBuyersData] = useState([
    { id: 'b1', initial: 'أ', name: 'أحمد محمد', phone: '+966501234567', email: 'ahmed@example.com', orders: '٥ خيول', status: 'نشط' },
    { id: 'b2', initial: 'س', name: 'سارة علي', phone: '+966551234567', email: 'sara@example.com', orders: '٢ خيول', status: 'نشط' },
    { id: 'b3', initial: 'خ', name: 'خالد عبدالله', phone: '+966561234567', email: 'khaled@example.com', orders: '٠ خيول', status: 'غير نشط' },
    { id: 'b4', initial: 'ن', name: 'نورة يوسف', phone: '+966541234567', email: 'noura@example.com', orders: '٨ خيول', status: 'نشط' }
  ]);

  const[vetsData, setVetsData] = useState([
    { id: 'v1', initial: 'أ', name: 'د. أحمد علي', license: 'VET-001#', specialty: 'جراحة الخيول', email: 'ahmed@vet.com', phone: '+966 50 123 4567', status: 'نشط' },
    { id: 'v2', initial: 'س', name: 'د. سارة حسن', license: 'VET-002#', specialty: 'تغذية الخيول', email: 'sara@vet.com', phone: '+966 50 234 5678', status: 'نشط' },
    { id: 'v3', initial: 'م', name: 'د. محمد محمود', license: 'VET-003#', specialty: 'طب الطوارئ', email: 'mohammad@vet.com', phone: '+966 50 345 6789', status: 'غير نشط' }
  ]);

  const[ordersData, setOrdersData] = useState([
    { id: 'ORD-9001', horse: 'نجم', type: 'شراء', amount: '١٥٠,٠٠٠ ر.س', date: '2023/11/01', status: 'قيد المراجعة' },
    { id: 'ORD-9002', horse: 'أصيل', type: 'فحص طبي', amount: '٥,٠٠٠ ر.س', date: '2023/11/02', status: 'مكتمل' }
  ]);

  // إضافات قواعد البيانات الجديدة للخيول والسجلات الطبية
  const [horsesData, setHorsesData] = useState([
    { id: 'HRS-101', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100&h=100&fit=crop', name: 'البراق', breed: 'عربي أصيل', age: '٤ سنوات', color: 'أشقر', owner: 'فهد العتيبي', status: 'متاح للبيع' },
    { id: 'HRS-102', image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=100&h=100&fit=crop', name: 'الريم', breed: 'إنجليزي', age: '٣ سنوات', color: 'أسود', owner: 'مربط الصقور', status: 'مباع' },
    { id: 'HRS-103', image: 'https://images.unsplash.com/photo-1534005081014-99d75b33190e?w=100&h=100&fit=crop', name: 'سيف', breed: 'هجين', age: '٥ سنوات', color: 'رمادي', owner: 'فيصل الراجحي', status: 'تحت العلاج' }
  ]);

  const [medicalRecordsData, setMedicalRecordsData] = useState([
    { id: 'MED-501', horseName: 'البراق', vetName: 'د. أحمد علي', date: '2023/10/20', type: 'فحص دوري', diagnosis: 'سليم تماماً', status: 'مكتمل' },
    { id: 'MED-502', horseName: 'سيف', vetName: 'د. سارة حسن', date: '2023/11/05', type: 'علاج إصابة', diagnosis: 'إصابة في الحافر الأيمن', status: 'قيد العلاج' }
  ]);

  // ================= 5. دوال البحث والفلترة =================
  const getProcessedData = () => {
    // تحديد البيانات المطلوبة بناءً على الصفحة والتبويب
    let data =[];
    if (activeSidebarPage === 'orders') {
      data = ordersData;
    } else if (activeSidebarPage === 'horses') {
      data = horsesData;
    } else if (activeSidebarPage === 'medical') {
      data = medicalRecordsData;
    } else if (activeSidebarPage === 'settings') {
      return[]; // صفحة الإعدادات لا تحتوي على جداول بنفس النمط
    } else {
      data = activeTab === 'البائعين' ? sellersData : activeTab === 'المشترين' ? buyersData : vetsData;
    }

    return data.filter(item => {
      const matchesSearch = Object.values(item).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = filterStatus === 'الكل' || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };
  const processedData = getProcessedData();

  const handleDownloadCSV = () => {
    if (processedData.length === 0) return alert("لا توجد بيانات لتحميلها");
    const headers = Object.keys(processedData[0]).filter(k => k !== 'horseImage' && k !== 'image' && k !== 'initial' && k !== 'vetStatus').join(',');
    const rows = processedData.map(row => Object.entries(row).filter(([k]) => k !== 'horseImage' && k !== 'image' && k !== 'initial' && k !== 'vetStatus').map(([_, v]) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + headers + '\n' + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; 
    let fileName = activeTab;
    if(activeSidebarPage === 'orders') fileName = 'Orders';
    if(activeSidebarPage === 'horses') fileName = 'Horses';
    if(activeSidebarPage === 'medical') fileName = 'Medical_Records';
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const getOrderStatusStyle = (status) => {
    if(status === 'مكتمل' || status === 'متاح للبيع' || status === 'سليم') return 'bg-green-100 text-green-600';
    if(status === 'قيد الانتظار' || status === 'قيد المراجعة' || status === 'قيد العلاج' || status === 'تحت العلاج') return 'bg-yellow-100 text-yellow-600';
    if(status === 'ملغى' || status === 'مباع') return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-600';
  };
  const getUserStatusStyle = (status) => status === 'نشط' ? 'bg-green-50 text-green-500 border border-green-100' : 'bg-gray-100 text-gray-500 border border-gray-200';

  // ================= 6. نظام الـ Modal (مدمج للعمل مع الطلبات والمستخدمين) =================
  const[modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });
  const[formData, setFormData] = useState({});

  const openModal = (type, data = null) => { setModalConfig({ isOpen: true, type, data }); setFormData(data || {}); };
  const closeModal = () => { setModalConfig({ isOpen: false, type: '', data: null }); setFormData({}); };
  const handleInputChange = (e) => setFormData({ ...formData,[e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSidebarPage === 'orders') {
      if (modalConfig.type === 'add') setOrdersData([{ ...formData, id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, date: new Date().toLocaleDateString('en-CA').replace(/-/g, '/') }, ...ordersData]);
      else setOrdersData(ordersData.map(item => item.id === formData.id ? formData : item));
    } else if (activeSidebarPage === 'horses') {
      if (modalConfig.type === 'add') setHorsesData([{ ...formData, id: `HRS-${Math.floor(100 + Math.random() * 900)}`, image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100&h=100&fit=crop' }, ...horsesData]);
      else setHorsesData(horsesData.map(item => item.id === formData.id ? formData : item));
    } else if (activeSidebarPage === 'medical') {
      if (modalConfig.type === 'add') setMedicalRecordsData([{ ...formData, id: `MED-${Math.floor(500 + Math.random() * 900)}`, date: new Date().toLocaleDateString('en-CA').replace(/-/g, '/') }, ...medicalRecordsData]);
      else setMedicalRecordsData(medicalRecordsData.map(item => item.id === formData.id ? formData : item));
    } else {
      if (activeTab === 'البائعين') {
        if (modalConfig.type === 'add') setSellersData([{ ...formData, id: `ORD-#${Math.floor(Math.random() * 10000)}`, horseImage: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=100&h=100&fit=crop', date: new Date().toLocaleDateString('en-CA').replace(/-/g, '/'), vetStatus: 'active' }, ...sellersData]);
        else setSellersData(sellersData.map(item => item.id === formData.id ? formData : item));
      } else if (activeTab === 'المشترين') {
        if (modalConfig.type === 'add') setBuyersData([{ ...formData, id: `b${Date.now()}`, initial: formData.name ? formData.name.charAt(0) : 'م', orders: formData.orders || '٠ خيول' }, ...buyersData]);
        else setBuyersData(buyersData.map(item => item.id === formData.id ? formData : item));
      } else if (activeTab === 'الأطباء البيطريين') {
        if (modalConfig.type === 'add') setVetsData([{ ...formData, id: `v${Date.now()}`, initial: formData.name ? formData.name.replace('د. ', '').charAt(0) : 'ط' }, ...vetsData]);
        else setVetsData(vetsData.map(item => item.id === formData.id ? formData : item));
      }
    }
    closeModal();
  };

  const handleDelete = () => {
    if (activeSidebarPage === 'orders') setOrdersData(ordersData.filter(item => item.id !== modalConfig.data.id));
    else if (activeSidebarPage === 'horses') setHorsesData(horsesData.filter(item => item.id !== modalConfig.data.id));
    else if (activeSidebarPage === 'medical') setMedicalRecordsData(medicalRecordsData.filter(item => item.id !== modalConfig.data.id));
    else {
      if (activeTab === 'البائعين') setSellersData(sellersData.filter(item => item.id !== modalConfig.data.id));
      if (activeTab === 'المشترين') setBuyersData(buyersData.filter(item => item.id !== modalConfig.data.id));
      if (activeTab === 'الأطباء البيطريين') setVetsData(vetsData.filter(item => item.id !== modalConfig.data.id));
    }
    closeModal();
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative font-sans" dir="rtl">
      
      {/* ================= النافذة المنبثقة (Modal) ================= */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
            
            {/* حذف */}
            {modalConfig.type === 'delete' && (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl shadow-sm border border-red-100"><i className="fas fa-trash-alt"></i></div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">هل أنت متأكد من الحذف؟</h2>
                <p className="text-gray-500 mb-8">لا يمكن التراجع عن هذا الإجراء، سيتم حذف السجل نهائياً.</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={handleDelete} className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition shadow-md">نعم، تأكيد الحذف</button>
                  <button onClick={closeModal} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">إلغاء الأمر</button>
                </div>
              </div>
            )}

            {/* عرض */}
            {modalConfig.type === 'view' && (
              <div className="p-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800"><div className="bg-orange-50 w-10 h-10 rounded-full flex items-center justify-center text-[#f37021]"><i className="fas fa-eye"></i></div>تفاصيل السجل</h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
                  {Object.entries(modalConfig.data).map(([key, value]) => {
                    if (key === 'id' || key === 'horseImage' || key === 'image' || key === 'initial' || key === 'vetStatus') return null;
                    return (
                      <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="block text-gray-400 text-xs mb-2 font-bold uppercase">{key}</span>
                        <strong className="text-gray-800 text-base">{value}</strong>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 flex justify-end"><button onClick={closeModal} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">إغلاق</button></div>
              </div>
            )}

            {/* إضافة وتعديل */}
            {(modalConfig.type === 'add' || modalConfig.type === 'edit') && (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800"><div className="bg-orange-50 w-10 h-10 rounded-full flex items-center justify-center text-[#f37021]"><i className={`fas ${modalConfig.type === 'add' ? 'fa-plus' : 'fa-pen'}`}></i></div>{modalConfig.type === 'add' ? 'إضافة بيانات جديدة' : 'تعديل السجل الحالي'}</h2>
                  <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  
                  {/* حقول صفحة الطلبات */}
                  {activeSidebarPage === 'orders' && (
                    <>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم الخيل المربوط</label><input required name="horse" value={formData.horse || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50" /></div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">نوع الطلب</label>
                        <select name="type" value={formData.type || 'شراء'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50">
                          <option>شراء</option><option>فحص طبي</option><option>نقل</option><option>أخرى</option>
                        </select>
                      </div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">المبلغ الإجمالي</label><input required name="amount" value={formData.amount || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-left" dir="ltr" placeholder="مثال: ٥,٠٠٠ ر.س" /></div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">حالة الطلب</label>
                        <select name="status" value={formData.status || 'قيد المراجعة'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50">
                          <option>مكتمل</option><option>قيد المراجعة</option><option>ملغى</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* حقول صفحة الخيول */}
                  {activeSidebarPage === 'horses' && (
                    <>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم الخيل</label><input required name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">السلالة</label><input required name="breed" value={formData.breed || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">العمر</label><input required name="age" value={formData.age || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اللون</label><input required name="color" value={formData.color || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم المالك</label><input required name="owner" value={formData.owner || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">الحالة</label>
                        <select name="status" value={formData.status || 'متاح للبيع'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50">
                          <option>متاح للبيع</option><option>مباع</option><option>تحت العلاج</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* حقول السجلات الطبية */}
                  {activeSidebarPage === 'medical' && (
                    <>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم الخيل</label><input required name="horseName" value={formData.horseName || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">الطبيب المعالج</label><input required name="vetName" value={formData.vetName || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">نوع الإجراء</label><input required name="type" value={formData.type || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">التشخيص</label><input required name="diagnosis" value={formData.diagnosis || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">الحالة</label>
                        <select name="status" value={formData.status || 'قيد العلاج'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50">
                          <option>مكتمل</option><option>قيد العلاج</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* حقول البائعين */}
                  {activeSidebarPage === 'dashboard' && activeTab === 'البائعين' && (
                    <>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم الخيل</label><input required name="horseName" value={formData.horseName || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم البائع</label><input required name="seller" value={formData.seller || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم المشتري</label><input required name="buyer" value={formData.buyer || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">الطبيب المخصص</label><input required name="vet" value={formData.vet || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">الحالة</label><select name="status" value={formData.status || 'قيد الانتظار'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50"><option>مكتمل</option><option>قيد الانتظار</option><option>ملغى</option></select></div>
                    </>
                  )}

                  {/* حقول المشترين */}
                  {activeSidebarPage === 'dashboard' && activeTab === 'المشترين' && (
                    <>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم المشتري</label><input required name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label><input required name="phone" value={formData.phone || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-left" dir="ltr" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label><input required type="email" name="email" value={formData.email || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-left" dir="ltr" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">إجمالي الطلبات</label><input name="orders" value={formData.orders || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">الحالة</label><select name="status" value={formData.status || 'نشط'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50"><option>نشط</option><option>غير نشط</option></select></div>
                    </>
                  )}

                  {/* حقول الأطباء البيطريين */}
                  {activeSidebarPage === 'dashboard' && activeTab === 'الأطباء البيطريين' && (
                    <>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">اسم الطبيب</label><input required name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">رقم الرخصة</label><input required name="license" value={formData.license || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">التخصص</label><input required name="specialty" value={formData.specialty || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label><input required name="phone" value={formData.phone || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-left" dir="ltr" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label><input required type="email" name="email" value={formData.email || ''} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-left" dir="ltr" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">الحالة</label><select name="status" value={formData.status || 'نشط'} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50"><option>نشط</option><option>غير نشط</option></select></div>
                    </>
                  )}

                </div>
                <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button type="button" onClick={closeModal} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">إلغاء</button>
                  <button type="submit" className="bg-[#f37021] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md">{modalConfig.type === 'add' ? 'حفظ وإضافة' : 'حفظ التعديلات'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= القائمة الجانبية (Sidebar) ================= */}
      <aside className="w-64 bg-[#141b2d] text-gray-300 flex flex-col justify-between hidden md:flex z-10">
        <div>
          <div className="flex items-center gap-3 p-6 text-white mb-6">
            <div className="bg-[#f37021] min-w-[40px] h-10 flex items-center justify-center rounded-lg shadow-lg"><i className="fas fa-horse-head text-xl text-white"></i></div>
            <div><h1 className="font-bold text-lg leading-tight">نظام إدارة الخيول</h1><p className="text-[11px] text-gray-400">لوحة التحكم الإدارية</p></div>
          </div>
          
          <nav className="space-y-2 px-4 text-sm font-medium">
            <button onClick={() => setActiveSidebarPage('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarPage === 'dashboard' ? 'bg-[#f37021] text-white shadow-md' : 'hover:bg-gray-800 text-gray-400'}`}>
              <i className="fas fa-tachometer-alt w-5 text-center"></i> لوحة التحكم
            </button>
            <button onClick={() => setActiveSidebarPage('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarPage === 'orders' ? 'bg-[#f37021] text-white shadow-md' : 'hover:bg-gray-800 text-gray-400'}`}>
              <i className="fas fa-file-alt w-5 text-center"></i> الطلبات
            </button>
            <button onClick={() => setActiveSidebarPage('horses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarPage === 'horses' ? 'bg-[#f37021] text-white shadow-md' : 'hover:bg-gray-800 text-gray-400'}`}>
              <i className="fas fa-horse w-5 text-center"></i> الخيول
            </button>
            <button onClick={() => setActiveSidebarPage('medical')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarPage === 'medical' ? 'bg-[#f37021] text-white shadow-md' : 'hover:bg-gray-800 text-gray-400'}`}>
              <i className="fas fa-notes-medical w-5 text-center"></i> السجلات الطبية
            </button>
            <button onClick={() => setActiveSidebarPage('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSidebarPage === 'settings' ? 'bg-[#f37021] text-white shadow-md' : 'hover:bg-gray-800 text-gray-400'}`}>
              <i className="fas fa-cog w-5 text-center"></i> الإعدادات
            </button>
          </nav>
        </div>
        <div className="p-4 bg-[#1a233a] flex items-center justify-between m-4 rounded-xl cursor-pointer">
           <div><h4 className="text-white text-sm font-semibold">أفنان احمد</h4><p className="text-xs text-gray-400">مدير النظام</p></div>
          <div className="bg-[#e2e8f0] w-10 h-10 flex items-center justify-center rounded-full"><i className="fas fa-user text-[#141b2d]"></i></div>
        </div>
      </aside>

      {/* ================= محتوى الصفحة ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header (ثابت في كل الصفحات) */}
        <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-100 z-10">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-bold text-gray-800">
              {activeSidebarPage === 'dashboard' ? 'إدارة النظام والطلبات' : 
               activeSidebarPage === 'orders' ? 'إدارة الطلبات الشاملة' :
               activeSidebarPage === 'horses' ? 'سجل الخيول والملاك' :
               activeSidebarPage === 'medical' ? 'الرعاية والسجلات الطبية' : 'إعدادات النظام'}
            </h2>
            {activeSidebarPage !== 'settings' && (
              <div className="relative w-80">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="بحث سريع..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#f37021]" />
                <i className="fas fa-search absolute right-3.5 top-3.5 text-gray-400"></i>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-5 text-gray-500 text-lg relative">
              <div ref={notifRef} className="relative">
                <i onClick={() => setIsNotifOpen(!isNotifOpen)} className="fas fa-bell cursor-pointer hover:text-[#f37021] transition relative">
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </i>
                {isNotifOpen && (
                  <div className="absolute top-8 left-0 w-80 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden transform transition-all">
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                      <h4 className="font-bold text-sm text-gray-800">الإشعارات الحديثة</h4>
                      <button className="text-xs text-[#f37021] hover:underline font-medium">تحديد الكل كمقروء</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-4 border-b border-gray-50 hover:bg-orange-50/50 cursor-pointer transition flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0"><i className="fas fa-shopping-bag"></i></div>
                        <div><p className="text-sm text-gray-800 font-medium">طلب جديد من <span className="font-bold">سعود بن عبدالعزيز</span></p><p className="text-xs text-gray-400 mt-1">منذ ١٠ دقائق</p></div>
                      </div>
                      <div className="p-4 border-b border-gray-50 hover:bg-orange-50/50 cursor-pointer transition flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0"><i className="fas fa-check-circle"></i></div>
                        <div><p className="text-sm text-gray-800 font-medium">تم تأكيد التقرير الطبي للخيل <span className="font-bold">البراق</span></p><p className="text-xs text-gray-400 mt-1">منذ ساعتين</p></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 text-center border-t border-gray-100 cursor-pointer hover:bg-gray-100"><span className="text-sm text-gray-600 font-medium">عرض كل الإشعارات</span></div>
                  </div>
                )}
              </div>
              <i className="fas fa-language cursor-pointer hover:text-[#f37021] transition"></i>
            </div>
          </div>
        </header>

        {/* منطقة المحتوى القابلة للتمرير */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50/50">

          {/* ======================= صفحة لوحة التحكم (الرئيسية) بالتفاصيل الكاملة ======================= */}
          {activeSidebarPage === 'dashboard' && (
            <div className="animate-fade-in-up">
              {/* الإحصائيات */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div><p className="text-gray-500 text-sm mb-2 font-medium">إجمالي المستخدمين</p><h3 className="text-3xl font-bold text-gray-800">١,٢٥٠</h3><p className="text-green-500 text-xs mt-2 font-medium"><i className="fas fa-arrow-up ml-1"></i>٥٪ عن الشهر الماضي</p></div>
                  <div className="bg-orange-50 w-14 h-14 flex items-center justify-center rounded-2xl"><i className="fas fa-users text-[#f37021] text-2xl"></i></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div><p className="text-gray-500 text-sm mb-2 font-medium">الطلبات النشطة</p><h3 className="text-3xl font-bold text-gray-800">٤٥</h3><p className="text-green-500 text-xs mt-2 font-medium"><i className="fas fa-arrow-up ml-1"></i>٢٪ هذا الأسبوع</p></div>
                  <div className="bg-orange-50 w-14 h-14 flex items-center justify-center rounded-2xl"><i className="fas fa-shopping-cart text-[#f37021] text-2xl"></i></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div><p className="text-gray-500 text-sm mb-2 font-medium">طلبات قيد الانتظار</p><h3 className="text-3xl font-bold text-gray-800">١٢</h3><p className="text-red-500 text-xs mt-2 font-medium"><i className="fas fa-arrow-down ml-1"></i>١٪ منذ أمس</p></div>
                  <div className="bg-orange-50 w-14 h-14 flex items-center justify-center rounded-2xl"><i className="fas fa-clipboard-list text-[#f37021] text-2xl"></i></div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                  <h3 className="text-xl font-bold text-gray-800">إدارة المستخدمين</h3>
                  <div className="flex items-center gap-3">
                    
                    {/* الفلترة */}
                    <div className="relative" ref={filterRef}>
                      <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`w-10 h-10 flex items-center justify-center border rounded-lg transition ${isFilterOpen ? 'bg-[#f37021] text-white border-[#f37021]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                        <i className="fas fa-filter"></i>
                      </button>
                      {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-20">
                          <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase border-b border-gray-50 mb-1">تصفية حسب:</p>
                          <button onClick={() => {setFilterStatus('الكل'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'الكل' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>الكل</button>
                          {activeTab === 'البائعين' ? (
                            <>
                              <button onClick={() => {setFilterStatus('مكتمل'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'مكتمل' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>مكتمل</button>
                              <button onClick={() => {setFilterStatus('قيد الانتظار'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'قيد الانتظار' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>قيد الانتظار</button>
                              <button onClick={() => {setFilterStatus('ملغى'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'ملغى' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>ملغى</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => {setFilterStatus('نشط'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'نشط' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>نشط</button>
                              <button onClick={() => {setFilterStatus('غير نشط'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'غير نشط' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>غير نشط</button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <button onClick={handleDownloadCSV} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-green-600 transition" title="تصدير كـ CSV">
                      <i className="fas fa-download"></i>
                    </button>
                  </div>
                </div>

                <div className="flex border-b border-gray-100 px-6 bg-gray-50/30">
                  {['البائعين', 'المشترين', 'الأطباء البيطريين'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === tab ? 'border-[#f37021] text-[#f37021]' : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>{tab}</button>
                  ))}
                </div>

                <div className="flex-1 overflow-x-auto">
                  
                  {/* ====== جدول البائعين التفصيلي ====== */}
                  {activeTab === 'البائعين' && (
                    <>
                      <div className="p-6 flex items-center justify-between border-b border-gray-50">
                        <div className="text-right">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">قائمة البائعين</h3>
                          <p className="text-sm text-gray-400 font-medium">إدارة ومتابعة جميع البائعين المسجلين في النظام</p>
                        </div>
                        <button onClick={() => openModal('add')} className="bg-[#f37021] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-md">
                          <i className="fas fa-plus"></i> إضافة بائع جديد
                        </button>
                      </div>
                      <table className="w-full text-right">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs font-semibold">
                          <tr><th className="py-4 px-6">معرف الطلب</th><th className="py-4 px-6">اسم الخيل</th><th className="py-4 px-6">البائع</th><th className="py-4 px-6">المشتري</th><th className="py-4 px-6">الطبيب المخصص</th><th className="py-4 px-6 text-center">الحالة</th><th className="py-4 px-6">التاريخ</th><th className="py-4 px-6 text-center">الإجراءات</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {processedData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 transition group">
                              <td className="py-4 px-6 text-sm font-bold text-gray-700">{row.id}</td>
                              <td className="py-4 px-6 text-sm"><div className="flex items-center gap-3"><img src={row.horseImage} alt="Horse" className="w-10 h-10 rounded-lg object-cover shadow-sm" /><span className="font-semibold text-gray-700">{row.horseName}</span></div></td>
                              <td className="py-4 px-6 text-sm text-gray-600 font-medium">{row.seller}</td>
                              <td className="py-4 px-6 text-sm text-gray-600 font-medium">{row.buyer}</td>
                              <td className="py-4 px-6 text-sm text-gray-600"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${row.vetStatus === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div><span className={row.vetStatus === 'inactive' ? 'text-gray-400' : 'font-medium'}>{row.vet}</span></div></td>
                              <td className="py-4 px-6 text-sm text-center"><span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getOrderStatusStyle(row.status)}`}>{row.status}</span></td>
                              <td className="py-4 px-6 text-sm text-gray-500 font-medium">{row.date}</td>
                              <td className="py-4 px-6 text-sm flex justify-center gap-4 mt-2">
                                <button onClick={() => openModal('view', row)} className="text-gray-400 hover:text-[#f37021] transition"><i className="fas fa-eye text-lg"></i></button>
                                <button onClick={() => openModal('edit', row)} className="text-gray-400 hover:text-blue-500 transition"><i className="fas fa-pen text-lg"></i></button>
                                <button onClick={() => openModal('delete', row)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash text-lg"></i></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* ====== جدول المشترين التفصيلي ====== */}
                  {activeTab === 'المشترين' && (
                    <>
                      <div className="p-6 flex items-center justify-between border-b border-gray-50">
                        <div className="text-right">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">قائمة المشترين</h3>
                          <p className="text-sm text-gray-400 font-medium">إدارة ومتابعة جميع المشترين المسجلين في النظام</p>
                        </div>
                        <button onClick={() => openModal('add')} className="bg-[#f37021] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-md">
                          <i className="fas fa-plus"></i> إضافة مشتر جديد
                        </button>
                      </div>
                      <table className="w-full text-right">
                        <thead className="bg-gray-50/50 text-gray-500 text-sm font-semibold">
                          <tr><th className="py-4 px-6">اسم المشتري</th><th className="py-4 px-6 text-center">رقم الهاتف</th><th className="py-4 px-6 text-center">البريد الإلكتروني</th><th className="py-4 px-6 text-center">إجمالي الطلبات</th><th className="py-4 px-6 text-center">الحالة</th><th className="py-4 px-6 text-center">الإجراءات</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {processedData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 transition">
                              <td className="py-4 px-6"><div className="flex items-center justify-start gap-4"><div className="w-9 h-9 rounded-full bg-[#eef2f6] text-[#64748b] flex items-center justify-center font-bold text-sm">{row.initial}</div><span className="font-bold text-gray-800 text-sm">{row.name}</span></div></td>
                              <td className="py-4 px-6 text-sm text-gray-500 font-medium tracking-wide text-center" dir="ltr">{row.phone}</td>
                              <td className="py-4 px-6 text-sm text-gray-500 font-medium text-center">{row.email}</td>
                              <td className="py-4 px-6 text-sm font-bold text-gray-800 text-center">{row.orders}</td>
                              <td className="py-4 px-6 text-center"><span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center justify-center w-max mx-auto gap-1.5 ${getUserStatusStyle(row.status)}`}>{row.status}</span></td>
                              <td className="py-4 px-6 text-sm flex justify-center gap-5 mt-2">
                                <button onClick={() => openModal('view', row)} className="text-gray-400 hover:text-[#f37021] transition"><i className="fas fa-eye text-lg"></i></button>
                                <button onClick={() => openModal('edit', row)} className="text-gray-400 hover:text-blue-500 transition"><i className="fas fa-pen text-lg"></i></button>
                                <button onClick={() => openModal('delete', row)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash text-lg"></i></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* ====== جدول الأطباء التفصيلي ====== */}
                  {activeTab === 'الأطباء البيطريين' && (
                    <>
                      <div className="p-6 flex items-center justify-between border-b border-gray-50">
                        <div className="text-right">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">قائمة الأطباء البيطريين</h3>
                          <p className="text-sm text-gray-400 font-medium">إدارة وتعديل بيانات الطاقم الطبي</p>
                        </div>
                        <button onClick={() => openModal('add')} className="bg-[#f37021] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-md">
                          <i className="fas fa-user-plus"></i> إضافة طبيب جديد
                        </button>
                      </div>
                      <table className="w-full text-right">
                        <thead className="bg-gray-50/50 text-gray-500 text-sm font-semibold">
                          <tr><th className="py-4 px-6">اسم الطبيب</th><th className="py-4 px-6 text-center">التخصص</th><th className="py-4 px-6 text-center">معلومات الاتصال</th><th className="py-4 px-6 text-center">الحالة</th><th className="py-4 px-6 text-center">الإجراءات</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {processedData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 transition">
                              <td className="py-4 px-6"><div className="flex items-center justify-start gap-4"><div className="w-9 h-9 rounded-full bg-orange-50 text-[#f37021] flex items-center justify-center font-bold text-sm">{row.initial}</div><div><h4 className="font-bold text-gray-800 text-sm">{row.name}</h4><span className="text-xs text-gray-400 font-medium">رقم الرخصة: {row.license}</span></div></div></td>
                              <td className="py-4 px-6 text-sm text-gray-600 font-medium text-center">{row.specialty}</td>
                              <td className="py-4 px-6 text-sm text-gray-500 font-medium text-center"><div className="flex flex-col gap-1 items-center"><div className="flex items-center gap-2"><span dir="ltr">{row.email}</span> <i className="fas fa-envelope text-gray-400"></i></div><div className="flex items-center gap-2"><span dir="ltr">{row.phone}</span> <i className="fas fa-phone-alt text-gray-400"></i></div></div></td>
                              <td className="py-4 px-6 text-center"><span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center justify-center w-max mx-auto gap-1.5 ${getUserStatusStyle(row.status)}`}>{row.status}</span></td>
                              <td className="py-4 px-6 text-sm flex justify-center gap-5 mt-4">
                                <button onClick={() => openModal('view', row)} className="text-gray-400 hover:text-[#f37021] transition"><i className="fas fa-eye text-lg"></i></button>
                                <button onClick={() => openModal('edit', row)} className="text-gray-400 hover:text-blue-500 transition"><i className="fas fa-pen text-lg"></i></button>
                                <button onClick={() => openModal('delete', row)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash text-lg"></i></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>

                {/* الترقيم */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-end">
                  <div className="flex items-center gap-2" dir="ltr">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"><i className="fas fa-chevron-left text-xs text-gray-400"></i></button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f37021] text-white text-sm font-bold shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"><i className="fas fa-chevron-right text-xs text-gray-400"></i></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= صفحة الطلبات ======================= */}
          {activeSidebarPage === 'orders' && (
             <div className="animate-fade-in-up">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">سجل الطلبات والمعاملات</h2>
                    <p className="text-gray-500">من هنا يمكنك متابعة جميع عمليات الشراء والفحوصات الطبية داخل النظام.</p>
                  </div>
                  <button onClick={() => openModal('add')} className="bg-[#f37021] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition flex items-center gap-2">
                    <i className="fas fa-plus"></i> إنشاء طلب جديد
                  </button>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                    <h3 className="text-xl font-bold text-gray-800">قائمة الطلبات</h3>
                    <div className="flex items-center gap-3">
                      <div className="relative" ref={filterRef}>
                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`w-10 h-10 flex items-center justify-center border rounded-lg transition ${isFilterOpen ? 'bg-[#f37021] text-white border-[#f37021]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                          <i className="fas fa-filter"></i>
                        </button>
                        {isFilterOpen && (
                          <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-20">
                            <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase border-b border-gray-50 mb-1">تصفية حسب:</p>
                            <button onClick={() => {setFilterStatus('الكل'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'الكل' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>الكل</button>
                            <button onClick={() => {setFilterStatus('مكتمل'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'مكتمل' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>مكتمل</button>
                            <button onClick={() => {setFilterStatus('قيد المراجعة'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'قيد المراجعة' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>قيد المراجعة</button>
                            <button onClick={() => {setFilterStatus('ملغى'); setIsFilterOpen(false);}} className={`w-full text-start px-4 py-2 text-sm hover:bg-orange-50 transition ${filterStatus === 'ملغى' ? 'text-[#f37021] font-bold' : 'text-gray-600'}`}>ملغى</button>
                          </div>
                        )}
                      </div>
                      <button onClick={handleDownloadCSV} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-green-600 transition" title="تصدير كـ CSV">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>

                  <table className="w-full text-right">
                    <thead className="bg-gray-50/50 text-gray-500 text-sm font-semibold border-b border-gray-100">
                      <tr>
                        <th className="py-5 px-6">رقم الطلب</th>
                        <th className="py-5 px-6">الخيل المربوط</th>
                        <th className="py-5 px-6 text-center">نوع الطلب</th>
                        <th className="py-5 px-6 text-center">المبلغ الإجمالي</th>
                        <th className="py-5 px-6 text-center">التاريخ</th>
                        <th className="py-5 px-6 text-center">حالة الطلب</th>
                        <th className="py-5 px-6 text-center">الخيارات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {processedData.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                          <td className="py-5 px-6 text-sm font-bold text-gray-700">{order.id}</td>
                          <td className="py-5 px-6 text-sm font-bold text-gray-800">{order.horse}</td>
                          <td className="py-5 px-6 text-sm text-center">
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100">{order.type}</span>
                          </td>
                          <td className="py-5 px-6 text-sm font-bold text-gray-800 text-center" dir="ltr">{order.amount}</td>
                          <td className="py-5 px-6 text-sm text-gray-500 font-medium text-center">{order.date}</td>
                          <td className="py-5 px-6 text-sm text-center">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getOrderStatusStyle(order.status)}`}>{order.status}</span>
                          </td>
                          <td className="py-5 px-6 text-sm flex justify-center gap-4 mt-2">
                            <button onClick={() => openModal('view', order)} className="text-gray-400 hover:text-[#f37021] transition"><i className="fas fa-eye text-lg"></i></button>
                            <button onClick={() => openModal('edit', order)} className="text-gray-400 hover:text-blue-500 transition"><i className="fas fa-pen text-lg"></i></button>
                            <button onClick={() => openModal('delete', order)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash text-lg"></i></button>
                          </td>
                        </tr>
                      ))}
                      {processedData.length === 0 && (
                        <tr><td colSpan="7" className="p-10 text-center text-gray-400 font-medium"><i className="fas fa-search text-3xl mb-3 block"></i> لا توجد طلبات مطابقة للبحث</td></tr>
                      )}
                    </tbody>
                  </table>
                  <div className="p-4 border-t border-gray-100 flex items-center justify-end">
                    <div className="flex items-center gap-2" dir="ltr">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"><i className="fas fa-chevron-left text-xs text-gray-400"></i></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#f37021] text-white text-sm font-bold shadow-sm">1</button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"><i className="fas fa-chevron-right text-xs text-gray-400"></i></button>
                    </div>
                  </div>
                </div>
             </div>
          )}

          {/* ======================= صفحة الخيول (جديدة) ======================= */}
          {activeSidebarPage === 'horses' && (
            <div className="animate-fade-in-up">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">إدارة الخيول وسجلاتها</h2>
                  <p className="text-gray-500">متابعة كافة بيانات الخيول، الملاك، والحالة العامة لكل خيل.</p>
                </div>
                <button onClick={() => openModal('add')} className="bg-[#f37021] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition flex items-center gap-2">
                  <i className="fas fa-plus"></i> إضافة خيل جديد
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                  <h3 className="text-xl font-bold text-gray-800">قائمة الخيول</h3>
                  <button onClick={handleDownloadCSV} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-green-600 transition" title="تصدير كـ CSV">
                    <i className="fas fa-download"></i>
                  </button>
                </div>

                <table className="w-full text-right">
                  <thead className="bg-gray-50/50 text-gray-500 text-sm font-semibold border-b border-gray-100">
                    <tr>
                      <th className="py-5 px-6">الرقم</th>
                      <th className="py-5 px-6">الخيل</th>
                      <th className="py-5 px-6">السلالة</th>
                      <th className="py-5 px-6 text-center">العمر واللون</th>
                      <th className="py-5 px-6">المالك الحالي</th>
                      <th className="py-5 px-6 text-center">الحالة</th>
                      <th className="py-5 px-6 text-center">الخيارات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {processedData.map((horse) => (
                      <tr key={horse.id} className="hover:bg-gray-50 transition">
                        <td className="py-5 px-6 text-sm font-bold text-gray-700">{horse.id}</td>
                        <td className="py-5 px-6 text-sm">
                          <div className="flex items-center gap-3">
                            <img src={horse.image} alt="Horse" className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100" />
                            <span className="font-bold text-gray-800">{horse.name}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-sm font-medium text-gray-600">{horse.breed}</td>
                        <td className="py-5 px-6 text-sm text-center text-gray-500">{horse.age} • {horse.color}</td>
                        <td className="py-5 px-6 text-sm font-bold text-gray-700">{horse.owner}</td>
                        <td className="py-5 px-6 text-sm text-center">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getOrderStatusStyle(horse.status)}`}>{horse.status}</span>
                        </td>
                        <td className="py-5 px-6 text-sm flex justify-center gap-4 mt-3">
                          <button onClick={() => openModal('view', horse)} className="text-gray-400 hover:text-[#f37021] transition"><i className="fas fa-eye text-lg"></i></button>
                          <button onClick={() => openModal('edit', horse)} className="text-gray-400 hover:text-blue-500 transition"><i className="fas fa-pen text-lg"></i></button>
                          <button onClick={() => openModal('delete', horse)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash text-lg"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================= صفحة السجلات الطبية (جديدة) ======================= */}
          {activeSidebarPage === 'medical' && (
            <div className="animate-fade-in-up">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">الرعاية والسجلات الطبية</h2>
                  <p className="text-gray-500">سجل كامل بجميع الفحوصات والإجراءات الطبية المطبقة على الخيول.</p>
                </div>
                <button onClick={() => openModal('add')} className="bg-[#f37021] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition flex items-center gap-2">
                  <i className="fas fa-notes-medical"></i> إضافة سجل طبي
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                  <h3 className="text-xl font-bold text-gray-800">قائمة السجلات</h3>
                  <button onClick={handleDownloadCSV} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-green-600 transition" title="تصدير كـ CSV">
                    <i className="fas fa-download"></i>
                  </button>
                </div>

                <table className="w-full text-right">
                  <thead className="bg-gray-50/50 text-gray-500 text-sm font-semibold border-b border-gray-100">
                    <tr>
                      <th className="py-5 px-6">رقم السجل</th>
                      <th className="py-5 px-6">اسم الخيل</th>
                      <th className="py-5 px-6">الطبيب المعالج</th>
                      <th className="py-5 px-6 text-center">التاريخ</th>
                      <th className="py-5 px-6">التشخيص / الإجراء</th>
                      <th className="py-5 px-6 text-center">حالة السجل</th>
                      <th className="py-5 px-6 text-center">الخيارات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {processedData.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition">
                        <td className="py-5 px-6 text-sm font-bold text-gray-700">{record.id}</td>
                        <td className="py-5 px-6 text-sm font-bold text-gray-800">{record.horseName}</td>
                        <td className="py-5 px-6 text-sm font-medium text-gray-600"><i className="fas fa-user-md ml-2 text-gray-400"></i>{record.vetName}</td>
                        <td className="py-5 px-6 text-sm text-center text-gray-500" dir="ltr">{record.date}</td>
                        <td className="py-5 px-6 text-sm text-gray-600"><span className="block font-bold text-gray-800 mb-1">{record.type}</span><span className="text-xs">{record.diagnosis}</span></td>
                        <td className="py-5 px-6 text-sm text-center">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getOrderStatusStyle(record.status)}`}>{record.status}</span>
                        </td>
                        <td className="py-5 px-6 text-sm flex justify-center gap-4 mt-3">
                          <button onClick={() => openModal('view', record)} className="text-gray-400 hover:text-[#f37021] transition"><i className="fas fa-eye text-lg"></i></button>
                          <button onClick={() => openModal('edit', record)} className="text-gray-400 hover:text-blue-500 transition"><i className="fas fa-pen text-lg"></i></button>
                          <button onClick={() => openModal('delete', record)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash text-lg"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================= صفحة الإعدادات (جديدة) ======================= */}
          {activeSidebarPage === 'settings' && (
            <div className="animate-fade-in-up max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 bg-orange-50 text-[#f37021] rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i className="fas fa-cogs"></i></div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">إعدادات النظام</h2>
                    <p className="text-gray-500 text-sm mt-1">إدارة تفاصيل الحساب، الإشعارات، والأمان.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* إعدادات الملف الشخصي */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><i className="fas fa-user-circle text-gray-400"></i> معلومات الحساب</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label><input type="text" defaultValue="أفنان احمد" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50" /></div>
                      <div><label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label><input type="email" defaultValue="admin@horse-system.com" dir="ltr" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-left" /></div>
                    </div>
                  </div>

                  {/* إعدادات النظام والإشعارات */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><i className="fas fa-bell text-gray-400"></i> تفضيلات النظام</h3>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div><h4 className="font-bold text-sm text-gray-800">تلقي إشعارات البريد</h4><p className="text-xs text-gray-500 mt-1">إرسال ملخص يومي بالطلبات الجديدة وحالة الخيول.</p></div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f37021]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div><h4 className="font-bold text-sm text-gray-800">تفعيل الوضع الداكن (قريباً)</h4><p className="text-xs text-gray-500 mt-1">تغيير ألوان الواجهة إلى الألوان الداكنة لإراحة العين.</p></div>
                        <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                          <input type="checkbox" value="" className="sr-only peer" disabled />
                          <div className="w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* حفظ */}
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button className="bg-[#f37021] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition">حفظ التغييرات</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* الفوتر */}
          <footer className="mt-8 flex justify-between text-sm text-gray-400 font-medium pb-4">
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-600 transition underline">سياسة الخصوصية</a>
              <a href="#" className="hover:text-gray-600 transition underline">الدعم الفني</a>
            </div>
            <p>© ٢٠٢٣ نظام إدارة الخيول. جميع الحقوق محفوظة.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}