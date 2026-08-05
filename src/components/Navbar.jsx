import React, { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)
  const { lang, toggleLanguage, t } = useLanguage()

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    setDropdownOpen(false)

    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const portfolioSubLinks = [
    { key: 'skills', name: t('nav.skills'), href: '#skills', icon: <Code size={16} className="text-blue-500" /> },
    { key: 'projects', name: t('nav.projects'), href: '#projects', icon: <FolderKanban size={16} className="text-indigo-500" /> },
    { key: 'experience', name: t('nav.experience'), href: '#experience', icon: <Briefcase size={16} className="text-emerald-500" /> },
    { key: 'certificates', name: t('nav.certificates'), href: '#certificates', icon: <Award size={16} className="text-amber-500" /> },
  ]

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-5xl z-50">
      <nav
        className={`w-full rounded-full transition-all duration-500 backdrop-blur-3xl px-5 sm:px-7 py-2.5 sm:py-3 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-white/5 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
        }`}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400' : 'text-white hover:text-blue-300'
            }`}
          >
            Natanael<span className="text-blue-600 dark:text-blue-400">.</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                scrolled ? 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('nav.home')}
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                scrolled ? 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('nav.about')}
            </a>

            {/* Portofolio Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="portfolio-dropdown"
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  scrolled ? 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{t('nav.portfolio')}</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div id="portfolio-dropdown" role="menu" className="absolute top-full left-0 mt-2 w-56 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-2 flex flex-col gap-1 z-50">
                  {portfolioSubLinks.map((sub) => (
                    <a
                      key={sub.key}
                      href={sub.href}
                      role="menuitem"
                      onClick={(e) => handleNavClick(e, sub.href)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {sub.icon}
                      <span>{sub.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                scrolled ? 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('nav.contact')}
            </a>
          </div>

          {/* Right Action Icons (Language & Theme) */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
              <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                scrolled
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white border border-slate-200 dark:border-white/15'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
              }`}
              aria-label={`Switch language to ${lang === 'en' ? 'Indonesian' : 'English'}`}
              title="Switch Language / Ubah Bahasa"
            >
              <Globe size={13} className="text-blue-500" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all ${
                scrolled
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white border border-slate-200 dark:border-white/15'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
              }`}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-600" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-2 transition-all">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-slate-800 dark:text-slate-100 font-semibold py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t('nav.home')}
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-slate-800 dark:text-slate-100 font-semibold py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t('nav.about')}
          </a>

          <div className="py-2 border-t border-b border-slate-200/60 dark:border-slate-800 my-1 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3">{t('nav.portfolio')}</span>
            {portfolioSubLinks.map((sub) => (
              <a
                key={sub.key}
                href={sub.href}
                onClick={(e) => handleNavClick(e, sub.href)}
                className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
              >
                {sub.icon}
                <span>{sub.name}</span>
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-slate-800 dark:text-slate-100 font-semibold py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t('nav.contact')}
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
