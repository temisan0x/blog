import Image from "next/image";
import React from "react";
import styles from "@/app/page.module.css";
import DeletePostButton from "./DeletePostBtn";

interface PostProps {
  id: string;
  title: string;
  content: string | null;
  authorName: string | null;
  imageData: Buffer | null | undefined;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  content,
  authorName,
  imageData,
}) => {
  return (
    <div className={`border border-black mt-4 mx-auto p-5 ${styles.postContainer}`}>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-700">{content}</p>
      <p className="text-gray-500">Author: {authorName}</p>
      <div className={`mx-auto ${styles.imageContainer}`}>
        {imageData && (
          <Image
            src={imageData.toString()}
            alt={`Image for ${title}`}
            width={800}
            height={600}
            loading="lazy"
          />
        )}
      </div>
      <DeletePostButton postId={id}/>
    </div>
  );
};

export default Post;
