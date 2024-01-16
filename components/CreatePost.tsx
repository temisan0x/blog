import React, { ChangeEvent, FormEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Session } from "next-auth";
import initFullProps from "../types/initFullProps";
import CreateCategories from "./CreateCategories";
import CreateTags from "./CreateTags";
import SelectedCategories from "./SelectedCategeries";
import SelectedTags from "./SelectedTags";

interface NewPostFormProps {
  handleSubmit: (event: FormEvent) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  isEditing: boolean;
  handleCancelEdit: () => void;
  session: Session | null;
  convert2base64: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTags: string[];
  setSelectedTags: any;
  fetchCategories: any;
  fetchTags: any;
  allTags: any;
}

interface Category {
  _id: string;
  name: string;
}

const NewPostForm: React.FC<NewPostFormProps> = ({
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
  isEditing,
  handleCancelEdit,
  convert2base64,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
  fetchCategories,
  fetchTags,
  allTags,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          onEditorChange={(newContent) => setContent(newContent)}
          init={{
            ...initFullProps,
          }}
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_ID}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={convert2base64}
          className="rounded py-2 px-3 hero-action-input"
        />
      </div>
      <div className="flex">
        <div className="tagscats flex flex-col lg:flex-row sm:flex-col md:flex-col event-content blog-card items-center justify-between">
          <CreateCategories fetchCategories={fetchCategories} />
          <CreateTags fetchTags={fetchTags} />
        </div>
        <div className="tagscats flex blog-card justify-between">
          <div className="flex-1">
            <SelectedCategories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </div>
          <div className="flex-1">
            <SelectedTags
              allTags={allTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
        style={{width: '60%', margin:"20px auto"}}
          type="submit"
          className="button w-full text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? "Update" : "Create"} Post
        </button>
        {/* {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel Edit
          </button>
        )} */}
      </div>
    </form>
  );
};

export default NewPostForm;
