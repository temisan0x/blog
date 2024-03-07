"use client";

import React from "react";
import Image from "next/image";
import NavbarImg from "@/public/uploads/navlogo.png";
import Link from "next/link";
import styles from "@/app/page.module.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} flex flex-wrap justify-center px-6 py-12 text-white sm:px-8`}>
      <div className="flex justify-center flex-col items-center">
        <Link href="/" className="text-white text-2xl mb-2" passHref>
          <Image src={NavbarImg} alt={"temycodes"} width={80} height={100} />
        </Link>
        <div className="flex gap-3">
          <Link
            passHref
            href="/temisan"
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
          <p>Created with ❤️ by TemyCodes &copy;&lt;{currentYear}/&gt;</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
