"use client";

import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";
import Image from "next/image";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {
        allBlogs.sort((a, b) => {
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