import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Target, Milestone, MapPin, Mail, Phone } from 'lucide-react'
import { profileInfo } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'
import { usePortfolioData } from '../lib/usePortfolioData'

const About = () => {
  const { t, lang } = useLanguage()
  const { profile } = usePortfolioData()

  const currentProfile = profile || profileInfo
  const displayMission = lang === 'en' ? (currentProfile.mission_en || currentProfile.mission) : (currentProfile.mission_id || currentProfile.mission)
  const displayCareerGoals = lang === 'en' ? (currentProfile.career_goals_en || currentProfile.career_goals) : (currentProfile.career_goals_id || currentProfile.career_goals)

  const logoKampus = currentProfile.logoKampus || "/assets/images/logoKampus.png"
  const logoFakultas = currentProfile.logoFakultas || "/assets/images/logoFakultas.png"
  const logoSMK = currentProfile.logoSMK || "/assets/images/logoSMK.png"

  return (
    <div className="relative max-w-6xl mx-auto px-6 sm:px-8">

      {/* Smooth Floating Full Profile Background Overlay */}
      <motion.div
        className="absolute -right-24 sm:-right-36 lg:-right-48 xl:-right-60 bottom-[-20px] pointer-events-none z-0 opacity-40 dark:opacity-50 hidden md:block w-72 sm:w-80 lg:w-[28rem] select-none"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-blue-500/15 dark:bg-indigo-500/10 rounded-full blur-3xl transform scale-75"></div>
          <img
            src="/assets/images/fullprofile.png"
            alt="Full Profile Overlay"
            className="relative z-10 w-full h-auto object-contain filter drop-shadow-xl"
          />
        </div>
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          {t('about.title')}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Info Column */}
        <motion.div 
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Mission & Summary */}
          <div className="p-7 glass-card glass-card-hover">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Milestone size={20} className="text-blue-500" />
              {t('about.missionTitle')}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm sm:text-base font-normal">
              {displayMission}
            </p>
            
            <div className="space-y-3 pt-4 border-t border-slate-200/50 dark:border-white/10 text-sm">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <MapPin size={16} className="text-blue-500 shrink-0" />
                <span>{currentProfile.location || profileInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Mail size={16} className="text-indigo-500 shrink-0" />
                <span>{currentProfile.email || profileInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Phone size={16} className="text-emerald-500 shrink-0" />
                <span>{currentProfile.phone || profileInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Career Focus */}
          <div className="p-7 glass-card glass-card-hover">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Target size={20} className="text-indigo-500" />
              {t('about.careerFocusTitle')}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              {displayCareerGoals}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Education History */}
        <motion.div 
          className="lg:col-span-7 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-7 glass-card glass-card-hover">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
              <GraduationCap size={22} className="text-purple-500" />
              {t('about.educationHistoryTitle')}
            </h3>

            <div className="relative border-l-2 border-slate-200/80 dark:border-white/10 ml-6 pl-9 space-y-10">
              {(currentProfile.education || profileInfo.education).map((edu, idx) => {
                const isUniversity = edu.degree.toLowerCase().includes('s1') || edu.institution.toLowerCase().includes('universitas') || edu.institution.toLowerCase().includes('uniku')
                return (
                  <div key={idx} className="relative group">
                    {/* Transparent Institution Logo Node (No Border, Vertically Aligned) */}
                    <div 
                      className="absolute -left-[56px] top-0.5 w-10 h-10 flex items-center justify-center group-hover:scale-115 transition-transform z-10 select-none"
                      title={isUniversity ? "Universitas Kuningan" : "SMK Muhammadiyah 2 Kuningan"}
                    >
                      <img 
                        src={isUniversity ? logoKampus : logoSMK} 
                        alt="Institution Logo" 
                        className="w-full h-full object-contain filter drop-shadow-md" 
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                            {edu.degree}
                          </h4>
                          {isUniversity && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20 shadow-sm" title="Fakultas Ilmu Komputer">
                              <img src={logoFakultas} alt="Logo FKOM" className="w-4 h-4 object-contain" />
                              <span>FKOM</span>
                            </div>
                          )}
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mt-0.5">
                          {edu.institution} ({edu.location})
                        </p>
                      </div>

                      <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold w-max border border-blue-500/20 shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-2">
                      {edu.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Institutional Logos Showcase Card (Clean Transparent Logos) */}
          <div className="p-5 glass-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Logo Afiliasi & Akademik</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Universitas, Fakultas Ilmu Komputer & SMK</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={logoKampus} alt="Logo Kampus" className="w-9 h-9 object-contain filter drop-shadow-md hover:scale-115 transition-transform" title="Universitas Kuningan" />
              <img src={logoFakultas} alt="Logo Fakultas" className="w-9 h-9 object-contain filter drop-shadow-md hover:scale-115 transition-transform" title="Fakultas Ilmu Komputer" />
              <img src={logoSMK} alt="Logo SMK" className="w-9 h-9 object-contain filter drop-shadow-md hover:scale-115 transition-transform" title="SMK Muhammadiyah 2 Kuningan" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About
