import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GamesProvider } from '@/contexts/games'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nertz Scoring App',
  description: 'Record your scores with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GamesProvider>{children}</GamesProvider>
        </body>
    </html>
  )
}
