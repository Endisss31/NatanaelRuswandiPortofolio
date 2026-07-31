import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, FileDown, ArrowRight, MessageSquareCode } from 'lucide-react'
import { profileInfo } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'
import Silk from './Silk'

const Hero = () => {
  const { t, lang } = useLanguage()

  const displayBio = lang === 'en' ? profileInfo.bio_en : profileInfo.bio_id
  const words = lang === 'en' ? profileInfo.subtitles_en : profileInfo.subtitles_id

  const [wordIndex, setWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(120)

  useEffect(() => {
    let timer;
    const currentWordList = words && words.length > 0 ? words : profileInfo.subtitles_id
    const safeIndex = wordIndex % currentWordList.length
    const fullWord = currentWordList[safeIndex] || ''

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1))
        setSpeed(50)
      }, speed)
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1))
        setSpeed(120)
      }, speed)
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % currentWordList.length)
      setSpeed(300)
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, wordIndex, words])

  const scrollSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden">

      {/* Silk WebGL animated background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Silk
          speed={5}
          scale={1}
          color="#1e3a5f"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Bottom fade — blends Hero into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" style={{ zIndex: 1 }} />

      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10">

        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center py-1.5 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{t('hero.welcome')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t('hero.hi')} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              {profileInfo.name}
            </span>
          </h1>

          {/* Dynamic typing role */}
          <div className="min-h-[2.5rem] flex items-center justify-center lg:justify-start text-lg sm:text-2xl text-slate-700 dark:text-slate-300 font-semibold mb-6 gap-x-2">
            <span className="text-slate-500 dark:text-slate-400">{t('hero.rolePrefix')}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold border-r-2 border-blue-500 pr-1 animate-pulse">
              {currentText || '\u00A0'}
            </span>
          </div>

          <p className="text-white text-base sm:text-lg max-w-xl mb-8 mx-auto lg:mx-0 leading-relaxed font-normal">
            {displayBio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center lg:justify-start mb-10">
            <button
              onClick={() => scrollSection('projects')}
              className="group px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center text-sm"
            >
              {t('hero.viewProjects')}
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={profileInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto text-sm"
            >
              <MessageSquareCode size={17} />
              {t('hero.quickWa')}
            </a>

            <a
              href={profileInfo.cvUrl}
              download="CV_Natanael_Ruswandi.pdf"
              className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto text-sm shadow-sm"
            >
              {t('hero.downloadCv')}
              <FileDown size={17} />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start items-center gap-3">
            {[
              { icon: <Github size={18} />, link: profileInfo.github, label: "Github" },
              { icon: <Linkedin size={18} />, link: profileInfo.linkedin, label: "LinkedIn" },
              { icon: <Instagram size={18} />, link: profileInfo.instagram, label: "Instagram" },
              { icon: <Mail size={18} />, link: `mailto:${profileInfo.email}`, label: "Email" }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.link}
                target="_blank"
                rel="noreferrer"
                aria-label={soc.label}
                className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-sm"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Avatar Card */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl rotate-3 opacity-20 dark:opacity-30 blur-lg"></div>

            <div className="w-full h-full rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xl relative z-10 flex items-center justify-center p-3">
              <img
                src="/assets/images/profile3.jpg"
                alt={profileInfo.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
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
