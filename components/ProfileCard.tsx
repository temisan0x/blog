'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { profileData } from "../data/profileData";
import Email from "../public/uploads/freelancer.png";
import Programmer from "../public/uploads/programmer.png";
import Link from "next/link";
import { motion } from "framer-motion";

const ProfileCard: React.FC = () => {
  const getDayName = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const dayOfWeek = today.getDay();

    return daysOfWeek[dayOfWeek];
  };

  return (
    <div className="content-container mx-auto text-white z-30 relative blog-title">
      <div className="flex justify-between">
        {profileData.map((content) => (
          <div
            key={content.id}
            className="rounded-lg transform transition duration-300 hover:bg-opacity-70 hover:scale-105"
            style={{ background: content.bg.color }}
          >
            <Link href={content.ref}>
              <div className="p-4">
                <div className="rounded-full h-24 w-24 mx-auto border-4 shadow-md bg-white">
                  <Image src={content.img} alt={content.title} />
                </div>
                <div className="mt-2">
                  <p className="text-xs ">{content.subtitle}</p>
                  <p className="text-3xl text-start font-extrabold ">
                    {content.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/temisan">
        <div className="bg-gradient-to-br from-blue-500 via-sky-500 to-sky-400 flex justify-between items-center p-4 rounded-lg mt-4 transform transition duration-300 hover:bg-opacity-70 hover:scale-105">
          <div className="rounded-full h-24 w-24 border-4 shadow-md overflow-hidden">
            <Image src={Email} alt="get in touch" />
          </div>
          <div>
            <p className="text-xs">about</p>
            <p className="text-3xl text-end font-extrabold">Author</p>
          </div>
        </div>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-10 text-center text-gray-400  text-sm bug-free"
      >
        <div className="flex items-center flex-col text-base">
          <p>Wishing you a bug-free {getDayName()}! ⋆｡°✩</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
