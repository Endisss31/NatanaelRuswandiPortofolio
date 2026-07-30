import React from 'react'
import { Code, Server, Smartphone, Cpu, Wrench, Globe, Database, Terminal, FileCode, HardDrive } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const techLogos = [
  { name: "React.js", logo: "https://cdn.simpleicons.org/react", icon: <Code className="text-cyan-500" size={24} /> },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript", icon: <FileCode className="text-amber-500" size={24} /> },
  { name: "HTML5", logo: "https://cdn.simpleicons.org/html5", icon: <Globe className="text-orange-500" size={24} /> },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/css3/css3-original.svg", icon: <FileCode className="text-blue-500" size={24} /> },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss", icon: <Code className="text-teal-400" size={24} /> },
  { name: "Android", logo: "https://cdn.simpleicons.org/android", icon: <Smartphone className="text-emerald-500" size={24} /> },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs", icon: <Server className="text-emerald-600" size={24} /> },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma", icon: <Wrench className="text-pink-500" size={24} /> },
  { name: "Git", logo: "https://cdn.simpleicons.org/git", icon: <Terminal className="text-red-500" size={24} /> },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/github/github-original.svg", icon: <Terminal className="text-slate-800 dark:text-slate-200" size={24} /> },
  { name: "Python", logo: "https://cdn.simpleicons.org/python", icon: <FileCode className="text-blue-600" size={24} /> },
  { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql", icon: <Database className="text-sky-600" size={24} /> },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql", icon: <Database className="text-indigo-500" size={24} /> },
  { name: "MikroTik", logo: "https://cdn.simpleicons.org/mikrotik", icon: <Server className="text-red-600" size={24} /> },
  { name: "C++", logo: "https://cdn.simpleicons.org/cplusplus", icon: <Cpu className="text-blue-700" size={24} /> },
  { name: "Arduino", logo: "https://cdn.simpleicons.org/arduino", icon: <Cpu className="text-teal-600" size={24} /> },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicon/devicon/icons/vscode/vscode-original.svg", icon: <FileCode className="text-blue-500" size={24} /> },
  { name: "Network", logo: "https://cdn.simpleicons.org/cisco", icon: <Server className="text-blue-400" size={24} /> },
  { name: "MS Office", logo: "https://cdn.simpleicons.org/microsoft", icon: <HardDrive className="text-blue-600" size={24} /> },
]

const Skills = () => {
  const { t } = useLanguage()

  // Triplicating lists for seamless infinite loop
  const row1 = [...techLogos, ...techLogos, ...techLogos]
  const row2 = [...techLogos].reverse().concat([...techLogos].reverse(), [...techLogos].reverse())

  return (
    <div className="w-full overflow-hidden">
      {/* Title & Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          {t('skills.title')}
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium">
          {t('skills.subtitle')}
        </p>
      </div>

      {/* Brand Logos Full-Width Marquee */}
      <div className="relative py-4 w-full overflow-hidden">
        {/* Left & Right Fade Overlay Gradient */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="space-y-5 w-full overflow-hidden">
          
          {/* Row 1 Marquee */}
          <div className="overflow-hidden w-full">
            <div className="animate-marquee flex gap-4 sm:gap-5">
              {row1.map((item, idx) => (
                <div
                  key={`r1-${item.name}-${idx}`}
                  className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all flex flex-col items-center justify-center p-3 gap-2 group cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform relative overflow-hidden">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex'
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 text-center truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 Marquee Reverse */}
          <div className="overflow-hidden w-full">
            <div className="animate-marquee-reverse flex gap-4 sm:gap-5">
              {row2.map((item, idx) => (
                <div
                  key={`r2-${item.name}-${idx}`}
                  className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all flex flex-col items-center justify-center p-3 gap-2 group cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform relative overflow-hidden">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex'
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 text-center truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Skills
