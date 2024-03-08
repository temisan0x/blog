"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "@/app/page.module.css";
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
  const [image, setImage] = useState<File| null >(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false); 

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
        setSuccess(true); 
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
      if (image) {
        formData.append("image", image);
        
        const uploadResponse = await axios.post("/api/upload-image", formData);
        const imageUrl = uploadResponse.data.imageUrl;
        
        setLoading(false);
        await handleSubmit(imageUrl);
        router.refresh();
      } else {
        setLoading(false);
        console.error("No image selected");
      }
    } catch (error) {
      console.error(error);
    }
  };

    // Function to reset success state after a delay
    const resetSuccess = () => {
      setSuccess(false);
    };
  
    // useEffect to reset success state after 3 seconds
    useEffect(() => {
      if (success) {
        const timer = setTimeout(() => {
          resetSuccess();
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    }, [success]);
  

  return (
   <>
     <main className={`px-20 mt-[100px] ${styles.main}`}>
      <Link href={"/"}>View feed</Link>
      {success && <p className="text-green-500">Post submitted successfully!</p>}
      <CreatePost
        loading={loading}
        title={title}
        content={content}
        onChangeHandler={onChangeHandler}
        setContent={setContent}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        handleCombinedSubmit={(e) => handleCombinedSubmit(e)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        setCategories={setCategories}
        setLoading={setLoading}
      />
    </main>
   </>
  );
}
