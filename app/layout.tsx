import Header from '@/components/layout/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription,
}
/**
 * The homepage root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function RootLayout({
  children,// will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
         {/* Include shared UI here e.g. a header or sidebar */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
