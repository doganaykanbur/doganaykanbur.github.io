export interface Project {
    id: number;
    title: string;
    summary: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    features: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Multimodal DeepFake Tespit Sistemi",
        summary: "Ses, görüntü ve video kanallarını birleştirerek 0.996 AUC doğruluk ile test edildi.",
        description: "Bu proje, üç özel derin öğrenme modelini entegre eden ileri düzey bir deepfake tespit pipeline'ı uygular: AASIST ile ses sahteciliği tespiti, EfficientNet-B4 ile kare bazlı görüntü analizleri ve ince ayarlı Video Transformer ile zamansal tutarsızlıkların analizi. Zorlu FakeAVCeleb ve Celeb-DF veri setlerinde doğrulanan sistem, ensemble oylama mekanizması ile endüstri standartlarında yüksek doğruluk sağlar ve en sofistike yapay zeka kaynaklı manipülasyonları bile gerçek zamanlı olarak tespit eder.",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "EfficientNet-B4", "AASIST", "Albumentations", "Ensemble Öğrenme", "Multimodal Birleştirme"],
        imageUrl: "/assets/projects/deepfake_detector.png",
        githubUrl: "https://github.com/doganaykanbur/multimodal-deepfake-detector",
        features: [
            "FakeAVCeleb test setinde %99,6 AUC ve %98,8 doğruluk sağlandı.",
            "Ses (spektral analiz), Görüntü (mekânsal bozulmalar) ve Video (zamansal tutarlılık) kombinasyonu ile güçlü tespit.",
            "Celeb-DF v2, DFDC, FaceForensics++, FakeAVCeleb v1.2, OpenForensics, ASVspoof2019 ve daha fazlası dahil 10+ veri setinde eğitim ve doğrulama.",
            "AASIST mimarisi ile sentetik konuşmalar 0,94 AUC ile tespit ediliyor.",
            "Canlı medya akışlarını alt-saniye gecikme ile işleyebilen optimize pipeline.",
            "Üç modaliteden gelen güven skorlarını birleştirerek yanlış pozitifleri azaltır."
        ]
    },
    {
        id: 2,
        title: "Çaykur Pazarlama Şubesi Yönetim Sistemi",
        summary: "WPF ile geliştirilen modüler bir masaüstü uygulama; kurumsal süreçleri merkezi panelden yönetir.",
        description: "Bu proje .NET 8 ile geliştirilmiş, WPF tabanlı bir masaüstü uygulamasıdır. MVVM mimarisi ile tasarlanmış olup, farklı modülleri ayrı ViewModel ve View dosyaları üzerinden yönetir. SQLite tabanlı veritabanlarıyla veri bütünlüğü sağlanır ve iTextSharp, PdfiumViewer, ClosedXML gibi kütüphanelerle raporlama ve doküman çıktıları alınabilir.",
        technologies: ["C#", "WPF", "XAML", "SQLite", "iTextSharp", "PdfiumViewer", "ClosedXML", ".NET 8", "MVVM"],
        imageUrl: "/assets/projects/caykur_management.png",
        githubUrl: "https://github.com/doganaykanbur/CaykurPazarlama",
        features: [
            "MVVM tabanlı modüler yapı",
            "Farklı modüller için ayrı veri yönetimi",
            "PDF ve Excel raporlama",
            "Modern dashboard ve yan menü tasarımı",
            "Veritabanı yedekleme ve dışa aktarma"
        ]
    },
    {
        id: 3,
        title: "Soil Moisture Smart Monitoring & Voice Control System",
        summary: "ESP32 tabanlı IoT sisteminde LLM entegrasyonu ile sesli komutlar işleniyor.",
        description: "ESP32 tabanlı toprak nemi ölçüm sistemi geliştirdim ve projeye Speech-to-Text ile sesli komut alma, Text-to-Speech ile hoparlörden geri bildirim sağlama özellikleri ekledim. Kullanıcı 'Pump on' gibi komutlar verdiğinde sistem anında işliyor ve bir LLM tabanlı chatbot modeli ile etkileşimli yanıt üretiyor. Bu proje, tarım alanlarında veri odaklı ve kullanıcı dostu otomasyon sunuyor.",
        technologies: ["ESP32", "C++", "Python", "MQTT", "Speech-to-Text", "LLM Chatbot"],
        imageUrl: "/assets/projects/soil_moisture.png",
        githubUrl: "https://github.com/doganaykanbur/SoilMoistureMonitoring",
        features: [
            "Gerçek zamanlı toprak nemi ölçümü",
            "Sesli komut ile kontrol: Speech-to-Text ve Text-to-Speech",
            "LLM tabanlı chatbot ile etkileşimli yanıt sistemi",
            "MQTT ile veri iletimi ve Python dashboard"
        ]
    },
    {
        id: 4,
        title: "MovieRecommendationSystem",
        summary: "ML.NET ve Python kullanarak kullanıcı davranışlarını analiz eden ve öneri sağlayan sistem.",
        description: "ASP.NET Core Web API tabanlı bu sistem, kullanıcı tercihlerini analiz ederek hem filmler hem de diziler için öneriler sunar. Oracle veritabanı ile veri yönetimi sağlanırken, ML.NET ve Python entegrasyonu ile öneri motoru modern ve ölçeklenebilir bir yapı sunar. API-First yaklaşımı sayesinde ileride mobil uygulamalara sorunsuz entegrasyon sağlanabilir.",
        technologies: ["C#", "ASP.NET Core", "ML.NET", "Python", "Oracle DB", "Entity Framework Core"],
        imageUrl: "https://images.unsplash.com/photo-1581090700227-5f1b1e9f7f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VlfHx8fHx8fHwxNjYwMTQ4NzQ5&ixlib=rb-1.2.1&q=80&w=1080",
        githubUrl: "https://github.com/doganaykanbur/MovieRecommendationSystem",
        features: [
            "Kullanıcı tercihlerine dayalı akıllı öneri motoru",
            "Oracle veritabanı ile yüksek performanslı veri yönetimi",
            "Python veya ML.NET tabanlı öneri algoritmaları",
            "API-First mimari ile mobil entegrasyon hazırlığı"
        ]
    },
    {
        id: 5,
        title: "Cipher Quiz",
        summary: "SignalR ile gerçek zamanlı veri akışı ve kullanıcı etkileşimi sağlayan kriptografi quiz platformu.",
        description: "Bu proje, öğrencilerin veya kullanıcıların gerçek zamanlı olarak kriptografi sorularını çözebileceği bir quiz platformudur. SignalR ile odalar üzerinden anlık iletişim sağlanır ve admin paneli üzerinden oda yönetimi, kullanıcı kontrolü ve canlı skor takibi yapılabilir. SQLite kullanımı ile veri bütünlüğü korunur ve sistem çökse bile kullanıcı verileri güvenle saklanır.",
        technologies: ["C#", ".NET 9", "Blazor WebAssembly", "SignalR", "SQLite", "QuestPDF", "ClosedXML"],
        imageUrl: "https://images.unsplash.com/photo-1581091215360-450b616bce3d?q=80&w=1470&auto=format&fit=crop",
        githubUrl: "https://github.com/doganaykanbur/CipherQuiz",
        features: [
            "Gerçek zamanlı oda tabanlı quiz iletişimi (SignalR)",
            "Admin paneli ile oda yönetimi, kullanıcı kontrolü ve canlı skor takibi",
            "Sekme değişimi ve kopyalama-yapıştırma takibi ile proctor loglama",
            "Quiz sonuçlarının PDF/Excel formatında dışa aktarımı",
            "SQLite ile veri bütünlüğü ve güvenli saklama"
        ]
    },
    {
        id: 6,
        title: "Türk Plaka Tanıma Sistemi",
        summary: "OpenCV ve TensorFlow kullanılarak video ve canlı akış üzerinden plaka tanıma.",
        description: "Bu proje, Türk plakalarına özel olarak geliştirilmiş bir bilgisayarla görme (Computer Vision) uygulamasıdır. Python, OpenCV ve TensorFlow kullanılarak tasarlanmış olup, plaka tespiti, karakter segmentasyonu ve optik karakter tanıma (OCR) adımlarını içerir. Model hem video/görüntü dosyaları hem de canlı kamera akışı üzerinden test edilebilir ve araçların plakalarını doğru şekilde tanıyabilir. Ek olarak, plaka üzerindeki yıl ve model bilgilerini sınıflandırma yeteneğine sahiptir.",
        technologies: ["Python", "OpenCV", "TensorFlow", "Keras", "NumPy", "Pandas"],
        imageUrl: "https://images.unsplash.com/photo-1590184774647-0c1b8f1b8f23?q=80&w=1470&auto=format&fit=crop",
        githubUrl: "https://github.com/doganaykanbur/TurkishPlateRecognition",
        features: [
            "Gerçek zamanlı plaka tespiti ve karakter okuma",
            "Türk plakalarına özel model eğitimi",
            "Yıl ve model sınıflandırması",
            "Video dosyaları ve canlı kamera ile test edilebilir"
        ]
    },
    {
        id: 7,
        title: "Kitap Takas Platformu",
        summary: "Java ile geliştirilmiş, dosya tabanlı ve nesne serileştirme kullanılarak veri tutarlılığı sağlanan kitap takas platformu.",
        description: "Java SE ve Maven kullanılarak geliştirilen bu konsol tabanlı platform, kitap severlerin kişisel envanterlerini yönetmelerine, başlık, yazar veya türe göre kitap aramalarına ve takas isteği göndermelerine imkân tanır. Sistem, istek durumlarını (Beklemede, Kabul, Red) yönetir ve takas sonrası kullanıcıların birbirini puanlamasını sağlar. Verilerin kalıcılığı, binary dosya yönetimi ve nesne serileştirme (Object Serialization) ile sağlanarak herhangi bir harici veritabanına ihtiyaç duyulmaz.",
        technologies: ["Java SE", "Maven", "Eclipse IDE", "Binary Dosya Yönetimi", "Object Serialization", "OOP", "Modüler Tasarım"],
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1470&auto=format&fit=crop",
        githubUrl: "https://github.com/doganaykanbur/BookExchangePlatform",
        features: [
            "Kullanıcılar, kitaplar ve işlem geçmişi için binary dosya tabanlı kalıcı veri yönetimi",
            "Kullanıcı kimlik doğrulama ve oturum yönetimi",
            "Kitap envanteri ekleme, silme ve güncelleme (CRUD) işlemleri",
            "Başlık, yazar ve türe göre arama yeteneği",
            "Takas isteklerinin Beklemede -> Kabul/Red akışı yönetimi",
            "Başarılı takas sonrası kullanıcı puanlama sistemi"
        ]
    },
    {
        id: 8,
        title: "Recipe Cost Calculator",
        summary: "Java Swing arayüzü ile dinamik maliyet hesaplama ve bütçe takibi.",
        description: "Bu GUI tabanlı Java uygulaması, kullanıcıların malzemelerini kaydetmelerine, fiyatlarını takip etmelerine ve tarif maliyetlerini hesaplamalarına olanak tanır. Kullanıcılar, malzeme fiyat değişikliklerine göre tarif maliyetlerini güncelleyebilir ve belirli bir bütçe dahilinde yemek planlaması yapabilir. Verilerin kalıcılığı Java dosya I/O (File Handling) ile sağlanarak kullanıcıya güvenli ve sürekli bir deneyim sunar.",
        technologies: ["Java SE", "Maven", "Eclipse IDE", "Java Swing/JavaFX", "File I/O", "OOP"],
        imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1470&auto=format&fit=crop",
        githubUrl: "https://github.com/doganaykanbur/RecipeCostCalculator",
        features: [
            "Malzeme ekleme, güncelleme ve fiyat yönetimi",
            "Tarif maliyeti hesaplama ve kişi başı maliyet görüntüleme",
            "Malzeme fiyat değişikliklerine göre tarif güncelleme",
            "Bütçe planlaması ile yemek ve tarif yönetimi",
            "GUI tabanlı kullanıcı dostu arayüz",
            "Opsiyonel kullanıcı hesapları ile kişiselleştirme"
        ]
    }
];

export const skills = {
    languages: ["Java", "C#", "Python", "JavaScript", "TypeScript", "SQL", "C++"],
    frontend: ["React", "Blazor", "WPF", "JavaFX", "HTML5/CSS3"],
    backend: ["ASP.NET Core", "Node.js", "Flask", "Entity Framework", "Oracle DB"],
    tools: ["Git", "Docker", "Postman", "Visual Studio", "Maven"],
    ai_ml: ["PyTorch", "OpenCV", "ML.NET", "Pandas", "NumPy"],
    embedded: ["ESP32", "C/C++ Embedded", "IoT Sensors", "MQTT"]
};

export const about = {
    paragraph1: "Merhaba! Ben Doğanay Kanbur. Projelerin tüm aşamalarında aktif olarak çalıştım. Staj ve proje süreçlerimde hem frontend hem de backend tarafında pratik deneyimler kazandım.",
    paragraph2: "Projelerimde ağırlıklı olarak C#, Python ve Java dillerini kullanıyorum. Modern web teknolojileri, masaüstü uygulamaları ve yapay zeka entegrasyonları üzerine çalışarak teknik yelpazemi genişletiyorum.",
    paragraph3: "Teorik bilgilerimi projelerde uygulayarak işlevsel çözümler geliştiriyorum. Yeni teknolojileri araştırmayı ve bunları projelerime entegre etmeyi bir alışkanlık haline getirdim."
};
