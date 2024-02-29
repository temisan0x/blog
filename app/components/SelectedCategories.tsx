"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
}

interface SelectedCategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: Category[];
}


const SelectedCategories: React.FC<SelectedCategoriesProps> =()=> {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
 
  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <motion.div
      className="mb-4 mr-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
        Category
      </label>
      {/* <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded py-2 px-3 hero-action-input focus:outline-none focus:border-gray-600 pr-9 block text-sm dark:bg-[#0f0f10] dark:text-gray-400  hero-action-input"
      >
        <option>Select a category</option>
        {categories?.map((category: any, index) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select> */}
    </motion.div>
  );
};

export default SelectedCategories;
