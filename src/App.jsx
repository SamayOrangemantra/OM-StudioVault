import { Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { AppRoutes } from '@/routes/AppRoutes'
import { Spinner } from '@/components/ui'

/**
 * Root component. A top-level Suspense boundary covers lazy routes that render
 * outside the AppShell (e.g. the standalone login screen); routes inside the
 * shell get their own boundary around the content <Outlet/>.
 *
 * MotionConfig with reducedMotion="user" makes every Framer animation respect
 * the OS "reduce motion" setting automatically (transforms soften to opacity).
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-bg">
            <Spinner />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </MotionConfig>
  )
}
