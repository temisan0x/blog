import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";
import CreateCategories from "../../../components/CreateCategories";
import CreateTags from "../../../components/CreateTags";
import Dashboard from "../../../components/Dashboard";
import RestrictSection from "../../../components/RestrictSection";
import SelectedTags from "../../../components/SelectedTags";
import SelectedCategories from "../../../components/SelectedCategeries";

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

const TagsAndCategoriesPage: React.FC = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

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

  const handleDeleteTagFromList = async (tagId: any) => {
    try {
      if (!tagId) {
        console.error("Invalid tag id");
        return;
      }
      const url = `/api/tags?name=${tagId}`;
      console.log("DELETE URL:", url);
      await axios.delete(url);
      fetchTags();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDeleteTag = (tagId: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this tag?"
    );
    if (shouldDelete) {
      console.log("Deleting tag with id:", tagId);
      handleDeleteTagFromList(tagId);
    } else {
      console.log("Deletion canceled.");
    }
  };

  const handleDeleteCategoryFromList = async (categoryId: any) => {
    try {
      if (!categoryId) {
        console.error("Invalid category id");
        return;
      }
      const url = `/api/categories?id=${categoryId}`;
      await axios.delete(url);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDeleteCategories = (categoryId: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (shouldDelete) {
      console.log("Deleting category with id:", categoryId);
      handleDeleteCategoryFromList(categoryId);
    } else {
      console.log("Deletion canceled.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, [fetchCategories]);

  return (
    <Layout>
      {session ? (
        <Dashboard>
          <div style={{ marginTop: "30px" }} className="blog-list">
            <h1
              className="text-2xl md:text-medium text-white mb-4 font-semibold leading-tight tracking-tight"
              style={{ marginTop: "100px", zIndex: "100" }}
            >
              Tags and Categories Page
            </h1>
            <br />
            <div className="tagscats flex flex-col lg:flex-row sm:flex-col md:flex-col event-content blog-card items-center justify-between">
              <CreateCategories fetchCategories={fetchCategories} />
              <CreateTags fetchTags={fetchTags} />
            </div>
            <div className="flex event-content blog-card justify-between">
              <div className="flex-1">
                <SelectedCategories
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categories={categories}
                />
              </div>
              <div className="flex-1">
                <SelectedTags
                  allTags={allTags}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="tag-list-container mb-5">
                {allTags.map((tag: any, index: number) => {
                  return (
                    <div key={tag._id} className="tag-item">
                      <p>{index + 1}</p>
                      <p>{tag.name || tag}</p>
                      <button onClick={() => confirmDeleteTag(String(tag))}>
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
              <hr className="hr"/>
              <div className="tag-list-container mb-6">
                {categories.map((category: any, index: number) => {
                  return (
                    <div key={category._id} className="tag-item">
                      <p>{index + 1}</p>
                      <p>{category.name || category}</p>
                      <button
                        onClick={() =>
                          confirmDeleteCategories(String(category._id))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Dashboard>
      ) : (
        <RestrictSection />
      )}
    </Layout>
  );
};

export default TagsAndCategoriesPage;
