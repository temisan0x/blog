'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import LatestBlogPosts from "@/components/LatestBlogPosts";
import Layout from "@/components/Layout";
import { IPost } from "@/types/post";
import NewsletterSignupModal from "@/components/NewsLetterSignupModal";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

const BlogPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBlogPage");
    if (!visitedBefore) {
      setModalVisible(true);
      localStorage.setItem("visitedBlogPage", "true");
    }
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts`);
      const posts = response.data.posts;
      console.log(posts);
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10  mt-20">
        <h1
          className="text-white text-2xl"
          style={{ marginTop: "30px", marginBottom: "10px" }}
        >
          Blog posts
        </h1>
        <p className="text-gray-400 mb-4">
          Explore the latest blog posts. Don&apos;t forget to bookmark your
          favorite articles for easy access later!
        </p>
        {loading ? (
          <div className="flex flex-col">
               <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-gray-600 py-6"
            >
              Loading blog posts...
            </motion.h1>
            <Loader/>
          </div>
        ) : (
          <>
            <div className="gradient fixed"></div>
            <LatestBlogPosts posts={posts} loading={loading} />
          </>
        )}
      </div>
      {/* {modalVisible && <NewsletterSignupModal closeModal={closeModal} />} */}
    </Layout>
  );
};

export default BlogPage;
