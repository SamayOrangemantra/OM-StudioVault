import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import { RequireAuth } from '@/routes/RequireAuth'
import { ROUTES } from '@/lib/constants'

/*
 * Central route table. Pages are lazy-loaded so each feature ships in its own
 * chunk — the shell stays light and later, heavier feature pages won't bloat the
 * initial bundle.
 *
 * Two route trees:
 *  - the public login screen, which renders standalone (no app chrome); and
 *  - the authenticated app, where RequireAuth gates the shared AppShell layout
 *    that all feature pages render inside via <Outlet/>.
 */
const Login = lazy(() => import('@/pages/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Library = lazy(() => import('@/pages/Library'))
const AssetDetails = lazy(() => import('@/pages/AssetDetails'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const Collections = lazy(() => import('@/pages/Collections'))
const Shared = lazy(() => import('@/pages/Shared'))
const Settings = lazy(() => import('@/pages/Settings'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />

      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path={ROUTES.dashboard} element={<Dashboard />} />
        <Route path={ROUTES.library} element={<Library />} />
        <Route path={`${ROUTES.asset}/:assetId`} element={<AssetDetails />} />
        <Route path={ROUTES.favorites} element={<Favorites />} />
        <Route path={ROUTES.collections} element={<Collections />} />
        <Route path={ROUTES.shared} element={<Shared />} />
        <Route path={ROUTES.settings} element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
