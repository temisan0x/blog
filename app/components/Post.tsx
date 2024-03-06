'use client'

import Image from "next/image";
import React from "react";
import styles from "@/app/page.module.css";
import DeletePostButton from "./DeletePostBtn";

interface PostProps {
  id: string;
  title: string;
  content: string | null;
  authorName: string | null;
  imageData: any;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  content,
  authorName,
  imageData,
}) => {
  let imageUrl = "";

  if (typeof imageData === "string") {
    // If imageData is already a string (URL or path), use it directly
    imageUrl = imageData;
  } else if (typeof imageData === "object" && imageData !== null) {
    // If imageData is an object, extract the URL from it
    imageUrl = imageData.url; // Replace 'url' with the correct property name
  }
  
  return (
    <div className={`border border-black mt-4 mx-auto p-5 ${styles.postContainer}`}>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-700">{content}</p>
      <p className="text-gray-500">Author: {authorName}</p>
      <div className={`mx-auto ${styles.imageContainer}`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`Image for ${title}`}
            width={800}
            height={600}
            loading="lazy"
          />
        )}
      </div>
      <DeletePostButton postId={id} />
    </div>
  );
};

export default Post;
