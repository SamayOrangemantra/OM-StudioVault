import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from './AuthProvider'
import { FavoritesProvider } from './FavoritesProvider'
import { TagsProvider } from './TagsProvider'
import { ToastProvider } from './ToastProvider'

export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <TagsProvider>
            <ToastProvider>{children}</ToastProvider>
          </TagsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
