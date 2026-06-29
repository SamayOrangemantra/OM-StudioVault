import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/constants'

/**
 * Route guard for the authenticated app. Unauthenticated visitors are redirected
 * to the login screen; we stash the attempted location so login can return them
 * there. Wraps the app's layout route in AppRoutes.
 */
export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />
  }
  return children
}
