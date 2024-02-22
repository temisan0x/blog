"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";

interface PostFormProps {
  onSubmit: (formData: FormData) => void;
}

export default function AddPost(onSubmit: PostFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const { edgestore } = useEdgeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      setLoading(true);
      const response = await fetch("/api/add-movie", {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      if (response.ok) {
        console.log(response);
        setTitle("");
        setContent("");
      } else {
        console.error("Failed to submit data:", await response.text);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Add New Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600 font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <button
            onClick={async () => {
              if (file) {
                const res = await edgestore.myPublicImages.upload({
                  file,
                  onProgressChange: (progress) => {
                    console.log(progress);
                  },
                });
                setUrls({
                  url: res.url,
                  thumbnailUrl: res.thumbnailUrl,
                });
                console.log(res, "checking...");
              }
            }}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <div className="text-white">
            {urls?.url && (
              <Link href={urls.url} target="_blank">
                URL
              </Link>
            )}
            {urls?.thumbnailUrl && (
              <Link href={urls.thumbnailUrl} target="_blank">
                URL
              </Link>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
