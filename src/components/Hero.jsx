import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, FileDown, ArrowRight, MessageSquareCode, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { profileInfo } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'
import Silk from './Silk'
import BounceCards from './BounceCards'

const heroImages = [
  "/assets/images/profile1.jpeg",
  "/assets/images/profile2.png",
  "/assets/images/profile3.jpg"
]

const transformStyles = [
  "rotate(-14deg) translate(-110px, 12px)",
  "rotate(5deg) translate(-5px, -18px)",
  "rotate(-8deg) translate(105px, 15px)"
]


const Hero = () => {
  const { t, lang } = useLanguage()

  const displayBio = lang === 'en' ? profileInfo.bio_en : profileInfo.bio_id
  const words = lang === 'en' ? profileInfo.subtitles_en : profileInfo.subtitles_id

  const [wordIndex, setWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(120)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const showPrev = () => setSelectedIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  const showNext = () => setSelectedIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

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
              rel="noopener noreferrer"
              aria-label="Chat with Natanael Ruswandi via WhatsApp"
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto text-sm"
            >
              <FaWhatsapp size={18} />
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
                rel="noopener noreferrer"
                aria-label={`Visit Natanael Ruswandi's ${soc.label} profile`}
                className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-sm"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Avatar Card - BounceCards */}
        <motion.div
          className="flex-1 flex justify-center items-center w-full min-h-[380px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <BounceCards
            className="custom-bounceCards"
            images={heroImages}
            containerWidth={500}
            containerHeight={300}
            animationDelay={0.5}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
            onCardClick={(_, idx) => setSelectedIndex(idx)}
          />
        </motion.div>

      </div>

      {/* Borderless & Swipeable Image Lightbox Modal */}
      <AnimatePresence initial={false}>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md shadow-lg"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md shadow-lg transform hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md shadow-lg transform hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image display without box/frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex items-center justify-center pointer-events-auto px-4"
            >
              <motion.img
                key={selectedIndex}
                src={heroImages[selectedIndex]}
                alt={`Profile ${selectedIndex + 1}`}
                initial={{ opacity: 0, scale: 0.92, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipeThreshold = 50
                  if (offset.x > swipeThreshold || velocity.x > 500) {
                    showPrev()
                  } else if (offset.x < -swipeThreshold || velocity.x < -500) {
                    showNext()
                  }
                }}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Pagination Dots */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md"
            >
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex ? 'bg-white w-7' : 'bg-white/40 hover:bg-white/70 w-2.5'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Hero
