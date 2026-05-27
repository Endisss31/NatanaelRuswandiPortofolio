import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, FileDown, ArrowRight } from 'lucide-react'
import { profileInfo } from '../data/mockData'

const Hero = () => {
  const words = profileInfo.subtitles
  const [wordIndex, setWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(150)

  useEffect(() => {
    let timer;
    const fullWord = words[wordIndex]

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1))
        setSpeed(60)
      }, speed)
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1))
        setSpeed(150)
      }, speed)
    }

    if (!isDeleting && currentText === fullWord) {
      // Pause at full word before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
      setSpeed(300) // Small pause before typing next word
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, wordIndex])

  const scrollSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-6 sm:px-8">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left text segment */}
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6">
            Welcome to my portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Hi, I'm <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
              {profileInfo.name}
            </span>
          </h1>

          <div className="h-12 flex items-center justify-center lg:justify-start text-xl sm:text-2xl text-slate-700 dark:text-slate-350 font-semibold mb-6">
            <span>Creative&nbsp;</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold border-r-2 border-blue-500 pr-1 animate-pulse">
              {currentText || '\u00A0'}
            </span>
          </div>

          <p className="text-slate-650 dark:text-slate-400 text-base sm:text-lg max-w-lg mb-8 mx-auto lg:mx-0 leading-relaxed">
            {profileInfo.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-10">
            <button 
              onClick={() => scrollSection('projects')}
              className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 duration-300 w-full sm:w-auto justify-center"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href={profileInfo.cvUrl} 
              download
              className="px-8 py-3.5 rounded-full glass-panel hover:bg-slate-100 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 font-semibold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 duration-300 w-full sm:w-auto"
            >
              Download CV
              <FileDown size={18} />
            </a>
          </div>

          {/* Social connections */}
          <div className="flex justify-center lg:justify-start gap-4 text-slate-500 dark:text-slate-400">
            {[
              { icon: <Github size={20} />, link: "https://github.com", label: "Github" },
              { icon: <Linkedin size={20} />, link: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Instagram size={20} />, link: "https://instagram.com", label: "Instagram" },
              { icon: <Mail size={20} />, link: "mailto:your-email@example.com", label: "Email" }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.link}
                target="_blank"
                rel="noreferrer"
                aria-label={soc.label}
                className="p-3 rounded-full bg-white dark:bg-slate-900/50 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right profile image segment */}
        <motion.div 
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {/* Spinning decorative frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            
            {/* Orbiting Ring */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-slate-300 dark:border-slate-700 animate-spin-slow"></div>

            {/* Main Picture */}
            <div className="w-full h-full rounded-full border-4 border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl relative z-10 bg-slate-100 dark:bg-slate-900">
              <img 
                src="/assets/images/profile3.jpg" 
                alt={profileInfo.name} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Hero
