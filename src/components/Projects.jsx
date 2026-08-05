import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { usePortfolioData } from '../lib/usePortfolioData'

const Projects = ({ onSelectProject }) => {
  const { t, lang } = useLanguage()
  const { projects } = usePortfolioData()
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const filters = ['All', 'Web', 'Mobile']

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const handleOpenDetail = (id) => {
    if (onSelectProject) {
      onSelectProject(id)
    } else {
      navigate(`/project/${id}`)
    }
  }

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
                : 'glass-badge text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/30'
            }`}
          >
            {filter === 'All' ? t('projects.allCategories') : filter}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center glass-panel rounded-2xl p-8 max-w-lg mx-auto border border-dashed border-slate-300 dark:border-slate-800">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
            <FolderGit2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Belum Ada Proyek</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {activeFilter === 'All'
              ? 'Data proyek belum ditambahkan di database. Anda dapat menambahkan proyek baru melalui Admin Dashboard.'
              : `Belum ada proyek dalam kategori "${activeFilter}".`}
          </p>
        </div>
      )}

      {/* 3 Grid Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project) => {
          const hasLiveLink = project.live_link && project.live_link !== '#'

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col glass-card glass-card-hover overflow-hidden group h-full p-0 border border-slate-200/80 dark:border-white/10"
            >
              {/* Image linking to Project Detail Page */}
              <div
                onClick={() => handleOpenDetail(project.id)}
                className="relative h-48 overflow-hidden bg-slate-100/50 dark:bg-slate-950/60 block cursor-pointer"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full glass-badge text-blue-600 dark:text-blue-400 text-xs font-bold shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => handleOpenDetail(project.id)}
                    className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech_stack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md glass-badge text-slate-600 dark:text-slate-300 text-[11px] font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md glass-badge text-slate-400 text-[11px] font-semibold">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-white/10">
                    {hasLiveLink ? (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl glass-badge text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold"
                        title="Kunjungi Situs Live"
                      >
                        <ExternalLink size={14} />
                        <span>Live</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        {project.category}
                      </span>
                    )}

                    <button
                      onClick={() => handleOpenDetail(project.id)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      {lang === 'en' ? 'View Details' : 'Lihat Detail'}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Projects
