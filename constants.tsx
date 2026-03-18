
import React from 'react';
import { 
  Code, 
  Database, 
  Server, 
  Cpu, 
  Layout, 
  Monitor, 
  Award, 
  Terminal, 
  Globe,
  FileText,
  Search,
  ShoppingCart,
  UserCheck,
  Zap,
  Layers,
  Eye,
  Activity,
  Briefcase,
  CheckCircle,
  BarChart3,
  Settings,
  GitBranch,
  Github as GithubIcon,
  Box
} from 'lucide-react';
import { Project, SkillCategory } from './types';

export const RESUME_CONTEXT = `
You are an AI assistant for Anupkumar Koturwar's portfolio website. 
Here is Anupkumar's professional profile:
- **Name:** Anupkumar Koturwar
- **Role:** Computer Science Graduate (2025), Full Stack Developer, Data Enthusiast.
- **Education:** B.Tech CSE from MGM's College of Engineering (CGPA 7.45), Class XII (90.17%).
- **Skills:** Python, C, HTML, CSS, JS, SQL, React.js, Django, Bootstrap, NumPy, Pandas, Matplotlib, MySQL, MongoDB, AWS, Git.
- **Projects:**
    1. "Dual-Mode Plagiarism Detection": Python, NLP, Image Processing. Published IEEE OTCON 2024 paper. Detects text & image plagiarism.
    2. "Planto": Nursery E-Commerce Website. Full-stack (HTML/CSS/JS/MySQL). Product listings, search, auth.
    3. "FutureSpark": College Placement Management System. Python, MongoDB. Student profiles, job listings.
- **Achievements:** Presenter at IEEE OTCON 2024 (Research Paper).
- **Certifications:** Infosys Springboard (Python), NPTEL (Python - Elite), IoT Workshop.
- **Contact:** koturwaranup@gmail.com, +91-8999881962.
- **Interests:** Competitive programming, UI design, traveling.
- **Languages:** English, Hindi, Marathi.

**Tone:** Professional, enthusiastic, concise, and helpful. 
**Goal:** Encourage recruiters to hire Anup or contact him. 
If asked about something not in this profile, say you don't have that specific info but emphasize his quick learning ability.
`;

export const PROJECTS: Project[] = [
  {
    id: "plagiarism-detection",
    title: "Dual-Mode Plagiarism Detection",
    subtitle: "NLP & Image Processing System",
    description: "A research-backed system designed to detect plagiarism in both text and images. It combines NLP textual similarity analysis with image feature comparison techniques.",
    longDescription: "This project addresses the growing concern of academic dishonesty by providing a comprehensive tool for detecting both textual and visual plagiarism. The system uses advanced Natural Language Processing (NLP) techniques to analyze semantic similarities in text and state-of-the-art image processing algorithms to identify copied or modified visual content. The research was presented at the IEEE OTCON 2024 conference, highlighting its technical depth and practical utility. The system is capable of processing multi-format documents and comparing them against a vast database of sources.",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
    ],
    skillUsage: [
      { skill: "Python", usage: "Core logic and model integration." },
      { skill: "NLP", usage: "Semantic analysis and text embedding." },
      { skill: "Image Processing", usage: "Feature extraction and visual comparison." }
    ],
    features: [
       "Dual-Input Processing (Text & Image)",
       "NLP-based Semantic Analysis",
       "Visual Feature Extraction",
       "Research-Grade Accuracy",
       "Cross-Verification Engine"
    ],
    tags: ["Python", "NLP", "Machine Learning", "Research"],
    github: "https://github.com/Anupk2002/Final-PlagDetect",
    demo: "https://github.com/Anupk2002/Final-PlagDetect",
    challenges: [
      "Integrating disparate NLP and Image Processing models into a unified pipeline.",
      "Ensuring high accuracy while maintaining low processing latency.",
      "Handling various document formats and image resolutions."
    ],
    learnings: [
      "Deepened understanding of NLP embeddings and vector similarity.",
      "Experience in academic research and technical paper publication.",
      "Optimization of complex data processing workflows."
    ],
    diagram: (
      <div className="relative flex flex-col items-center justify-center p-8 bg-slate-900/40 rounded-3xl border border-white/[0.05] w-full h-full min-h-[350px] overflow-hidden group">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="flex gap-12 mb-10 z-10">
          <div className="group flex flex-col items-center gap-3">
            <div className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-500">
              <FileText size={32} className="text-blue-400" />
            </div>
            <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Text Input</span>
          </div>
          <div className="group flex flex-col items-center gap-3">
            <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform duration-500">
              <Layout size={32} className="text-purple-400" />
            </div>
            <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Image Source</span>
          </div>
        </div>
        <div className="relative w-full max-w-[300px] z-10">
          <div className="p-8 bg-slate-950/90 border border-teal-400/30 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-[10px] font-black text-teal-400/80 tracking-widest">
                <span>CORE_ENGINE_V2</span>
                <Activity size={14} className="animate-pulse" />
              </div>
              <div className="h-px bg-white/5" />
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                  <span className="text-xs font-bold text-slate-300">NLP Semantic Vector</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
                  <span className="text-xs font-bold text-slate-300">CV Feature Mapping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-teal-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-5 bg-teal-950/30 border border-teal-400/40 rounded-full shadow-xl">
              <Award size={36} className="text-teal-400" />
            </div>
          </div>
          <span className="mt-4 text-[10px] font-black text-teal-400 tracking-[0.3em] uppercase">Validation Output</span>
        </div>
      </div>
    ),
    highlight: "Published IEEE OTCON 2024"
  },
  {
    id: "planto",
    title: "Planto",
    subtitle: "Nursery E-Commerce Platform",
    description: "Full-stack web application for a nursery business featuring product listings, dynamic search functionality, and secure user authentication.",
    longDescription: "Planto is a comprehensive e-commerce solution tailored for plant nurseries. It provides a seamless shopping experience for users, from browsing a diverse catalog of plants to secure checkout. The application is built with a focus on performance and scalability, utilizing a robust MySQL backend to manage inventory and user data effectively. It features a fully responsive design, ensuring a consistent experience across all devices.",
    images: [
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1416870230247-d0a2906d896c?w=800&auto=format&fit=crop&q=80"
    ],
    skillUsage: [
      { skill: "JavaScript", usage: "Dynamic UI interactions and cart logic." },
      { skill: "MySQL", usage: "Database schema design and inventory management." },
      { skill: "Tailwind CSS", usage: "Responsive and modern styling." }
    ],
    features: [
      "Dynamic Product Search",
      "Secure User Authentication",
      "Interactive Cart Management",
      "MySQL Database Integration",
      "Responsive UI Design"
    ],
    tags: ["HTML/CSS", "JavaScript", "MySQL", "Full Stack"],
    github: "https://github.com/Anupk02/Planto.com",
    demo: "https://github.com/Anupk02/Planto.com",
    challenges: [
      "Designing a flexible database schema for diverse plant categories.",
      "Implementing real-time search filtering on the client-side.",
      "Ensuring secure session management for user accounts."
    ],
    learnings: [
      "Mastered SQL query optimization for large datasets.",
      "Improved skills in frontend state management and DOM manipulation.",
      "Gained experience in building end-to-end e-commerce workflows."
    ],
    diagram: (
      <div className="relative flex items-center justify-center p-8 bg-slate-900/40 rounded-3xl border border-white/[0.05] w-full h-full min-h-[350px] overflow-hidden group">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="flex flex-col md:flex-row items-center gap-12 z-10 w-full max-w-lg">
          <div className="flex-1 w-full glass-card border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all group-hover:-translate-y-2">
            <div className="bg-slate-800/80 px-4 py-2 flex gap-2 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-red-500/40" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <div className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
            <div className="p-6 space-y-4 bg-slate-950/60">
              <div className="flex justify-between items-center">
                <div className="h-2.5 w-16 bg-slate-800 rounded-full" />
                <ShoppingCart size={18} className="text-teal-400" />
              </div>
              <div className="h-28 bg-slate-900/80 rounded-xl flex items-center justify-center border border-white/5">
                <Search size={24} className="text-teal-500/40 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-teal-400/10 border border-teal-400/20 rounded-lg" />
                <div className="h-10 bg-slate-800 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col items-center gap-4">
             <div className="h-1 w-12 md:w-1 md:h-16 bg-gradient-to-r md:bg-gradient-to-b from-teal-400 to-blue-500 rounded-full" />
             <Zap size={20} className="text-yellow-400 animate-bounce" />
             <div className="h-1 w-12 md:w-1 md:h-16 bg-gradient-to-r md:bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          </div>
          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="p-8 bg-blue-950/20 border border-blue-400/30 rounded-3xl flex flex-col items-center gap-4 group hover:border-blue-400/50 transition-all shadow-xl">
              <Database size={40} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="space-y-2 w-full">
                <div className="h-1.5 w-full bg-blue-400/20 rounded-full" />
                <div className="h-1.5 w-3/4 bg-blue-400/20 rounded-full" />
                <div className="h-1.5 w-5/6 bg-blue-400/20 rounded-full" />
              </div>
              <span className="text-[10px] font-black text-blue-300 tracking-[0.3em] uppercase">SQL_STORAGE</span>
            </div>
          </div>
        </div>
      </div>
    ),
    highlight: "Full Stack Implementation"
  },
  {
    id: "futurespark",
    title: "FutureSpark",
    subtitle: "Placement Management System",
    description: "A comprehensive platform to manage college placements, enabling detailed student profiles, job listings, and application tracking workflows.",
    longDescription: "FutureSpark streamlines the placement process for both students and administrators. It provides a centralized hub for managing student data, company profiles, and job openings. The system automates application tracking and provides analytics to help placement officers monitor progress and success rates effectively. It is designed to handle high volumes of data and concurrent users during peak placement seasons.",
    images: [
      "https://images.unsplash.com/photo-1454165833767-027ffea9e778?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80"
    ],
    skillUsage: [
      { skill: "Python", usage: "Backend logic and automation scripts." },
      { skill: "MongoDB", usage: "Flexible storage for student profiles and job listings." },
      { skill: "Web Dev", usage: "Building the admin dashboard and student portal." }
    ],
    features: [
      "Student Profile Management",
      "Real-time Job Updates",
      "Application Tracking System",
      "Admin Dashboard",
      "MongoDB Integration"
    ],
    tags: ["Python", "MongoDB", "Web Dev", "Automation"],
    github: "https://github.com/Anupk02/FutureSpark",
    demo: "https://github.com/Anupk02/FutureSpark",
    challenges: [
      "Handling high concurrent traffic during peak placement seasons.",
      "Implementing a flexible notification system for job alerts.",
      "Designing an intuitive dashboard for placement officers."
    ],
    learnings: [
      "Gained proficiency in NoSQL database design with MongoDB.",
      "Learned how to build scalable administrative tools.",
      "Improved understanding of enterprise-level software requirements."
    ],
    diagram: (
      <div className="relative flex flex-col items-center justify-center p-8 bg-slate-900/40 rounded-3xl border border-white/[0.05] w-full h-full min-h-[350px] overflow-hidden group">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative w-full max-w-md z-10 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950/80 border border-white/5 rounded-2xl flex items-center gap-4 group hover:border-teal-400/30 transition-all shadow-xl">
              <div className="p-3 bg-teal-400/10 rounded-xl text-teal-400">
                <UserCheck size={22} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Students</p>
                <p className="text-sm text-slate-200 font-bold">Profiles</p>
              </div>
            </div>
            <div className="p-5 bg-slate-950/80 border border-white/5 rounded-2xl flex items-center gap-4 group hover:border-blue-400/30 transition-all shadow-xl">
              <div className="p-3 bg-blue-400/10 rounded-xl text-blue-400">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Companies</p>
                <p className="text-sm text-slate-200 font-bold">Listings</p>
              </div>
            </div>
          </div>
          <div className="relative py-6">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent -translate-y-1/2" />
            <div className="relative mx-auto w-24 h-24 bg-slate-950 border-2 border-teal-400/30 rounded-[2rem] rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.2)] overflow-hidden group">
               <div className="absolute inset-0 bg-teal-400/5 animate-pulse" />
               <Layers size={36} className="text-teal-400 -rotate-45 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="text-center mt-8">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">Matching_Engine_v1</span>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-teal-950/30 to-blue-950/30 border border-teal-400/20 rounded-3xl flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-400/20 rounded-xl">
                <Eye size={24} className="text-teal-400" />
              </div>
              <span className="text-sm text-slate-200 font-bold tracking-tight">Tracking Board</span>
            </div>
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 shadow-lg">
                  {i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-teal-400 flex items-center justify-center shadow-lg shadow-teal-400/20">
                <CheckCircle size={18} className="text-slate-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    highlight: "Database Management"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Backend",
    skills: [
      { name: "Python", level: "Expert", desc: "Data Science & Scripting", icon: <Terminal size={20} />, isMain: true },
      { name: "FastAPI", level: "Advanced", desc: "Modern Python Web Framework", icon: <Zap size={20} />, isMain: true },
      { name: "REST API", level: "Expert", desc: "Scalable API Design", icon: <Globe size={20} />, isMain: true },
      { name: "Django", level: "Intermediate", desc: "Robust Web Framework", icon: <Server size={20} /> },
      { name: "C / C++", level: "Intermediate", desc: "System Programming", icon: <Cpu size={20} /> },
    ]
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: "Advanced", desc: "Modern UI Libraries", icon: <Layout size={20} />, isMain: true },
      { name: "JavaScript", level: "Advanced", desc: "Interactive Web Apps", icon: <Code size={20} />, isMain: true },
      { name: "HTML5 / CSS3", level: "Expert", desc: "Semantic Web & Styling", icon: <Monitor size={20} /> },
      { name: "Tailwind CSS", level: "Expert", desc: "Utility-first Styling", icon: <Layers size={20} /> },
      { name: "Bootstrap", level: "Advanced", desc: "Responsive Framework", icon: <Box size={20} /> },
    ]
  },
  {
    title: "Data & Database",
    skills: [
      { name: "Data Analysis", level: "Advanced", desc: "Insight Extraction", icon: <BarChart3 size={20} />, isMain: true },
      { name: "Pandas / NumPy", level: "Expert", desc: "Scientific Computing", icon: <Activity size={20} />, isMain: true },
      { name: "SQL", level: "Advanced", desc: "Database Architect", icon: <Database size={20} /> },
      { name: "MySQL / MongoDB", level: "Advanced", desc: "Relational & NoSQL", icon: <Database size={20} /> },
    ]
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "VS Code", level: "Expert", desc: "Primary IDE", icon: <Code size={20} /> },
      { name: "Git / GitHub", level: "Advanced", desc: "Version Control", icon: <GithubIcon size={20} />, isMain: true },
      { name: "Postman", level: "Advanced", desc: "API Testing & Docs", icon: <Settings size={20} /> },
      { name: "AWS", level: "Learning", desc: "Cloud Infrastructure", icon: <Globe size={20} /> },
    ]
  }
];
