import React from "react";
import { motion } from "framer-motion";

const SelectedTags = ({ allTags, selectedTags, setSelectedTags }: any) => {
  return (
    <motion.div
      className="mb-4 ml-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <label className="block text-gray-700 font-bold mb-2">Tags</label>
      <div className="flex flex-wrap flex-col">
        {allTags.map((tag: any) => (
          <div key={tag} className="flex items-center mr-2 mb-2">
            <input
              type="checkbox"
              id={tag}
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={(e) => {
                const { value } = e.target;
                setSelectedTags((prevTags: string[]) =>
                  prevTags.includes(value)
                    ? prevTags.filter((tag) => tag !== value)
                    : [...prevTags, value]
                );
              }}
              className="cursor-pointer mr-2 appearance-none h-4 w-4 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
            />
            <label htmlFor={tag} className="text-gray-700 cursor-pointer">
              {tag}
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SelectedTags;
