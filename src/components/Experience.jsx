import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { mockExperiences } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const Experience = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          {t('experience.title')}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium">
          {t('experience.subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        {mockExperiences.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-7 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <Briefcase size={22} />
                </div>
                <div>
                  <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-2">
                    {exp.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {exp.role} — <span className="text-blue-600 dark:text-blue-400">{exp.company}</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-max shrink-0 border border-slate-200 dark:border-slate-700">
                <Calendar size={14} className="text-blue-500" />
                <span>{exp.start_date} - {exp.end_date}</span>
              </div>
            </div>

            {/* Task list details */}
            <div className="text-slate-650 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {exp.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Experience
