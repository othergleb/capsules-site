import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      {/* OTHER logo — links to otherwine.co.uk */}
      <a href="https://otherwine.co.uk" target="_blank" rel="noopener noreferrer">
        <Image
          src="/logo-other.svg"
          alt="OTHER"
          width={80}
          height={13}
          priority
        />
      </a>

      {/* Right-side nav */}
      <div className="flex items-center gap-6 text-sm font-medium tracking-wide" style={{ color: 'var(--blue)' }}>
        <Link href="/the-wine" className="hover:opacity-60 transition-opacity hidden md:block">
          The Wine
        </Link>
        <Link href="/how-it-works" className="hover:opacity-60 transition-opacity hidden md:block">
          How it works
        </Link>
        <Link href="/faq" className="hover:opacity-60 transition-opacity hidden md:block">
          FAQ
        </Link>
        <Link
          href="#register"
          className="btn-primary px-5 py-2 rounded-full text-sm"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}
