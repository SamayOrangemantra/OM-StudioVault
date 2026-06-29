import { useContext } from 'react'
import { TagsContext } from '@/context/TagsProvider'

export function useTags() {
  const ctx = useContext(TagsContext)
  if (!ctx) {
    throw new Error('useTags must be used within <TagsProvider>')
  }
  return ctx
}
