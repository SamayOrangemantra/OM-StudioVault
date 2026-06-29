import { FileImage, FileVideo, FileText, Box, File } from 'lucide-react'

/** Shared mapping of asset.type → icon, used by cards, rows, and details. */
export const TYPE_ICON = {
  image: FileImage,
  video: FileVideo,
  document: FileText,
  '3d': Box,
}

export function AssetTypeIcon({ type, className }) {
  const Icon = TYPE_ICON[type] ?? File
  return <Icon className={className} />
}
