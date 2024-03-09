"use client";

import React from "react";
import Image from "next/image";
import AvatarLogo from "../../public/uploads/adminImg.png";
import MongoDb from "../../public/uploads/mongodb.png";
import ReactPg from "../../public/uploads/react.png";
import NodePg from "../../public/uploads/nodejs.png";
import TwitterIcon from "../../public/uploads/twitter.png";
import GithubIcon from "../../public/uploads/github.png";
import LinkedInIcon from "../../public/uploads/linkedin.png";
import Stackoverflow from "../../public/uploads/stackoverflow.png";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutMe: React.FC = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: GithubIcon,
      link: "https://github.com/0xtemisan",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      link: "https://x.com/temisan0x",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      link: "https://www.linkedin.com/in/temycodes",
    },
    {
      name: "Stackoverflow",
      icon: Stackoverflow,
      link: "https://stackoverflow.com/users/14355211/temisan-momodu",
    },
  ];

  return (
     <div className="">
       <div className="about-container mx-auto mt-20">
        <div
          className="flex flex-col items-center"
          style={{ marginTop: "150px" }}
        >
          <motion.div
            className="rounded-circle overflow-hidden border-4 border-gray-700 shadow-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image src={AvatarLogo} alt="temycodes" width={100} height={100} />
          </motion.div>
          <div className="flex items-center">
            <h1
              className="mt-4 blog-title"
            >
              Hello, I&apos;m{" "}
              <Link
                href="https://github.com/temisan0x"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Temisan Momodu
              </Link>
            </h1>
          </div>
          <p
            className="mt-2 text-center"
          >
            A passionate MERN stack developer based in Jos, Nigeria.
          </p>
        </div>

        <div className="mt-6 text-center">
          <h2
            className="text-3xl"
          >
            My Expertise
          </h2>
          <div className="flex justify-between mt-2 about mx-auto"
            style={{ fontSize: "17px" }}
          >
            <div className="mx-4">
              <Image src={ReactPg} alt="React.js" width={50} height={50} />{" "}
              <p className="mt-2">React.js</p>
            </div>
            <div className="mx-4">
              <Image src={NodePg} alt="Node.js" width={50} height={50} />{" "}
              <p className="mt-2">Node.js</p>
            </div>
            <div className="mx-4">
              <Image src={MongoDb} alt="MongoDB" width={50} height={50} />{" "}
              <p className="mt-2">MongoDB</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2
            className="mt-3 text-3xl"
          >
            Tech Blogging
          </h2>
          <p className="mx-auto mt-2 mb-10" style={{ fontSize: "16px" }}>
            I&apos;m also a dedicated tech blogger, sharing insights, tutorials,
            and the latest trends in the world of web development and
            programming. Through my blog, I aim to contribute to the developer
            community and provide valuable resources to fellow developers. Join
            me in unraveling the mysteries of code!
          </p>
        </div>

        <div className="mt-6 text-center mb-56">
          <h2
            className="text-3xl mt-4"
          >
            Connect with Me
          </h2>
          <div className="flex justify-center mt-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 px-2"
              >
                <Image src={link.icon} alt={link.name} width={30} height={30} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
     </div>
  );
};

export default AboutMe;