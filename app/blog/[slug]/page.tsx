"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/app/page.module.css";
import Parser from "html-react-parser";

export default function FetchPost({ params }: { params: { slug: string } }) {
  const [postData, setPostData] = useState<any>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/get-post/${params.slug}`);
        console.log(response.config.url); 
        const post = response.data.post; 
        console.log(response);
        if (post) {
          setPostData({
            id: post.id,
            title: post.title,
            content: post.content,
            imageData: post.imageData,
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPostData();
  }, [params.slug]);

  return (
    <div className="mt-40">
      {postData ? (
        <>
          <h1>{postData.title}</h1>
          <p>{postData.content}</p>
          <div className={`mx-auto ${styles.imageContainer}`}>
            <Image
              src={postData.imageData}
              alt={`Image for ${postData.title}`}
              width={800}
              height={600}
              loading="lazy"
            />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
