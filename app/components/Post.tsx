import Image from "next/image";
import React from "react";

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
    <div className="border border-cyan-200">
      <h4>{title}</h4>
      <p>{content}</p>
      <p>Author: {authorName}</p>
      {imageData && (
        <Image src={imageData.toString()} alt={`IMmage for ${title}`} fill />
      )}
    </div>
  );
};

export default Post;
