import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_language') || 'id'
  })

  useEffect(() => {
    localStorage.setItem('app_language', lang)
  }, [lang])

  const toggleLanguage = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'))
  }

  // Translation helper function
  const t = (path) => {
    const keys = path.split('.')
    let current = translations[lang] || translations.id
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key]
      } else {
        return path // Fallback to key path if missing
      }
    }
    return current
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
