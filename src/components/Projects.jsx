import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockProjects } from '../data/mockData'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) throw error
          if (data && data.length > 0) {
            setProjects(data)
            return
          }
        }
      } catch (err) {
        console.error("Error loading projects from database, using fallback:", err)
      } finally {
        setLoading(false)
      }
      // Fallback
      setProjects(mockProjects)
    }

    fetchProjects()
  }, [])

  const filters = ['All', 'AI', 'Mobile', 'Web']

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Featured Projects</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          A selection of my recent works ranging from edge computer vision models to responsive web applications.
        </p>
      </div>

      {/* Filter Menu */}
      <div className="flex justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group flex flex-col h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 dark:hover:border-blue-500/25 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-blue-500/5 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-950/70 backdrop-blur-md border border-slate-200 dark:border-white/10 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Body */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-white/5 text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-white/5">
                  <div className="flex gap-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950/40 hover:bg-slate-200 dark:hover:bg-slate-950 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live_link && project.live_link !== '#' && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950/40 hover:bg-slate-200 dark:hover:bg-slate-950 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group/btn"
                  >
                    View Details
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close triggers */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-10 shadow-sm"
              >
                <X size={18} />
              </button>

              {/* Modal Banner */}
              <div className="h-60 bg-slate-100 dark:bg-slate-950 relative">
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                  }}
                />
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
                  {selectedProject.category} Project
                </span>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {selectedProject.title}
                </h3>
                
                <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Technologies Utilized
                </h4>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-600 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between gap-4 pt-6 border-t border-slate-200/50 dark:border-white/5">
                  {selectedProject.github_link && (
                    <a
                      href={selectedProject.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-white font-semibold text-center text-sm flex items-center justify-center gap-2 border border-slate-250 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all"
                    >
                      <Github size={18} />
                      View Codebase
                    </a>
                  )}
                  {selectedProject.live_link && selectedProject.live_link !== '#' && (
                    <a
                      href={selectedProject.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-center text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-indigo-500/20 transition-all"
                    >
                      <ExternalLink size={18} />
                      Live Preview
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
