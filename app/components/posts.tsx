"use client";

import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type BlogPost = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tag: string;
    image?: string;
  };
  slug: string;
  content: string;
};

export function BlogPosts() {
  const [posts, setposts] = useState<BlogPost[]>([]);

  useEffect(()=> {
    const posts = getBlogPosts();
    console.log(posts);
    setposts(posts);
  },[]
  )

  return (
    <div>
      {
        posts.sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) >
            new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        }).map((post)=> (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div>
            <p className='title text-md md:text-xl font-bold'>{post.metadata.title}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}