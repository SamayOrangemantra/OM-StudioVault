import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { PageHeader, Button } from '@/components/ui'
import {
  StatsGrid,
  QuickFilters,
  FeaturedCollection,
  StorageOverview,
  AssetTypeDistribution,
  TeamMembers,
  AssetSection,
  TrendingTags,
  RecentActivity,
} from '@/components/dashboard'
import { useAuth } from '@/hooks/useAuth'
import { getContinueWorking, getRecentUploads } from '@/data/selectors'
import { ROUTES } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/motion'

/**
 * Dashboard — a premium, information-rich landing built as a bento grid with a
 * clear hierarchy: a hero featured collection up top, supporting KPIs and
 * storage beside it, then asset strips and an analytics/activity rail. Pure
 * composition; every panel sources its own data.
 */
export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <motion.div
      className="space-y-7"
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <PageHeader
          eyebrow="Overview"
          title={`Welcome back, ${firstName}`}
          subtitle="Here's what's happening across your studio today."
          actions={
            <Button icon={Plus} className="hidden sm:inline-flex">
              Upload assets
            </Button>
          }
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <QuickFilters />
      </motion.div>

      {/* Hero row: featured collection (lead) + supporting KPIs/storage rail */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FeaturedCollection />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <StatsGrid />
          <StorageOverview />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AssetSection
          title="Jump back in"
          action={{ to: ROUTES.library, label: 'Browse all' }}
          assets={getContinueWorking(6)}
          cols={6}
        />
      </motion.div>

      {/* Recently uploaded + analytics rail */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <AssetSection
            title="Recently uploaded"
            action={{ to: ROUTES.library }}
            assets={getRecentUploads(8)}
            cols={4}
          />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <TrendingTags />
          <AssetTypeDistribution />
        </div>
      </motion.div>

      {/* Activity + team */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RecentActivity />
        </div>
        <div className="lg:col-span-4">
          <TeamMembers />
        </div>
      </motion.div>
    </motion.div>
  )
}
