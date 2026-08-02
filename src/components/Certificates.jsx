import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, Eye, X, BookOpenCheck, FileText, Download, Image as ImageIcon } from 'lucide-react'
import { mockCertificates, mockTrainings } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const Certificates = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('all') // 'all', 'certs', 'trainings'
  const [selectedCert, setSelectedCert] = useState(null)
  const [viewMode, setViewMode] = useState('pdf') // 'pdf' or 'image'

  const handleOpenCert = (cert, mode = 'pdf') => {
    setSelectedCert(cert)
    setViewMode(mode)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          {t('certificates.title')}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium">
          {t('certificates.subtitle')}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
            activeTab === 'all'
              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
              : 'glass-badge text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/30'
          }`}
        >
          {t('certificates.allTab')}
        </button>
        <button
          onClick={() => setActiveTab('certs')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
            activeTab === 'certs'
              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
              : 'glass-badge text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/30'
          }`}
        >
          {t('certificates.certsTab')}
        </button>
        <button
          onClick={() => setActiveTab('trainings')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
            activeTab === 'trainings'
              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
              : 'glass-badge text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/30'
          }`}
        >
          {t('certificates.trainingsTab')}
        </button>
      </div>

      <div className="space-y-14">
        
        {/* Section 1: Sertifikasi Profesi & Industri */}
        {(activeTab === 'all' || activeTab === 'certs') && (
          <div className="space-y-6">
            {activeTab === 'all' && (
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Sertifikasi Profesi & Industri
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200/80 dark:bg-slate-800"></div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {mockCertificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="w-full sm:w-[280px] lg:w-[275px] xl:w-[285px] flex flex-col glass-card glass-card-hover overflow-hidden p-0 border border-slate-200/80 dark:border-white/10"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100/50 dark:bg-slate-950/60 group">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80"
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
                        {cert.type}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity backdrop-blur-xs">
                      {cert.pdf_url && (
                        <button
                          onClick={() => handleOpenCert(cert, 'pdf')}
                          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform hover:scale-110 flex items-center gap-1.5 text-xs font-bold px-4"
                          title="Buka PDF Sertifikat"
                        >
                          <FileText size={16} />
                          Lihat PDF
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenCert(cert, 'image')}
                        className="p-3 rounded-full glass-badge text-white hover:bg-slate-800 transition-transform hover:scale-110"
                        title="Lihat Pratinjau"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3">
                        {cert.issuer_logo ? (
                          <div className="w-5 h-5 rounded-md bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                            <img
                              src={cert.issuer_logo}
                              alt={cert.issuer}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.parentElement.style.display = 'none'
                              }}
                            />
                          </div>
                        ) : (
                          <Award size={14} className="shrink-0" />
                        )}
                        <span className="truncate">{cert.issuer}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                        {cert.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center gap-2 pt-4 border-t border-slate-200/50 dark:border-white/10 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 min-w-0">
                        <Calendar size={13} className="shrink-0" />
                        <span className="truncate">{cert.date}</span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {cert.pdf_url ? (
                          <button
                            onClick={() => handleOpenCert(cert, 'pdf')}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1 whitespace-nowrap"
                          >
                            <FileText size={13} />
                            Lihat PDF
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenCert(cert, 'image')}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-bold whitespace-nowrap"
                          >
                            Pratinjau
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Pelatihan & Kursus TIK */}
        {(activeTab === 'all' || activeTab === 'trainings') && (
          <div className="space-y-6">
            {activeTab === 'all' && (
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Pelatihan & Kursus TIK
                </h3>
                <div className="flex-1 h-[1px] bg-slate-200/80 dark:bg-slate-800"></div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {mockTrainings.map((tr) => (
                <motion.div
                  key={tr.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="w-full sm:w-[280px] lg:w-[275px] xl:w-[285px] flex flex-col glass-card glass-card-hover overflow-hidden p-0 border border-slate-200/80 dark:border-white/10"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100/50 dark:bg-slate-950/60 group">
                    <img
                      src={tr.image_url}
                      alt={tr.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                        Pelatihan TIK
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity backdrop-blur-xs">
                      {tr.pdf_url && (
                        <button
                          onClick={() => handleOpenCert(tr, 'pdf')}
                          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-110 flex items-center gap-1.5 text-xs font-bold px-4"
                          title="Buka PDF Pelatihan"
                        >
                          <FileText size={16} />
                          Lihat PDF
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {tr.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        {tr.issuer_logo ? (
                          <div className="w-5 h-5 rounded-md bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                            <img
                              src={tr.issuer_logo}
                              alt={tr.organizer}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.parentElement.style.display = 'none'
                              }}
                            />
                          </div>
                        ) : (
                          <Award size={14} className="shrink-0" />
                        )}
                        <span className="truncate">{tr.organizer}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                        {tr.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center gap-2 pt-4 border-t border-slate-200/50 dark:border-white/10 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 min-w-0">
                        <Calendar size={13} className="shrink-0" />
                        <span className="truncate">{tr.date}</span>
                      </div>
                      {tr.pdf_url && (
                        <button
                          onClick={() => handleOpenCert(tr, 'pdf')}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1 shrink-0 whitespace-nowrap"
                        >
                          <FileText size={13} />
                          Lihat PDF
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal Dialog Viewer (PDF / Image) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass-panel shadow-2xl flex flex-col p-0 border border-slate-200/80 dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200/50 dark:border-white/10 flex items-center justify-between bg-white/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-2.5">
                  {selectedCert.issuer_logo ? (
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 p-1 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src={selectedCert.issuer_logo}
                        alt={selectedCert.issuer || selectedCert.organizer}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.parentElement.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <Award className="text-blue-600 dark:text-blue-400" size={20} />
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {selectedCert.issuer || selectedCert.organizer} — {selectedCert.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mode Switcher */}
                  {selectedCert.image_url && selectedCert.pdf_url && (
                    <div className="flex rounded-full bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => setViewMode('pdf')}
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors ${
                          viewMode === 'pdf'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <FileText size={13} />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => setViewMode('image')}
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors ${
                          viewMode === 'image'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <ImageIcon size={13} />
                        <span>Gambar</span>
                      </button>
                    </div>
                  )}

                  {selectedCert.pdf_url && (
                    <a
                      href={selectedCert.pdf_url}
                      download={`${selectedCert.title}.pdf`}
                      className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 px-3.5 transition-colors shadow-sm"
                      title="Unduh Dokumen PDF"
                    >
                      <Download size={14} />
                      <span className="hidden sm:inline">Unduh PDF</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="flex-1 p-2 sm:p-4 bg-slate-100 dark:bg-slate-950 overflow-hidden flex items-center justify-center">
                {viewMode === 'pdf' && selectedCert.pdf_url ? (
                  <iframe
                    src={`${selectedCert.pdf_url}#toolbar=0&navpanes=0`}
                    title={selectedCert.title}
                    className="w-full h-[65vh] sm:h-[75vh] rounded-2xl border-0 bg-white"
                  />
                ) : (
                  <img
                    src={selectedCert.image_url}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Certificates
