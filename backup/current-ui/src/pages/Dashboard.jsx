import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { PageHeader, Button } from '@/components/ui'
import {
  StatsGrid,
  QuickSearch,
  RecentUploads,
  TrendingTags,
  RecentActivity,
  CollectionsPreview,
} from '@/components/dashboard'
import { useAuth } from '@/hooks/useAuth'
import { staggerContainer, fadeUp } from '@/lib/motion'

/**
 * Dashboard — the studio's at-a-glance home. Pure composition: every panel is a
 * self-contained component that sources its own data, so this file only owns the
 * page header and the responsive layout grid.
 */
export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <PageHeader
          title={`Welcome back, ${firstName}`}
          subtitle="Here's what's happening across your studio today."
          actions={
            <Button icon={Plus} className="hidden sm:inline-flex">
              Upload
            </Button>
          }
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <QuickSearch />
      </motion.div>

      <motion.div variants={fadeUp}>
        <StatsGrid />
      </motion.div>

      {/* Primary content: uploads take the wider column, the activity rail sits
          alongside on large screens and stacks below on small ones. */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2">
          <RecentUploads />
        </div>
        <div className="space-y-6">
          <TrendingTags />
          <RecentActivity />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <CollectionsPreview />
      </motion.div>
    </motion.div>
  )
}
