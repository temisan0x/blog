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
        
        {/* Perfect Circle Logo with Glow */}
        <Link href="/" className="group relative flex items-center justify-center h-12 w-12 mb-4">
          <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-zinc-800 bg-neutral-800">
            <Image 
              src={NavbarImg} 
              alt="temycodes" 
              fill 
              className="object-cover"
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
