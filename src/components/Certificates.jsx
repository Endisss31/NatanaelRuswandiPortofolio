import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, ExternalLink, Eye, X } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockCertificates } from '../data/mockData'

const Certificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) throw error
          if (data && data.length > 0) {
            setCertificates(data)
            return
          }
        }
      } catch (err) {
        console.error("Error loading certificates from database, using fallback:", err)
      } finally {
        setLoading(false)
      }
      // Fallback
      setCertificates(mockCertificates)
    }

    fetchCertificates()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Certificates & Licenses</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          My verified professional licenses and industry certifications.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group flex flex-col h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 dark:hover:border-blue-500/25 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-blue-500/5 transition-all duration-300"
          >
            {/* Certificate Preview Frame */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={cert.image_url}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80"
                }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                <button
                  onClick={() => setPreviewImage(cert.image_url)}
                  className="p-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
                  title="Expand Certificate"
                >
                  <Eye size={18} />
                </button>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg transition-transform hover:scale-110 border border-white/10"
                    title="Verify Credential"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Certificate Body Details */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mb-4">
                  <Award size={14} className="text-indigo-600 dark:text-indigo-400" />
                  <span>{cert.issuer}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-semibold">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>
                <button
                  onClick={() => setPreviewImage(cert.image_url)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  View Preview
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Preview Overlay Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
              >
                <X size={18} />
              </button>
              <img
                src={previewImage}
                alt="Certificate Zoom"
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Certificates
