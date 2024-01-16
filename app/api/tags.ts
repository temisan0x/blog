import { NextApiRequest, NextApiResponse } from "next";
import Tag from "@/model/Tags";
import Post from "@/model/Posts";


// GET all tags
// api/tags/
export async function getTags(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET tag by slug
// api/tags/:slug
export async function getTagBySlug(req: NextApiRequest, res: NextApiResponse) {
  const {slug} = req.query;
  try {   
    const tag = Tag.findOne({slug})
    .populate({
      path: "posts",
      populate: {
        path: "categories",
      },
    })
    .exec();
    if(!tag){
      res.status(400).json({error: "Category not found"})
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// POST a tag
// api/tags
export async function createTag(req: NextApiRequest, res: NextApiResponse) {
  const { name, posts } = req.body;

  try {
    // Create the tag document
    const tag = await Tag.create({ name });

    // Find the corresponding post documents and associate them with the tag
    if (posts && Array.isArray(posts)) {
      const postPromises = posts.map((postId: string) =>
        Post.findById(postId).exec()
      );

      const postResults = await Promise.all(postPromises);

      // Filter out any null or undefined post documents
      const validPosts = postResults.filter((post) => post !== null && post !== undefined);

      // Associate the tag with the valid post documents
      tag.posts = validPosts.map((post) => post._id);
      await tag.save();
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// DELETE a tag
export async function deleteTag(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  try {
    const tag = await Tag.findOne({ name });
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    await Tag.deleteOne({ _id: tag._id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default function TagsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || req.query.slug) {
    return getTags(req, res);
  }else if (req.method === "GET") {
    return getTagBySlug(req, res);
  } else if (req.method === "POST") {
    return createTag(req, res);
  }  else if (req.method === "DELETE") {
    return deleteTag(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
