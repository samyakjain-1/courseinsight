import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UW-Madison Course Insights',
  description: 'Explore UW-Madison courses through real student experiences from Reddit',
  keywords: ['UW-Madison', 'courses', 'students', 'reddit', 'reviews'],
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