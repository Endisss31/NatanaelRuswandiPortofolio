import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'

import { LanguageProvider, useLanguage } from './context/LanguageContext'

const MainContent = ({ darkMode, setDarkMode }) => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Background Ambience (Clean, non-distracting subtle light) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-500/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute top-[30%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[35rem] h-[35rem] bg-slate-500/10 rounded-full filter blur-[120px]"></div>
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="relative">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-900/10">
          <About />
        </section>

        <section id="skills" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/20">
          <Skills />
        </section>

        <section id="projects" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-900/10">
          <Projects />
        </section>

        <section id="experience" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/20">
          <Experience />
        </section>

        <section id="certificates" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-900/10">
          <Certificates />
        </section>

        <section id="contact" className="py-20 md:py-28 border-t border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/20">
          <Contact />
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-950">
        <p>&copy; {new Date().getFullYear()} Natanael Ruswandi. {t('footer.rights')}</p>
      </footer>
    </div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)

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

  return (
    <LanguageProvider>
      <MainContent darkMode={darkMode} setDarkMode={handleSetDarkMode} />
    </LanguageProvider>
  )
}

export default App
