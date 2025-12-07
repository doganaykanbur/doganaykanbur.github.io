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
        summary: "FakeAVCeleb testlerinde 0.996 AUC skoru elde eden; ses, görüntü ve video analizini birleştiren multimodal yapay zeka sistemi.",
        description: "Deepfake tespitindeki başarıyı artırmak için tek bir modalite yerine üç farklı kanalı (ses, görüntü, video) aynı anda analiz eden bir mimari tasarladım. Python ve PyTorch kullanarak geliştirdiğim bu sistemde, ses için AASIST, görüntü için EfficientNet-B4 ve zamansal tutarlılık için Video Transformer modellerini entegre ettim.\n\nFarklı modellerden gelen çıktıları ağırlıklı oylama ile birleştirerek yanlış pozitif oranını minimize ettim. Geliştirdiğim bu pipeline, canlı akışlarda da çalışabilmesi için optimize edildi ve testlerde 0.996 AUC gibi yüksek bir doğruluk oranına ulaştı.",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "EfficientNet-B4", "AASIST", "Albumentations", "Ensemble Learning", "Multimodal Fusion"],
        imageUrl: "/assets/projects/deepfake_detector.png",
        githubUrl: "https://github.com/doganaykanbur/multimodal-deepfake-detector",
        features: [
            "FakeAVCeleb veri setinde 0.996 AUC skoru elde edildi.",
            "Ses, kaynak görüntü ve video akışını birleştiren multimodal yapı.",
            "Celeb-DF ve DFDC dahil 10'dan fazla veri setinde doğrulama.",
            "Sentetik ses manipülasyonlarına karşı yüksek hassasiyet.",
            "Canlı sistemler için düşük gecikmeli mimari.",
            "Güven skorlarını birleştiren ensemble mekanizması."
        ]
    },
    {
        id: 2,
        title: "Çaykur Pazarlama Şubesi Yönetim Sistemi",
        summary: "Kurumsal süreçlerin yönetimini ve raporlanmasını sağlayan, modüler yapıda geliştirilmiş WPF masaüstü uygulaması.",
        description: "Çaykur'un pazarlama operasyonlarını dijitalleştirmek için .NET 8 ve WPF kullanarak kapsamlı bir yönetim paneli geliştirdim. Uygulamanın sürdürülebilir olması için MVVM mimarisini kurdum; böylece arayüz tasarımı ile iş mantığını birbirinden tamamen ayırdım.\n\nÖzellikle raporlama modülüne odaklanarak, kullanıcıların sistemdeki verileri tek tıkla PDF veya Excel formatında alabilmesini sağladım. Veri altyapısı olarak SQLite kullanarak, internet bağımlılığı olmayan hızlı ve güvenilir bir yerel depolama çözümü sundum.",
        technologies: ["C#", "WPF", "XAML", "SQLite", "iTextSharp", "PdfiumViewer", "ClosedXML", ".NET 8", "MVVM"],
        imageUrl: "/assets/projects/caykur_management.png",
        githubUrl: "https://github.com/doganaykanbur/CaykurPazarlama",
        features: [
            "MVVM deseni ile temiz ve yönetilebilir kod yapısı.",
            "Departmanlara özel ayrıştırılmış veri modülleri.",
            "Entegre PDF ve Excel raporlama araçları.",
            "Modern ve kullanıcı dostu arayüz tasarımı.",
            "Otomatik yedekleme ve veri dışa aktarma."
        ]
    },
    {
        id: 3,
        title: "Soil Moisture Smart Monitoring & Voice Control System",
        summary: "ESP32 ve LLM kullanarak geliştirdiğim, sesli komutlarla yönetilebilen akıllı tarım asistanı.",
        description: "Tarımsal veri takibini daha etkileşimli hale getirmek amacıyla ESP32 tabanlı bir IoT sistemi prototipledim. Standart nem takibinin ötesine geçerek, sisteme Speech-to-Text ve Text-to-Speech yetenekleri ekledim.\n\nKullanıcıların 'Sulama durumunu raporla' gibi sesli komutlarına anlamlı yanıtlar verebilmek için bir diyalog modeli entegrasyonu gerçekleştirdim. Böylece tarladaki sensör verilerini, kullanıcıyla konuşabilen akıllı bir asistana dönüştürdüm.",
        technologies: ["ESP32", "C++", "Python", "MQTT", "Speech-to-Text", "LLM Chatbot"],
        imageUrl: "/assets/projects/soil_moisture.png",
        githubUrl: "https://github.com/doganaykanbur/SoilMoistureMonitoring",
        features: [
            "Sensör verilerinin anlık takibi ve analizi.",
            "Sesli komut algılama ve sesli yanıt verme.",
            "LLM entegrasyonu ile doğal dil işleme.",
            "MQTT protokolü ile güvenilir veri iletişimi."
        ]
    },
    {
        id: 4,
        title: "Movie Recommendation System",
        summary: "Kullanıcı tercihlerini öğrenerek kişiselleştirilmiş film önerileri sunan ML.NET ve Python tabanlı sistem.",
        description: "Kullanıcıların izleme alışkanlıklarına göre öneri sunan ölçeklenebilir bir backend sistemi tasarladım. Öneri algoritmasının başarısını artırmak için ML.NET'in hızını ve Python kütüphanelerinin esnekliğini hibrit bir yapıda birleştirdim.\n\nVeri tabanı olarak Oracle kullanarak büyük veri yüklerinde bile performanslı çalışmasını sağladım. Sistemi API-First yaklaşımıyla geliştirerek, ileride mobil veya web arayüzlerine kolayca entegre edilebilecek hazır bir servis haline getirdim.",
        technologies: ["C#", "ASP.NET Core", "ML.NET", "Python", "Oracle DB", "Entity Framework Core"],
        imageUrl: "/assets/projects/movie_recommendation.png",
        githubUrl: "https://github.com/doganaykanbur/MovieRecommendationSystem",
        features: [
            "Kullanıcı davranış analizi yapan hibrit öneri motoru.",
            "Oracle veritabanı ile yüksek performanslı veri yönetimi.",
            "Python ve .NET ekosistemlerinin entegrasyonu.",
            "Mobil uyumlu, modüler API mimarisi."
        ]
    },
    {
        id: 5,
        title: "Cipher Quiz",
        summary: "SignalR ile geliştirdiğim, katılımcıların gerçek zamanlı olarak yarıştığı kriptografi eğitim platformu.",
        description: "Kriptografi konularını oyunlaştırarak öğretmek amacıyla interaktif bir web platformu kurdum. Katılımcıların aynı anda soruları görüp yanıtlayabilmesi için SignalR kullanarak gerçek zamanlı (real-time) bir iletişim altyapısı kodladım.\n\nYarışma güvenliğini sağlamak adına sekme değiştirme veya kopyalama işlemlerini tespit eden loglama mekanizmaları ekledim. Ayrıca SQLite kullanarak, olası sunucu kesintilerinde bile yarışma durumunun ve skorların kaybolmamasını garanti altına aldım.",
        technologies: ["C#", ".NET 9", "Blazor WebAssembly", "SignalR", "SQLite", "QuestPDF", "ClosedXML"],
        imageUrl: "/assets/projects/cipher_quiz.png",
        githubUrl: "https://github.com/doganaykanbur/OnlineCipherQuiz",
        features: [
            "SignalR ile gecikmesiz çok oyunculu deneyim.",
            "Yönetici paneli üzerinden canlı yarışma yönetimi.",
            "Kopya girişimlerini tespit eden güvenlik modülleri.",
            "Detaylı sonuç raporlama ve dışa aktarma.",
            "Dayanıklı veri saklama mimarisi."
        ]
    },
    {
        id: 6,
        title: "Türk Plaka Tanıma Sistemi",
        summary: "Türk plaka standartlarına (TR) özel olarak eğittiğim, araç özelliklerini de analiz eden görüntü işleme projesi.",
        description: "Genel modellerin yerel plakalardaki başarısızlığını çözmek için, doğrudan Türk plaka fontları ve formatlarıyla özelleştirilmiş bir model eğittim. Görüntü işleme adımında OpenCV, derin öğrenme modelinde ise TensorFlow/Keras kullandım.\n\nSistemi hem kayıtlı videolarda hem de canlı kamera akışında çalışacak şekilde optimize ettim. Sadece plakayı okumakla kalmayıp, görüntüden aracın tahmini yılını ve modelini de çıkarabilen ek bir sınıflandırma katmanı geliştirdim.",
        technologies: ["Python", "OpenCV", "TensorFlow", "Keras", "NumPy", "Pandas"],
        imageUrl: "/assets/projects/plate_recognition.png",
        githubUrl: "https://github.com/doganaykanbur/TurkishPlateRecognition",
        features: [
            "Yerel plaka formatları için özelleştirilmiş model.",
            "Canlı akışta yüksek başarımlı plaka tespiti.",
            "Araç yılı ve modeli sınıflandırma yeteneği.",
            "Optik Karakter Tanıma (OCR) entegrasyonu."
        ]
    },
    {
        id: 7,
        title: "Kitap Takas Platformu",
        summary: "Veritabanı yerine dosya sistemi kullanarak geliştirdiğim, nesne serileştirme tabanlı Java uygulaması.",
        description: "Veri yönetimi mantığını temelden kavramak için, harici bir veritabanı kullanmadan çalışan sağlam bir takas platformu tasarladım. Java'nın dosya işleme yeteneklerini ve nesne serileştirme (Object Serialization) mekanizmasını kullanarak kendi veritabanı yapımı simüle ettim.\n\nKullanıcıların kitaplarını listeleyip takas teklifleşebildiği bu sistemde, veri tutarlılığını binary dosyalar üzerinden sağladım. Bu sayede SQL sunucusu gerektirmeyen, taşınabilir ve bağımsız bir uygulama ortaya çıkardım.",
        technologies: ["Java SE", "Maven", "Eclipse IDE", "File Handling", "Object Serialization", "OOP"],
        imageUrl: "/assets/projects/book_exchange.png",
        githubUrl: "https://github.com/doganaykanbur/cen207-final-melih-divan-java",
        features: [
            "Binary dosya tabanlı özel veri yönetim katmanı.",
            "Kullanıcı oturum ve güvenlik kontrolleri.",
            "Kitap envanter ve arama fonksiyonları.",
            "Takas süreci ve durum yönetimi.",
            "Kullanıcı puanlama ve geri bildirim sistemi."
        ]
    },
    {
        id: 8,
        title: "Recipe Cost Calculator",
        summary: "Mutfak maliyetlerini dinamik olarak hesaplayan ve bütçe takibi sağlayan Java masaüstü aracı.",
        description: "Reçete maliyetlerinin anlık takibini kolaylaştırmak için Java Swing ile kullanıcı dostu bir arayüz geliştirdim. Arka planda kurduğum algoritma sayesinde, ana malzeme fiyatı değiştiğinde ilişkili tüm tariflerin maliyetini otomatik olarak güncelleyen bir yapı oluşturdum.\n\nKullanıcıların bütçelerine uygun menüler planlamasına yardımcı olan bu araçta, tüm verileri yerel dosya sisteminde güvenli bir şekilde saklayarak internet bağımsız bir kullanım sağladım.",
        technologies: ["Java SE", "Maven", "Eclipse IDE", "Java Swing/JavaFX", "File I/O", "OOP"],
        imageUrl: "/assets/projects/recipe_calculator.png",
        githubUrl: "https://github.com/doganaykanbur/ce204-final-project-eray-turan-doganay-kanbur-java",
        features: [
            "Fiyat değişimlerine duyarlı dinamik hesaplama.",
            "Porsiyon ve toplam maliyet analizi.",
            "Bütçe hedefli tarif planlama araçları.",
            "Anlaşılır ve sade grafiksel arayüz.",
            "Yerel veri saklama ile hızlı erişim."
        ]
    }
];

export const skills = {
    languages: {
        items: ["Java", "C#", "Python", "JavaScript", "TypeScript", "SQL", "C++"],
        context: "Projelerimin temel mantığını ve algoritmalarını kurgularken kullandığım ana programlama dilleri."
    },
    frontend: {
        items: ["React", "Blazor", "WPF", "JavaFX", "HTML5/CSS3"],
        context: "Kullanıcı etkileşimini en üst düzeye çıkaran, görsel olarak zengin arayüzler tasarladığım teknolojiler."
    },
    backend: {
        items: ["ASP.NET Core", "Node.js", "Flask", "Entity Framework", "Oracle DB"],
        context: "Veri akışını yöneten, güvenli ve ölçeklenebilir sunucu mimarilerini inşa ettiğim araçlar."
    },
    tools: {
        items: ["Git", "Docker", "Postman", "Visual Studio", "Maven"],
        context: "Kod kalitesini ve geliştirme hızını artıran, test ve dağıtım süreçlerimde vazgeçilmez yardımcılarım."
    },
    ai_ml: {
        items: ["PyTorch", "OpenCV", "ML.NET", "Pandas", "NumPy"],
        context: "Veriden anlam çıkarmak ve akıllı sistemler eğitmek için başvurduğum yapay zeka kütüphaneleri."
    },
    embedded: {
        items: ["ESP32", "C/C++ Embedded", "IoT Sensors", "MQTT"],
        context: "Yazılımın fiziksel dünyayla iletişim kurmasını sağlayan donanım ve protokoller."
    }
};

export const about = {
    paragraph1: "Merhaba! Ben Doğanay Kanbur. Teknolojiyle problem çözmeyi bir tutku haline getirmiş bir yazılımcıyım. Kariyerim boyunca sadece kod yazmaya değil, bir fikri analiz edip onu çalışan, işlevsel bir ürüne dönüştürme sürecine odaklandım.",
    paragraph2: "Yoğunlukla C#, Python ve Java ekosistemlerinde üretim yapıyorum. Ancak beni asıl motive eden, bu araçları kullanarak gerçek hayata dokunan çözümler üretmek; ister bir yapay zeka modelini entegre etmek olsun, ister karmaşık bir veri akışını optimize etmek. Sürekli öğrenme prensibiyle, her yeni projede teknik sınırlarımı biraz daha genişletmeyi hedefliyorum."
};
