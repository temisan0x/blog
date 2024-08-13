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
                        className="text-white relative text-2xl"
                    >
                        <Image
                            src={NavbarImg}
                            alt="Temy Codes Logo"
                            width={100}
                            height={100}
                        />
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
