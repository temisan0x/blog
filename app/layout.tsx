import { Metadata } from "next";
import "@/app/global.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NextAuthProvider from "./components/NextAuthProvider";
import {GeistSans} from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { baseUrl } from "./sitemap";

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

const cx = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}
      className={cx('dark: text-white scroll-smooth [color-scheme:dark]', GeistSans.variable, GeistSans.variable)}
    >
      <body suppressHydrationWarning={true}
        className="antialiased max-w-2xl mb-40 flex flex-col"
      >
          <main className="flex-auto px-2 md:px-0 min-w-0">
              <Navbar />
              {children}
              <Footer />
          </main>
      </body>
    </html>
  );
}
