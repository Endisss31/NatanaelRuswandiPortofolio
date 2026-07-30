import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react'
import { mockProjects } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const Projects = () => {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filters = ['All', 'Web', 'Mobile']

  const filteredProjects = activeFilter === 'All'
    ? mockProjects
    : mockProjects.filter(p => p.category === activeFilter)

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          {t('projects.title')}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium">
          {t('projects.subtitle')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${
              activeFilter === filter
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {filter === 'All' ? t('projects.allCategories') : filter}
          </button>
        ))}
      </div>

      {/* 3 Grid Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all group h-full"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-700">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {t('projects.liveDemo')}
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors z-10"
              >
                <X size={18} />
              </button>

              <div className="h-56 bg-slate-100 dark:bg-slate-950 relative">
                <img
                  src={selectedProject.image_url}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-7">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3 border border-blue-500/20">
                  {selectedProject.category}
                </span>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {selectedProject.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  {selectedProject.description}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Teknologi Digunakan
                </h4>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={selectedProject.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <Github size={16} />
                    View Repository
                  </a>
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
