import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'app-theme'

export const THEMES = [
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Oscuro' },
  { id: 'midnight', label: 'Midnight' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      if (s === 'light' || s === 'dark' || s === 'midnight') return s
    } catch {
      /* ignore */
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const setTheme = (t) => {
    if (t === 'light' || t === 'dark' || t === 'midnight') setThemeState(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
