"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function FetchPost({ params }: { params: { slug: string } }) {
  const [postData, setPostData] = useState<any>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/posts/${params.slug}`);
        setPostData(response.data.post);
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
          <div>
            <div
            >
              <Image
                src={postData.imageUrl}
                alt={`Image for ${postData.title}`}
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
            <div>
              <p>{postData.content}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
