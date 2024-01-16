import { NextApiRequest, NextApiResponse } from "next";
import PostModel, { Post } from "@/model/Posts";
import { Types } from "mongoose";

interface PostResponse {
  _id: string;
  title: string;
  content: string;
  author: any;
  avatar: string;
  image: {
    type: string;
    lastModified: number;
    name: string;
    size: number;
  };
  category: Types.ObjectId;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default async function getPostsBySearchQuery(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { q } = req.query;

  if (!q || typeof q !== "string" || q.trim() == "" ) {
    return res.status(400).json({ error: "Invalid search query" });
  }

  console.log("Received search query", q);
  try {
    const searchRegex = new RegExp(q, "i");
    const posts = await PostModel.find({
      $or: [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ],
    })
      .populate("author", "name")
      .exec();

    res.status(200).json({ posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
