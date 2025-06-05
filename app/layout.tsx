import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://devclub.com.br'),
  title: {
    default: 'DevClub - Escola de Programação e Tecnologia',
    template: '%s | DevClub'
  },
  description: 'Transforme sua carreira com o DevClub. Formações completas em desenvolvimento web, programação e tecnologia. Aprenda com quem trabalha no mercado.',
  keywords: ['escola de programação', 'curso de desenvolvimento web', 'formação em tecnologia', 'carreira em TI', 'aprender programação'],
  authors: [{ name: 'DevClub' }],
  creator: 'DevClub',
  publisher: 'DevClub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://devclub.com.br',
    siteName: 'DevClub',
    title: 'DevClub - Escola de Programação e Tecnologia',
    description: 'Transforme sua carreira com o DevClub. Formações completas em desenvolvimento web, programação e tecnologia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevClub - Escola de Programação',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevClub - Escola de Programação e Tecnologia',
    description: 'Transforme sua carreira com o DevClub. Formações completas em desenvolvimento web.',
    images: ['/og-image.jpg'],
    creator: '@devclub',
  },
  alternates: {
    canonical: 'https://devclub.com.br',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}