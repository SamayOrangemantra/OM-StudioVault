import { createContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { users } from '@/data'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'aura.auth'

/**
 * Dummy session provider. There is NO real authentication in this prototype —
 * `login()` simply marks the session as active and persists it so a refresh
 * doesn't bounce you back to the login screen. The shape (user + login/logout)
 * mirrors a real auth context so swapping in a provider later is a localized
 * change. The "signed-in" user is just the first mock user.
 */
export function AuthProvider({ children }) {
  const [authed, setAuthed] = useLocalStorage(STORAGE_KEY, false)

  const login = useCallback(() => setAuthed(true), [setAuthed])
  const logout = useCallback(() => setAuthed(false), [setAuthed])

  const value = useMemo(
    () => ({
      isAuthenticated: authed,
      user: users[0],
      login,
      logout,
    }),
    [authed, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
