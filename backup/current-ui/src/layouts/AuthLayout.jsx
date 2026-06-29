import { ThemeToggle } from '@/components/ui'

/**
 * Layout for unauthenticated screens (login). A split canvas: an editorial brand
 * panel on the left (hidden on small screens) and a centered form column on the
 * right. Deliberately separate from AppShell — auth screens share no chrome with
 * the app, so they get their own minimal frame.
 */
export function AuthLayout({ aside, children }) {
  return (
    <div className="theme-transition flex min-h-screen w-full bg-bg">
      {/* Brand panel */}
      <aside className="relative hidden w-1/2 overflow-hidden border-r border-border bg-surface lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background:
              'radial-gradient(60% 50% at 30% 20%, rgb(var(--accent)) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 flex w-full flex-col justify-between p-12">
          {aside}
        </div>
      </aside>

      {/* Form column */}
      <main className="relative flex w-full flex-col lg:w-1/2">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm animate-fade-in">{children}</div>
        </div>
      </main>
    </div>
  )
}
