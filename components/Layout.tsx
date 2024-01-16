import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }:LayoutProps) => {
    return (
      <main className="pt-24">
        <Navbar />
        <div className="container mx-auto px-6 max-w-7xl lg:max-w-full min-h-screen">{children}</div>
        <Footer/>
      </main>
    );
  };
  

export default Layout