"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreatePost from "../components/CreatePost";

interface Category {
  _id: string;
  name: string;
}

export default function AddPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const router = useRouter();
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
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (imageUrl: string | undefined) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/add-post", {
        title,
        content,
        imageData: imageUrl?.toString(),
        category: selectedCategory,
      });
      setLoading(false);
      if (response.status === 200) {
        console.log(response);
        setTitle("");
        setContent("");
        setFile(null || undefined);
        setSelectedCategory("");
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
      if (imageUrl) {
        await handleSubmit(imageUrl);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <Link href={"/"}>View feed</Link>
      <h1>Add New Movie</h1>
      <CreatePost
        loading={loading}
        handleSubmit={handleSubmit}
        title={title}
        content={content}
        file={file}
        setFile={setFile}
        setContent={setContent}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleCombinedSubmit={handleCombinedSubmit}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        setCategories={setCategories}
        setLoading={setLoading}
      />
    </main>
  );
}
