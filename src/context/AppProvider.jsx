import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from './AuthProvider'
import { FavoritesProvider } from './FavoritesProvider'
import { TagsProvider } from './TagsProvider'

/**
 * Single composition point for all app-wide providers. main.jsx imports only
 * this — new providers nest here in later phases.
 */
export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <TagsProvider>{children}</TagsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
