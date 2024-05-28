"use client";

import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import styles from "@/app/page.module.css";
import axios from "axios";

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data.posts);
        console.log(response.data.posts)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const truncateHTMLContent: (html: string, maxLength: number) => string = (
    html: string,
    maxLength: number
  ): string => {
    if (!html) {
      return "";
    }

    const truncatedHTML = html.replace(/(<([^>]+)>)/gi, "");
    if (truncatedHTML.length <= maxLength) {
      return html;
    }

    const truncatedText = truncatedHTML.slice(0, maxLength) + "...";
    return truncatedText;
  };

  return (
    <div className={`${styles.postContentContainer}`}>
      <h1 className={`text-[15px] mt-40 mb-5 ${styles.postTitle}`}>Welcome Home!</h1>
      {posts.map((post: PostProps) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            imageData={{ url: post.imageData }}
            authorName={post.author?.name ? post.author?.name : "richies"}
            truncatedContent={truncateHTMLContent}
            slug={post.slug}
            category={post.category}
          />
        );
      })}
    </div>
  );
}
