"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// ... (imports and other code)

export default function ({ params }: { params: { slug: string } }) {
  const [editedPost, setEditedPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/edit-post/${params.slug}`, editedPost);
      router.push(`/blog/${params.slug}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="mt-40">
        <h1>Edit Post</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={editedPost.title}
            onChange={handleInputChange}
          />

          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            defaultValue={editedPost.content}
            onChange={handleInputChange}
          ></textarea>

          <input
            type="file"
            id="image"
            onChange={handleInputChange}
            className="rounded py-2 px-3 hero-action-input"
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

