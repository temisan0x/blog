'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavbarImg from '@/public/uploads/author.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="border-zinc-800 w-full bg-neutral-900">
            <div className="mx-auto px-3 md:px-10">
                <div className="flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="group relative flex items-center justify-center h-12 w-12"
                    >
                        {/* Animated Gradient Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>

                        {/* Perfect Circle Container */}
                        <div className="relative h-full w-full rounded-full overflow-hidden border-2">
                            <Image
                                src={NavbarImg}
                                alt="Temy Codes Logo"
                                fill 
                                className="object-cover" 
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    <div className="hidden md:flex space-x-10 font-sans">
                        <Link
                            href="/"
                            className="text-gray-300 text-sm hover:text-white"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-300 text-sm hover:text-white"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-300 text-sm hover:text-white"
                        >
                            About
                        </Link>
                        <Link
                            href="/work"
                            className="text-gray-300 text-sm hover:text-white"
                        >
                            Work
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isOpen}
                        >
                            <svg
                                className="h-6 w-6 text-gray-300 hover:text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                        <div className=" pt-2 pb-3 space-y-1 font-sans">
                            <Link
                                href="/"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/about"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                About
                            </Link>
                            <Link
                                href="/work"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                            >
                                Work
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
