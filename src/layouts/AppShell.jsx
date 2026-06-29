import { Suspense, useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { Spinner } from '@/components/ui'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { FloatingActions } from '@/components/ui/FloatingActions'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { routeTransition } from '@/lib/motion'

export function AppShell() {
  const [collapsed, setCollapsed] = useLocalStorage('aura.sidebar.collapsed', false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const location = useLocation()
  const toggleSidebar = useCallback(() => setCollapsed((c) => !c), [setCollapsed])

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="theme-transition flex h-screen w-full overflow-hidden bg-bg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <div
        className="shrink-0 transition-[width] duration-200 ease-out"
        style={{ width: collapsed ? 64 : 232 }}
      >
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenPalette={() => setPaletteOpen(true)} />
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-7 lg:px-9 xl:px-10">
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

      {/* Global floating elements */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <FloatingActions />
    </div>
  )
}
