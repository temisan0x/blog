import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

interface CreateCategoriesProps {
  fetchCategories: () => void;
}

const CreateCategories: React.FC<CreateCategoriesProps> = ({
  fetchCategories,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const createCategory = async () => {
    try {
      if (!categoryName.trim()) {
        console.error("Please enter a category name");
        return;
      }

      await axios.post(
        "/api/categories",
        { name: categoryName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Clear the category name input field
      setCategoryName("");
      fetchCategories(); // Fetch updated categories
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      className="mb-4 mr-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor="category" className="block font-bold mb-2 text-white">
        Category
      </label>
      <div className="flex flex-col">
        <input
          type="text"
          id="category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className=" border border-gray-300 rounded py-2 px-3 hero-action-input"
          placeholder="Enter category name"
        />
        <button
          type="button"
          onClick={createCategory}
          className="bg-green-500 text-white rounded py-2 px-4 mt-4"
        >
          Create Category
        </button>
      </div>
    </motion.div>
  );
};

export default CreateCategories;
