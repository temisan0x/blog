import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import initFullProps from "../../../types/initFullProps";

interface Post {
  title: string;
  content: string;
  image?: File | null;
}

const EditPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const { data: session, status } = useSession();
  console.log(session);
  const user = session?.user;

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts?slug=${slug}`);
      const { data } = response;
      if (data.posts && data.posts.length > 0) {
        const matchingPost = data.posts.find((post: any) => post.slug === slug);
        if (matchingPost) {
          setPost(matchingPost);
          setImagePreview(matchingPost.image);
        }
      } else {
        console.error("Post not found in the API response");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }, [slug]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (slug) {
          await fetchPost();
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPostData();
  }, [fetchPost, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatePost = {
        title: post.title,
        content: post.content,
        image: post.image instanceof File ? post.image.name : post.image,
      };
      console.log("Slug:", slug);
      console.log("Update Post Data:", updatePost);

      const encodedSlug = encodeURIComponent(slug as any);
      await axios.put(`/api/posts?slug=${encodedSlug}`, updatePost);
      console.log(updatePost, "updated");
      router.push("/admin");
    } catch (error) {
      console.error("Error editing post:", error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  //convert file to base64
  const convert2base64 = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        if (reader.result !== null) {
          setImagePreview(reader.result.toString());
          setPost({ ...post, image: file });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setPost({ ...post, image: null });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1
        className="text-3xl font-bold text-white"
        style={{ paddingTop: "30px" }}
      >
        Edit Post
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{ width: "80%", margin: "0 auto" }}
          className=""
        >
          <div className="mt-4">
            {imagePreview && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  onChange={convert2base64}
                  defaultValue="" // Use defaultValue instead of value
                  className="border border-gray-300 rounded py-2 px-3 mb-32"
                  style={{ margin: "20px" }}
                />

                <Image
                  src={imagePreview}
                  alt="post preview"
                  width={300}
                  height={200}
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="title" className="block mb-2 font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mt-4 mb-10">
            <label htmlFor="content" className="block mb-2 font-bold">
              Content
            </label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_ID}
              id="content"
              value={post.content}
              onEditorChange={(content) => setPost({ ...post, content })}
              init={{
                ...initFullProps,
              }}
            />
          </div>
          <div className="mt-4">{user && <p>Author: {user.name}</p>}</div>
          <button
            type="submit"
            className="button w-full mb-10 text-center my-10 text-white font-bold py-2 px-4 rounded mx-auto"
            disabled={isBtnLoading}
            style={{ width: "100%" }}
          >
            Update Post
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;
