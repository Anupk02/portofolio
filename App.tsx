
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ChevronRight,
  Download,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Loader2,
  ExternalLink,
  Award,
  Globe,
  Briefcase,
  Send,
  MessageSquare,
  X,
  ArrowLeft,
  ArrowUpRight,
  ArrowUp,
  FileText,
  Zap,
  Code,
  Terminal,
  Layout,
  Database,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Typewriter from 'typewriter-effect';
import { AIChat } from './components/AIChat';
import { PROJECTS, SKILL_CATEGORIES } from './constants';
import { analyzeProjectDepth } from './services/geminiService';

const CodeBackground = () => {
  const snippets = [
    "npm install @google/genai",
    "git commit -m 'feat: add ai chat'",
    "python manage.py runserver",
    "docker-compose up -d",
    "SELECT * FROM users WHERE active=1",
    "const [data, setData] = useState(null)",
    "useEffect(() => { fetchData() }, [])",
    "pip install tensorflow torch",
    "aws s3 sync ./dist s3://my-app",
    "kubectl get pods -n production",
    "curl -X POST https://api.dev/v1",
    "void* ptr = malloc(sizeof(int))",
    "public static void main(String[] args)",
    "import { motion } from 'framer-motion'",
    "export default function App() {",
    "grep -rI 'pattern' .",
    "chmod +x script.sh",
    "ssh -i key.pem ubuntu@ec2",
    "ls -la | grep '.config'",
    "sudo systemctl restart nginx",
    "yarn add lucide-react",
    "go run main.go",
    "rustc --version",
    "cmake .. && make",
    "01010110 01001011",
    "0xDEADBEEF",
    "ptr++",
    "while(true) { break; }",
    "if (err) throw err;",
    "try { ... } catch (e) { ... }",
    "console.log(`Debug: ${id}`)",
    "npm run build --prod",
    "git push origin main",
    "docker build -t app:latest .",
    "rm -rf node_modules",
    "mkdir -p src/components",
    "cat package.json | jq",
    "ping -c 4 google.com",
    "top -u root",
    "df -h /dev/sda1"
  ];

  const colors = [
    "text-teal-400/25",
    "text-blue-400/25",
    "text-purple-400/25",
    "text-pink-400/25",
    "text-emerald-400/25",
    "text-cyan-400/25",
    "text-indigo-400/25",
    "text-orange-400/25",
    "text-rose-400/25",
    "text-amber-400/25",
    "text-lime-400/25",
    "text-sky-400/25",
    "text-violet-400/25",
    "text-fuchsia-400/25",
    "text-yellow-400/25"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 w-full h-full">
      {Array.from({ length: 65 }).map((_, i) => {
        const duration = 30 + Math.random() * 50;
        const delay = Math.random() * -80;
        const leftPos = Math.random() * 100;
        const colorIdx = i % colors.length;
        const drift = 150 + Math.random() * 250;

        return (
          <motion.div
            key={i}
            initial={{ 
              y: "110vh",
              opacity: 0,
              scale: 0.9,
              x: 0
            }}
            animate={{ 
              y: "-20vh",
              opacity: [0, 0.6, 0.6, 0],
              x: [0, drift, -drift, drift, 0],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity,
              delay: delay,
              ease: "linear",
              times: [0, 0.2, 0.8, 1]
            }}
            className={`absolute font-mono ${colors[colorIdx]} whitespace-nowrap will-change-transform`}
            style={{ 
              left: `${leftPos}%`,
              fontSize: `${10 + Math.random() * 6}px`,
              filter: "blur(0.2px)"
            }}
          >
            {snippets[i % snippets.length]}
          </motion.div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [projectInsight, setProjectInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageRot, setImageRot] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isContactHighlight, setIsContactHighlight] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 10);
  };

  const triggerContactHighlight = () => {
    setIsContactHighlight(true);
    scrollToSection('#contact');
    setTimeout(() => setIsContactHighlight(false), 3000);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const method = formData.get('method') as string;
    
    const text = `Hello Anup, I'm ${name} (${email}). ${message}`;
    const encodedText = encodeURIComponent(text);
    
    if (method === 'whatsapp') {
      const whatsappUrl = `https://wa.me/918999881962?text=${encodedText}`;
      window.open(whatsappUrl, '_blank');
    } else {
      const mailtoUrl = `mailto:koturwaranup@gmail.com?subject=Hiring Inquiry from ${name}&body=${encodedText}`;
      window.location.href = mailtoUrl;
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectAnalysis = async () => {
    const project = PROJECTS[activeProjectIdx];
    if (!project) return;
    setIsAnalyzing(true);
    setProjectInsight(null);
    try {
      const result = await analyzeProjectDepth(project.title, project.description);
      setProjectInsight(result);
    } catch (e) {
      setProjectInsight("Analysis temporarily unavailable.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const navItems = [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'LinkedIn', href: '#linkedin' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-teal-500/30 selection:text-teal-300 overflow-x-hidden">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[150] w-12 h-12 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/40 hover:bg-teal-400 hover:scale-110 active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AIChat />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-teal-500/20 group-hover:rotate-12 transition-transform duration-300">
              AK
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-white tracking-tighter text-xl uppercase">ANUPKUMAR</span>
              <span className="text-teal-500 font-black ml-1 uppercase">.DEV</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a 
                key={item.name} 
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative text-[11px] font-black text-slate-400 hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                triggerContactHighlight();
              }}
              className="px-6 py-2.5 bg-teal-500 text-slate-950 rounded-full text-xs font-black hover:bg-teal-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal-500/20 uppercase tracking-widest"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-lg font-black text-slate-300 hover:text-teal-400 transition-colors uppercase tracking-widest"
                  >
                    {item.name}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    triggerContactHighlight();
                  }}
                  className="w-full py-4 bg-teal-500 text-slate-950 rounded-2xl text-center font-black uppercase tracking-widest"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden perspective-1000">
        <CodeBackground />
        
        {/* Background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center">
          <div className="mb-10 relative z-10">
            {/* Enhanced Glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 transition-opacity duration-700 animate-pulse" />
            
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-teal-400/40 p-1.5 bg-slate-900 relative z-10 overflow-hidden shadow-[0_0_60px_rgba(20,184,166,0.3)]">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80" 
                alt="Anupkumar Koturwar" 
                className="w-full h-full object-cover rounded-full grayscale-[10%] transition-all duration-500 scale-105"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-bold text-teal-400 mb-8 uppercase tracking-widest z-10">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-ping" />
            Software Engineer & Data Enthusiast
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85] z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Anupkumar
            </motion.span> <br />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 drop-shadow-md"
            >
              Koturwar
            </motion.span>
          </h1>

          <div className="h-20 md:h-24 z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
            >
              <Typewriter 
                options={{
                  strings: [
                    "Bridging the gap between complex data and user-centric interfaces.",
                    "Full-stack engineer graduating 2025.",
                    "Published researcher in NLP & CV.",
                    "Building the future of intelligent systems."
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 20,
                  wrapperClassName: "text-slate-300",
                  cursorClassName: "text-teal-400"
                }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                triggerContactHighlight();
              }}
              className="group w-full sm:w-auto px-8 py-4 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-500 transition-all duration-300 shadow-2xl shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              Hire Me <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Projects
            </a>
            <a 
              href="https://drive.google.com/file/d/1NHqU7i_Qix0QHoLQJDyno_pP7bzBYvL5/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-slate-300 rounded-full font-bold border border-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download size={20} /> Resume
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative bg-slate-900/10 scroll-mt-24 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                Technical <span className="text-teal-400">Arsenal</span>
              </h2>
              <p className="text-slate-500 max-w-2xl text-lg">
                A curated collection of technologies I've mastered to build high-performance, scalable, and data-driven applications.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {(SKILL_CATEGORIES || []).map((cat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-[2.5rem] border-white/[0.03] bg-slate-900/20 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/[0.02] blur-3xl -mr-16 -mt-16 group-hover:bg-teal-500/[0.05] transition-all duration-700" />
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                    {idx === 0 ? <Terminal size={24} /> : idx === 1 ? <Layout size={24} /> : idx === 2 ? <Database size={24} /> : <Settings size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">
                      {cat.title}
                    </h3>
                    <div className="h-1 w-12 bg-teal-500 rounded-full mt-1" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div 
                      key={sIdx} 
                      whileHover={{ x: 10 }}
                      className="group/skill p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-teal-500/30 hover:bg-teal-500/[0.02] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${skill.isMain ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-teal-400 group-hover/skill:bg-teal-500 group-hover/skill:text-slate-950'}`}>
                            {skill.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              {skill.name}
                              {skill.isMain && <Sparkles size={12} className="text-teal-400" />}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{skill.desc}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 group-hover/skill:text-teal-400 transition-colors">
                          {skill.level}
                        </span>
                      </div>
                      
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '85%' : skill.level === 'Intermediate' ? '70%' : '50%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full rounded-full ${skill.isMain ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-slate-600 group-hover/skill:bg-teal-500'}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Interactive Portfolio</h2>
              <p className="text-slate-500 max-w-xl">Deep dive into my engineering journey and technical architecture choices.</p>
            </div>
            <div className="flex gap-2">
              {PROJECTS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => { setActiveProjectIdx(i); setProjectInsight(null); }}
                  className={`h-2 transition-all duration-300 rounded-full ${activeProjectIdx === i ? 'w-12 bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'w-3 bg-slate-800 hover:bg-slate-700'}`}
                  aria-label={`View project ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Project Navigation */}
            <div className="lg:col-span-4 w-full lg:sticky lg:top-24 flex flex-col gap-4">
              {PROJECTS.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveProjectIdx(idx); setProjectInsight(null); }}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    activeProjectIdx === idx 
                      ? 'bg-slate-900 border-teal-500 shadow-xl shadow-teal-500/5' 
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-300 ${activeProjectIdx === idx ? 'bg-teal-500' : 'bg-transparent'}`} />
                  <h3 className={`font-bold text-lg mb-1 ${activeProjectIdx === idx ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-teal-500/80 bg-teal-500/5 px-2 py-0.5 rounded border border-teal-500/10 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Project Content Area */}
            <div className="lg:col-span-8 w-full glass-card rounded-3xl overflow-hidden flex flex-col shadow-2xl min-h-[600px] border border-white/[0.05]">
              <div className="bg-slate-950/50 px-6 py-4 flex justify-between items-center border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-2 font-bold tracking-widest">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                  Status: {PROJECTS[activeProjectIdx]?.highlight || 'Ready'}
                </div>
              </div>

              <div className="flex-1 p-8 lg:p-12 overflow-y-auto hide-scrollbar">
                {PROJECTS[activeProjectIdx] && (
                  <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                      <div>
                        <span className="inline-block text-[10px] font-black text-teal-400 bg-teal-400/10 border border-teal-400/20 px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.2em]">
                          {PROJECTS[activeProjectIdx].highlight}
                        </span>
                        <h2 className="text-4xl font-black text-white mb-6 leading-tight tracking-tight">{PROJECTS[activeProjectIdx].title}</h2>
                        <p className="text-slate-300 leading-relaxed mb-8 text-lg font-medium">{PROJECTS[activeProjectIdx].description}</p>
                        
                        <div className="space-y-4 mb-10">
                          {PROJECTS[activeProjectIdx].features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-slate-400 group">
                              <CheckCircle size={18} className="text-teal-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                              <span className="leading-snug group-hover:text-slate-200 transition-colors">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <button 
                            onClick={() => setSelectedProjectId(PROJECTS[activeProjectIdx].id)}
                            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5"
                          >
                            View Details <ExternalLink size={18} />
                          </button>
                          <button 
                            onClick={handleProjectAnalysis}
                            disabled={isAnalyzing}
                            className="flex items-center gap-2 px-8 py-4 bg-teal-400/10 text-teal-400 border border-teal-400/20 rounded-2xl font-black hover:bg-teal-400/20 disabled:opacity-50 transition-all duration-300"
                          >
                            {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                            Technical Insight
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-950/80 rounded-3xl border border-white/[0.08] p-4 lg:p-6 flex flex-col shadow-2xl min-h-[350px] relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        <span className="text-[10px] font-bold text-slate-500 mb-6 uppercase tracking-[0.3em] block text-center relative z-10">Architecture Blueprint</span>
                        <div className="flex-1 w-full overflow-hidden relative z-10">
                          {PROJECTS[activeProjectIdx].diagram}
                        </div>
                      </div>
                    </div>

                    {projectInsight && (
                      <div className="p-8 bg-teal-500/5 border border-teal-500/20 rounded-2xl animate-in fade-in zoom-in duration-500">
                        <h4 className="text-teal-400 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                          <Sparkles size={18} className="animate-pulse" /> AI Deep Analysis
                        </h4>
                        <div className="text-sm text-slate-300 leading-loose whitespace-pre-wrap font-mono prose prose-invert max-w-none">
                          {projectInsight}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global & Achievements Section */}
      <section id="achievements" className="py-24 px-6 bg-slate-900/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">Ready to Build Globally</h2>
                <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                  Proficient in English, Hindi, and Marathi, I am ready to join distributed engineering teams worldwide. 
                  My focus is on scalable backends and fluid, high-performance frontends.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {['English', 'Hindi', 'Marathi'].map(lang => (
                    <div key={lang} className="px-6 py-3 bg-slate-900 border border-white/5 rounded-full flex items-center gap-3 hover:border-teal-500/30 transition-colors duration-300">
                      <Globe size={18} className="text-teal-500" />
                      <span className="font-bold">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl border-teal-500/20 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl group-hover:bg-teal-500/20 transition-all duration-500" />
                <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase size={24} className="text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Immediate Availability</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  I am currently seeking Full Stack Developer or Software Engineering roles where I can contribute to impact-driven projects.
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 text-teal-400 font-bold hover:gap-4 transition-all duration-300">
                  Let's discuss my role <ChevronRight size={18} />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-8 rounded-3xl group hover:border-teal-500/50 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <Award size={40} className="text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="px-3 py-1 bg-teal-500/10 text-teal-400 text-[10px] font-bold rounded-full uppercase">Featured Achievement</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">IEEE OTCON 2024 Presenter</h4>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">Peer-reviewed Research Publication on Dual-Mode Plagiarism Systems. Published in prestigious IEEE conference proceedings.</p>
                <a href="#" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors duration-200">
                  View Publication <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'NPTEL Elite', desc: 'IIT Madras Certification (Python)', icon: <ShieldCheck size={18} className="text-blue-400" /> },
                  { title: 'Infosys Springboard', desc: 'Enterprise Python Training', icon: <CheckCircle size={18} className="text-green-400" /> }
                ].map(cert => (
                  <div key={cert.title} className="glass-card p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all duration-300">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                      {cert.icon}
                    </div>
                    <h5 className="font-bold text-white text-sm mb-1">{cert.title}</h5>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Terminal Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden border-white/10 shadow-2xl">
            <div className="bg-slate-900/80 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">anup_terminal — 80x24</div>
              <div className="w-12" />
            </div>
            <div className="p-8 font-mono text-sm md:text-base bg-slate-950/90 min-h-[400px] space-y-4">
              <div className="flex gap-3">
                <span className="text-teal-400">anup@portfolio:~$</span>
                <Typewriter 
                  options={{
                    strings: ["whoami"],
                    autoStart: true,
                    cursor: "_",
                    delay: 100
                  }}
                />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-slate-400 space-y-2"
              >
                <p>Name: Anupkumar Koturwar</p>
                <p>Role: Full-stack Engineer & Data Scientist</p>
                <p>Status: <span className="text-green-400">Open for Opportunities</span></p>
                <p>Location: Maharashtra, India</p>
              </motion.div>
              
              <div className="flex gap-3 mt-8">
                <span className="text-teal-400">anup@portfolio:~$</span>
                <Typewriter 
                  options={{
                    strings: ["ls skills/core"],
                    autoStart: true,
                    cursor: "_",
                    delay: 100,
                    startDelay: 3000
                  }}
                />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-blue-400"
              >
                <p>./Python</p>
                <p>./React.js</p>
                <p>./Django</p>
                <p>./MySQL</p>
                <p>./NLP</p>
                <p>./ComputerVision</p>
                <p>./AWS</p>
                <p>./MongoDB</p>
              </motion.div>

              <div className="flex gap-3 mt-8">
                <span className="text-teal-400">anup@portfolio:~$</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 6 }}
                  className="animate-pulse"
                >
                  _
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Section */}
      <section id="linkedin" className="py-32 relative overflow-hidden bg-slate-950/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30"
            >
              <Linkedin className="text-blue-400" size={32} />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
              Professional <span className="text-blue-500">Network</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg font-medium">
              Connect with me on LinkedIn to see my professional journey, endorsements, and industry contributions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-[2.5rem] border border-white/10 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-500/30">
                    <img 
                      src="photo - Copy.png" 
                      alt="Anupkumar Koturwar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Anupkumar Koturwar</h3>
                    <p className="text-blue-400 font-bold text-sm uppercase tracking-widest">Software Engineer | NLP Researcher</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">500+ Connections</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-sm text-slate-300 italic">"Passionate about building intelligent systems that solve real-world problems. Specialized in Full-stack development and Machine Learning."</p>
                  </div>
                </div>

                <a 
                  href="https://www.linkedin.com/in/anup-koturwar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest"
                >
                  View Full Profile <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <Linkedin size={40} className="text-blue-500" />
                </div>
                <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Live Profile Preview</h4>
                <p className="text-slate-400 text-sm mb-8">
                  LinkedIn's security policy prevents direct embedding of full profiles. Click below to open my professional network in a new tab.
                </p>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-blue-500"
                  />
                </div>
                <a 
                  href="https://www.linkedin.com/in/anup-koturwar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10"
                >
                  Open LinkedIn
                </a>
              </div>
              {/* This is where an iframe would go if allowed, but we use a placeholder for reliability */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-950/50 rounded-[2.5rem]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`pt-32 pb-24 px-6 scroll-mt-24 relative overflow-hidden transition-all duration-700 ${isContactHighlight ? 'bg-teal-500/5' : ''}`}>
        <AnimatePresence>
          {isContactHighlight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-white mb-6"
            >
              Let's <span className="text-teal-400">Collaborate.</span>
            </motion.h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Ready to take your project to the next level? Fill out the form below and I'll get back to you via Email and WhatsApp instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <a href="mailto:koturwaranup@gmail.com" className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Email Me</p>
                    <p className="text-slate-200 font-medium">koturwaranup@gmail.com</p>
                  </div>
                </a>

                <a href="https://wa.me/918999881962" target="_blank" rel="noreferrer" className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">WhatsApp Me</p>
                    <p className="text-slate-200 font-medium">+91 8999881962</p>
                  </div>
                </a>

                <div className="glass-card p-8 rounded-3xl border-teal-500/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 blur-2xl" />
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-teal-400" />
                    Quick Response
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    I typically respond within 2-4 hours for urgent inquiries. Let's start building!
                  </p>
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/anup-koturwar/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-600 transition-all">
                      <Linkedin size={18} />
                    </a>
                    <a href="https://github.com/Anupk2002" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 transition-all">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={isContactHighlight ? { scale: [1, 1.02, 1] } : {}}
                className={`glass-card p-8 md:p-12 rounded-[2.5rem] relative transition-all duration-500 ${isContactHighlight ? 'border-teal-500/50 shadow-[0_0_50px_rgba(20,184,166,0.2)]' : ''}`}
              >
                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 transition-all invalid:border-red-500/50 peer"
                      />
                      <p className="hidden peer-invalid:block text-[10px] text-red-400 font-bold uppercase tracking-widest ml-1">Please enter your name</p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 transition-all invalid:border-red-500/50 peer"
                      />
                      <p className="hidden peer-invalid:block text-[10px] text-red-400 font-bold uppercase tracking-widest ml-1">Please enter a valid email</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Preferred Contact Method</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="relative flex items-center gap-4 p-5 bg-slate-950/50 border border-white/5 rounded-2xl cursor-pointer hover:border-teal-500/30 transition-all group overflow-hidden">
                        <input type="radio" name="method" value="whatsapp" defaultChecked className="peer hidden" />
                        <div className="absolute inset-0 bg-teal-500/5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                        <div className="w-6 h-6 border-2 border-slate-700 rounded-full flex items-center justify-center peer-checked:border-teal-500 peer-checked:bg-teal-500/20 transition-all z-10">
                          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                        </div>
                        <div className="flex items-center gap-3 z-10">
                          <MessageSquare size={22} className="text-green-400 group-hover:scale-110 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-200 uppercase tracking-wider">WhatsApp</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Instant Response</span>
                          </div>
                        </div>
                      </label>
                      <label className="relative flex items-center gap-4 p-5 bg-slate-950/50 border border-white/5 rounded-2xl cursor-pointer hover:border-teal-500/30 transition-all group overflow-hidden">
                        <input type="radio" name="method" value="email" className="peer hidden" />
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                        <div className="w-6 h-6 border-2 border-slate-700 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500/20 transition-all z-10">
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                        </div>
                        <div className="flex items-center gap-3 z-10">
                          <Mail size={22} className="text-blue-400 group-hover:scale-110 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-200 uppercase tracking-wider">Email</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Formal Inquiry</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Your Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or inquiry..."
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 transition-all resize-none invalid:border-red-500/50 peer"
                    />
                    <p className="hidden peer-invalid:block text-[10px] text-red-400 font-bold uppercase tracking-widest ml-1">Message cannot be empty</p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 uppercase tracking-[0.2em] text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
                      animate={{ opacity: 1, scale: 1, backdropFilter: 'blur(10px)' }}
                      exit={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
                      className="absolute inset-0 z-50 flex items-center justify-center p-8 md:p-12 rounded-[2.5rem] bg-slate-950/80"
                    >
                      <div className="text-center space-y-6">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12 }}
                          className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-teal-500/40"
                        >
                          <CheckCircle size={48} className="text-slate-950" />
                        </motion.div>
                        <div className="space-y-2">
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Message Sent!</h3>
                          <p className="text-slate-400 font-medium">Redirecting you to complete the conversation...</p>
                        </div>
                        <button 
                          onClick={() => setShowSuccess(false)}
                          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 uppercase tracking-widest text-xs"
                        >
                          Send Another
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      <footer className="py-12 px-6 bg-slate-950/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-sm font-medium">
            <p>© 2025 Anupkumar Koturwar. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProjectId && selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto px-6 py-20 relative">
              <button 
                onClick={() => setSelectedProjectId(null)}
                className="fixed top-8 right-8 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all z-[210]"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
              >
                {/* Header */}
                <div className="space-y-6">
                  <button 
                    onClick={() => setSelectedProjectId(null)}
                    className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    <ArrowLeft size={16} /> Back to Portfolio
                  </button>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                      <span className="text-xs font-bold text-teal-500 bg-teal-500/10 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                        {selectedProject.highlight}
                      </span>
                      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">{selectedProject.title}</h1>
                    </div>
                    <div className="flex gap-4">
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white text-slate-950 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                        <Github size={20} /> Source
                      </a>
                      {selectedProject.demo && (
                        <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                          <ExternalLink size={20} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-7 space-y-12">
                    {/* Project Images Gallery */}
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.images.map((img, i) => (
                          <motion.div 
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                          >
                            <img 
                              src={img} 
                              alt={`${selectedProject.title} detail ${i + 1}`}
                              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                              <p className="text-xs font-bold text-white uppercase tracking-widest">Detail View {i + 1}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                          <FileText size={18} className="text-teal-400" />
                        </div>
                        Project Overview
                      </h2>
                      <p className="text-slate-400 text-lg leading-relaxed">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.skillUsage && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Code size={18} className="text-purple-400" />
                          </div>
                          How I Applied My Skills
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedProject.skillUsage.map((item, i) => (
                            <div key={i} className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl group hover:border-purple-500/30 transition-all">
                              <h4 className="text-purple-400 font-bold text-sm mb-2 uppercase tracking-widest">{item.skill}</h4>
                              <p className="text-slate-400 text-sm leading-relaxed">{item.usage}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Zap size={18} className="text-blue-400" />
                        </div>
                        Key Features
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedProject.features.map((feat, i) => (
                          <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-3">
                            <CheckCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-300">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.challenges && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <ShieldCheck size={18} className="text-red-400" />
                          </div>
                          Challenges & Solutions
                        </h2>
                        <ul className="space-y-4">
                          {selectedProject.challenges.map((challenge, i) => (
                            <li key={i} className="text-slate-400 text-sm leading-relaxed pl-6 relative">
                              <div className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 space-y-8">
                    <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Terminal size={14} className="text-teal-400" />
                        Tech Stack Visualization
                      </h3>
                      <div className="space-y-4">
                        {selectedProject.tags.map((tag, i) => (
                          <div key={tag} className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                              <span className="text-slate-300">{tag}</span>
                              <span className="text-teal-400">{(90 - i * 5)}% Proficiency</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${90 - i * 5}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-8 rounded-3xl border-white/5">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-sm font-medium text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 rounded-3xl border border-white/5 p-6 overflow-hidden">
                      <span className="text-[10px] font-mono text-slate-600 mb-6 uppercase tracking-[0.2em] block text-center">Architecture Diagram</span>
                      <div className="scale-90 origin-top">
                        {selectedProject.diagram}
                      </div>
                    </div>

                    {selectedProject.learnings && (
                      <div className="glass-card p-8 rounded-3xl border-teal-500/20 bg-teal-500/5">
                        <h3 className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-6">Key Learnings</h3>
                        <ul className="space-y-4">
                          {selectedProject.learnings.map((learning, i) => (
                            <li key={i} className="text-slate-300 text-sm flex items-start gap-3">
                              <Sparkles size={16} className="text-teal-500 shrink-0 mt-0.5" />
                              {learning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
