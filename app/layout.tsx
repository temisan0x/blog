import { Metadata } from "next";
import "@/app/global.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NextAuthProvider from "./components/NextAuthProvider";
import {GeistSans} from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import 

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
      default: '.dir-diare',
      template: '%s | .dir-diare',
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
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <main className={`container-main`}>
              <Navbar />
              {children}
              <Footer />
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
