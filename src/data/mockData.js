export const profileInfo = {
  name: "Natanael Ruswandi",
  title: "AI Developer & Mobile Developer",
  subtitles: ["AI Developer", "Computer Vision Enthusiast", "Mobile Developer"],
  bio: "Creative Developer & Designer specializing in building beautiful, functional, and user-friendly digital experiences. Passionate about machine learning, pose estimation, and crafting premium UI/UX.",
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "State University / Institute",
      period: "2021 - 2025",
      description: "Specialized in Artificial Intelligence, Computer Vision, and Software Engineering. Maintained a high GPA and participated in AI research projects."
    }
  ],
  careerGoals: "My ultimate goal is to pioneer solutions that bridge AI with interactive mobile and web applications, bringing state-of-the-art machine learning models into everyday utility.",
  cvUrl: "/assets/cv.pdf"
};

export const mockSkills = [
  // Frontend
  { id: "s1", name: "React JS", category: "Frontend", proficiency: 90 },
  { id: "s2", name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
  { id: "s3", name: "Framer Motion", category: "Frontend", proficiency: 85 },
  { id: "s4", name: "JavaScript (ES6+)", category: "Frontend", proficiency: 92 },
  
  // Backend
  { id: "s5", name: "Node.js & Express", category: "Backend", proficiency: 80 },
  { id: "s6", name: "Supabase & Firebase", category: "Backend", proficiency: 85 },
  { id: "s7", name: "PostgreSQL / SQL", category: "Backend", proficiency: 78 },
  
  // Artificial Intelligence
  { id: "s8", name: "YOLOv8 & Object Detection", category: "Artificial Intelligence", proficiency: 88 },
  { id: "s9", name: "TensorFlow & TFLite", category: "Artificial Intelligence", proficiency: 82 },
  { id: "s10", name: "Computer Vision & OpenCV", category: "Artificial Intelligence", proficiency: 85 },
  { id: "s11", name: "Machine Learning (MLP, SVM)", category: "Artificial Intelligence", proficiency: 80 },
  
  // Mobile Development
  { id: "s12", name: "Android Studio & Kotlin", category: "Mobile Development", proficiency: 85 },
  { id: "s13", name: "Flutter / Dart", category: "Mobile Development", proficiency: 75 },
  
  // Tools
  { id: "s14", name: "Git & GitHub", category: "Tools", proficiency: 90 },
  { id: "s15", name: "Docker", category: "Tools", proficiency: 70 },
  { id: "s16", name: "Figma (UI/UX Design)", category: "Tools", proficiency: 85 }
];

export const mockProjects = [
  {
    id: "p1",
    title: "SilatPRO",
    description: "AI-based Pencak Silat movement evaluation application using pose estimation and machine learning. Evaluates professional stance and outputs accuracy percentages in real-time.",
    image_url: "/assets/images/project.jpg",
    tech_stack: ["YOLOv8", "TensorFlow Lite", "Android Studio", "Firebase", "MLP"],
    github_link: "https://github.com",
    live_link: "#",
    category: "AI"
  },
  {
    id: "p2",
    title: "SmartVision Security",
    description: "Advanced surveillance monitoring dashboard. Uses edge computer vision to track intrusions, detect faces, and send real-time alerts with heatmaps.",
    image_url: "/assets/images/project.jpg",
    tech_stack: ["Python", "OpenCV", "React JS", "Node.js", "PostgreSQL"],
    github_link: "https://github.com",
    live_link: "#",
    category: "Web"
  },
  {
    id: "p3",
    title: "HealthTrack Mobile",
    description: "Fitness companion app utilizing smart device sensors and TensorFlow Lite to recommend workout regimens and track calorie burn rates.",
    image_url: "/assets/images/project.jpg",
    tech_stack: ["Flutter", "TensorFlow Lite", "Firebase", "Node.js"],
    github_link: "https://github.com",
    live_link: "#",
    category: "Mobile"
  }
];

export const mockExperiences = [
  {
    id: "e1",
    role: "AI Research Assistant",
    company: "University AI Lab",
    type: "Research",
    start_date: "2024-03",
    end_date: "Present",
    description: "Led research on human pose estimation for traditional martial arts. Trained custom YOLOv8 and MLP models reaching 94.2% classification accuracy."
  },
  {
    id: "e2",
    role: "Mobile App Developer Intern",
    company: "Tech Solutions Co.",
    type: "Internship",
    start_date: "2023-09",
    end_date: "2024-02",
    description: "Developed and optimized key features for a commercial Kotlin Android application, reducing crash rates by 15% and integrating offline sync functionality."
  },
  {
    id: "e3",
    role: "Freelance Full-Stack Developer",
    company: "Self-employed",
    type: "Freelance",
    start_date: "2022-06",
    end_date: "2023-08",
    description: "Delivered responsive web interfaces and Supabase-backed content management systems for local startups and small businesses."
  },
  {
    id: "e4",
    role: "Head of Technology",
    company: "Student Robotics Association",
    type: "Organization",
    start_date: "2022-01",
    end_date: "2023-01",
    description: "Organized workshops on OpenCV, robotic arm inverse kinematics, and Arduino microcontrollers. Led a team of 15 members to win a national robotic prize."
  }
];

export const mockCertificates = [
  {
    id: "c1",
    title: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    date: "2024-05",
    image_url: "/assets/images/project.jpg",
    credential_url: "https://coursera.org"
  },
  {
    id: "c2",
    title: "TensorFlow Developer Certificate",
    issuer: "Google / TensorFlow",
    date: "2023-11",
    image_url: "/assets/images/project.jpg",
    credential_url: "https://tensorflow.org"
  },
  {
    id: "c3",
    title: "Associate Android Developer",
    issuer: "Google Developer Certification",
    date: "2023-04",
    image_url: "/assets/images/project.jpg",
    credential_url: "https://google.com"
  }
];

export const mockAchievements = [
  {
    id: "a1",
    title: "1st Place - National AI Hackathon",
    type: "Competitions",
    date: "2024-10",
    description: "Developed a computer vision prototype detecting driver fatigue in real-time under low-light conditions.",
    image_url: "/assets/images/project.jpg"
  },
  {
    id: "a2",
    title: "Keynote Speaker - Seminar on Future AI & CV",
    type: "Seminars",
    date: "2024-02",
    description: "Delivered a presentation on 'Edge AI: Running TensorFlow models on Android devices' to 200+ undergraduate students.",
    image_url: "/assets/images/project.jpg"
  },
  {
    id: "a3",
    title: "Best Graduate Candidate Award",
    type: "Awards",
    date: "2025-01",
    description: "Awarded by the Department of Computer Science for academic performance and active research contributions.",
    image_url: "/assets/images/project.jpg"
  }
];
