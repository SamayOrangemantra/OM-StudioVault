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
import { staggerContainer, fadeUp, inView } from '@/lib/motion'

const VIEW_OPTS = { once: true, margin: '-60px' }

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
      {/* Above-fold: animate on mount */}
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

      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FeaturedCollection />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <StatsGrid />
          <StorageOverview />
        </div>
      </motion.div>

      {/* Below-fold: whileInView scroll-triggered */}
      <motion.div
        variants={inView}
        initial="hidden"
        whileInView="show"
        viewport={VIEW_OPTS}
      >
        <AssetSection
          title="Jump back in"
          action={{ to: ROUTES.library, label: 'Browse all' }}
          assets={getContinueWorking(6)}
          cols={6}
        />
      </motion.div>

      <motion.div
        variants={inView}
        initial="hidden"
        whileInView="show"
        viewport={VIEW_OPTS}
        className="grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
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

      <motion.div
        variants={inView}
        initial="hidden"
        whileInView="show"
        viewport={VIEW_OPTS}
        className="grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
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
