import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'APOTSA People', template: '%s | APOTSA' },
  description: 'HR & People Management Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
