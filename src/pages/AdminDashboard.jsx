import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FolderGit2, Award, Briefcase, Code2, FileUp, LogOut, 
  Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle2, ShieldAlert, Sun, Moon, User, Image, Sparkles
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockProjects, mockSkills, mockExperiences, mockCertificates, profileInfo } from '../data/mockData'

const AdminDashboard = ({ session, darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hero')
  
  // Data States
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [certificates, setCertificates] = useState([])
  const [cvUrl, setCvUrl] = useState('')

  // Hero / Profile State
  const [heroForm, setHeroForm] = useState({
    name: profileInfo.name,
    subtitles: profileInfo.subtitles.join(', '),
    bio: profileInfo.bio,
    profile_image: '/assets/images/profile3.jpg',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    email: 'mailto:your-email@example.com'
  })

  // UI Flow States
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [editingId, setEditingId] = useState(null)
  
  // Form states
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image_url: '', tech_stack: '', github_link: '', live_link: '', category: 'Web' })
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', proficiency: 80 })
  const [expForm, setExpForm] = useState({ role: '', company: '', type: 'Internship', start_date: '', end_date: 'Present', description: '' })
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', image_url: '', credential_url: '' })
  const [cvFile, setCvFile] = useState(null)

  // Initialize and load all records
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      if (isSupabaseConfigured && supabase) {
        // Load main collections from Supabase
        const [pData, sData, eData, cData] = await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('skills').select('*').order('created_at', { ascending: true }),
          supabase.from('experiences').select('*').order('start_date', { ascending: false }),
          supabase.from('certificates').select('*').order('created_at', { ascending: false })
        ])

        if (pData.data) setProjects(pData.data)
        if (sData.data) setSkills(sData.data)
        if (eData.data) setExperiences(eData.data)
        if (cData.data) setCertificates(cData.data)

        // Load profile safely (fallback to local if table doesn't exist yet)
        try {
          const { data: prof, error: profErr } = await supabase.from('profile').select('*').single()
          if (!profErr && prof) {
            setHeroForm({
              name: prof.name || profileInfo.name,
              subtitles: Array.isArray(prof.subtitles) ? prof.subtitles.join(', ') : (prof.subtitles || profileInfo.subtitles.join(', ')),
              bio: prof.bio || profileInfo.bio,
              profile_image: prof.profile_image || '/assets/images/profile3.jpg',
              github: prof.github || 'https://github.com',
              linkedin: prof.linkedin || 'https://linkedin.com',
              instagram: prof.instagram || 'https://instagram.com',
              email: prof.email || 'mailto:your-email@example.com'
            })
          } else {
            const localProfile = localStorage.getItem('db_profile')
            if (localProfile) {
              const parsed = JSON.parse(localProfile)
              setHeroForm({
                name: parsed.name || profileInfo.name,
                subtitles: Array.isArray(parsed.subtitles) ? parsed.subtitles.join(', ') : (parsed.subtitles || profileInfo.subtitles.join(', ')),
                bio: parsed.bio || profileInfo.bio,
                profile_image: parsed.profile_image || '/assets/images/profile3.jpg',
                github: parsed.github || 'https://github.com',
                linkedin: parsed.linkedin || 'https://linkedin.com',
                instagram: parsed.instagram || 'https://instagram.com',
                email: parsed.email || 'mailto:your-email@example.com'
              })
            }
          }
        } catch (e) {
          console.warn("Profile table query notice:", e)
        }

      } else {
        // Load from LocalStorage or Fallback Mock Data
        const localProjects = localStorage.getItem('db_projects')
        const localSkills = localStorage.getItem('db_skills')
        const localExperiences = localStorage.getItem('db_experiences')
        const localCertificates = localStorage.getItem('db_certificates')
        const localCv = localStorage.getItem('db_cv')
        const localProfile = localStorage.getItem('db_profile')

        setProjects(localProjects ? JSON.parse(localProjects) : mockProjects)
        setSkills(localSkills ? JSON.parse(localSkills) : mockSkills)
        setExperiences(localExperiences ? JSON.parse(localExperiences) : mockExperiences)
        setCertificates(localCertificates ? JSON.parse(localCertificates) : mockCertificates)
        setCvUrl(localCv || '/assets/cv.pdf')

        if (localProfile) {
          const parsed = JSON.parse(localProfile)
          setHeroForm({
            name: parsed.name || profileInfo.name,
            subtitles: Array.isArray(parsed.subtitles) ? parsed.subtitles.join(', ') : (parsed.subtitles || profileInfo.subtitles.join(', ')),
            bio: parsed.bio || profileInfo.bio,
            profile_image: parsed.profile_image || '/assets/images/profile3.jpg',
            github: parsed.github || 'https://github.com',
            linkedin: parsed.linkedin || 'https://linkedin.com',
            instagram: parsed.instagram || 'https://instagram.com',
            email: parsed.email || 'mailto:your-email@example.com'
          })
        }
      }
    } catch (err) {
      showMsg('error', 'Error loading database files.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const saveHeroProfile = async (e) => {
    e.preventDefault()
    try {
      const profileData = {
        name: heroForm.name,
        subtitles: heroForm.subtitles.split(',').map(s => s.trim()),
        bio: heroForm.bio,
        profile_image: heroForm.profile_image,
        github: heroForm.github,
        linkedin: heroForm.linkedin,
        instagram: heroForm.instagram,
        email: heroForm.email
      }

      // Always persist to localStorage for immediate website update
      localStorage.setItem('db_profile', JSON.stringify(profileData))

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('profile').upsert([{ id: 1, ...profileData }])
        if (error) {
          if (error.code === '42P01' || error.message.includes('find the table') || error.message.includes('schema cache')) {
            showMsg('error', "Tabel 'profile' belum dibuat di Supabase SQL. Data berhasil disimpan secara lokal!")
            return
          }
          throw error
        }
        showMsg('success', 'Hero profile saved successfully to Supabase and Local Storage!')
      } else {
        showMsg('success', 'Hero profile saved locally (Preview mode).')
      }
    } catch (err) {
      showMsg('error', err.message || 'Failed to save hero profile.')
    }
  }

  // Flash Message Helper
  const showMsg = (type, text) => {
    setMsg({ type, text })
    setTimeout(() => setMsg({ type: '', text: '' }), 4000)
  }

  // Save changes to localStorage helper (for mock database preview mode)
  const persistLocalData = (key, data) => {
    if (!isSupabaseConfigured) {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  // Auth Logout trigger
  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    } else {
      localStorage.removeItem('mock_admin_session')
    }
    navigate('/')
    window.location.reload()
  }

  /* ========================================================
     PROJECTS CRUD ACTIONS
     ======================================================== */
  const saveProject = async (e) => {
    e.preventDefault()
    if (!projectForm.title || !projectForm.description) return

    const formattedTech = typeof projectForm.tech_stack === 'string' 
      ? projectForm.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
      : projectForm.tech_stack;

    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      image_url: projectForm.image_url || '/assets/images/project.jpg',
      tech_stack: formattedTech,
      github_link: projectForm.github_link,
      live_link: projectForm.live_link,
      category: projectForm.category
    }

    try {
      if (isSupabaseConfigured && supabase) {
        if (editingId) {
          const { error } = await supabase.from('projects').update(payload).eq('id', editingId)
          if (error) throw error
        } else {
          const { error } = await supabase.from('projects').insert([payload])
          if (error) throw error
        }
      } else {
        // Local state handling
        if (editingId) {
          const updated = projects.map(p => p.id === editingId ? { ...p, ...payload } : p)
          setProjects(updated)
          persistLocalData('db_projects', updated)
        } else {
          const newProj = { ...payload, id: `p_local_${Date.now()}` }
          const updated = [newProj, ...projects]
          setProjects(updated)
          persistLocalData('db_projects', updated)
        }
      }

      showMsg('success', editingId ? 'Project updated successfully.' : 'Project created successfully.')
      resetProjectForm()
      loadAllData()
    } catch (err) {
      showMsg('error', err.message || 'Failed to save project.')
    }
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) throw error
      } else {
        const updated = projects.filter(p => p.id !== id)
        setProjects(updated)
        persistLocalData('db_projects', updated)
      }
      showMsg('success', 'Project removed.')
      loadAllData()
    } catch (err) {
      showMsg('error', 'Delete operation failed.')
    }
  }

  const editProject = (p) => {
    setEditingId(p.id)
    setProjectForm({
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : p.tech_stack,
      github_link: p.github_link || '',
      live_link: p.live_link || '',
      category: p.category
    })
  }

  const resetProjectForm = () => {
    setEditingId(null)
    setProjectForm({ title: '', description: '', image_url: '', tech_stack: '', github_link: '', live_link: '', category: 'Web' })
  }

  /* ========================================================
     SKILLS CRUD ACTIONS
     ======================================================== */
  const saveSkill = async (e) => {
    e.preventDefault()
    if (!skillForm.name) return

    const payload = {
      name: skillForm.name,
      category: skillForm.category,
      proficiency: parseInt(skillForm.proficiency, 10)
    }

    try {
      if (isSupabaseConfigured && supabase) {
        if (editingId) {
          const { error } = await supabase.from('skills').update(payload).eq('id', editingId)
          if (error) throw error
        } else {
          const { error } = await supabase.from('skills').insert([payload])
          if (error) throw error
        }
      } else {
        if (editingId) {
          const updated = skills.map(s => s.id === editingId ? { ...s, ...payload } : s)
          setSkills(updated)
          persistLocalData('db_skills', updated)
        } else {
          const newSkill = { ...payload, id: `s_local_${Date.now()}` }
          const updated = [...skills, newSkill]
          setSkills(updated)
          persistLocalData('db_skills', updated)
        }
      }

      showMsg('success', 'Skill saved.')
      resetSkillForm()
      loadAllData()
    } catch (err) {
      showMsg('error', 'Failed to save skill.')
    }
  }

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('skills').delete().eq('id', id)
        if (error) throw error
      } else {
        const updated = skills.filter(s => s.id !== id)
        setSkills(updated)
        persistLocalData('db_skills', updated)
      }
      showMsg('success', 'Skill deleted.')
      loadAllData()
    } catch (err) {
      showMsg('error', 'Delete operation failed.')
    }
  }

  const resetSkillForm = () => {
    setEditingId(null)
    setSkillForm({ name: '', category: 'Frontend', proficiency: 80 })
  }

  /* ========================================================
     EXPERIENCE CRUD ACTIONS
     ======================================================== */
  const saveExperience = async (e) => {
    e.preventDefault()
    if (!expForm.role || !expForm.company || !expForm.start_date) return

    const payload = {
      role: expForm.role,
      company: expForm.company,
      type: expForm.type,
      start_date: expForm.start_date,
      end_date: expForm.end_date,
      description: expForm.description
    }

    try {
      if (isSupabaseConfigured && supabase) {
        if (editingId) {
          const { error } = await supabase.from('experiences').update(payload).eq('id', editingId)
          if (error) throw error
        } else {
          const { error } = await supabase.from('experiences').insert([payload])
          if (error) throw error
        }
      } else {
        if (editingId) {
          const updated = experiences.map(ex => ex.id === editingId ? { ...ex, ...payload } : ex)
          setExperiences(updated)
          persistLocalData('db_experiences', updated)
        } else {
          const newExp = { ...payload, id: `ex_local_${Date.now()}` }
          const updated = [newExp, ...experiences]
          setExperiences(updated)
          persistLocalData('db_experiences', updated)
        }
      }

      showMsg('success', 'Experience logged successfully.')
      resetExpForm()
      loadAllData()
    } catch (err) {
      showMsg('error', 'Failed to save experience details.')
    }
  }

  const deleteExperience = async (id) => {
    if (!window.confirm('Delete this record?')) return
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('experiences').delete().eq('id', id)
        if (error) throw error
      } else {
        const updated = experiences.filter(ex => ex.id !== id)
        setExperiences(updated)
        persistLocalData('db_experiences', updated)
      }
      showMsg('success', 'Record removed.')
      loadAllData()
    } catch (err) {
      showMsg('error', 'Delete operation failed.')
    }
  }

  const resetExpForm = () => {
    setEditingId(null)
    setExpForm({ role: '', company: '', type: 'Internship', start_date: '', end_date: 'Present', description: '' })
  }

  /* ========================================================
     CERTIFICATES CRUD ACTIONS
     ======================================================== */
  const saveCertificate = async (e) => {
    e.preventDefault()
    if (!certForm.title || !certForm.issuer || !certForm.date) return

    const payload = {
      title: certForm.title,
      issuer: certForm.issuer,
      date: certForm.date,
      image_url: certForm.image_url || '/assets/images/project.jpg',
      credential_url: certForm.credential_url
    }

    try {
      if (isSupabaseConfigured && supabase) {
        if (editingId) {
          const { error } = await supabase.from('certificates').update(payload).eq('id', editingId)
          if (error) throw error
        } else {
          const { error } = await supabase.from('certificates').insert([payload])
          if (error) throw error
        }
      } else {
        if (editingId) {
          const updated = certificates.map(c => c.id === editingId ? { ...c, ...payload } : c)
          setCertificates(updated)
          persistLocalData('db_certificates', updated)
        } else {
          const newCert = { ...payload, id: `c_local_${Date.now()}` }
          const updated = [newCert, ...certificates]
          setCertificates(updated)
          persistLocalData('db_certificates', updated)
        }
      }

      showMsg('success', 'Certificate stored successfully.')
      resetCertForm()
      loadAllData()
    } catch (err) {
      showMsg('error', 'Failed to store certificate.')
    }
  }

  const deleteCertificate = async (id) => {
    if (!window.confirm('Delete this certificate?')) return
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('certificates').delete().eq('id', id)
        if (error) throw error
      } else {
        const updated = certificates.filter(c => c.id !== id)
        setCertificates(updated)
        persistLocalData('db_certificates', updated)
      }
      showMsg('success', 'Certificate removed.')
      loadAllData()
    } catch (err) {
      showMsg('error', 'Delete operation failed.')
    }
  }

  const resetCertForm = () => {
    setEditingId(null)
    setCertForm({ title: '', issuer: '', date: '', image_url: '', credential_url: '' })
  }

  /* ========================================================
     IMAGE & CV PDF STORAGE FILE UPLOADING
     ======================================================== */
  const handleFileUpload = async (e, type, targetSetter) => {
    const file = e.target.files[0]
    if (!file) return

    showMsg('success', 'File selected. Uploading...')

    try {
      if (isSupabaseConfigured && supabase) {
        // Upload to Supabase Storage public bucket 'portfolio'
        const fileExt = file.name.split('.').pop()
        const fileName = `${type}_${Date.now()}.${fileExt}`
        const filePath = `${type}s/${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from('portfolio')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath)

        targetSetter(publicUrl)
        showMsg('success', 'File uploaded successfully to Supabase Storage!')
      } else {
        // Preview fallback - Create local ObjectURL path
        const fakeUrl = URL.createObjectURL(file)
        targetSetter(fakeUrl)
        
        if (type === 'cv') {
          localStorage.setItem('db_cv', fakeUrl)
          setCvUrl(fakeUrl)
        }
        
        showMsg('success', 'Local mock upload complete (Preview Mode only).')
      }
    } catch (err) {
      showMsg('error', err.message || 'File upload failed.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar Controls */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between transition-colors">
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 rounded-lg">
                <ShieldAlert size={18} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white leading-tight">Admin Area</h2>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {!isSupabaseConfigured ? 'Preview Mode' : 'Connected'}
                </span>
              </div>
            </div>

            {/* Theme Toggle Button */}
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shadow-sm"
                aria-label="Toggle Theme"
                title="Toggle Light/Dark Theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Navigation Buttons */}
          <nav className="space-y-1">
            {[
              { id: 'hero', label: 'Hero / Profile', icon: <User size={18} /> },
              { id: 'projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
              { id: 'skills', label: 'Skills', icon: <Code2 size={18} /> },
              { id: 'experiences', label: 'Experiences', icon: <Briefcase size={18} /> },
              { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
              { id: 'cv', label: 'CV / Assets', icon: <FileUp size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditingId(null); }}
                className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Exit Button */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-500/10 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-colors flex items-center gap-3"
          >
            <LogOut size={18} />
            Exit Dashboard
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        
        {/* Banner Alert notifications */}
        {msg.text && (
          <div className={`p-4 rounded-xl flex items-center gap-2 mb-6 border text-sm font-semibold ${
            msg.type === 'error' 
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {msg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {msg.text}
          </div>
        )}

        {/* Header summary info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white capitalize">{activeTab} Manager</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Add, modify, or remove website portfolio records below.
            </p>
          </div>
        </div>

        {/* Dynamic Inner views */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* ========================================================
               HERO & PROFILE VIEW
               ======================================================== */}
            {activeTab === 'hero' && (
              <div className="max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="text-blue-500" size={20} />
                      Hero & Profile Manager
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      Customize your main hero landing section, bio, roles, profile image, and social links.
                    </p>
                  </div>
                </div>

                <form onSubmit={saveHeroProfile} className="space-y-6">
                  {/* Name & Roles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        value={heroForm.name} 
                        onChange={(e) => setHeroForm({...heroForm, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="Natanael Ruswandi" 
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Subtitles / Animated Roles (comma separated)
                      </label>
                      <input 
                        type="text" 
                        value={heroForm.subtitles} 
                        onChange={(e) => setHeroForm({...heroForm, subtitles: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="AI Developer, Mobile Developer, Computer Vision Enthusiast" 
                        required
                      />
                    </div>
                  </div>

                  {/* Bio Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Bio / Short Introduction
                    </label>
                    <textarea 
                      value={heroForm.bio} 
                      onChange={(e) => setHeroForm({...heroForm, bio: e.target.value})}
                      rows="3" 
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                      placeholder="Creative Developer & Designer..."
                      required
                    />
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Profile Picture
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={heroForm.profile_image || '/assets/images/profile3.jpg'} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => { e.target.src = '/assets/images/profile3.jpg' }}
                        />
                      </div>
                      <div className="flex-1 w-full flex gap-2">
                        <input 
                          type="text" 
                          value={heroForm.profile_image} 
                          onChange={(e) => setHeroForm({...heroForm, profile_image: e.target.value})}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="/assets/images/profile3.jpg or Image URL" 
                        />
                        <label className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors border border-slate-300 dark:border-slate-700">
                          Upload Image
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'profile', (url) => setHeroForm({...heroForm, profile_image: url}))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">GitHub URL</label>
                      <input 
                        type="url" 
                        value={heroForm.github} 
                        onChange={(e) => setHeroForm({...heroForm, github: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://github.com/username" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">LinkedIn URL</label>
                      <input 
                        type="url" 
                        value={heroForm.linkedin} 
                        onChange={(e) => setHeroForm({...heroForm, linkedin: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://linkedin.com/in/username" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Instagram URL</label>
                      <input 
                        type="url" 
                        value={heroForm.instagram} 
                        onChange={(e) => setHeroForm({...heroForm, instagram: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://instagram.com/username" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Email Contact</label>
                      <input 
                        type="text" 
                        value={heroForm.email} 
                        onChange={(e) => setHeroForm({...heroForm, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="mailto:your-email@example.com" 
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <Save size={16} />
                      Save Hero Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================================
               PROJECTS VIEW
               ======================================================== */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Save/Edit form */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                    {editingId ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <form onSubmit={saveProject} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Project Title</label>
                      <input 
                        type="text" 
                        value={projectForm.title} 
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="My Awesome App" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Category</label>
                      <select 
                        value={projectForm.category} 
                        onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm"
                      >
                        <option value="Web">Web Project</option>
                        <option value="AI">AI Project</option>
                        <option value="Mobile">Mobile Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Description</label>
                      <textarea 
                        value={projectForm.description} 
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        rows="3" 
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                        placeholder="Write short description..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
                      <input 
                        type="text" 
                        value={projectForm.tech_stack} 
                        onChange={(e) => setProjectForm({...projectForm, tech_stack: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="React, Tailwind, Supabase" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Project Image</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={projectForm.image_url} 
                          onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="Image URL" 
                        />
                        <label className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors border border-slate-300 dark:border-slate-700">
                          Upload
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'project', (url) => setProjectForm({...projectForm, image_url: url}))}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">GitHub URL</label>
                      <input 
                        type="url" 
                        value={projectForm.github_link} 
                        onChange={(e) => setProjectForm({...projectForm, github_link: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://github.com/..." 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Live Demo URL</label>
                      <input 
                        type="url" 
                        value={projectForm.live_link} 
                        onChange={(e) => setProjectForm({...projectForm, live_link: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://example.com" 
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1">
                        <Save size={14} />
                        Save Project
                      </button>
                      {editingId && (
                        <button type="button" onClick={resetProjectForm} className="px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Database records list */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <th className="p-4">Title</th>
                          <th className="p-4">Category</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {projects.map((p) => (
                          <tr key={p.id} className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/20">
                            <td className="p-4 font-semibold text-slate-900 dark:text-white">{p.title}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/5 font-semibold">
                                {p.category}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => editProject(p)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Edit">
                                  <Edit2 size={14} />
                                </button>
                                <button onClick={() => deleteProject(p.id)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" title="Delete">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
               SKILLS VIEW
               ======================================================== */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                    {editingId ? 'Edit Skill' : 'Add New Skill'}
                  </h3>
                  <form onSubmit={saveSkill} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Skill Name</label>
                      <input 
                        type="text" 
                        value={skillForm.name} 
                        onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="React, Kotlin, TensorFlow..." 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Category</label>
                      <select 
                        value={skillForm.category} 
                        onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Proficiency Level ({skillForm.proficiency}%)</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={skillForm.proficiency} 
                        onChange={(e) => setSkillForm({...skillForm, proficiency: e.target.value})}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-950 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1">
                        <Save size={14} />
                        Save Skill
                      </button>
                      {editingId && (
                        <button type="button" onClick={resetSkillForm} className="px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Proficiency</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {skills.map((s) => (
                        <tr key={s.id} className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-semibold text-slate-900 dark:text-white">{s.name}</td>
                          <td className="p-4 text-xs text-slate-500 dark:text-slate-400">{s.category}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.proficiency}%` }}></div>
                              </div>
                              <span className="text-xs font-semibold">{s.proficiency}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setEditingId(s.id); setSkillForm({ name: s.name, category: s.category, proficiency: s.proficiency }); }} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Edit">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => deleteSkill(s.id)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ========================================================
               EXPERIENCES VIEW
               ======================================================== */}
            {activeTab === 'experiences' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                    {editingId ? 'Edit Experience' : 'Add Experience'}
                  </h3>
                  <form onSubmit={saveExperience} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Role Title</label>
                      <input 
                        type="text" 
                        value={expForm.role} 
                        onChange={(e) => setExpForm({...expForm, role: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="Research Assistant" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Company / Org Name</label>
                      <input 
                        type="text" 
                        value={expForm.company} 
                        onChange={(e) => setExpForm({...expForm, company: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="Lab CV / Tech Co." 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Experience Type</label>
                      <select 
                        value={expForm.type} 
                        onChange={(e) => setExpForm({...expForm, type: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm"
                      >
                        <option value="Internship">Internship</option>
                        <option value="Research">Research</option>
                        <option value="Organization">Organization</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Start Date</label>
                        <input 
                          type="text" 
                          value={expForm.start_date} 
                          onChange={(e) => setExpForm({...expForm, start_date: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="2024-03" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">End Date</label>
                        <input 
                          type="text" 
                          value={expForm.end_date} 
                          onChange={(e) => setExpForm({...expForm, end_date: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="Present / 2024-08" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Description</label>
                      <textarea 
                        value={expForm.description} 
                        onChange={(e) => setExpForm({...expForm, description: e.target.value})}
                        rows="3" 
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                        placeholder="Write key achievements, tasks..." 
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1">
                        <Save size={14} />
                        Save Record
                      </button>
                      {editingId && (
                        <button type="button" onClick={resetExpForm} className="px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4">Role</th>
                        <th className="p-4">Company</th>
                        <th className="p-4">Duration</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {experiences.map((ex) => (
                        <tr key={ex.id} className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-semibold text-slate-900 dark:text-white">
                            <div>{ex.role}</div>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20 px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 mt-1 inline-block">
                              {ex.type}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-slate-600 dark:text-slate-400">{ex.company}</td>
                          <td className="p-4 text-xs font-semibold">{ex.start_date} - {ex.end_date}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setEditingId(ex.id); setExpForm({ role: ex.role, company: ex.company, type: ex.type, start_date: ex.start_date, end_date: ex.end_date, description: ex.description }); }} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Edit">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => deleteExperience(ex.id)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ========================================================
               CERTIFICATES VIEW
               ======================================================== */}
            {activeTab === 'certificates' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                    {editingId ? 'Edit Certificate' : 'Add Certificate'}
                  </h3>
                  <form onSubmit={saveCertificate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Certificate Title</label>
                      <input 
                        type="text" 
                        value={certForm.title} 
                        onChange={(e) => setCertForm({...certForm, title: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="Deep Learning Specialization" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Issuer</label>
                      <input 
                        type="text" 
                        value={certForm.issuer} 
                        onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="Coursera / Google" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Issue Date</label>
                      <input 
                        type="text" 
                        value={certForm.date} 
                        onChange={(e) => setCertForm({...certForm, date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="2024-05" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Verification URL</label>
                      <input 
                        type="url" 
                        value={certForm.credential_url} 
                        onChange={(e) => setCertForm({...certForm, credential_url: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://coursera.org/verify/..." 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Credential Image</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={certForm.image_url} 
                          onChange={(e) => setCertForm({...certForm, image_url: e.target.value})}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="Image link" 
                        />
                        <label className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors border border-slate-300 dark:border-slate-700">
                          Upload
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'certificate', (url) => setCertForm({...certForm, image_url: url}))}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1">
                        <Save size={14} />
                        Save Certificate
                      </button>
                      {editingId && (
                        <button type="button" onClick={resetCertForm} className="px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4">Certificate</th>
                        <th className="p-4">Issuer</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {certificates.map((c) => (
                        <tr key={c.id} className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-semibold text-slate-900 dark:text-white">{c.title}</td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{c.issuer}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setEditingId(c.id); setCertForm({ title: c.title, issuer: c.issuer, date: c.date, image_url: c.image_url, credential_url: c.credential_url || '' }); }} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Edit">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => deleteCertificate(c.id)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ========================================================
               SETTINGS / CV VIEW
               ======================================================== */}
            {activeTab === 'cv' && (
              <div className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6 shadow-sm dark:shadow-none">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Curriculum Vitae (CV) Setup</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Upload your latest CV PDF file to make it downloadable for recruiters.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Current File Link</span>
                      <a href={cvUrl || '/assets/cv.pdf'} target="_blank" rel="noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all font-semibold block mt-1">
                        {cvUrl || '/assets/cv.pdf'}
                      </a>
                    </div>

                    <label className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors shadow-lg shadow-blue-500/10">
                      Upload PDF
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, 'cv', (url) => setCvUrl(url))}
                      />
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Notice: Uploading a new PDF replaces the link on the landing page download button. If you are in preview mode, this references a temporary path in memory. Setting up Supabase Storage allows permanent cloud-based storage.
                </div>
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  )
}

export default AdminDashboard
