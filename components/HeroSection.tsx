'use client';
import React from "react";
import Image from "next/image";
import AuthorImg from "../public/uploads/author.png";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mt-4">
        <motion.div
          className="flex items-center justify-center mt-44 text-white font-extrabold text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
        <Image src={AuthorImg} width={400} height={300} alt={"AuthorImg"}/>
        </motion.div>
        <motion.h3
          className="text-stone-300 blog-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Exploring the world of technology and coding
        </motion.h3>
        <div className="gradient fixed"></div>
      </div>
    </div>
  );
};

export default HeroSection;
