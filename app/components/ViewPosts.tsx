"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import DeletePostButton from "./DeletePostBtn";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";

interface PostProps {
  id: string;
  title: string;
  authorName: string | null;
  imageData: string | undefined | { url: string };
  truncatedContent: (html: string, maxLength: number) => string;
  content: string | "";
  slug: string;
}

const ViewPosts: React.FC<PostProps> = ({
  id,
  title,
  authorName,
  imageData,
  truncatedContent,
  content,
  slug,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async (url: string) => {
      try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const blob = new Blob([response.data]);
        setImageUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
        // Handle the error, e.g., provide a fallback image URL
        setImageUrl("fallback-image-url");
      }
    };

    if (imageData && typeof imageData === "object" && "url" in imageData) {
      fetchImage(imageData.url);
    }
  }, [imageData]);

  const truncatedContentText = truncatedContent(content, 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`mt-4 ${styles.main} `}
    >
      <h3 className="underline underline-offset-4">{title}</h3>
      <Link href={`/tm-admin/${slug}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="text-sm mb-2 mt-1 hover:underline underline-offset-4"
        >
          <div dangerouslySetInnerHTML={{ __html: truncatedContentText }} />
        </motion.div>
      </Link>

      <p className="text-gray-500">Author: {authorName}</p>
      <div className={`mx-auto ${styles.imageContainer} usecase-media-wrap`}>
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={`Image for ${title}`}
            width={400}
            height={400}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>
      <DeletePostButton postId={id} />
      <Link href={`/tm-admin/${slug}`}>Edit...</Link>
    </motion.div>
  );
};

export default ViewPosts;
