import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import ProjectDetail from './pages/ProjectDetail'
import SEOHead from './components/SEO/SEOHead'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

import { LanguageProvider, useLanguage } from './context/LanguageContext'

const MainContent = ({ darkMode, setDarkMode, onSelectProject }) => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">

      {/* ── Global SEO for main portfolio page ── */}
      <SEOHead
        title="Junior Web Developer & Network Administrator"
        description="Portfolio of Natanael Ruswandi — Junior Web Developer, Network Administrator, and UI/UX Designer based in Kuningan, West Java, Indonesia. 2+ years experience, 10+ projects."
        canonicalPath="/"
        ogType="profile"
      />

      {/* Background Ambience (Clean, non-distracting subtle light) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-20" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-500/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute top-[30%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[35rem] h-[35rem] bg-slate-500/10 rounded-full filter blur-[120px]"></div>
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main id="main-content" className="relative">
        {/* Section 1: Clean (Hero) */}
        <section id="home" aria-label="Introduction">
          <Hero />
        </section>

        {/* Section 2: Pattern (About) */}
        <section id="about" aria-label="About Me" className="relative py-20 md:py-28 bg-pattern bg-slate-100/40 dark:bg-slate-900/20 overflow-hidden">
          <About />
        </section>

        {/* Section 3: Clean (Skills) */}
        <section id="skills" aria-label="Skills & Technologies" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950">
          <Skills />
        </section>

        {/* Section 4: Pattern (Projects) */}
        <section id="projects" aria-label="Portfolio Projects" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-pattern bg-slate-100/40 dark:bg-slate-900/20">
          <Projects onSelectProject={onSelectProject} />
        </section>

        {/* Section 5: Clean (Experience) */}
        <section id="experience" aria-label="Work Experience" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-950">
          <Experience />
        </section>

        {/* Section 6: Pattern (Certificates) */}
        <section id="certificates" aria-label="Certifications & Training" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-pattern bg-slate-100/40 dark:bg-slate-900/20">
          <Certificates />
        </section>

        {/* Section 7: Clean (Contact) */}
        <section id="contact" aria-label="Contact Me" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-950">
          <Contact />
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-950" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} Natanael Ruswandi. {t('footer.rights')}</p>
      </footer>
    </div>
  )
}

// Route Wrapper Component for Project Detail URL (/project/:id)
const ProjectDetailRouteWrapper = ({ onBack }) => {
  const { id } = useParams()
  return <ProjectDetail projectId={id} onBack={onBack} />
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeProjectId, setActiveProjectId] = useState(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleSetDarkMode = (val) => {
    setDarkMode(val)
    if (val) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleSelectProject = (id) => {
    setActiveProjectId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToPortfolio = () => {
    setActiveProjectId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <LanguageProvider>
      {activeProjectId ? (
        <ProjectDetail projectId={activeProjectId} onBack={handleBackToPortfolio} />
      ) : (
        <Routes>
          <Route path="/" element={<MainContent darkMode={darkMode} setDarkMode={handleSetDarkMode} onSelectProject={handleSelectProject} />} />
          <Route path="/project/:id" element={<ProjectDetailRouteWrapper onBack={handleBackToPortfolio} />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      )}
    </LanguageProvider>
  )
}

export default App
