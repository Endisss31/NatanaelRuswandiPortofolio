import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from './lib/supabase'

// Pages & Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

// Theme Provider and Page Layout
const MainLayout = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-15%] left-[20%] w-[35rem] h-[35rem] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="relative">
        <section id="home">
          <Hero />
        </section>
        <section id="about" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-slate-100/40 dark:bg-slate-900/10">
          <About />
        </section>
        <section id="skills" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-white dark:bg-slate-900/20">
          <Skills />
        </section>
        <section id="projects" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-slate-100/40 dark:bg-slate-900/10">
          <Projects />
        </section>
        <section id="experience" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-white dark:bg-slate-900/20">
          <Experience />
        </section>
        <section id="certificates" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-slate-100/40 dark:bg-slate-900/10">
          <Certificates />
        </section>
        <section id="achievements" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-white dark:bg-slate-900/20">
          <Achievements />
        </section>
        <section id="contact" className="py-20 md:py-28 border-t border-slate-200/50 dark:border-white/5 bg-slate-100/40 dark:bg-slate-900/10">
          <Contact />
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-400 dark:text-slate-500 border-t border-slate-200/50 dark:border-white/5">
        <p>&copy; {new Date().getFullYear()} Natanael Ruswandi. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // System theme configuration checks
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
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

  // Manage login session
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setLoading(false)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } else {
      // Mock session check for preview mode
      const mockUser = localStorage.getItem('mock_admin_session')
      if (mockUser) {
        setSession({ user: { email: 'mockadmin@example.com' } })
      }
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-400 font-medium">Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout darkMode={darkMode} setDarkMode={handleSetDarkMode} />} />
        <Route 
          path="/admin/login" 
          element={
            session ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            session ? <AdminDashboard session={session} /> : <Navigate to="/admin/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
