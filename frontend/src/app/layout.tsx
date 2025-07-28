import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Wedding Invitations - Создайте красивые приглашения на свадьбу',
  description: 'Создавайте уникальные свадебные приглашения с современным дизайном. Персонализируйте шаблоны, добавляйте фото и видео, отправляйте гостям.',
  keywords: 'свадебные приглашения, онлайн приглашения, свадьба, приглашения, RSVP',
  authors: [{ name: 'Wedding Invitations Team' }],
  robots: 'index, follow',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Wedding Invitations - Создайте красивые приглашения на свадьбу',
    description: 'Создавайте уникальные свадебные приглашения с современным дизайном',
    type: 'website',
    locale: 'ru_RU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Google Fonts for wedding/romantic fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Pacifico&family=Parisienne&family=Satisfy&family=Lora:wght@400;700&family=Cormorant+Garamond:wght@400;700&family=Marck+Script&family=Alex+Brush&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 