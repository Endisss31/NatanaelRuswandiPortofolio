import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Server, BrainCircuit, Smartphone, Wrench } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockSkills } from '../data/mockData'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('created_at', { ascending: true })

          if (error) throw error
          if (data && data.length > 0) {
            setSkills(data)
            return
          }
        }
      } catch (err) {
        console.error("Error loading skills from database, using fallback:", err)
      } finally {
        setLoading(false)
      }
      // Fallback
      setSkills(mockSkills)
    }

    fetchSkills()
  }, [])

  const categories = [
    { id: 'All', name: 'All Skills', icon: null },
    { id: 'Frontend', name: 'Frontend', icon: <Code size={16} /> },
    { id: 'Backend', name: 'Backend', icon: <Server size={16} /> },
    { id: 'Artificial Intelligence', name: 'AI & Vision', icon: <BrainCircuit size={16} /> },
    { id: 'Mobile Development', name: 'Mobile', icon: <Smartphone size={16} /> },
    { id: 'Tools', name: 'Tools', icon: <Wrench size={16} /> }
  ]

  const filteredSkills = activeTab === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Skills & Technical Proficiencies</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          My primary development skill set and proficiency levels. Filter by category to view detailed items.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border transition-all duration-300 ${
              activeTab === cat.id
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skill List Container */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 rounded-2xl hover:border-blue-500/20 dark:hover:border-blue-500/25 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm dark:shadow-md"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base">
                {skill.name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/30 dark:border-white/5">
                {skill.proficiency}%
              </span>
            </div>

            {/* Progress track */}
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Skills
