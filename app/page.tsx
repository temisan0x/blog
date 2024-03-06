"use client";

import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import Link from "next/link";
import styles from "@/app/page.module.css";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <main className={`mx-auto text-center mt-[20px] text-white ${styles.main}`}>
      <h1 className="text-[50px]">Welcome to movie world!</h1>
      <Link href={"/add-post"} className=" my-10">
        Add Movie
      </Link>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque et harum
        nemo, expedita perferendis autem praesentium repellendus asperiores
        impedit corporis! Quae pariatur maxime vitae tenetur dolor consequuntur
        assumenda similique odio.
      </h1>
      {posts.map((post: any) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          imageData={{ url: post.imageData }} // Ensure it's passed as an object
          authorName={post.author?.name ?? null}
        />
      ))}
    </main>
  );
}
