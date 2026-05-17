"use client";

import React from "react";
import Image from "next/image";
import NavbarImg from "@/public/uploads/author.png";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-zinc-800 py-8 text-white mt-auto">
      <div className="flex flex-col items-center max-w-5xl mx-auto px-6">
        
        {/* Wordmark Logo Wrapper */}
        <Link href="/" className="group relative flex items-center justify-center h-9 w-36 mb-6">
          {/* Subtle horizontal glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          {/* Proportional Image Container */}
          <div className="relative w-full h-full">
            <Image 
              src={NavbarImg} 
              alt="Temisan Logo" 
              fill 
              className="object-contain object-center" /* Centered for the footer layout */
              loading="lazy"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 mb-4">
          <Link
            href="/about"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            About
          </Link>
          <Link
            href="mailto:contact@temycodes.com"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Hire Me
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="text-zinc-500 text-xs font-mono">
          <p>Created By Temisan &copy; {currentYear} &lt;/&gt;</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;