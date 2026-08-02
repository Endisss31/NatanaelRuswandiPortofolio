export const profileInfo = {
  name: "Natanael Ruswandi",
  title: "Junior Web Developer & Network Administrator",
  subtitles_id: ["Junior Web Developer", "Junior Network Administrator", "UI/UX & Mobile Developer"],
  subtitles_en: ["Junior Web Developer", "Junior Network Administrator", "UI/UX & Mobile Developer"],
  bio_id: "Nama saya Natanael Ruswandi. Saya memiliki minat dalam bidang teknologi, desain, dan pengembangan aplikasi, khususnya pada perancangan sistem, UI/UX, serta pembuatan aplikasi berbasis web maupun mobile. Saya senang mempelajari hal-hal baru yang berkaitan dengan teknologi dan berusaha mengembangkan kemampuan untuk menghasilkan karya yang bermanfaat serta sesuai dengan kebutuhan pengguna.",
  bio_en: "My name is Natanael Ruswandi. I have a passion for technology, design, and application development, specializing in system design, UI/UX, as well as web and mobile application development. I enjoy exploring new tech concepts and continuously developing my skills to deliver impactful, user-centered digital solutions.",
  mission_id: "Berdedikasi untuk merancang sistem dan antarmuka aplikasi yang intuitif, responsif, dan fungsional. Berpengalaman dalam pengelolaan jaringan komputer serta pembuatan aplikasi web modern.",
  mission_en: "Dedicated to designing intuitive, responsive, and functional systems and app interfaces. Experienced in computer network administration and modern web application development.",
  years_exp: "2+",
  projects_count: "10+",
  email: "natanaeldidi31@gmail.com",
  phone: "085158813112",
  whatsapp: "https://wa.me/6285158813112",
  location: "Kuningan / Bandung, Jawa Barat, Indonesia",
  address: "Jl. Moertahsiah Soepomo, No. 30 B, Link. Cipicung, Kuningan",
  github: "https://github.com/Endisss31",
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
  cvUrl: "/assets/cv.pdf",
  career_goals_id: "Mengembangkan karir di bidang Web Development, Network Engineering, dan UI/UX Design untuk menciptakan produk teknologi yang efisien dan berdampak positif bagi masyarakat.",
  career_goals_en: "Advancing my career in Web Development, Network Engineering, and UI/UX Design to create efficient tech products that make a positive impact.",
  
  education: [
    {
      degree: "S1 - Teknik Informatika",
      institution: "Universitas Kuningan",
      location: "Kab. Kuningan, Jawa Barat",
      period: "2022 - 2026",
      status: "Mahasiswa Aktif (Semester 3)",
      description: "Fokus pada perancangan sistem informasi, algoritma dasar, pengembangan web & mobile, serta rekayasa perangkat lunak."
    },
    {
      degree: "SMK - Teknik Komputer dan Jaringan (TKJ)",
      institution: "SMK Muhammadiyah 2 Kuningan",
      location: "Kab. Kuningan, Jawa Barat",
      period: "2019 - 2022",
      status: "Lulus",
      description: "Mempelajari pengkabelan, konfigurasi jaringan komputer, manajemen server, hardware engineering, dan troubleshooting perangkat aktif."
    }
  ]
};

export const mockSkills = [
  // Web & Software Development
  { id: "s1", name: "Web Development", category: "Web & Software", proficiency: 90 },
  { id: "s2", name: "React.js", category: "Web & Software", proficiency: 85 },
  { id: "s3", name: "HTML & CSS", category: "Web & Software", proficiency: 92 },
  { id: "s4", name: "Software Engineering", category: "Web & Software", proficiency: 85 },
  { id: "s5", name: "Databases & Data Management", category: "Web & Software", proficiency: 80 },

  // Mobile & UI/UX Design
  { id: "s6", name: "UI/UX Design", category: "Mobile & UI/UX", proficiency: 88 },
  { id: "s7", name: "Mobile UI Design", category: "Mobile & UI/UX", proficiency: 88 },
  { id: "s8", name: "Mobile Development", category: "Mobile & UI/UX", proficiency: 82 },
  { id: "s9", name: "Mobile Application Design", category: "Mobile & UI/UX", proficiency: 85 },

  // Networking & Hardware
  { id: "s10", name: "Router MikroTik Setup", category: "Networking & Hardware", proficiency: 88 },
  { id: "s11", name: "Fiber Optic Splicing", category: "Networking & Hardware", proficiency: 85 },
  { id: "s12", name: "WirelessLAN Installation", category: "Networking & Hardware", proficiency: 90 },
  { id: "s13", name: "Hardware Engineering", category: "Networking & Hardware", proficiency: 85 },
  { id: "s14", name: "Network Administration", category: "Networking & Hardware", proficiency: 88 },

  // AI & Data Science
  { id: "s15", name: "Artificial Intelligence (AI)", category: "AI & Data Science", proficiency: 80 },
  { id: "s16", name: "Machine Learning", category: "AI & Data Science", proficiency: 78 },
  { id: "s17", name: "Computer Vision", category: "AI & Data Science", proficiency: 75 },
  { id: "s18", name: "Data Science & Entry", category: "AI & Data Science", proficiency: 82 },

  // Soft Skills & Media
  { id: "s19", name: "Public Speaking & Presentations", category: "Soft Skills & Media", proficiency: 90 },
  { id: "s20", name: "Customer Relationship Management (CRM)", category: "Soft Skills & Media", proficiency: 85 },
  { id: "s21", name: "Photography & Video Editing", category: "Soft Skills & Media", proficiency: 85 },
  { id: "s22", name: "Marketing & Public Relations", category: "Soft Skills & Media", proficiency: 82 },
  { id: "s23", name: "Microsoft Office", category: "Soft Skills & Media", proficiency: 95 }
];

export const mockExperiences = [
  {
    id: "e1",
    role: "Teknisi",
    company: "PT. Citra Jelajah Informatika (CIFO)",
    location: "Kota Bandung, Jawa Barat, Indonesia",
    type: "Internship / Work Experience",
    start_date: "Januari 2021",
    end_date: "April 2021",
    description: "• Setup Router MikroTik & konfigurasi jaringan WiFi corporate.\n• Inventarisir dan perawatan perangkat aktif jaringan.\n• Instalasi infrastruktur WirelessLAN & maintenance customer corporate.\n• Penyambungan dan pemeliharaan kabel serat optik (Splicing Fiber Optic)."
  }
];

export const mockCertificates = [
  {
    id: "c1",
    title: "Junior Web Developer",
    issuer: "BNSP - Badan Nasional Sertifikasi Profesi",
    issuer_logo: "/assets/logos/bnsp.svg",
    date: "Oktober 2024",
    type: "Sertifikasi Profesi",
    credential_id: "BNSP-JWD-2024",
    pdf_url: "/assets/certificates/sertifikasi (4).pdf",
    image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80",
    description: "Sertifikasi kompetensi nasional BNSP dalam bidang pembuatan dan pengembangan aplikasi berbasis web standar industri."
  },
  {
    id: "c2",
    title: "Junior Network Administrator",
    issuer: "BNSP - Badan Nasional Sertifikasi Profesi",
    issuer_logo: "/assets/logos/bnsp.svg",
    date: "April 2024",
    type: "Sertifikasi Profesi",
    credential_id: "BNSP-JNA-2024",
    pdf_url: "/assets/certificates/sertifikasi (3).pdf",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
    description: "Sertifikasi kompetensi nasional BNSP dalam pengelolaan, perencanaan, dan pemeliharaan jaringan komputer."
  },
  {
    id: "c5",
    title: "HTML + CSS Specialist",
    issuer: "Certiport (ITS) - Pearson VUE",
    issuer_logo: "/assets/logos/certiport.svg",
    date: "Agustus 2025",
    type: "Sertifikasi Profesi",
    credential_id: "ITS-HTML-CSS-2025",
    pdf_url: "/assets/certificates/sertifikasi (2).pdf",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    description: "Sertifikasi spesialisasi standar industri internasional dari Certiport Pearson VUE dalam penyusunan struktur web semantic HTML5 dan CSS modern."
  },
  {
    id: "c3",
    title: "Hand Held Product (HPP)",
    issuer: "Samsung Tech Institute (STI)",
    issuer_logo: "/assets/logos/samsung.svg",
    date: "Januari 2019",
    type: "Sertifikasi Industri",
    credential_id: "STI-HPP-2019",
    pdf_url: "/assets/certificates/sertifikasi (5).pdf",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
    description: "Sertifikasi teknikal Samsung Tech Institute dalam penanganan hardware dan perbaikan sistem produk perangkat genggam."
  },
  {
    id: "c4",
    title: "Sertifikat Prakerin / PKL",
    issuer: "PT. Citra Jelajah Informatika (CIFO)",
    issuer_logo: "https://cdn.simpleicons.org/cisco",
    date: "April 2021",
    type: "Sertifikasi Industri",
    credential_id: "CIFO-PKL-2021",
    pdf_url: "/assets/certificates/pengalaman.pdf",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    description: "Sertifikat Praktik Kerja Lapangan (PKL) dalam pengoperasian jaringan MikroTik, pengabelan fiber optik, dan pemeliharaan perangkat WirelessLAN."
  }
];

export const mockTrainings = [
  {
    id: "t2",
    title: "Pelatihan TIK - JUNIOR WEB DEVELOPER",
    organizer: "Digitalent Kominfo & BNSP",
    issuer_logo: "/assets/logos/digitalent.svg",
    date: "September - Oktober 2024",
    pdf_url: "/assets/certificates/sertifpelatihan (1).pdf",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    description: "Program pelatihan intensif Digital Talent Scholarship Kominfo pengembangan web full-stack dasar, pemrograman client-side dan server-side."
  },
  {
    id: "t3",
    title: "Pelatihan TIK - JUNIOR NETWORK ADMINISTRATOR",
    organizer: "Digitalent Kominfo & BNSP",
    issuer_logo: "/assets/logos/digitalent.svg",
    date: "Maret - April 2024",
    pdf_url: "/assets/certificates/sertifpelatihan (2).pdf",
    image_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
    description: "Pelatihan Digital Talent Scholarship Kominfo administrasi jaringan komputer, subnetting, pembuatan kabel jaringan, dan manajemen perangkat switch/router."
  }
];

export const mockProjects = [
  {
    id: "p1",
    title: "Three Queens Interior",
    subtitle: "Web Development",
    category: "Web Development",
    status: "Selesai",
    description: "Platform website desain interior & arsitektur profesional. Menyajikan katalog portofolio proyek interior, galeri furnitur, konsultasi desain, dan sistem antarmuka responsif.",
    solution: "Platform ini dirancang khusus untuk menampilkan portofolio desain interior kelas atas dengan navigasi yang intuitif, integrasi konsultasi langsung via WhatsApp, dan performa tinggi yang responsif di seluruh perangkat.",
    image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&auto=format&fit=crop&q=80"
    ],
    tech_stack: ["Web Development", "UI/UX Design", "Responsive Design", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Figma"],
    github_link: "",
    live_link: "https://interiorthreequeens.com/"
  },
  {
    id: "p2",
    title: "NayYara Store",
    subtitle: "E-Commerce Platform",
    category: "Web Development",
    status: "Selesai",
    description: "Platform toko online / e-commerce modern untuk produk fashion & kebutuhan harian. Dilengkapi sistem katalog produk, penelusuran produk, dan antarmuka responsif.",
    solution: "Aplikasi web e-commerce ini mengoptimalkan pengalaman belanja pelanggan dengan katalog produk yang cepat, integrasi sistem pemesanan mudah, dan antarmuka ramah pengguna di semua ukuran layar.",
    image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop&q=80"
    ],
    tech_stack: ["E-Commerce", "Web Development", "UI/UX Design", "Responsive Web", "JavaScript", "React.js", "Tailwind CSS", "Node.js"],
    github_link: "",
    live_link: "https://nayyarastore.com/"
  },
  {
    id: "p3",
    title: "SilatPRO",
    subtitle: "Android App",
    category: "Mobile Development",
    status: "Selesai",
    description: "Aplikasi ini bertujuan untuk membantu latihan mandiri para pesilat baru, dimana ada contoh gerakan, deteksi keypoint tubuh, menilai gerakan, mengevaluasi detail gerakan, terdiri dari beberapa kategori gerakan yaitu Pukulan, Tangkisan dan Tendangan.",
    solution: "Aplikasi ini bertujuan untuk membantu latihan mandiri para pesilat baru, dimana ada contoh gerakan, deteksi keypoint tubuh, menilai gerakan, mengevaluasi detail gerakan, terdiri dari beberapa kategori gerakan yaitu Pukulan, Tangkisan dan Tendangan.",
    image_url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80"
    ],
    tech_stack: ["Computer Vision", "Machine Learning", "Media Pipe", "YOLO", "Pose Estimation", "TensorFlow", "Python", "Kotlin", "GoogleColab", "Android Studio", "Figma"],
    github_link: "https://github.com/Endisss31/SilatPRO",
    live_link: "#"
  }
];
