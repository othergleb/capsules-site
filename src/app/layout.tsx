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
      <body>{children}</body>
    </html>
  )
}
