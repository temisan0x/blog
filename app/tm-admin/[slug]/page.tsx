"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditPost({ params }: { params: { slug: string } }) {
  const [editedPost, setEditedPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/get-post/${params.slug}`);
        const post = response.data.post;
        if (post) {
          setEditedPost({
            title: post.title,
            content: post.content,
            imageUrl: post.imageData,
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params.slug]);

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
    <div className="mt-10 mx-auto max-w-md">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={editedPost.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          value={editedPost.content}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>

        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image:
        </label>
        <input
          type="file"
          id="image"
          onChange={handleInputChange}
          className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
