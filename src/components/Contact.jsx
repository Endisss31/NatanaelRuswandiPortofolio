import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, User, MessageSquare } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setErrorMessage('Please fill out all fields.')
      return
    }

    setStatus('submitting')

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('messages')
          .insert([
            { 
              name: formData.name, 
              email: formData.email, 
              message: formData.message 
            }
          ])

        if (error) {
          console.warn("Supabase insert error (table 'messages' might need to be created):", error)
        }
      }
      
      // Simulate network request delays
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Get In Touch</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold">
          Have an exciting project idea, a job opportunity, or just want to say hi? Send me a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact details */}
        <motion.div 
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Channels</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400">Email Address</h4>
                  <a 
                    href="mailto:natanael.ruswandi@example.com" 
                    className="text-slate-800 hover:text-blue-650 dark:text-white dark:hover:text-blue-400 transition-colors font-semibold text-sm sm:text-base break-all"
                  >
                    natanael.ruswandi@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-650 dark:text-purple-400 shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400">Location</h4>
                  <p className="text-slate-800 dark:text-white font-semibold text-sm sm:text-base">
                    Bandung, West Java, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <User size={12} />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-850 dark:text-white text-sm transition-colors shadow-inner"
                  disabled={status === 'submitting' || status === 'success'}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Mail size={12} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-850 dark:text-white text-sm transition-colors shadow-inner"
                  disabled={status === 'submitting' || status === 'success'}
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MessageSquare size={12} />
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Hi Natanael, I would love to collaborate..."
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-850 dark:text-white text-sm transition-colors resize-none shadow-inner"
                  disabled={status === 'submitting' || status === 'success'}
                  required
                />
              </div>

              {/* Submit triggers and notifications */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Sending message...
                    </>
                  ) : (
                    <>
                      Submit Form
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
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold animate-pulse"
                  >
                    <CheckCircle2 size={18} />
                    Message sent successfully! Thank you for reaching out.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-semibold"
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
