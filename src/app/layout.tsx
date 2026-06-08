import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const DESC = "We've been given access to the last remaining bottles of an amphora aged grenache, grown by Berber farmers in northern Morocco — a rosé so pale it enters a new classification. Available to Capsule members only. 23 June, 10AM BST."

export const metadata: Metadata = {
  title: 'Capsules by OTHER',
  description: DESC,
  icons: { icon: '/FAVICON.png' },
  openGraph: {
    description: DESC,
    url: 'https://capsules.otherwine.co.uk',
    type: 'website',
    images: [{ url: 'https://capsules.otherwine.co.uk/og-image.png?v=2', width: 1200, height: 630, alt: 'Capsule 01 by OTHER' }],
  },
  twitter: {
    card: 'summary_large_image',
    description: DESC,
    images: ['https://capsules.otherwine.co.uk/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload above-the-fold videos on the homepage */}
        <link rel="preload" href="/farmer-left.mp4"         as="video" type="video/mp4" />
        <link rel="preload" href="/farmer-right.mp4"        as="video" type="video/mp4" />
        <link rel="preload" href="/other-logo-cropped.mp4"    as="video" type="video/mp4" />
        <link rel="preload" href="/other-logo-cropped-6k.mp4" as="video" type="video/mp4" />
      </head>
      <body>{children}<Analytics /></body>
    </html>
  )
}
