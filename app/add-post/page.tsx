"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { SingleImageDropzone } from "../components/SingleImageDropZone";
import axios from "axios";

export default function AddPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>({ url: "", thumbnailUrl: null });

  const { edgestore } = useEdgeStore();

  const handleUpload = async () => {
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({
          file,
          onProgressChange: (progress) => {
            console.log(progress);
          },
          input: { type: "post" },
        });

        setUrls({
          url: res.url,
          thumbnailUrl: res.thumbnailUrl,
        });

        console.log(res, "checking...");
        return res.url;
      }
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (imageUrl: string | undefined) => {
    try {
      setLoading(true);
      //axios fetch data
      const response = await axios.post("/api/add-movie", {
        title,
        content,
        imageUrl: imageUrl || "unable to load",
      });
      setLoading(false);
      if (response.status == 200) {
        console.log(response);
        setTitle("");
        setContent("");
      } else {
        console.error("Failed to submit data:", await response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCombinedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageUrl = await handleUpload();
      await handleSubmit(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Add New Movie</h1>
      <form
        onSubmit={(e) => handleCombinedSubmit(e)}
        className="max-w-md mx-auto mt-6"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-600 font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600 font-medium">
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

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
