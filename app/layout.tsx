import type { Metadata } from 'next'
import { Aldrich } from 'next/font/google'
import './globals.css'


const aldrich = Aldrich({ 
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

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
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '32x32' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
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
                <link rel="icon" href="/favicon.ico" sizes="48x48" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={aldrich.className}>
                {children}
            </body>
        </html>
    )
}