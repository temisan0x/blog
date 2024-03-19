import { Metadata } from "next";
import "@/app/global.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NextAuthProvider from "./components/NextAuthProvider";
import { Schibsted_Grotesk } from 'next/font/google'

export const metadata: Metadata = {
  title: "",
  description: "A personal blog from yours sincerly Temisan0x.",
};

// const schibsted = Schibsted_Grotesk({subsets: ['latin']})

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
