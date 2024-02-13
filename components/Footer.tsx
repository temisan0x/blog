import React, { useState } from "react";
import Image from "next/image";
import NavbarImg from "../public/uploads/navlogo.png";
import Link from "next/link";

const Footer: React.FC = () => {
 
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-5 px-6 mb-0 footer">
      <div className="flex flex-col items-center relative">
        <Link href="/" className="text-white text-2xl mb-2" passHref>
          <Image src={NavbarImg} alt={"temycodes"} width={80} height={100} />
        </Link>
        <div className="flex gap-3">
          <Link
            passHref
            href="/temisan"
            className="text-gray-400 hover:text-gray-400 text-sm"
          >
            About
          </Link>
          <Link
            passHref
            href="mailto:contact@temycodes.com"
            className="text-gray-400 hover:text-gray-400 text-sm"
          >
            Hire Me
          </Link>
        </div>
        <div className="flex gap-3 mt-2 text-gray-400 text-sm">
          <p>Created with ❤️ by TemyCodes &lt;{currentYear}/&gt;</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
