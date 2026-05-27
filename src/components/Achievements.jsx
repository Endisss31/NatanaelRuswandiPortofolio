import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, BookOpen, Sparkles, Mic, Calendar } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockAchievements } from '../data/mockData'

const Achievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('achievements')
            .select('*')
            .order('date', { ascending: false })

          if (error) throw error
          if (data && data.length > 0) {
            setAchievements(data)
            return
          }
        }
      } catch (err) {
        console.error("Error loading achievements from database, using fallback:", err)
      } finally {
        setLoading(false)
      }
      // Fallback
      setAchievements(mockAchievements)
    }

    fetchAchievements()
  }, [])

  // Maps achievement type to matching Lucide icon
  const getAchievementIcon = (type) => {
    switch (type) {
      case 'Competitions':
        return <Trophy className="text-yellow-500 dark:text-yellow-400" size={24} />
      case 'Publications':
        return <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
      case 'Awards':
        return <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
      case 'Seminars':
        return <Mic className="text-emerald-600 dark:text-emerald-400" size={24} />
      default:
        return <Trophy className="text-slate-500 dark:text-slate-400" size={24} />
    }
  }

  // Maps type to matching border colors
  const getAchievementBadgeColor = (type) => {
    switch (type) {
      case 'Competitions':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
      case 'Publications':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
      case 'Awards':
        return 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400'
      case 'Seminars':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
      default:
        return 'bg-slate-500/10 border-slate-500/20 text-slate-500 dark:text-slate-400'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Achievements & Honors</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          Recognitions, competitive honors, public seminars, and academic publications.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((ach) => (

          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card hover:border-slate-350 dark:hover:border-slate-800 hover:-translate-y-1 transition-all flex flex-col justify-between shadow-sm dark:shadow-md"
          >
            <div>
              {/* Header Icon & Tag */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                  {getAchievementIcon(ach.type)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAchievementBadgeColor(ach.type)}`}>
                  {ach.type}
                </span>
              </div>

              {/* Title & Body */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {ach.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {ach.description}
              </p>
            </div>

            {/* Date info footer */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-semibold pt-4 border-t border-slate-200/50 dark:border-white/5">
              <Calendar size={14} />
              <span>{ach.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Achievements
