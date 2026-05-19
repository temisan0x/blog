import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../app/global.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { baseUrl } from './sitemap'
import Back2Top from './components/Back2Top'

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: '.Temisan',
        template: '%s | .Temisan',
    },
    description: 'This is my dir.',
    openGraph: {
        title: 'My Dir',
        description: 'This is my dir.',
        url: baseUrl,
        siteName: 'My Dir',
        locale: 'en_US',
        type: 'website',
    },
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
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            className={`dark:text-white scroll-smooth [color-scheme:dark] ${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body
                suppressHydrationWarning={true}
                className="antialiased flex flex-col"
            >
                <Navbar /><Back2Top/>
                <main className="md:px-6 px-2 mx-auto max-w-4xl w-full md:max-w-2xl lg:max-w-3xl pt-10 h-auto flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
