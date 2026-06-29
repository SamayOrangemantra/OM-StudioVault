import { PageHeader, EmptyState } from '@/components/ui'

/**
 * Phase-1 stand-in for a not-yet-built feature screen. Every feature route
 * renders one of these so navigation, layout, and theming can be validated
 * end-to-end before any real feature work begins.
 */
export default function PlaceholderPage({ title, subtitle, icon, phase }) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} subtitle={subtitle} />
      <EmptyState
        icon={icon}
        title="Coming soon"
        description={
          phase
            ? `This screen will be built in ${phase}.`
            : 'This area is part of the architecture and will be built in a later phase.'
        }
      />
    </div>
  )
}
