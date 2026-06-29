import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button, EmptyState } from '@/components/ui'
import { ROUTES } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        action={
          <Link to={ROUTES.dashboard}>
            <Button>Back to Dashboard</Button>
          </Link>
        }
        className="border-none"
      />
    </div>
  )
}
