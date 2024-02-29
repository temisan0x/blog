"use client";

import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import initFullProps from "@/types/initFullProps";
import { SingleImageDropzone } from "./SingleImageDropZone";
import CreateCategories from "./CreateCategories";

const CreatePost = ({
  title,
  content,
  setFile,
  file,
  handleCombinedSubmit,
  handleTitleChange,
  handleContentChange,
  categories,
  selectedCategory,
  setSelectedCategory,
  fetchCategories,
  setCategories
}: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchCategories();
  }, []);
 
  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form
      onSubmit={(e) => handleCombinedSubmit(e)}
      className="max-w-md mx-auto mt-6"
    >
      <div>
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
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
        <label htmlFor="content" className="block mb-2 font-bold text-white">
          Content
        </label>
        <Editor
          value={content}
          onEditorChange={handleContentChange}
          init={{
            ...initFullProps,
          }}
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_ID}
        />
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
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
                 <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                   Category
                 </label>
                 <select
                   id="category"
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="border rounded py-2 px-3 hero-action-input focus:outline-none focus:border-gray-600 pr-9 block text-sm dark:bg-[#0f0f10] dark:text-gray-400  hero-action-input"
                 >
                   <option>Select a category</option>
                   {categories?.map((category: any) => (
                     <option key={category._id} value={category._id}>
                       {category.name}
                     </option>
                   ))}
                 </select>
               </motion.div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
