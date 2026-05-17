'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavbarImg from '@/public/uploads/author.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="border-b border-zinc-800 w-full bg-neutral-900">
            <div className="mx-auto px-4 md:px-10">
                <div className="flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="group relative flex items-center h-9"
                    >
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative h-full aspect-[3/1] max-w-[150px]">
                            <Image
                                src={NavbarImg}
                                alt="Temisan Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-10 font-sans items-center">
                        <Link
                            href="/"
                            className="text-gray-300 text-sm hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-300 text-sm hover:text-white transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-300 text-sm hover:text-white transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/work"
                            className="text-gray-300 text-sm hover:text-white transition-colors"
                        >
                            Work
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
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
                                {isOpen ? (
                                    /* "X" Close Icon when menu is open */
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                    /* Hamburger Icon */
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="space-y-1 font-sans">
                            <Link
                                href="/"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/about"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
                            >
                                About
                            </Link>
                            <Link
                                href="/work"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
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
