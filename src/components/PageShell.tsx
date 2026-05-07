import { ReactNode } from 'react'
import Nav from './Nav'
import Link from 'next/link'

interface PageShellProps {
  label?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export default function PageShell({ label, title, subtitle, children }: PageShellProps) {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>
      <Nav />

      <section className="flex-1 flex flex-col px-6 pt-36 pb-20 max-w-4xl mx-auto w-full">
        {label && (
          <p className="text-xs font-medium tracking-widest uppercase mb-6 opacity-50" style={{ letterSpacing: '0.18em' }}>
            {label}
          </p>
        )}

        <h1
          className="capsules-wordmark mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-base font-light opacity-60 max-w-lg leading-relaxed">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-12">{children}</div>}
      </section>

      <footer className="px-6 py-6 text-center text-xs opacity-40" style={{ borderTop: '1px solid currentColor' }}>
        <Link href="/" className="underline underline-offset-2">← Back to Capsules</Link>
      </footer>
    </main>
  )
}
