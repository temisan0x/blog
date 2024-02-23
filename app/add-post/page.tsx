"use client";
import React, { useState } from "react";
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
  }>();

  const MemoizedSingleImageDropzone = React.memo(SingleImageDropzone);
  const { edgestore } = useEdgeStore();

  const handleTitleChange = React.useCallback((e: any) => {
    setTitle(e.target.value);
  }, []);

  const handleContentChange = React.useCallback((e: any) => {
    setContent(e.target.value);
  }, []);

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      //axios fetch data
      const response = await axios.post("/api/add-movie", {
        title,
        content,
        imageUrl: file || "",
      });

      setLoading(false);
      if (response.status === 200) {
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
      await handleUpload();
      await handleSubmit();
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
          <MemoizedSingleImageDropzone
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
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {urls?.url && (
            <Link href={urls.url} target="_blank">
              View Image
            </Link>
          )}
          {urls?.thumbnailUrl && (
            <Link href={urls.thumbnailUrl} target="_blank">
              View Thumbnail
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}
