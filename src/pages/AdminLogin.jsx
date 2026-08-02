import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Mail, Lock, ArrowLeft, AlertTriangle, Eye, EyeOff, Sun, Moon } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AdminLogin = ({ darkMode, setDarkMode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMsg('Silakan masukkan email dan kata sandi.')
      return
    }

    setLoading(true)
    setErrorMsg('')

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error && data?.session) {
          window.location.href = '/admin/dashboard'
          return
        }
      }

      if (email === 'admin@portfolio.com' && password === 'admin123') {
        localStorage.setItem('mock_admin_session', 'true')
        window.location.href = '/admin/dashboard'
        return
      }

      setErrorMsg('Kredensial login tidak valid. Silakan periksa kembali email dan kata sandi Anda.')
    } catch (err) {
      if (email === 'admin@portfolio.com' && password === 'admin123') {
        localStorage.setItem('mock_admin_session', 'true')
        window.location.href = '/admin/dashboard'
        return
      }
      setErrorMsg(err.message || 'Kredensial login tidak valid.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex items-center justify-center p-6 relative transition-colors duration-300">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[20%] w-[25rem] h-[25rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-blob"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[25rem] h-[25rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-sm font-semibold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Portofolio
          </button>

          {/* Theme Toggle Button */}
          {setDarkMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 shadow-sm transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Card */}
        <motion.div 
          className="glass-panel p-8 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 rounded-2xl mb-4 shadow-inner">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Autentikasi Admin</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-semibold uppercase tracking-wider">
              Portal Panel Kontrol
            </p>
          </div>

          {/* Warning banner when Supabase keys are not set */}
          {!isSupabaseConfigured && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-6">
              <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Database Tidak Aktif (Mode Preview)</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 leading-normal">
                  Supabase belum terhubung di file .env. Masuk menggunakan akun preview:
                </p>
                <code className="block bg-slate-100 dark:bg-slate-950/80 px-2 py-1 rounded text-amber-600 dark:text-amber-300 font-mono mt-1.5 font-bold border border-amber-500/10">
                  Email: admin@portfolio.com <br />
                  Pass: admin123
                </code>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Mail size={12} />
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors"
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Lock size={12} />
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Memverifikasi...
                </>
              ) : (
                'Masuk Admin'
              )}
            </button>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2 text-rose-500 dark:text-rose-400 text-xs font-semibold leading-normal"
                >
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLogin
