"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { BlogPosts } from "@/app/components/posts";

const FetchPost = ({ params }: { params: { slug: string } }) => {

  return (
   
    <div>
      {/* <h1>hello {params.slug}</h1> */}
       <BlogPosts/>
    </div>
  );
};

export default FetchPost;
