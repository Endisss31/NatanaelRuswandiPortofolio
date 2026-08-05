import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FolderGit2, Award, Briefcase, FileUp, LogOut, 
  Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle2, Sun, Moon, User, Image, Sparkles, GraduationCap, Languages, Menu
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockProjects, mockSkills, mockExperiences, mockCertificates, profileInfo } from '../data/mockData'

const DatePickerInput = ({ label, value, onChange, placeholder, required = false, showPresentBtn = false }) => {
  const dateRef = React.useRef(null)

  const handleDateChange = (e) => {
    if (e.target.value) {
      onChange(e.target.value)
    }
  }

  const triggerPicker = () => {
    if (dateRef.current) {
      if (typeof dateRef.current.showPicker === 'function') {
        dateRef.current.showPicker()
      } else {
        dateRef.current.click()
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center h-5 mb-1.5">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </label>
        {showPresentBtn && (
          <button
            type="button"
            onClick={() => onChange('Present')}
            className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
          >
            + Set Present
          </button>
        )}
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-3.5 pr-9 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm"
          placeholder={placeholder}
          required={required}
        />
        <input
          ref={dateRef}
          type="date"
          onChange={handleDateChange}
          className="sr-only opacity-0 absolute w-0 h-0 pointer-events-none"
        />
        <button
          type="button"
          onClick={triggerPicker}
          className="absolute right-2 p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          title="Pilih dari Kalender"
        >
          <Calendar size={16} />
        </button>
      </div>
    </div>
  )
}

const AdminDashboard = ({ session, darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Data States
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [certificates, setCertificates] = useState([])
  const [cvUrl, setCvUrl] = useState('')

  const safeJoin = (val, fallback = '') => {
    if (Array.isArray(val)) return val.join(', ')
    if (typeof val === 'string') return val
    if (Array.isArray(fallback)) return fallback.join(', ')
    if (typeof fallback === 'string') return fallback
    return ''
  }

  const [translating, setTranslating] = useState(false)

  const translateToEnglish = async (text) => {
    if (!text || !text.trim()) return ''
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(text)}`
      )
      const data = await res.json()
      if (data && data[0]) {
        return data[0].map(item => item[0]).join('')
      }
    } catch (e) {
      console.warn("Auto translate notice:", e)
    }
    return text
  }

  const handleAutoTranslateProfile = async () => {
    setTranslating(true)
    try {
      const [transSub, transBio, transMission, transCareer] = await Promise.all([
        translateToEnglish(heroForm.subtitles_id || heroForm.subtitles),
        translateToEnglish(heroForm.bio_id || heroForm.bio),
        translateToEnglish(heroForm.mission_id || heroForm.mission),
        translateToEnglish(heroForm.career_goals_id || heroForm.career_goals)
      ])

      setHeroForm(prev => ({
        ...prev,
        subtitles_en: transSub || prev.subtitles_en || prev.subtitles_id,
        bio_en: transBio || prev.bio_en || prev.bio_id,
        mission_en: transMission || prev.mission_en || prev.mission_id,
        career_goals_en: transCareer || prev.career_goals_en || prev.career_goals_id
      }))
      showMsg('success', 'Berhasil menerjemahkan teks ke Bahasa Inggris secara otomatis!')
    } catch (err) {
      showMsg('error', 'Gagal melakukan terjemahan otomatis.')
    } finally {
      setTranslating(false)
    }
  }

  // Hero / Profile / About State
  const [heroForm, setHeroForm] = useState({
    name: profileInfo.name || '',
    subtitles: safeJoin(profileInfo.subtitles, profileInfo.subtitles_id),
    subtitles_id: safeJoin(profileInfo.subtitles_id, profileInfo.subtitles),
    subtitles_en: safeJoin(profileInfo.subtitles_en, profileInfo.subtitles),
    bio: profileInfo.bio,
    bio_id: profileInfo.bio_id || profileInfo.bio,
    bio_en: profileInfo.bio_en || profileInfo.bio,
    profile_image: '/assets/images/profile3.jpg',
    profile_image_1: '/assets/images/profile1.jpeg',
    profile_image_2: '/assets/images/profile2.png',
    profile_image_3: '/assets/images/profile3.jpg',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    email: 'mailto:your-email@example.com',
    mission: profileInfo.mission || '',
    mission_id: profileInfo.mission_id || profileInfo.mission || '',
    mission_en: profileInfo.mission_en || profileInfo.mission || '',
    years_exp: profileInfo.years_exp || '3+',
    projects_count: profileInfo.projects_count || '20+',
    career_goals: profileInfo.careerGoals || '',
    career_goals_id: profileInfo.career_goals_id || profileInfo.careerGoals || '',
    career_goals_en: profileInfo.career_goals_en || profileInfo.careerGoals || '',
    education: profileInfo.education || []
  })

  // UI Flow States
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [editingId, setEditingId] = useState(null)
  
  // Form states
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image_url: '', gallery: [], tech_stack: '', github_link: '', live_link: '', category: 'Web' })
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', proficiency: 80 })
  const [expForm, setExpForm] = useState({ role: '', company: '', type: 'Internship', start_date: '', end_date: 'Present', description: '' })
  const [certForm, setCertForm] = useState({ title: '', issuer: '', type: 'Sertifikasi Profesi', date: '', issuer_logo: '', image_url: '', pdf_url: '', credential_url: '' })
  const [cvFile, setCvFile] = useState(null)

  // Session protection & Logout handler
  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut()
      }
    } catch (e) {}
    localStorage.removeItem('mock_admin_session')
    navigate('/admin/login', { replace: true })
  }

  // Initialize, verify authentication session, and load all records
  useEffect(() => {
    const checkAuth = async () => {
      let isAuthenticated = false
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession()
        if (data?.session) {
          isAuthenticated = true
        }
      }
      if (!isAuthenticated) {
        const mockAuth = localStorage.getItem('mock_admin_session') === 'true'
        if (mockAuth) {
          isAuthenticated = true
        }
      }

      if (!isAuthenticated) {
        navigate('/admin/login', { replace: true })
        return
      }

      loadAllData()
    }

    checkAuth()
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

        if (!pData.error && pData.data) {
          const localP = localStorage.getItem('db_projects')
          const localProjectsMap = localP ? JSON.parse(localP).reduce((acc, item) => {
            acc[item.id] = item
            acc[item.title] = item
            return acc
          }, {}) : {}

          const mergedProjects = pData.data.map(p => {
            const matchedLocal = localProjectsMap[p.id] || localProjectsMap[p.title]
            const galleryList = Array.isArray(p.gallery) && p.gallery.length > 0 
              ? p.gallery 
              : (matchedLocal && Array.isArray(matchedLocal.gallery) && matchedLocal.gallery.length > 0 ? matchedLocal.gallery : (p.image_url ? [p.image_url] : []))
            return { ...p, gallery: galleryList }
          })

          setProjects(mergedProjects)
          localStorage.setItem('db_projects', JSON.stringify(mergedProjects))
        } else {
          const localP = localStorage.getItem('db_projects')
          setProjects(localP ? JSON.parse(localP) : [])
        }

        if (!sData.error && sData.data) {
          setSkills(sData.data)
          localStorage.setItem('db_skills', JSON.stringify(sData.data))
        } else {
          const localS = localStorage.getItem('db_skills')
          setSkills(localS ? JSON.parse(localS) : [])
        }

        if (!eData.error && eData.data) {
          setExperiences(eData.data)
          localStorage.setItem('db_experiences', JSON.stringify(eData.data))
        } else {
          const localE = localStorage.getItem('db_experiences')
          setExperiences(localE ? JSON.parse(localE) : [])
        }

        if (!cData.error && cData.data) {
          const localC = localStorage.getItem('db_certificates')
          const localCertsMap = localC ? JSON.parse(localC).reduce((acc, item) => {
            if (item.id) acc[item.id] = item
            if (item.title) acc[item.title] = item
            return acc
          }, {}) : {}

          const mergedCertificates = cData.data.map(c => {
            const matchedLocal = localCertsMap[c.id] || localCertsMap[c.title]
            return {
              ...c,
              type: c.type || (matchedLocal?.type) || 'Sertifikasi Profesi',
              issuer_logo: c.issuer_logo || (matchedLocal?.issuer_logo) || '',
              pdf_url: c.pdf_url || (matchedLocal?.pdf_url) || ''
            }
          })

          setCertificates(mergedCertificates)
          localStorage.setItem('db_certificates', JSON.stringify(mergedCertificates))
        } else {
          const localC = localStorage.getItem('db_certificates')
          setCertificates(localC ? JSON.parse(localC) : [])
        }

        // Load profile safely
        try {
          const { data: prof, error: profErr } = await supabase.from('profile').select('*').single()
          if (!profErr && prof) {
            localStorage.setItem('db_profile', JSON.stringify(prof))
            setHeroForm({
              name: prof.name || '',
              subtitles: safeJoin(prof.subtitles, ''),
              subtitles_id: safeJoin(prof.subtitles_id, ''),
              subtitles_en: safeJoin(prof.subtitles_en, ''),
              bio: prof.bio || '',
              bio_id: prof.bio_id || prof.bio || '',
              bio_en: prof.bio_en || prof.bio || '',
              profile_image: prof.profile_image || '',
              profile_image_1: prof.profile_image_1 || (Array.isArray(prof.profile_images) ? prof.profile_images[0] : '/assets/images/profile1.jpeg'),
              profile_image_2: prof.profile_image_2 || (Array.isArray(prof.profile_images) ? prof.profile_images[1] : '/assets/images/profile2.png'),
              profile_image_3: prof.profile_image_3 || (Array.isArray(prof.profile_images) ? prof.profile_images[2] : (prof.profile_image || '/assets/images/profile3.jpg')),
              github: prof.github || '',
              linkedin: prof.linkedin || '',
              instagram: prof.instagram || '',
              email: prof.email || '',
              mission: prof.mission || '',
              mission_id: prof.mission_id || prof.mission || '',
              mission_en: prof.mission_en || prof.mission || '',
              years_exp: prof.years_exp || '',
              projects_count: prof.projects_count || '',
              career_goals: prof.career_goals || prof.careerGoals || '',
              career_goals_id: prof.career_goals_id || prof.career_goals || '',
              career_goals_en: prof.career_goals_en || prof.career_goals || '',
              education: prof.education ? (typeof prof.education === 'string' ? JSON.parse(prof.education) : prof.education) : []
            })
          } else {
            const localProfile = localStorage.getItem('db_profile')
            if (localProfile) {
              const parsed = JSON.parse(localProfile)
              setHeroForm({
                name: parsed.name || '',
                subtitles: safeJoin(parsed.subtitles, ''),
                subtitles_id: safeJoin(parsed.subtitles_id, ''),
                subtitles_en: safeJoin(parsed.subtitles_en, ''),
                bio: parsed.bio || '',
                bio_id: parsed.bio_id || parsed.bio || '',
                bio_en: parsed.bio_en || parsed.bio || '',
                profile_image: parsed.profile_image || '',
                profile_image_1: parsed.profile_image_1 || (Array.isArray(parsed.profile_images) ? parsed.profile_images[0] : '/assets/images/profile1.jpeg'),
                profile_image_2: parsed.profile_image_2 || (Array.isArray(parsed.profile_images) ? parsed.profile_images[1] : '/assets/images/profile2.png'),
                profile_image_3: parsed.profile_image_3 || (Array.isArray(parsed.profile_images) ? parsed.profile_images[2] : (parsed.profile_image || '/assets/images/profile3.jpg')),
                github: parsed.github || '',
                linkedin: parsed.linkedin || '',
                instagram: parsed.instagram || '',
                email: parsed.email || '',
                mission: parsed.mission || '',
                mission_id: parsed.mission_id || parsed.mission || '',
                mission_en: parsed.mission_en || parsed.mission || '',
                years_exp: parsed.years_exp || '',
                projects_count: parsed.projects_count || '',
                career_goals: parsed.career_goals || parsed.careerGoals || '',
                career_goals_id: parsed.career_goals_id || parsed.career_goals || '',
                career_goals_en: parsed.career_goals_en || parsed.career_goals || '',
                logoKampus: parsed.logoKampus || '/assets/images/logoKampus.png',
                logoFakultas: parsed.logoFakultas || '/assets/images/logoFakultas.png',
                logoSMK: parsed.logoSMK || '/assets/images/logoSMK.png',
                education: parsed.education || []
              })
            }
          }
        } catch (e) {
          console.warn("Profile table query notice:", e)
        }

      } else {
        // Load from LocalStorage or Fallback
        const localProjects = localStorage.getItem('db_projects')
        const localSkills = localStorage.getItem('db_skills')
        const localExperiences = localStorage.getItem('db_experiences')
        const localCertificates = localStorage.getItem('db_certificates')
        const localCv = localStorage.getItem('db_cv')
        const localProfile = localStorage.getItem('db_profile')

        setProjects(localProjects ? JSON.parse(localProjects) : [])
        setSkills(localSkills ? JSON.parse(localSkills) : [])
        setExperiences(localExperiences ? JSON.parse(localExperiences) : [])
        setCertificates(localCertificates ? JSON.parse(localCertificates) : [])
        setCvUrl(localCv || '')

        if (localProfile) {
          const parsed = JSON.parse(localProfile)
          setHeroForm({
            name: parsed.name || '',
            subtitles: safeJoin(parsed.subtitles, ''),
            subtitles_id: safeJoin(parsed.subtitles_id, ''),
            subtitles_en: safeJoin(parsed.subtitles_en, ''),
            bio: parsed.bio || '',
            bio_id: parsed.bio_id || parsed.bio || '',
            bio_en: parsed.bio_en || parsed.bio || '',
            profile_image: parsed.profile_image || '',
            profile_image_1: parsed.profile_image_1 || (Array.isArray(parsed.profile_images) ? parsed.profile_images[0] : '/assets/images/profile1.jpeg'),
            profile_image_2: parsed.profile_image_2 || (Array.isArray(parsed.profile_images) ? parsed.profile_images[1] : '/assets/images/profile2.png'),
            profile_image_3: parsed.profile_image_3 || (Array.isArray(parsed.profile_images) ? parsed.profile_images[2] : (parsed.profile_image || '/assets/images/profile3.jpg')),
            github: parsed.github || '',
            linkedin: parsed.linkedin || '',
            instagram: parsed.instagram || '',
            email: parsed.email || '',
            mission: parsed.mission || '',
            mission_id: parsed.mission_id || parsed.mission || '',
            mission_en: parsed.mission_en || parsed.mission || '',
            years_exp: parsed.years_exp || '',
            projects_count: parsed.projects_count || '',
            career_goals: parsed.career_goals || parsed.careerGoals || '',
            career_goals_id: parsed.career_goals_id || parsed.career_goals || '',
            career_goals_en: parsed.career_goals_en || parsed.career_goals || '',
            education: parsed.education || []
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

  // Education item handlers
  const addEduItem = () => {
    setHeroForm(prev => ({
      ...prev,
      education: [...(prev.education || []), { degree: '', institution: '', period: '', description: '' }]
    }))
  }

  const updateEduItem = (index, field, value) => {
    setHeroForm(prev => {
      const updated = [...(prev.education || [])]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, education: updated }
    })
  }

  const removeEduItem = (index) => {
    setHeroForm(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index)
    }))
  }

  const saveHeroProfile = async (e) => {
    e.preventDefault()
    try {
      let subEn = heroForm.subtitles_en
      let bioEn = heroForm.bio_en
      let missionEn = heroForm.mission_en
      let careerEn = heroForm.career_goals_en

      if (!subEn || !subEn.trim()) {
        subEn = await translateToEnglish(heroForm.subtitles_id || heroForm.subtitles)
      }
      if (!bioEn || !bioEn.trim()) {
        bioEn = await translateToEnglish(heroForm.bio_id || heroForm.bio)
      }
      if (!missionEn || !missionEn.trim()) {
        missionEn = await translateToEnglish(heroForm.mission_id || heroForm.mission)
      }
      if (!careerEn || !careerEn.trim()) {
        careerEn = await translateToEnglish(heroForm.career_goals_id || heroForm.career_goals)
      }

      setHeroForm(prev => ({
        ...prev,
        subtitles_en: subEn,
        bio_en: bioEn,
        mission_en: missionEn,
        career_goals_en: careerEn
      }))

      const profileData = {
        name: heroForm.name,
        subtitles: typeof heroForm.subtitles === 'string' ? heroForm.subtitles.split(',').map(s => s.trim()) : heroForm.subtitles,
        subtitles_id: typeof heroForm.subtitles_id === 'string' ? heroForm.subtitles_id.split(',').map(s => s.trim()) : heroForm.subtitles_id,
        subtitles_en: typeof subEn === 'string' ? subEn.split(',').map(s => s.trim()) : subEn,
        bio: heroForm.bio,
        bio_id: heroForm.bio_id,
        bio_en: bioEn,
        profile_image: heroForm.profile_image_3 || heroForm.profile_image || '/assets/images/profile3.jpg',
        profile_image_1: heroForm.profile_image_1 || '/assets/images/profile1.jpeg',
        profile_image_2: heroForm.profile_image_2 || '/assets/images/profile2.png',
        profile_image_3: heroForm.profile_image_3 || '/assets/images/profile3.jpg',
        profile_images: [
          heroForm.profile_image_1 || '/assets/images/profile1.jpeg',
          heroForm.profile_image_2 || '/assets/images/profile2.png',
          heroForm.profile_image_3 || '/assets/images/profile3.jpg'
        ],
        github: heroForm.github,
        linkedin: heroForm.linkedin,
        instagram: heroForm.instagram,
        email: heroForm.email,
        mission: heroForm.mission,
        mission_id: heroForm.mission_id,
        mission_en: missionEn,
        years_exp: heroForm.years_exp,
        projects_count: heroForm.projects_count,
        career_goals: heroForm.career_goals,
        career_goals_id: heroForm.career_goals_id,
        career_goals_en: careerEn,
        education: heroForm.education
      }

      // Always persist to localStorage for immediate website update
      localStorage.setItem('db_profile', JSON.stringify(profileData))
      window.dispatchEvent(new Event('portfolio_data_updated'))

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('profile').upsert([{ id: 1, ...profileData }])
        if (error) {
          if (error.code === '42P01' || error.message.includes('find the table') || error.message.includes('schema cache')) {
            showMsg('error', "Tabel 'profile' belum dibuat di Supabase SQL. Data berhasil disimpan secara lokal!")
            return
          }
          throw error
        }
        showMsg('success', 'Profile, About, & Education saved successfully!')
      } else {
        showMsg('success', 'Profile, About, & Education saved locally (Preview mode).')
      }
    } catch (err) {
      showMsg('error', err.message || 'Failed to save profile.')
    }
  }

  // Flash Message Helper
  const showMsg = (type, text) => {
    setMsg({ type, text })
    setTimeout(() => setMsg({ type: '', text: '' }), 4000)
  }

  // Save changes to localStorage helper and notify app components
  const persistLocalData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      window.dispatchEvent(new Event('portfolio_data_updated'))
    } catch (err) {
      console.warn(`localStorage quota exceeded for ${key}:`, err)
      showMsg('error', 'Ruang penyimpanan lokal penuh. Foto telah di-kompresi otomatis!')
      window.dispatchEvent(new Event('portfolio_data_updated'))
    }
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

    const formattedGallery = Array.isArray(projectForm.gallery)
      ? projectForm.gallery
      : (typeof projectForm.gallery === 'string'
          ? projectForm.gallery.split(',').map(s => s.trim()).filter(Boolean)
          : (projectForm.image_url ? [projectForm.image_url] : []))

    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      image_url: projectForm.image_url || (formattedGallery[0] || '/assets/images/project.jpg'),
      gallery: formattedGallery,
      tech_stack: formattedTech,
      github_link: projectForm.github_link,
      live_link: projectForm.live_link,
      category: projectForm.category
    }

    try {
      let updated = []
      if (editingId) {
        updated = projects.map(p => p.id === editingId ? { ...p, ...payload } : p)
      } else {
        const newProj = { ...payload, id: `p_local_${Date.now()}` }
        updated = [newProj, ...projects]
      }
      setProjects(updated)
      persistLocalData('db_projects', updated)

      if (isSupabaseConfigured && supabase) {
        try {
          const { gallery, ...dbPayload } = payload
          if (editingId) {
            const { error } = await supabase.from('projects').update(dbPayload).eq('id', editingId)
            if (error) throw error
          } else {
            const { error } = await supabase.from('projects').insert([dbPayload])
            if (error) throw error
          }
        } catch (subErr) {
          console.warn("Supabase project save notice:", subErr)
        }
      }

      showMsg('success', editingId ? 'Project updated successfully.' : 'Project created successfully.')
      resetProjectForm()
      loadAllData()
    } catch (err) {
      showMsg('error', err.message || 'Failed to save project.')
    }
  }

  // Helper to check if an ID is a pure numeric database ID from Supabase (not mock string like 'p3', 's1', or 'p_local_...')
  const isNumericId = (id) => typeof id === 'number' || (typeof id === 'string' && /^\d+$/.test(id))

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      persistLocalData('db_projects', updated)

      if (isSupabaseConfigured && supabase && isNumericId(id)) {
        try {
          await supabase.from('projects').delete().eq('id', Number(id))
        } catch (subErr) {
          console.warn("Supabase project delete notice:", subErr)
        }
      }

      showMsg('success', 'Project removed.')
      loadAllData()
    } catch (err) {
      showMsg('error', 'Delete operation failed.')
    }
  }

  const editProject = (p) => {
    setEditingId(p.id)
    let galleryList = []
    if (Array.isArray(p.gallery) && p.gallery.length > 0) {
      galleryList = p.gallery
    } else if (typeof p.gallery === 'string' && p.gallery.trim()) {
      galleryList = p.gallery.split(',').map(s => s.trim()).filter(Boolean)
    } else {
      try {
        const localP = localStorage.getItem('db_projects')
        if (localP) {
          const matched = JSON.parse(localP).find(item => item.id === p.id || item.title === p.title)
          if (matched && Array.isArray(matched.gallery) && matched.gallery.length > 0) {
            galleryList = matched.gallery
          }
        }
      } catch (e) {}
    }

    if (galleryList.length === 0 && p.image_url) {
      galleryList = [p.image_url]
    }

    setProjectForm({
      title: p.title || '',
      description: p.description || '',
      image_url: p.image_url || '',
      gallery: galleryList,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : (p.tech_stack || ''),
      github_link: p.github_link || '',
      live_link: p.live_link || '',
      category: p.category || 'Web'
    })
  }

  const resetProjectForm = () => {
    setEditingId(null)
    setProjectForm({ title: '', description: '', image_url: '', gallery: [], tech_stack: '', github_link: '', live_link: '', category: 'Web' })
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
      let updated = []
      if (editingId) {
        updated = skills.map(s => s.id === editingId ? { ...s, ...payload } : s)
      } else {
        const newSkill = { ...payload, id: `s_local_${Date.now()}` }
        updated = [...skills, newSkill]
      }
      setSkills(updated)
      persistLocalData('db_skills', updated)

      if (isSupabaseConfigured && supabase) {
        try {
          if (editingId) {
            const { error } = await supabase.from('skills').update(payload).eq('id', editingId)
            if (error) throw error
          } else {
            const { error } = await supabase.from('skills').insert([payload])
            if (error) throw error
          }
        } catch (subErr) {
          console.warn("Supabase skill save notice:", subErr)
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
      const updated = skills.filter(s => s.id !== id)
      setSkills(updated)
      persistLocalData('db_skills', updated)

      if (isSupabaseConfigured && supabase && isNumericId(id)) {
        try {
          await supabase.from('skills').delete().eq('id', Number(id))
        } catch (subErr) {
          console.warn("Supabase skill delete notice:", subErr)
        }
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
      let updated = []
      if (editingId) {
        updated = experiences.map(ex => ex.id === editingId ? { ...ex, ...payload } : ex)
      } else {
        const newExp = { ...payload, id: `ex_local_${Date.now()}` }
        updated = [newExp, ...experiences]
      }
      setExperiences(updated)
      persistLocalData('db_experiences', updated)

      if (isSupabaseConfigured && supabase) {
        try {
          if (editingId) {
            const { error } = await supabase.from('experiences').update(payload).eq('id', editingId)
            if (error) throw error
          } else {
            const { error } = await supabase.from('experiences').insert([payload])
            if (error) throw error
          }
        } catch (subErr) {
          console.warn("Supabase experience save notice:", subErr)
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
      const updated = experiences.filter(ex => ex.id !== id)
      setExperiences(updated)
      persistLocalData('db_experiences', updated)

      if (isSupabaseConfigured && supabase && isNumericId(id)) {
        try {
          await supabase.from('experiences').delete().eq('id', Number(id))
        } catch (subErr) {
          console.warn("Supabase experience delete notice:", subErr)
        }
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
      organizer: certForm.issuer,
      type: certForm.type || 'Sertifikasi Profesi',
      date: certForm.date,
      issuer_logo: certForm.issuer_logo || '',
      image_url: certForm.image_url || '/assets/images/project.jpg',
      pdf_url: certForm.pdf_url || '',
      credential_url: certForm.credential_url || ''
    }

    try {
      let updated = []
      if (editingId) {
        updated = certificates.map(c => c.id === editingId ? { ...c, ...payload } : c)
      } else {
        const newCert = { ...payload, id: `c_local_${Date.now()}` }
        updated = [newCert, ...certificates]
      }

      // Always update local state and localStorage
      setCertificates(updated)
      persistLocalData('db_certificates', updated)

      if (isSupabaseConfigured && supabase) {
        try {
          const dbPayload = {
            title: certForm.title,
            issuer: certForm.issuer,
            date: certForm.date,
            image_url: certForm.image_url || '/assets/images/project.jpg',
            credential_url: certForm.credential_url || ''
          }

          if (editingId) {
            let { error } = await supabase.from('certificates').update(payload).eq('id', editingId)
            if (error && (error.code === 'PGRST204' || (error.message && error.message.includes('column')))) {
              const retryRes = await supabase.from('certificates').update(dbPayload).eq('id', editingId)
              if (retryRes.error) throw retryRes.error
            } else if (error) {
              throw error
            }
          } else {
            let { error } = await supabase.from('certificates').insert([payload])
            if (error && (error.code === 'PGRST204' || (error.message && error.message.includes('column')))) {
              const retryRes = await supabase.from('certificates').insert([dbPayload])
              if (retryRes.error) throw retryRes.error
            } else if (error) {
              throw error
            }
          }
          showMsg('success', 'Sertifikat berhasil disimpan ke database & lokal!')
        } catch (subErr) {
          console.warn("Supabase certificate save notice:", subErr)
          showMsg('success', 'Sertifikat berhasil disimpan secara lokal!')
        }
      } else {
        showMsg('success', 'Sertifikat berhasil disimpan secara lokal.')
      }

      resetCertForm()
      loadAllData()
    } catch (err) {
      showMsg('error', err.message || 'Failed to store certificate.')
    }
  }

  const deleteCertificate = async (id) => {
    if (!window.confirm('Delete this certificate?')) return
    try {
      const updated = certificates.filter(c => c.id !== id)
      setCertificates(updated)
      persistLocalData('db_certificates', updated)

      if (isSupabaseConfigured && supabase && isNumericId(id)) {
        try {
          await supabase.from('certificates').delete().eq('id', Number(id))
        } catch (subErr) {
          console.warn("Supabase certificate delete notice:", subErr)
        }
      }

      showMsg('success', 'Certificate removed.')
      loadAllData()
    } catch (err) {
      showMsg('error', 'Delete operation failed.')
    }
  }

  const resetCertForm = () => {
    setEditingId(null)
    setCertForm({
      title: '',
      issuer: '',
      type: 'Sertifikasi Profesi',
      date: '',
      issuer_logo: '',
      image_url: '',
      pdf_url: '',
      credential_url: ''
    })
  }

  /* ========================================================
     IMAGE & CV PDF STORAGE FILE UPLOADING WITH AUTO-COMPRESSION
     ======================================================== */
  const compressImage = (file, maxDimension = 1200, quality = 0.7) => {
    return new Promise((resolve) => {
      if (!file || !file.type || !file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => resolve('')
        reader.readAsDataURL(file)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new window.Image()
        img.onload = () => {
          let width = img.width
          let height = img.height

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width)
              width = maxDimension
            } else {
              width = Math.round((width * maxDimension) / height)
              height = maxDimension
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
          resolve(compressedDataUrl)
        }
        img.onerror = () => resolve(e.target.result)
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFileUpload = async (e, type, targetSetter) => {
    const file = e.target.files[0]
    if (!file) return

    showMsg('success', 'Mengompresi & membaca file...')

    try {
      // High-efficiency Base64 DataURL (compresses large photos down to ~80KB)
      const base64Url = await compressImage(file)
      targetSetter(base64Url)

      if (type === 'cv') {
        try {
          localStorage.setItem('db_cv', base64Url)
        } catch (err) {}
        setCvUrl(base64Url)
      }

      showMsg('success', 'Foto/File berhasil di-kompresi & disimpan ke website!')
    } catch (err) {
      showMsg('error', 'Gagal memuat file. Silakan coba file lain.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Mobile Top Header & Collapsible Hamburger Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/LogoNR.png" 
              alt="Natanael Ruswandi Logo" 
              className="w-8 h-8 object-contain rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-900 shadow-sm" 
            />
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white leading-tight text-xs sm:text-sm">Natanael Ruswandi</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isSupabaseConfigured ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {isSupabaseConfigured ? 'Terhubung (Cloud)' : 'Mode Preview'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-1">
            {[
              { id: 'hero', label: 'Profil & Tentang Saya', icon: <User size={18} /> },
              { id: 'projects', label: 'Kelola Proyek', icon: <FolderGit2 size={18} /> },
              { id: 'experiences', label: 'Kelola Pengalaman', icon: <Briefcase size={18} /> },
              { id: 'certificates', label: 'Kelola Sertifikat', icon: <Award size={18} /> },
              { id: 'cv', label: 'Kelola CV / Berkas', icon: <FileUp size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setEditingId(null)
                  setMobileMenuOpen(false)
                }}
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

            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 transition-colors flex items-center gap-3"
              >
                <LogOut size={18} />
                Keluar Admin
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar Controls (hidden on mobile) */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex-col justify-between transition-colors">
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <img 
                src="/LogoNR.png" 
                alt="Natanael Ruswandi Logo" 
                className="w-9 h-9 object-contain rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-900 shadow-sm" 
              />
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white leading-tight text-sm">Natanael Ruswandi</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSupabaseConfigured ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {isSupabaseConfigured ? 'Terhubung (Cloud)' : 'Mode Preview'}
                  </span>
                </div>
              </div>
            </div>

            {/* Theme Toggle Button */}
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shadow-sm"
                aria-label="Toggle Theme"
                title="Ganti Tema Terang/Gelap"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Navigation Buttons */}
          <nav className="space-y-1">
            {[
              { id: 'hero', label: 'Profil & Tentang Saya', icon: <User size={18} /> },
              { id: 'projects', label: 'Kelola Proyek', icon: <FolderGit2 size={18} /> },
              { id: 'experiences', label: 'Kelola Pengalaman', icon: <Briefcase size={18} /> },
              { id: 'certificates', label: 'Kelola Sertifikat', icon: <Award size={18} /> },
              { id: 'cv', label: 'Kelola CV / Berkas', icon: <FileUp size={18} /> }
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
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 pt-20 px-4 pb-10 md:pt-10 md:px-10 overflow-y-auto md:max-h-screen no-scrollbar">
        
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
               PROFILE, ABOUT & EDUCATION VIEW
               ======================================================== */}
            {activeTab === 'hero' && (
              <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="text-blue-500" size={20} />
                      Profile, About Me & Education Manager
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      Customize your hero section, mission, career goals, stats, and education history.
                    </p>
                  </div>
                </div>

                <form onSubmit={saveHeroProfile} className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">1. Hero Section Details</h4>
                    <button
                      type="button"
                      onClick={handleAutoTranslateProfile}
                      disabled={translating}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                    >
                      <Languages size={15} className={translating ? "animate-spin" : ""} />
                      {translating ? 'Menerjemahkan...' : '✨ Terjemahkan Otomatis ke Inggris'}
                    </button>
                  </div>
                  
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

                    {/* Animated Subtitles / Peran */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Peran / Subtitle Animasi (Bahasa Indonesia)
                        </label>
                        <input 
                          type="text" 
                          value={heroForm.subtitles_id} 
                          onChange={(e) => setHeroForm({...heroForm, subtitles_id: e.target.value, subtitles: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="Pengembang AI, Spesialis Computer Vision" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Animated Subtitles / Roles (English - Opsional)
                        </label>
                        <input 
                          type="text" 
                          value={heroForm.subtitles_en} 
                          onChange={(e) => setHeroForm({...heroForm, subtitles_en: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="Kosongkan untuk otomatis terjemah" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio Description (ID & EN) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Hero Bio (Bahasa Indonesia)
                      </label>
                      <textarea 
                        value={heroForm.bio_id} 
                        onChange={(e) => setHeroForm({...heroForm, bio_id: e.target.value, bio: e.target.value})}
                        rows="3" 
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                        placeholder="Pengembang & Desainer Kreatif yang berfokus..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Hero Bio (English - Opsional)
                      </label>
                      <textarea 
                        value={heroForm.bio_en} 
                        onChange={(e) => setHeroForm({...heroForm, bio_en: e.target.value})}
                        rows="3" 
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                        placeholder="Kosongkan untuk otomatis terjemah..."
                      />
                    </div>
                  </div>

                  {/* 3 Profile Pictures Stack */}
                  <div className="space-y-4 border-t border-b border-slate-200 dark:border-slate-800 py-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                        Foto Profil Hero (3 Foto Tumpukan Kartu)
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        Hero halaman depan menampilkan 3 tumpukan kartu foto interaktif. Anda dapat mengunggah 3 foto terpisah di bawah ini:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Photo 1 (Left) */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          1. Foto Kiri
                        </label>
                        <div className="h-36 rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden bg-slate-200 dark:bg-slate-900">
                          <img 
                            src={heroForm.profile_image_1 || '/assets/images/profile1.jpeg'} 
                            alt="Foto 1" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = '/assets/images/profile1.jpeg' }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={heroForm.profile_image_1} 
                            onChange={(e) => setHeroForm({...heroForm, profile_image_1: e.target.value})}
                            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white" 
                            placeholder="URL Foto 1" 
                          />
                          <label className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, 'profile1', (url) => setHeroForm({...heroForm, profile_image_1: url}))}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Photo 2 (Center / Main) */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          2. Foto Tengah (Utama)
                        </label>
                        <div className="h-36 rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden bg-slate-200 dark:bg-slate-900">
                          <img 
                            src={heroForm.profile_image_2 || '/assets/images/profile2.png'} 
                            alt="Foto 2" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = '/assets/images/profile2.png' }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={heroForm.profile_image_2} 
                            onChange={(e) => setHeroForm({...heroForm, profile_image_2: e.target.value})}
                            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white" 
                            placeholder="URL Foto 2" 
                          />
                          <label className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, 'profile2', (url) => setHeroForm({...heroForm, profile_image_2: url}))}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Photo 3 (Right) */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          3. Foto Kanan
                        </label>
                        <div className="h-36 rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden bg-slate-200 dark:bg-slate-900">
                          <img 
                            src={heroForm.profile_image_3 || '/assets/images/profile3.jpg'} 
                            alt="Foto 3" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = '/assets/images/profile3.jpg' }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={heroForm.profile_image_3} 
                            onChange={(e) => setHeroForm({...heroForm, profile_image_3: e.target.value})}
                            className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white" 
                            placeholder="URL Foto 3" 
                          />
                          <label className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, 'profile3', (url) => setHeroForm({...heroForm, profile_image_3: url}))}
                            />
                          </label>
                        </div>
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

                  {/* ================= ABOUT ME SECTION ================= */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">2. About Me & Career Focus</h4>

                    {/* Mission (ID & EN) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Misi Saya (Bahasa Indonesia)
                        </label>
                        <textarea 
                          value={heroForm.mission_id} 
                          onChange={(e) => setHeroForm({...heroForm, mission_id: e.target.value, mission: e.target.value})}
                          rows="3" 
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                          placeholder="Saya berdedikasi membangun platform..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          My Mission Statement (English)
                        </label>
                        <textarea 
                          value={heroForm.mission_en} 
                          onChange={(e) => setHeroForm({...heroForm, mission_en: e.target.value})}
                          rows="3" 
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                          placeholder="I am dedicated to building high-quality platforms..."
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Years Projects Stat</label>
                        <input 
                          type="text" 
                          value={heroForm.years_exp} 
                          onChange={(e) => setHeroForm({...heroForm, years_exp: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="3+" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Completed Apps Stat</label>
                        <input 
                          type="text" 
                          value={heroForm.projects_count} 
                          onChange={(e) => setHeroForm({...heroForm, projects_count: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="20+" 
                        />
                      </div>
                    </div>

                    {/* Career Goals (ID & EN) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Fokus Karir (Bahasa Indonesia)
                        </label>
                        <textarea 
                          value={heroForm.career_goals_id} 
                          onChange={(e) => setHeroForm({...heroForm, career_goals_id: e.target.value, career_goals: e.target.value})}
                          rows="3" 
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                          placeholder="Tujuan utama saya adalah melahirkan inovasi..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          Career Focus / Goals (English)
                        </label>
                        <textarea 
                          value={heroForm.career_goals_en} 
                          onChange={(e) => setHeroForm({...heroForm, career_goals_en: e.target.value})}
                          rows="3" 
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm resize-none" 
                          placeholder="My ultimate goal is to pioneer solutions..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* ================= EDUCATION HISTORY SECTION ================= */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                        <GraduationCap size={18} />
                        3. Education History
                      </h4>
                      <button 
                        type="button" 
                        onClick={addEduItem}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-purple-500/20"
                      >
                        <Plus size={14} /> Add Education
                      </button>
                    </div>

                    {/* Interactive Academic Logos Upload Manager */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4">
                      <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2">
                          <Sparkles size={14} className="text-blue-500" />
                          Upload & Kelola Logo Afiliasi (Kampus, FKOM & SMK)
                        </h5>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                          Unggah foto logo baru atau masukkan URL logo khusus untuk ditampilkan di timeline riwayat pendidikan.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Logo Kampus */}
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                          <div className="flex items-center gap-2">
                            <img src={heroForm.logoKampus || '/assets/images/logoKampus.png'} alt="Logo Kampus" className="w-7 h-7 object-contain" />
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">1. Logo Kampus</span>
                          </div>
                          <div className="flex gap-1.5">
                            <input 
                              type="text" 
                              value={heroForm.logoKampus || ''} 
                              onChange={(e) => setHeroForm({...heroForm, logoKampus: e.target.value})} 
                              placeholder="URL Logo Kampus"
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                            />
                            <label className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] flex items-center justify-center cursor-pointer shrink-0 shadow-sm">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, 'logoKampus', (url) => setHeroForm({...heroForm, logoKampus: url}))}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Logo Fakultas */}
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                          <div className="flex items-center gap-2">
                            <img src={heroForm.logoFakultas || '/assets/images/logoFakultas.png'} alt="Logo FKOM" className="w-7 h-7 object-contain" />
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">2. Logo Fakultas</span>
                          </div>
                          <div className="flex gap-1.5">
                            <input 
                              type="text" 
                              value={heroForm.logoFakultas || ''} 
                              onChange={(e) => setHeroForm({...heroForm, logoFakultas: e.target.value})} 
                              placeholder="URL Logo Fakultas"
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                            />
                            <label className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] flex items-center justify-center cursor-pointer shrink-0 shadow-sm">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, 'logoFakultas', (url) => setHeroForm({...heroForm, logoFakultas: url}))}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Logo SMK */}
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                          <div className="flex items-center gap-2">
                            <img src={heroForm.logoSMK || '/assets/images/logoSMK.png'} alt="Logo SMK" className="w-7 h-7 object-contain" />
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">3. Logo SMK</span>
                          </div>
                          <div className="flex gap-1.5">
                            <input 
                              type="text" 
                              value={heroForm.logoSMK || ''} 
                              onChange={(e) => setHeroForm({...heroForm, logoSMK: e.target.value})} 
                              placeholder="URL Logo SMK"
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                            />
                            <label className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] flex items-center justify-center cursor-pointer shrink-0 shadow-sm">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, 'logoSMK', (url) => setHeroForm({...heroForm, logoSMK: url}))}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(heroForm.education || []).length === 0 ? (
                      <p className="text-slate-500 text-xs italic">No education entries added yet. Click "Add Education" to create one.</p>
                    ) : (
                      (heroForm.education || []).map((edu, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3 relative group">
                          <button 
                            type="button"
                            onClick={() => removeEduItem(idx)}
                            className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                            title="Remove Education Item"
                          >
                            <Trash2 size={16} />
                          </button>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Degree / Major</label>
                              <input 
                                type="text"
                                value={edu.degree || ''}
                                onChange={(e) => updateEduItem(idx, 'degree', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
                                placeholder="Bachelor of Computer Science"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Period</label>
                              <input 
                                type="text"
                                value={edu.period || ''}
                                onChange={(e) => updateEduItem(idx, 'period', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
                                placeholder="2021 - 2025"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Institution / University</label>
                            <input 
                              type="text"
                              value={edu.institution || ''}
                              onChange={(e) => updateEduItem(idx, 'institution', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
                              placeholder="State University / Institute"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Description / Achievements</label>
                            <textarea 
                              value={edu.description || ''}
                              onChange={(e) => updateEduItem(idx, 'description', e.target.value)}
                              rows="2"
                              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                              placeholder="Specialized in Artificial Intelligence, Computer Vision..."
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <Save size={16} />
                      Save Profile, About & Education
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
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Main Cover Image</label>
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

                    {/* Documentation Photos Gallery */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-3">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Dokumentasi Proyek / Screenshots (Galeri Foto)
                      </label>
                      <div className="flex gap-2">
                        <label className="w-full px-4 py-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors border border-blue-500/20 shadow-sm">
                          <Plus size={15} />
                          Upload Foto Dokumentasi Tambahan
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'gallery', (url) => {
                              setProjectForm(prev => ({
                                ...prev,
                                gallery: [...(prev.gallery || []), url]
                              }))
                            })}
                          />
                        </label>
                      </div>

                      {/* Thumbnail List */}
                      {projectForm.gallery && projectForm.gallery.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          {projectForm.gallery.map((imgUrl, gIdx) => (
                            <div key={gIdx} className="relative group rounded-lg overflow-hidden border border-slate-300 dark:border-slate-800 h-20 bg-slate-200 dark:bg-slate-900 shadow-sm">
                              <img src={imgUrl} alt={`Doc ${gIdx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  setProjectForm(prev => ({
                                    ...prev,
                                    gallery: prev.gallery.filter((_, i) => i !== gIdx)
                                  }))
                                }}
                                className="absolute top-1 right-1 p-1 rounded-md bg-rose-600 text-white shadow hover:bg-rose-700 transition-colors"
                                title="Hapus Foto Dokumentasi Ini"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400 dark:text-slate-500 text-xs italic">
                          Belum ada foto dokumentasi tambahan. Klik tombol di atas untuk upload beberapa foto.
                        </p>
                      )}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <DatePickerInput
                        label="Tanggal Mulai"
                        value={expForm.start_date}
                        onChange={(val) => setExpForm({ ...expForm, start_date: val })}
                        placeholder="2024-03"
                        required
                      />
                      <DatePickerInput
                        label="Tanggal Selesai"
                        value={expForm.end_date}
                        onChange={(val) => setExpForm({ ...expForm, end_date: val })}
                        placeholder="2024-08 atau Present"
                        showPresentBtn={true}
                      />
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
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Judul Sertifikat / Pelatihan</label>
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
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Penerbit / Penyelenggara (Issuer)</label>
                      <input 
                        type="text" 
                        value={certForm.issuer} 
                        onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="Coursera / Google / BNSP" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Tipe Sertifikat</label>
                        <select 
                          value={certForm.type} 
                          onChange={(e) => setCertForm({...certForm, type: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm"
                        >
                          <option value="Sertifikasi Profesi">Sertifikasi Profesi</option>
                          <option value="Pelatihan">Pelatihan TIK / Seminar</option>
                        </select>
                      </div>
                      <DatePickerInput
                        label="Tanggal Terbit"
                        value={certForm.date}
                        onChange={(val) => setCertForm({ ...certForm, date: val })}
                        placeholder="2024-05"
                        required
                      />
                    </div>

                    {/* Logo Penerbit */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Logo Penerbit / Issuer Logo</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={certForm.issuer_logo} 
                          onChange={(e) => setCertForm({...certForm, issuer_logo: e.target.value})}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="URL Logo (Opsional)" 
                        />
                        <label className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors border border-slate-300 dark:border-slate-700">
                          Upload Logo
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'logo', (url) => setCertForm({...certForm, issuer_logo: url}))}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Foto Pratinjau Sertifikat */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Foto / Pratinjau Gambar Sertifikat</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={certForm.image_url} 
                          onChange={(e) => setCertForm({...certForm, image_url: e.target.value})}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="URL Gambar Sertifikat" 
                        />
                        <label className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors border border-slate-300 dark:border-slate-700">
                          Upload Foto
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'certificate_img', (url) => setCertForm({...certForm, image_url: url}))}
                          />
                        </label>
                      </div>
                    </div>

                    {/* File PDF Sertifikat */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">File PDF Sertifikat (Untuk Fitur "Lihat PDF")</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={certForm.pdf_url} 
                          onChange={(e) => setCertForm({...certForm, pdf_url: e.target.value})}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                          placeholder="URL File PDF (Opsional)" 
                        />
                        <label className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                          Upload PDF
                          <input 
                            type="file" 
                            accept="application/pdf,image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, 'cert_pdf', (url) => setCertForm({...certForm, pdf_url: url}))}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Link Verifikasi Kredensial (URL Web)</label>
                      <input 
                        type="url" 
                        value={certForm.credential_url} 
                        onChange={(e) => setCertForm({...certForm, credential_url: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-sm" 
                        placeholder="https://coursera.org/verify/..." 
                      />
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
                        <th className="p-4">Type / Issuer</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {certificates.map((c) => (
                        <tr key={c.id} className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-semibold text-slate-900 dark:text-white">
                            <div>{c.title}</div>
                            {c.pdf_url && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-1">
                                📄 Terdapat Dokumen PDF
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-medium text-xs">
                            <div className="font-semibold text-slate-900 dark:text-white">{c.issuer || c.organizer}</div>
                            <span className="text-[11px] text-slate-500">{c.type || 'Sertifikasi Profesi'}</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { 
                                setEditingId(c.id); 
                                setCertForm({ 
                                  title: c.title || '', 
                                  issuer: c.issuer || c.organizer || '', 
                                  type: c.type || 'Sertifikasi Profesi',
                                  date: c.date || '', 
                                  issuer_logo: c.issuer_logo || '',
                                  image_url: c.image_url || '', 
                                  pdf_url: c.pdf_url || '',
                                  credential_url: c.credential_url || '' 
                                }); 
                              }} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Edit">
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
              <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-none">
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
