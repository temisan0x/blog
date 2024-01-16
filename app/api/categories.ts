import { NextApiRequest, NextApiResponse } from "next";
import Category from "@/model/Category";
import PostModel, { Post } from "@/model/Posts";
import Posts from "@/model/Posts";

// GET all categories
// api/categories
export async function getCategories(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//GET all categories by slug
//api/categories/:slug
export async function getCategoryBySlug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  try {
    const category = await Category.findOne({ slug })
      .populate("posts")
      .populate({
        path: "posts",
        populate: {
          path: "tags",
          select: "name",
        },
      })
      .exec();
    const posts = await Posts.find({ category: category._id }).exec();

    const categoryWithPosts = {
      ...category.toObject(),
      posts: posts,
    };

    console.log("Category with posts:", categoryWithPosts);

    res.status(200).json(categoryWithPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//POST a category
//api/categories
export async function createCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;
  try {
    const category = await Category.create({ name }); // Update here
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//UPDATE a category
//api/categories/:id
export async function updateCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
  }
}

//DELETE a category
//api/categories/:id
export async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log("Received category ID:", id);

  try {
    const category = await Category.findOne({ _id: id });
    console.log("Found category:", category);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await Category.deleteOne({ _id: id });
    console.log("Deleted category:", category);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export default function categoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  PostModel;
  if (req.method === "GET" && req.query.slug) {
    return getCategoryBySlug(req, res);
  } else if (req.method === "GET") {
    return getCategories(req, res);
  } else if (req.method === "POST") {
    return createCategory(req, res);
  } else if (req.method === "PUT") {
    return updateCategory(req, res);
  } else if (req.method === "DELETE") {
    return deleteCategory(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
