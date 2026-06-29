import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Logo } from '@/components/brand/Logo'
import { Button, Input, Eyebrow } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/constants'

/**
 * Elegant, minimal login screen. This is a DUMMY login — there is no real
 * authentication and no credential check. "Continue" simply starts a session
 * and routes into the app (returning the user to wherever they were headed).
 */
export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()

  // Already signed in? Skip the login screen entirely.
  if (isAuthenticated) return <Navigate to={ROUTES.dashboard} replace />

  const from = location.state?.from?.pathname ?? ROUTES.dashboard

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
    navigate(from, { replace: true })
  }

  return (
    <AuthLayout
      aside={
        <>
          <Logo size="md" />
          <div className="max-w-md space-y-4">
            <Eyebrow>Digital Asset Management</Eyebrow>
            <p className="font-display text-5xl font-semibold leading-[1.05] text-text">
              Where your studio's best work lives.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              OM-StudioVault is the digital asset library for creative teams — every image,
              film, and concept, beautifully organized and instantly findable.
            </p>
          </div>
          <p className="text-xs text-muted">Prototype · mock data</p>
        </>
      }
    >
      <div className="mb-8 space-y-2">
        {/* Brand mark repeats here for small screens where the aside is hidden */}
        <Logo size="sm" className="mb-6 lg:hidden" />
        <h1 className="font-display text-3xl font-semibold text-text">
          Welcome back
        </h1>
        <p className="text-sm text-muted">
          Sign in to continue to your workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@studio.com"
            defaultValue="aria@auralux.studio"
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-text">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            defaultValue="demo"
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        No account needed — this is a demo. Just press Continue.
      </p>
    </AuthLayout>
  )
}
