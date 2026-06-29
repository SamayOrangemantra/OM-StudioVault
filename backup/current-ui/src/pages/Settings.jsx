import { Settings as SettingsIcon } from 'lucide-react'
import PlaceholderPage from './PlaceholderPage'

export default function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      subtitle="Manage your workspace, members, and preferences."
      icon={SettingsIcon}
      phase="a later phase"
    />
  )
}
