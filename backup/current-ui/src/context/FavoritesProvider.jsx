import { createContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { assets } from '@/data'

export const FavoritesContext = createContext(null)

const STORAGE_KEY = 'aura.favorites'

// Seed from assets flagged favorite in the mock data, so the app opens with a
// believable set of bookmarks. Persisted thereafter via localStorage.
const seedFavorites = () => assets.filter((a) => a.favorite).map((a) => a.id)

/**
 * Owns the set of favorited asset IDs. Backed by localStorage so favorites
 * survive reloads. Frontend-only — no backend, no sync.
 */
export function FavoritesProvider({ children }) {
  const [ids, setIds] = useLocalStorage(STORAGE_KEY, seedFavorites())

  const toggleFavorite = useCallback(
    (id) =>
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [setIds],
  )

  const value = useMemo(() => {
    const set = new Set(ids)
    return {
      favoriteIds: ids,
      favoriteSet: set,
      isFavorite: (id) => set.has(id),
      toggleFavorite,
      count: ids.length,
    }
  }, [ids, toggleFavorite])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
