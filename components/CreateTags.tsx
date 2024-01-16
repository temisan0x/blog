import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

interface CreateTagsProps {
  fetchTags: () => void;
}

const CreateTags: React.FC<CreateTagsProps> = ({ fetchTags }) => {
  const [tagName, setTagName] = useState("");

  const createTag = async () => {
    try {
      if (!tagName.trim()) {
        console.error("Please enter a tag name");
        return;
      }

      await axios.post("/api/tags", { name: tagName });

      // Clear the tag name input field
      setTagName("");
      fetchTags(); // Fetch updated tags
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
      <label htmlFor="tag" className="block mb-2 font-bold text-white">
        Tag
      </label>
      <div className="flex flex-col">
        <input
          type="text"
          id="tag"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="border border-gray-300 rounded py-2 px-3 hero-action-input"
          placeholder="Enter tag name"
        />
        <button
          type="button"
          onClick={createTag}
          className="bg-green-500 text-white rounded py-2 px-4 mt-4"
        >
          Create Tag
        </button>
      </div>
    </motion.div>
  );
};

export default CreateTags;
