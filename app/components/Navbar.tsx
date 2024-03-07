"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NavbarImg from "@/public/uploads/navlogo.png";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import ProfileToggler from "./ProfileToggle";
import axios from "axios";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [usernameData, setUsernameData] = useState<any>(null);

  const router = useRouter();
  const { data: session } = useSession();

  const fetchUsername = useCallback(async () => {
    try {
      if (session) {
        const response = await axios.get("/api/user-email", {
          params: { userId: session.user.id }, // Use 'params' instead of 'data'
        });
        console.log(response.data);
        setUsernameData(response.data.email);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }, [session]);
  

  useEffect(() => {
    fetchUsername();
  }, [fetchUsername]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (searchQuery.trim() !== "") {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="bg-[#F5F5F4] nav-font w-full fixed top-0 z-50 border-b border-gray-300 bg-bg/75 ">
      <div className="mx-auto nav">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex w-full">
            <div className="flex-shrink-0 mx-5">
              {/* <Link href="/" className="text-white relative text-2xl" passHref>
                <Image
                  src={NavbarImg}
                  alt={"temycodes"}
                  width={100}
                  height={100}
                />
              </Link> */} Temisan0X
            </div>
            <div className="hidden lg:flex justify-end mr-10 w-full items-center">
              <div className="flex space-x-4">
                <Link
                  passHref
                  href="/"
                  className="text-gray-400   hover:text-white px-3 py-2 rounded-md text-sm"
                >
                  Home
                </Link>
                <Link
                  passHref
                  href="/blog"
                  className="text-gray-400   hover:text-white px-3 py-2 rounded-md text-sm"
                >
                  Blog
                </Link>
                <Link
                  passHref
                  href="/bookmarks"
                  className="text-gray-400   hover:text-white px-3 py-2 rounded-md text-sm"
                >
                  Bookmarks
                </Link>
                <Link
                  passHref
                  href="/temisan"
                  className="text-gray-400   hover:text-white px-3 py-2 rounded-md text-sm"
                >
                  About
                </Link>
                {/* {session ? (
                  <>
                    <Link href={isAdmin ? "/admin" : "/profile"} passHref title={isAdmin ? "Admin Page" : "Profile Page"}>
                      <div className="relative">
                        <Image
                          src={session?.user?.image}
                          width={40}
                          height={50}
                          alt={`${session?.user?.name} image`}
                          onMouseEnter={() => handleDropdownToggle(true)}
                        />
                        {isDropdownOpen && (
                          <ProfileToggler
                            handleDropdownToggle={handleDropdownToggle}
                            session={session}
                            handleSignOut={handleSignOut}
                            usernameData={usernameData}
                          />
                        )}
                      </div>
                    </Link>
                  </>
                ) : (
                  <Link
                    passHref
                    href="/login"
                    className="text-gray-400   hover:text-white px-3 py-2 rounded-md text-sm"
                  >
                    Login
                  </Link>
                )} */}
                <form
                  onSubmit={handleSearch}
                  className="px-3 py-2 rounded-md text-sm border border-gray-700 text-white flex items-center"
                >
                  <BsSearch />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent ml-2 text-white"
                  />
                </form>
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
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3 w-[95%] m-auto">
          <Link
            passHref
            href="/"
            className="block text-gray-400  hover:bg-gray-700 hover:text-white hover:px-4 py-2 rounded-md text-sm "
          >
            Home
          </Link>
          <Link
            passHref
            href="/blog"
            className="block text-gray-400  hover:bg-gray-700 hover:text-white hover:px-4 py-2 rounded-md text-sm "
          >
            Blog
          </Link>
          <Link
            passHref
            href="/bookmarks"
            className="block text-gray-400  hover:bg-gray-700 hover:text-white hover:px-4 py-2 rounded-md text-sm "
          >
            Bookmarks
          </Link>
          <Link
            passHref
            href="/temisan"
            className="block text-gray-400  hover:bg-gray-700 hover:text-white hover:px-4 py-2 rounded-md text-sm"
          >
            About
          </Link>
          <form
            onSubmit={handleSearch}
            className="px-3 py-2 rounded-md text-sm  border border-gray-700 text-white flex items-center w-full mb-3"
          >
            <BsSearch />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent ml-2 text-white w-11/12"
            />
          </form>
          {/* {session ? (
            <>
              <Link
                passHref
                href="/admin"
                className="block text-gray-400  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm "
              >
                Admin
              </Link>
              <Link
                href={"#"}
                type="submit"
                className="block text-gray-400  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm "
                onClick={handleSignOut}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              passHref
              href="/login"
              className="block text-gray-400  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm "
            >
              Login
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
