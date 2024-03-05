"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();

  const router = useRouter();

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
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
        setImage(null);
        setSelectedCategory("");
      } else {
        console.error("Failed to submit data:", await response.data);
      }
    } catch (error) {
      console.error("Error Message:", error);
    }
  };

  const handleCombinedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      const uploadResponse = await axios.post("/api/upload-image", formData);
      const imageUrl = uploadResponse.data.imageUrl;
      setLoading(false);
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
          image={image}
          setImage={setImage}
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
