import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  MessageSquareCode, 
  Layers, 
  Code, 
  Maximize2, 
  X,
  UserCheck
} from 'lucide-react'
import { mockProjects, profileInfo } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const ProjectDetail = ({ projectId: propProjectId, onBack }) => {
  const { t } = useLanguage()
  const params = useParams()
  const navigate = useNavigate ? useNavigate() : null

  const projectId = propProjectId || params?.id || 'p3'

  const project = mockProjects.find(p => p.id === projectId) || mockProjects[2] // Fallback to SilatPRO (p3)

  const galleryImages = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image_url]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [projectId])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (navigate) {
      navigate('/')
    } else {
      window.location.href = '/'
    }
  }

  const hasLiveLink = project.live_link && project.live_link !== '#'
  const targetLiveUrl = hasLiveLink ? project.live_link : project.github_link

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 py-10 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Back Link Header */}
        <div>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke Portofolio</span>
          </button>
        </div>

        {/* Section 1: Hero Header & Project Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Title & Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {project.title} <span className="text-slate-400 dark:text-slate-500 font-normal">| {project.subtitle || project.category}</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={profileInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base inline-flex items-center gap-2.5 shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquareCode size={19} />
                Konsultasi Project Serupa
              </a>

              {targetLiveUrl && (
                <a
                  href={targetLiveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:border-blue-500/40 font-bold text-sm sm:text-base inline-flex items-center gap-2.5 shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  <ExternalLink size={19} className="text-blue-500" />
                  {hasLiveLink ? "Kunjungi Situs Live" : "Lihat Source Code"}
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Ringkasan Project Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-5 border border-slate-200/80 dark:border-white/10 shadow-xl">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg">
                <Layers className="w-5 h-5 text-blue-500" />
                <span>Ringkasan Project</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Kategori</span>
                  <span className="font-bold text-slate-900 dark:text-white">{project.category}</span>
                </div>
                
                <div className="border-t border-slate-200/60 dark:border-white/10"></div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Status Build</span>
                  <span className="font-bold text-slate-900 dark:text-white">{project.status || 'Selesai'}</span>
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-white/10 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  TEKNOLOGI DIGUNAKAN
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl glass-badge text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200/60 dark:border-white/10 pt-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <UserCheck size={14} /> TIM PENGEMBANG
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm">
                  <img
                    src="/assets/images/profile3.jpg"
                    alt={profileInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Media Showcase Gallery / Carousel */}
        <div className="space-y-4">
          {/* Main Featured Image Container */}
          <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-900 overflow-hidden shadow-2xl group">
            <div className="h-[350px] sm:h-[500px] md:h-[550px] w-full flex items-center justify-center bg-slate-950/90 relative">
              <img
                src={galleryImages[activeImageIndex]}
                alt={`${project.title} slide ${activeImageIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-300"
              />
            </div>

            {/* Expand Button Floating */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 hover:bg-slate-900 transition-colors shadow-lg"
            >
              <Maximize2 size={14} />
              <span>Klik untuk Perbesar</span>
            </button>
          </div>

          {/* Thumbnail Selector Bar */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 sm:w-24 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105 shadow-md'
                      : 'border-slate-200/60 dark:border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-slate-950/80 text-[10px] text-white font-bold">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Studi Kasus & Komponen Teknologi Utama */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Studi Kasus & Fitur */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                STUDI KASUS & FITUR
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Solusi & Keunggulan Produk
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {project.solution || project.description}
              </p>
            </div>

            {/* Right Side: Komponen Teknologi Utama Card */}
            <div className="lg:col-span-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-white/10 shadow-xl">
                <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg sm:text-xl">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span>Komponen Teknologi Utama</span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Project ini dibangun menggunakan kombinasi teknologi modern untuk menjamin kestabilan, kecepatan, serta kemudahan dalam pengembangan fitur di masa depan.
                </p>

                {/* 2-Column Tech Grid Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {project.tech_stack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-2xl glass-badge border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-center font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:border-blue-500/40 transition-colors shadow-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Full Screen Image Preview */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <X size={24} />
            </button>

            <div className="max-w-6xl max-h-[90vh] p-2" onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryImages[activeImageIndex]}
                alt="Full Preview"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectDetail
