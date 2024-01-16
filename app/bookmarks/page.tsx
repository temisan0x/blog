'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { IPost } from "../../types/post";
import PostCard from "../../components/PostCard";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { motion } from "framer-motion";
import BookmarkPosts from "../../components/BookmarkPosts";
import Loader from "../../components/Loader";

const Bookmark = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [firstPost, setFirstPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const bookmarks = useSelector((state: RootState) => state.bookmark);
  console.log(bookmarks, "bookmarked");

  useEffect(() => {
    fetchPosts();
    fetchBookmarkedPost();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts`);
      const fetchedPosts = response.data.posts;
      const bookmarkPostIds = bookmarks.map((bookmark) => bookmark.id);
      //Filter out bookmark posts
      const bookmarkedPosts = fetchedPosts.filter((post: IPost) =>
        bookmarkPostIds.includes(post._id)
      );
      setPosts(bookmarkedPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const fetchBookmarkedPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts`);
      const fetchedPosts = response.data.posts;

      // Find the first bookmarked post based on bookmark IDs
      const bookmarkPostIds = bookmarks.map((bookmark) => bookmark.id);
      const firstBookmarkedPost = fetchedPosts.find((post: IPost) =>
        bookmarkPostIds.includes(post._id)
      );

      setFirstPost(firstBookmarkedPost);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  console.log("First posts", firstPost);

  console.log("Fetching posts", posts);

  return (
    <Layout>
      <section className="py-10 container mx-auto">
        <div className="text-white mt-20">
          <div className="flex items-center">
            <h2 className="text-gray-400 text-2xl py-7 mr-2">Favourites</h2>
            <div className="icon-container">
              <BsFillBookmarkHeartFill size={30} />
            </div>
          </div>
          <p className="mt-2 mb-4 text-gray-600">
            Explore your favourite articles!
          </p>
        </div>
        <div>
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
              <Loader />
            </div>
          ) : (
            <div className="container " style={{ gap: "20px" }}>
              <div className="gradient fixed"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 blog-container gap-10 mb-10">
                <BookmarkPosts posts={posts} />
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Bookmark;
