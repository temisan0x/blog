"use client";

import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import styles from "@/app/page.module.css";

interface PostProps {
  author: any;
  id: string;
  title: string;
  content: string | "";
  authorName: string | null;
  imageData: string | undefined | { url: string } | any;
  slug: string;
  category: string ;
}

export default function Home() {
  const [posts, setPosts] = useState([]);



  return (
    <div className={`${styles.postContentContainer}`}>
      <h1 className={`text-[15px] mt-40 mb-5 ${styles.postTitle}`}>Welcome Home!</h1>
      {posts.map((post: PostProps) => {
        return (
         <>
         </>
        );
      })}
    </div>
  );
}
