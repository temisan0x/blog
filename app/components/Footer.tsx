"use client";

import React from "react";
import Image from "next/image";
import NavbarImg from "@/public/uploads/author.png";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] py-3 text-white">
      <div className="flex justify-center flex-col items-center">
        <Link href="/" className="text-white text-2xl mb-2" passHref>
          <Image src={NavbarImg} alt={"temycodes"} width={80} height={100}  loading="lazy"/>
        </Link>
        <div className="flex gap-3">
          <Link
            passHref
            href="/about"
            className="text-white hover:text-white text-sm"
          >
            About
          </Link>
          <Link
            passHref
            href="mailto:contact@temycodes.com"
            className="text-white hover:text-white text-sm"
          >
            Hire Me
          </Link>
        </div>

        <div className="mt-2 text-white text-sm">
          <p>Created By Temisan &copy;&lt;{currentYear}/&gt;</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
