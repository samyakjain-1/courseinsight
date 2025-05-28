import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UW-Madison Course Insights',
  description: 'Explore UW-Madison courses through real student experiences from Reddit',
  keywords: ['UW-Madison', 'courses', 'students', 'reddit', 'reviews'],
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
} 