"use client";

import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CreateCategories from "./CreateCategories";
import Tiptap from "./Tiptap";

interface Category {
  _id: string;
  name: string;
}

interface CreatePostProps {
  loading: boolean;
  setLoading: any;
  title: string;
  content: string;
  onChangeHandler: any;
  setContent: (content: string) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCombinedSubmit: (e: React.FormEvent) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CreatePost = ({
  title,
  content,
  onChangeHandler,
  handleTitleChange,
  setContent,
  categories,
  selectedCategory,
  setSelectedCategory,
  setCategories,
  handleCombinedSubmit,
  loading,
  setLoading,
}: CreatePostProps) => {
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form onSubmit={handleCombinedSubmit} className="mt-2">
      <div>
        <label htmlFor="title" className="blockfont-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full border border-gray-300 rounded py-2 px-3 hero-action-input"
          placeholder="Enter title"
        />
      </div>
      <div className="mt-4">
        <div>
          <label htmlFor="content" className="block mb-2">
            Content
          </label>
          <Tiptap content={content} onChange={setContent} />
        </div>
        <div className="my-4">
          <label htmlFor="image" className="block mb-2">
            Image
          </label>
          <input type="file" onChange={onChangeHandler} required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <div className="flex">
            <div className="tagscats flex flex-col lg:flex-row sm:flex-col md:flex-col event-content blog-card items-center justify-between">
              <CreateCategories fetchCategories={fetchCategories} />
            </div>
            <div className="tagscats flex blog-card justify-between">
              {categories && categories.length > 0 && (
                <motion.div
                  className="mb-4 mr-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded py-2 px-3 hero-action-input focus:outline-none focus:border-gray-600 pr-9 block text-sm dark:bg-[#F5F5F4] dark:text-gray-400  hero-action-input"
                  >
                    <option>Select a category</option>
                    {categories.map((category: Category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
