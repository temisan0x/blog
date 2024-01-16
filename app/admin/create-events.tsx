import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";
import PostTable from "../../../components/PostTable";
import NewPostForm from "../../../components/CreatePost";
import CreateCategories from "../../../components/CreateCategories";
import CreateTags from "../../../components/CreateTags";
import RestrictSection from "../../../components/RestrictSection";
import Dashboard from "../../../components/Dashboard";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
}

const AdminPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("loading");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    setStatus("loading");

    try {
      const response = await axios.get(`/api/posts?page=${currentPage}`);
      const { data } = response;
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, [currentPage]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("/api/tags");
      setAllTags(response.data.map((tag: any) => tag.name));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, [fetchPosts, fetchCategories]);

  const handleDeletePost = async (postId: string) => {
    try {
      if (!postId) {
        console.error("Invalid post id");
        return;
      }
      await axios.delete(`/api/posts?id=${postId}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = (post: Post) => {
    setIsEditing(true);
    setTitle(post.title);
    setContent(post.content);
    scrollToForm();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTitle("");
    setContent("");
  };

  //convert file to base64
  const convert2base64 = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      if (reader.result !== null) {
        setImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const createPost = async () => {
    try {
      if (
        !title.trim() ||
        !content.trim() ||
        !image.trim() ||
        !selectedCategory ||
        selectedTags.length === 0
      ) {
        console.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("/api/posts", {
        title,
        content,
        image,
        category: selectedCategory,
        tags: selectedTags,
      });

      fetchPosts();
      setTitle("");
      setContent("");
      setSelectedCategory("");
      setImage("");
      setSelectedTags([]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !content.trim() || !image.trim()) {
      return;
    }

    await createPost();
  };

  const handleEditPost = (post: Post) => {
    router.push(`/edit/${post.slug}`);
  };

  const scrollToForm = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      {session ? (
        <Dashboard>
          <div style={{ marginTop: "30px" }}>
            <h1
              className="text-2xl md:text-medium text-white mb-4 font-semibold leading-tight tracking-tight"
              style={{ marginTop: "100px", zIndex: "100" }}
            >
              Admin Page
            </h1>
            <PostTable
              posts={posts}
              handleDeletePost={handleDeletePost}
              handleUpdatePost={handleUpdatePost}
              fetchPosts={fetchPosts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              status={status}
              handleEditPost={handleEditPost}
            />
            <br />
            <NewPostForm
              handleSubmit={handleSubmit}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              isEditing={isEditing}
              handleCancelEdit={handleCancelEdit}
              session={session}
              convert2base64={convert2base64}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              fetchCategories={fetchCategories}
              fetchTags={fetchTags}
              allTags={allTags}
            />
          </div>
        </Dashboard>
      ) : (
        <RestrictSection />
      )}
    </Layout>
  );
};

export default AdminPage;
