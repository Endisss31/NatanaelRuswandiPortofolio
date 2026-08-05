import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from './supabase'

export function usePortfolioData() {
  const [data, setData] = useState({
    projects: [],
    skills: [],
    experiences: [],
    certificates: [],
    profile: null,
    loading: true
  })

  const loadData = async () => {
    try {
      let pData = null
      let sData = null
      let eData = null
      let cData = null
      let profData = null

      if (isSupabaseConfigured && supabase) {
        const [pRes, sRes, eRes, cRes, profRes] = await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('skills').select('*').order('created_at', { ascending: true }),
          supabase.from('experiences').select('*').order('start_date', { ascending: false }),
          supabase.from('certificates').select('*').order('created_at', { ascending: false }),
          supabase.from('profile').select('*').single()
        ])

        if (!pRes.error && pRes.data) pData = pRes.data
        if (!sRes.error && sRes.data) sData = sRes.data
        if (!eRes.error && eRes.data) eData = eRes.data
        if (!cRes.error && cRes.data) cData = cRes.data
        if (!profRes.error && profRes.data) profData = profRes.data
      }

      // Fallback to localStorage cache if Supabase didn't return data
      const localP = localStorage.getItem('db_projects')
      const localS = localStorage.getItem('db_skills')
      const localE = localStorage.getItem('db_experiences')
      const localC = localStorage.getItem('db_certificates')
      const localProf = localStorage.getItem('db_profile')

      let projects = []
      const localProjectsList = localP ? JSON.parse(localP) : []
      const localProjectsMap = localProjectsList.reduce((acc, item) => {
        if (item.id) acc[item.id] = item
        if (item.title) acc[item.title] = item
        return acc
      }, {})

      if (pData && pData.length > 0) {
        projects = pData.map(p => {
          const matchedLocal = localProjectsMap[p.id] || localProjectsMap[p.title]
          const galleryList = Array.isArray(p.gallery) && p.gallery.length > 0 
            ? p.gallery 
            : (matchedLocal && Array.isArray(matchedLocal.gallery) && matchedLocal.gallery.length > 0 
                ? matchedLocal.gallery 
                : (p.image_url ? [p.image_url] : []))
          return { ...p, gallery: galleryList }
        })
      } else {
        projects = localProjectsList
      }

      const skills = sData ?? (localS ? JSON.parse(localS) : [])
      const experiences = eData ?? (localE ? JSON.parse(localE) : [])

      let certificates = []
      const localCertsList = localC ? JSON.parse(localC) : []
      const localCertsMap = localCertsList.reduce((acc, item) => {
        if (item.id) acc[item.id] = item
        if (item.title) acc[item.title] = item
        return acc
      }, {})

      if (cData && cData.length > 0) {
        certificates = cData.map(c => {
          const matchedLocal = localCertsMap[c.id] || localCertsMap[c.title]
          return {
            ...c,
            type: c.type || (matchedLocal?.type) || 'Sertifikasi Profesi',
            issuer_logo: c.issuer_logo || (matchedLocal?.issuer_logo) || '',
            pdf_url: c.pdf_url || (matchedLocal?.pdf_url) || ''
          }
        })
      } else {
        certificates = localCertsList
      }

      const profile = profData ?? (localProf ? JSON.parse(localProf) : null)

      setData({
        projects,
        skills,
        experiences,
        certificates,
        profile,
        loading: false
      })
    } catch (e) {
      console.warn("Portfolio data load notice:", e)
      setData(prev => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    loadData()
    const handleUpdate = () => loadData()
    window.addEventListener('portfolio_data_updated', handleUpdate)
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate)
  }, [])

  return data
}
