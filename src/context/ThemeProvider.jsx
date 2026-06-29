import { createContext, useCallback, useEffect, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export const ThemeContext = createContext(null)

const STORAGE_KEY = 'aura.theme'

function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * Owns the light/dark theme. Resolves initial value from localStorage, falling
 * back to system preference, and reflects it onto <html> via the `.dark` class
 * so all CSS-variable tokens switch at once.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEY, getSystemTheme())

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [setTheme],
  )

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
