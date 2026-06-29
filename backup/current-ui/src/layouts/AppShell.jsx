import { Suspense, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { Spinner } from '@/components/ui'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { routeTransition } from '@/lib/motion'

/**
 * App frame shared by every route: collapsible Sidebar + Topbar + a scrollable
 * content region rendering the active page via <Outlet/>. Collapse state lives
 * here (and persists) so the layout grid resizes with it.
 *
 * Layout uses a flex row + fixed-width rail rather than a CSS grid template so
 * the sidebar can animate its width smoothly between collapsed/expanded. The
 * routed content cross-fades on navigation (keyed by pathname).
 */
export function AppShell() {
  const [collapsed, setCollapsed] = useLocalStorage('aura.sidebar.collapsed', false)
  const location = useLocation()
  const toggleSidebar = useCallback(() => setCollapsed((c) => !c), [setCollapsed])

  return (
    <div className="theme-transition flex h-screen w-full overflow-hidden bg-bg">
      {/* Keyboard skip link — first focusable element. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <div
        className="shrink-0 transition-[width] duration-200 ease-out"
        style={{ width: collapsed ? 72 : 256 }}
      >
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-8">
            <Suspense
              fallback={
                <div className="flex h-64 items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={routeTransition.initial}
                  animate={routeTransition.animate}
                  exit={routeTransition.exit}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
