"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import initFullProps from "@/types/initFullProps";
import { SingleImageDropzone } from "./SingleImageDropZone";
import CreateCategories from "./CreateCategories";
import SelectedCat from "./SelectedCategories";

const CreatePost = ({
  handleSubmit,
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
}: any) => {
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
              <SelectedCat
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />
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
