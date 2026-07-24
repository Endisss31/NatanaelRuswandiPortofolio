import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, ShieldAlert } from 'lucide-react'

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Track scroll position for navbar style transformation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)

    if (location.pathname !== '/') {
      navigate('/')
      // Allow route change first, then scroll
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50">
      <nav 
        className={`w-full rounded-[999px] transition-all duration-300 backdrop-blur-2xl backdrop-saturate-150 px-6 sm:px-8 py-3 shadow-2xl ${
          scrolled 
            ? 'bg-white/35 dark:bg-slate-900/40 border border-white/50 dark:border-white/15 shadow-black/10 dark:shadow-black/40' 
            : 'bg-white/20 dark:bg-slate-900/25 border border-white/40 dark:border-white/10 shadow-black/5 dark:shadow-black/30'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl sm:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:opacity-80 transition-opacity"
          >
            NR
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-800 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-white/40 dark:hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}

            {/* Dash icon shortcut */}
            <RouterLink
              to="/admin/dashboard"
              className="text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 p-2 rounded-full transition-colors ml-2 hover:bg-white/40 dark:hover:bg-white/10"
              title="Admin Portal"
            >
              <ShieldAlert size={18} />
            </RouterLink>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:text-amber-500 dark:hover:text-amber-400 transition-all shadow-sm ml-3 backdrop-blur-md"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu trigger buttons */}
          <div className="flex items-center lg:hidden gap-2">
            <RouterLink
              to="/admin/dashboard"
              className="text-slate-500 dark:text-slate-400 hover:text-amber-500 p-2 rounded-full transition-colors"
              title="Admin Portal"
            >
              <ShieldAlert size={18} />
            </RouterLink>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-100 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Open menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden mt-2 w-full bg-white/40 dark:bg-slate-900/45 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl px-6 py-5 shadow-2xl flex flex-col gap-2 transition-all">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-800 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400 text-base font-semibold py-2.5 px-3 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
