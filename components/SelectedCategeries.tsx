import { motion } from "framer-motion";

const SelectedCategories = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: any) => {
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
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded py-2 px-3 hero-action-input focus:outline-none focus:border-gray-600 pr-9 block text-sm dark:bg-[#0f0f10] dark:text-gray-400  hero-action-input"
      >
        <option value="">Select a category</option>
        {categories.map((category: any) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default SelectedCategories;
