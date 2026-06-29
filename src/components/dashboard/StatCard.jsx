import { Card } from '@/components/ui'

/**
 * Single headline metric. Presentational only — the parent computes label,
 * value, and icon, so the same card renders any stat.
 */
export function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <Card className="group p-5 transition-shadow duration-300 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold leading-none text-text">
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </Card>
  )
}
