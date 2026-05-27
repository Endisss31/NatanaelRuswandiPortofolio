import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, FlaskConical, Users2, Laptop } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockExperiences } from '../data/mockData'

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('start_date', { ascending: false })

          if (error) throw error
          if (data && data.length > 0) {
            setExperiences(data)
            return
          }
        }
      } catch (err) {
        console.error("Error loading experiences from database, using fallback:", err)
      } finally {
        setLoading(false)
      }
      // Fallback
      setExperiences(mockExperiences)
    }

    fetchExperiences()
  }, [])

  // Maps experience type to matching Lucide icon
  const getExperienceIcon = (type) => {
    switch (type) {
      case 'Internship':
        return <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
      case 'Research':
        return <FlaskConical size={18} className="text-purple-600 dark:text-purple-400" />
      case 'Organization':
        return <Users2 size={18} className="text-emerald-600 dark:text-emerald-400" />
      case 'Freelance':
        return <Laptop size={18} className="text-pink-600 dark:text-pink-400" />
      default:
        return <Briefcase size={18} className="text-slate-500 dark:text-slate-400" />
    }
  }

  // Maps experience type to matching styling colors
  const getExperienceColor = (type) => {
    switch (type) {
      case 'Internship':
        return 'border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5'
      case 'Research':
        return 'border-purple-500/20 text-purple-600 dark:text-purple-400 bg-purple-500/5'
      case 'Organization':
        return 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5'
      case 'Freelance':
        return 'border-pink-500/20 text-pink-600 dark:text-pink-400 bg-pink-500/5'
      default:
        return 'border-slate-500/20 text-slate-500 dark:text-slate-400 bg-slate-500/5'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Work & Leadership Experience</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          My professional milestones, internships, student organizations, and research projects.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div 
                key={exp.id} 
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* Checkpoint Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[15px] md:-translate-x-1/2 top-6 z-10 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center">
                  {getExperienceIcon(exp.type)}
                </div>

                {/* Timeline Panel */}
                <motion.div 
                  className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="glass-card hover:border-slate-350 dark:hover:border-slate-700 transition-all shadow-sm dark:shadow-md">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getExperienceColor(exp.type)} mb-2`}>
                          {exp.type}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-950/60 border border-slate-205 dark:border-white/5 text-slate-600 dark:text-slate-300">
                        {exp.start_date} - {exp.end_date}
                      </span>
                    </div>

                    {/* Details */}
                    <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>

                  </div>
                </motion.div>

                {/* Spacer (Desktop Only) */}
                <div className="hidden md:block w-8"></div>
                
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Experience
