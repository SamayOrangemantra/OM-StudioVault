import { createContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export const TagsContext = createContext(null)

const STORAGE_KEY = 'aura.tagOverrides'

/**
 * Stores user-accepted tags per asset (e.g. from the AI Tag prototype) as a map
 * of assetId → string[]. These are merged on top of an asset's base tags so the
 * additions persist and show everywhere the asset appears. Frontend-only.
 */
export function TagsProvider({ children }) {
  const [overrides, setOverrides] = useLocalStorage(STORAGE_KEY, {})

  const addTags = useCallback(
    (assetId, tags) =>
      setOverrides((prev) => {
        const existing = prev[assetId] || []
        const merged = [...new Set([...existing, ...tags])]
        return { ...prev, [assetId]: merged }
      }),
    [setOverrides],
  )

  const value = useMemo(
    () => ({
      overrides,
      addTags,
      /** Base tags merged with any accepted additions, de-duplicated. */
      getTags: (asset) => [
        ...new Set([...(asset.tags || []), ...(overrides[asset.id] || [])]),
      ],
    }),
    [overrides, addTags],
  )

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>
}
