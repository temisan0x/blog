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
    <div
      className={`${styles.postContentContainer} flex flex-col items-center justify-center min-h-screen`}
    >
      {postData ? (
        <>
          <h1 className={`${styles.postHeader}`}>{postData.title}</h1>
          <div
            className={`mx-auto ${styles.imageContainer} usecase-media-wrap`}
          >
            <Image
              src={postData.imageData}
              alt={`Image for ${postData.title}`}
              width={800}
              height={600}
              loading="lazy"
            />
          </div>
          <div className="mb-40">{Parser(postData.content || "")}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
