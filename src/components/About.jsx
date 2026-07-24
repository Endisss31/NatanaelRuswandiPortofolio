import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Target, Award, Milestone } from 'lucide-react'
import { profileInfo } from '../data/mockData'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const About = () => {
  const [profile, setProfile] = useState(() => {
    const local = localStorage.getItem('db_profile')
    return local ? JSON.parse(local) : profileInfo
  })

  useEffect(() => {
    const fetchProfile = async () => {
      let loadedProfile = null

      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.from('profile').select('*').limit(1)
          if (!error && data && data.length > 0) {
            const row = data[0]
            loadedProfile = {
              mission: row.mission || profileInfo.mission,
              years_exp: row.years_exp || profileInfo.years_exp || "3+",
              projects_count: row.projects_count || profileInfo.projects_count || "20+",
              careerGoals: row.career_goals || row.careerGoals || profileInfo.careerGoals,
              education: row.education ? (typeof row.education === 'string' ? JSON.parse(row.education) : row.education) : profileInfo.education
            }
          }
        }
      } catch (err) {
        console.error("Error loading about profile:", err)
      }

      if (!loadedProfile) {
        const local = localStorage.getItem('db_profile')
        if (local) {
          try {
            const parsed = JSON.parse(local)
            loadedProfile = {
              mission: parsed.mission || profileInfo.mission,
              years_exp: parsed.years_exp || profileInfo.years_exp || "3+",
              projects_count: parsed.projects_count || profileInfo.projects_count || "20+",
              careerGoals: parsed.career_goals || parsed.careerGoals || profileInfo.careerGoals,
              education: parsed.education || profileInfo.education
            }
          } catch (e) {}
        }
      }

      if (loadedProfile) {
        setProfile((prev) => ({ ...prev, ...loadedProfile }))
      }
    }
    fetchProfile()
  }, [])

  const educationList = profile.education && profile.education.length > 0 ? profile.education : profileInfo.education

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">About Me</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          Here is a brief summary of my educational background, career goals, and professional trajectory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Details Card */}
        <motion.div 
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Quick Info & Bio */}
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Milestone size={20} className="text-blue-500" />
              My Mission
            </h3>
            <p className="text-slate-650 dark:text-slate-300 leading-relaxed mb-6">
              {profile.mission || profileInfo.mission}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.years_exp || "3+"}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">Years Projects</div>
              </div>
              <div className="p-4 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{profile.projects_count || "20+"}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">Completed Apps</div>
              </div>
            </div>
          </div>

          {/* Career Goals */}
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
              <Target size={20} className="text-indigo-500" />
              Career Focus
            </h3>
            <p className="text-slate-650 dark:text-slate-300 leading-relaxed">
              {profile.careerGoals || profile.career_goals || profileInfo.careerGoals}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Timeline & Education */}
        <motion.div 
          className="lg:col-span-7 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
              <GraduationCap size={22} className="text-purple-500" />
              Education History
            </h3>

            <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 pl-6 space-y-8">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-950 border-2 border-purple-500 group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold w-max">
                      {edu.period}
                    </span>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-3">
                    {edu.institution}
                  </p>
                  <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-4 bg-slate-100/40 dark:bg-slate-900/10">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Looking for a collaborator?</h4>
              <p className="text-sm text-slate-555 dark:text-slate-400 leading-relaxed">
                I am open to research partnerships, open-source projects, and part-time/full-time AI engineering roles.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About
