"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";

interface PostFormProps {
  onSubmit: (formData: FormData) => void;
}

const AddPost: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  //convert file to base64
  const convert2base64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.result !== null) {
            formData.append("image", reader.result.toString());
        
            // Send the request after the image has been read
            const response = await fetch("/api/add-movie", {
              method: "POST",
              body: formData,
            });
            // ... handle response
          }
        };
        reader.readAsDataURL(image);
      }

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
        setImage(null);
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
            onChange={convert2base64}
            className="mt-1 p-2 w-full border rounded-md"
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
};

export default AddPost;
