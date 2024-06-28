"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import styles from "@/app/page.module.css";
import Parser from "html-react-parser";
import { BlogPosts } from "@/app/components/posts";

const FetchPost = ({ params }: { params: { slug: string } }) => {
  const [postData, setPostData] = useState<any>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/get-post/${params.slug}`);
        const post = response.data.post;

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
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   className={`${styles.postContentContainer} flex flex-col items-center justify-center min-h-screen`}
    // >
    //   {postData ? (
    //     <>
    //       <motion.h1
    //         initial={{ y: -20, opacity: 0 }}
    //         animate={{ y: 0, opacity: 1 }}
    //         transition={{ duration: 0.5 }}
    //         className={`${styles.postHeader}`}
    //       >
    //         {postData.title}
    //       </motion.h1>
    //       <motion.div
    //         style={{ maxWidth: "100%" }}
    //         initial={{ y: -20, opacity: 0 }}
    //         animate={{ y: 0, opacity: 1 }}
    //         transition={{ duration: 0.5 }}
    //         className={`mx-auto ${styles.imageContainer} usecase-media-wrap`}
    //       >
    //         <Image
    //           src={postData.imageData}
    //           alt={`Image for ${postData.title}`}
    //           width={800}
    //           height={600}
    //           loading="lazy"
    //         />
    //       </motion.div>
    //       <motion.div
    //         initial={{ y: -20, opacity: 0 }}
    //         animate={{ y: 0, opacity: 1 }}
    //         transition={{ duration: 0.5 }}
    //         className="mb-40"
    //       >
    //         {Parser(postData.content || "")}
    //       </motion.div>
    //     </>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </motion.div>
    <BlogPosts/>
  );
};

export default FetchPost;
