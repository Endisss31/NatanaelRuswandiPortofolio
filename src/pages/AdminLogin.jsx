import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Mail, Lock, ArrowLeft, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMsg('Please enter email and password.')
      return
    }

    setLoading(true)
    setErrorMsg('')

    try {
      if (isSupabaseConfigured && supabase) {
        // Authenticate using Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/admin/dashboard')
      } else {
        // Preview Mode login mechanism
        if (email === 'admin@portfolio.com' && password === 'admin123') {
          localStorage.setItem('mock_admin_session', 'true')
          window.location.reload() // App.jsx catches this and redirects
        } else {
          setErrorMsg('Invalid preview credentials. Use email: admin@portfolio.com and password: admin123')
        }
      }
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[20%] w-[25rem] h-[25rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[25rem] h-[25rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Go back */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-semibold group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </button>

        {/* Card */}
        <motion.div 
          className="glass-card p-8 rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl mb-4 shadow-inner">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Authentication</h1>
            <p className="text-slate-400 text-xs mt-1 font-semibold uppercase tracking-wider">
              Control Panel Portal
            </p>
          </div>

          {/* Warning banner when Supabase keys are not set */}
          {!isSupabaseConfigured && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 text-amber-400 text-xs font-semibold mb-6">
              <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Database Inactive (Preview Mode)</p>
                <p className="text-slate-400 font-medium mt-1 leading-normal">
                  No Supabase URL/Key provided in env. Logs in using mock credentials:
                </p>
                <code className="block bg-slate-950/80 px-2 py-1 rounded text-amber-300 font-mono mt-1.5 font-bold">
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Mail size={12} />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-blue-500 focus:outline-none text-white text-sm transition-colors"
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lock size={12} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-blue-500 focus:outline-none text-white text-sm transition-colors"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
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
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2 text-rose-400 text-xs font-semibold leading-normal"
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
