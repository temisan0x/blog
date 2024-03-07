"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import DeletePostButton from "./DeletePostBtn";
import axios from "axios";

interface PostProps {
  id: string;
  title: string;
  authorName: string | null;
  imageData: string | undefined | { url: string };
  truncatedContent: (html: string, maxLength: number) => string;
  content: string | "";
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  authorName,
  imageData,
  truncatedContent,
  content,
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

  const truncatedContentText = truncatedContent(content, 100);

  return (
    <div className={`mt-4 ${styles.postContainer}`}>
      <h3 className="text-md font-bold text-gray-700">{title}</h3>
      <div className="sub-text" dangerouslySetInnerHTML={{ __html: truncatedContentText }} />
      <p className="text-gray-500">Author: {authorName}</p>
      {/* <div className={`mx-auto ${styles.imageContainer}`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`Image for ${title}`}
            width={800}
            height={600}
            loading="lazy"
          />
        )}
      </div> */}
      <DeletePostButton postId={id} />
    </div>
  );
};

export default Post;
