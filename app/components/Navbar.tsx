"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import NavbarImg from "@/public/uploads/author.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" border-zinc-800 w-full bg-neutral-900 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
        <Link href="/" className="text-white relative text-2xl" passHref>
                <Image
                  src={NavbarImg}
                  alt={"temycodes"}
                  width={100}
                  height={100}
                />
              </Link>
          <div className="hidden md:flex space-x-10 font-san">
            <Link href="/" className="text-gray-300 text-sm hover:text-white">Home</Link>
            <Link href="/blog" className="text-gray-300 text-sm hover:text-white">Blog</Link>
            <Link href="/about" className="text-gray-300 text-sm hover:text-white">About</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="h-6 w-6 text-gray-300 hover:text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 font-san">
              <Link href="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 ">Home</Link>
              <Link href="/blog" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Blog</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">About</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
