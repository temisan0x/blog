import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import DeletePostButton from "./DeletePostBtn";
import axios from "axios";

interface PostProps {
  id: string;
  title: string;
  content: string | null;
  authorName: string | null;
  imageData: string | undefined | { url: string };
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  content,
  authorName,
  imageData,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async (url: string) => {
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data]);
        setImageUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
        // Handle the error, e.g., provide a fallback image URL
        setImageUrl("fallback-image-url");
      }
    };

    if (imageData && typeof imageData === "object" && 'url' in imageData) {
      fetchImage(imageData.url);
    }
  }, [imageData]);

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
