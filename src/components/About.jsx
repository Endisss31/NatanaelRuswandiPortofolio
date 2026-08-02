import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Target, Milestone, MapPin, Mail, Phone } from 'lucide-react'
import { profileInfo } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t, lang } = useLanguage()

  const displayMission = lang === 'en' ? profileInfo.mission_en : profileInfo.mission_id
  const displayCareerGoals = lang === 'en' ? profileInfo.career_goals_en : profileInfo.career_goals_id

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
                <span>{profileInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Mail size={16} className="text-indigo-500 shrink-0" />
                <span>{profileInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Phone size={16} className="text-emerald-500 shrink-0" />
                <span>{profileInfo.phone}</span>
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

            <div className="relative border-l-2 border-slate-200/80 dark:border-white/10 ml-3 pl-6 space-y-8">
              {profileInfo.education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-sm"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold w-max border border-blue-500/20">
                      {edu.period}
                    </span>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">
                    {edu.institution} ({edu.location})
                  </p>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 glass-card">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{t('about.collaboratorTitle')}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('about.collaboratorText')}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About
