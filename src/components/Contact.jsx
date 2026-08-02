import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, User, MessageSquare, Phone, MessageSquareCode } from 'lucide-react'
import { profileInfo } from '../data/mockData'
import { useLanguage } from '../context/LanguageContext'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setErrorMessage(t('contact.errorMsg'))
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch("https://formsubmit.co/ajax/natanaeldidi31@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Pesan Baru Portofolio dari ${formData.name}`
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage('Gagal mengirim pesan. Silakan hubungi langsung via WhatsApp.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Terjadi kesalahan koneksi. Silakan hubungi via WhatsApp.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          {t('contact.title')}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Contact Info Cards */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-7 glass-card glass-card-hover space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('contact.channelsTitle')}</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t('contact.emailLabel')}</h4>
                  <a
                    href={`mailto:${profileInfo.email}`}
                    className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                  >
                    {profileInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t('contact.phoneLabel')}</h4>
                  <a
                    href={profileInfo.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {profileInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t('contact.locationLabel')}</h4>
                  <p className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">
                    {profileInfo.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/50 dark:border-white/10">
              <a
                href={profileInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquareCode size={18} />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-7 glass-card glass-card-hover">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('contact.formTitle')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <User size={13} />
                  {t('contact.yourName')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-2xl glass-badge focus:border-blue-600 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors"
                  disabled={status === 'submitting' || status === 'success'}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Mail size={13} />
                  {t('contact.yourEmail')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-2xl glass-badge focus:border-blue-600 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors"
                  disabled={status === 'submitting' || status === 'success'}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MessageSquare size={13} />
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full px-4 py-3 rounded-2xl glass-badge focus:border-blue-600 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors resize-none"
                  disabled={status === 'submitting' || status === 'success'}
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.sendMessage')}
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
                  >
                    <CheckCircle2 size={18} />
                    {t('contact.successMsg')}
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-semibold"
                  >
                    <AlertCircle size={18} />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Contact
