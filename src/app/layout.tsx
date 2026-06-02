import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capsules by OTHER',
  description: 'A limited edition wine series. Capsule 01.',
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
        <link rel="preload" href="/Other_alt3_yellow_red.mp4"    as="video" type="video/mp4" />
        <link rel="preload" href="/Other_alt3_yellow_red_6k.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/logo-animated-v3.mp4"   as="video" type="video/mp4" />
      </head>
      <body>{children}</body>
    </html>
  )
}
