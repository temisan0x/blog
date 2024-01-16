import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../../components/Layout";
import { IPost } from "../../../types/post";
import CategoryCard from "../../../components/CategoryCard";
import { ICategory } from "../../../types/category";
import { motion } from "framer-motion";
import Loader from "../../../components/Loader";

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/api/categories?slug=${slug}`);
        const { data } = response;
        console.log(data);
        if (typeof data === "object") {
          setCategory(data);
          setPosts(data.posts);
        } else {
          console.error("Invalid category data", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  console.log(slug);

  return (
    <Layout>
        <div className="container mx-auto py-10  mt-20">
          <div className="text-start">
            <h1
              className="text-white text-2xl"
              style={{ marginTop: "30px", marginBottom: "10px" }}
            >
              {category?.name} posts
            </h1>
            <p className="text-gray-400 mb-4">
              Explore the latest blog posts. Don&apos;t forget to bookmark your
              favorite articles for easy access later!
            </p>
          
          </div>
          {loading ? (
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-gray-600 py-6"
            >
              Loading bookmarked page...
            </motion.h1>
            <Loader/>
          </div>
        ) : (
          <>
            <div className="gradient fixed"></div>
          <CategoryCard posts={posts} />
          </>
        )}
        </div>
    </Layout>
  );
};

export default CategoryPage;
