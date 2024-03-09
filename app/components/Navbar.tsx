'use client'

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarImg from "@/public/uploads/navlogo.png";
import { motion, AnimatePresence } from "framer-motion"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#F5F5F4] nav-font w-full fixed top-0 z-50 border-b border-gray-300 bg-bg/75 ">
      <div className="mx-auto nav">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex w-full">
            <div className="flex-shrink-0 mx-5">
              <Link href="/" className="text-white relative text-2xl" passHref>
                <Image
                  src={NavbarImg}
                  alt={"temycodes"}
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="hidden lg:flex justify-end mr-10 w-full items-center">
              <div className="flex space-x-4">
                <Link
                  passHref
                  href="/"
                  className="hover:text-black px-3 py-2 rounded-md text-sm"
                >
                  Home
                </Link>
                <Link
                  passHref
                  href="/blog"
                  className="hover:text-black px-3 py-2 rounded-md text-sm"
                >
                  Blog
                </Link>
                <Link
                  passHref
                  href="/temisan"
                  className="hover:text-black px-3 py-2 rounded-md text-sm"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="mr-4 flex lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#4F4F4F] hover:text-[#4F4F4F]  focus:outline-none focus:bg-[#4F4F4F] focus:text-white transition duration-150 ease-in-out"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween" }}
            className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}
          >
            <div className="px-2 pt-2 pb-3 sm:px-3 w-[95%] m-auto">
              <Link
                passHref
                href="/"
                onClick={closeMenu}
                className="block hover:text-white hover:bg-[#252222] hover:px-4 py-2 rounded-md text-sm"
              >
                Home
              </Link>
              <Link
                passHref
                href="/temisan"
                onClick={closeMenu}
                className="block hover:text-white hover:bg-[#252222] hover:px-4 py-2 rounded-md text-sm"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
