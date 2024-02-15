import { NextRequest, NextResponse } from "next/server";
import PostModel, { Post } from "@/model/Posts";
// import { initMongoose } from "@/lib/mongooseConfig";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import UserModel from "@/model/User";
 import { Types } from "mongoose";
// import Tags from "@/model/Tags";
// import slugify from "slugify";
import CategoryModel from "@/model/Category";

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

// GET /api/posts

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_LIMIT = 10;


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { currentPage = DEFAULT_CURRENT_PAGE, limit = DEFAULT_LIMIT } =
      req as any;
    const pageNumber = parseInt(currentPage as string);
    const limitNumber = parseInt(limit as string);

    const totalPosts = await PostModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / limitNumber);

    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("author", "name")
      .populate("category", "name slug")
      // .populate("tags", "name")
      .exec();
     console.log("Fetched Posts:", posts);
    const formattedPosts = await Promise.all(
      posts.map(async (post: any) => {
        const populatedCategory = await CategoryModel.findById(post.category);
        if (populatedCategory) {
          post.category = {
            _id: populatedCategory._id,
            name: populatedCategory.name,
            slug: populatedCategory.slug,
            posts: populatedCategory.posts,
          };
        }
        return post;
      })
    );

    res.json({ posts: formattedPosts, totalPages, status: 200 });

  } catch (error) {
    console.error(error);
   return NextResponse.json({ error: "Internal server error" }, { status:500});
  }
}

// // GET /api/posts/:slug
// export async function getPostBySlug(req: NextRequest, res: NextResponse) {
//   try {
//     const { slug } = req.query;
//     const decodedSlug = decodeURIComponent(slug as string);
//     // console.log("Requested slug: " + decodedSlug);

//     const post = await PostModel.findOne({ slug: decodedSlug})
//       .populate("author", "name")
//       .exec();

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }
//     // console.log("Formatted Post: ", {
//     //   _id: post._id,
//     //   title: post.title,
//     //   content: post.content,
//     //   author: post.author,
//     //   avatar: post.avatar,
//     //   image: post.image,
//     //   category: post.category,
//     //   tags: post.tags.map((tag: any) => tag.name),
//     //   createdAt: post.createdAt.toISOString(),
//     //   updatedAt: post.updatedAt.toISOString(),
//     // });

//     const formattedPost: PostResponse = {
//       _id: post._id,
//       title: post.title,
//       content: post.content,
//       author: post.author,
//       avatar: post.avatar,
//       image: post.image,
//       category: post.category,
//       tags: post.tags.map((tag: any) => tag.name),
//       createdAt: post.createdAt.toISOString(),
//       updatedAt: post.updatedAt.toISOString(),
//     };

//     //console.log("Formatted Post:", formattedPost); 

//     res.status(200).json(formattedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }


// //POST /api/posts/
// export async function createPost(req: NextRequest, res: NextResponse) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(404).json({ error: "Unauthorized" });
//   }

//   const {
//     title,
//     content,
//     image,
//     category,
//     tags,
//   }: {
//     title: string;
//     content: string;
//     image: string;
//     category: string;
//     tags: string[];
//   } = req.body;

//   // console.log("tags", tags);

//   // Validate that all required fields are provided
//   if (!title || !content || !image || !category || !Array.isArray(tags)) {
//     return res
//       .status(400)
//       .json({ error: "Please provide all required fields" });
//   }

//   try {
//     const user = await UserModel.findOne({ name: session.user?.name });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if tags is defined and is an array
//     const tagObjectIds: Types.ObjectId[] = [];

//     for (const tagName of tags) {
//       const tag = await Tags.findOne({ name: tagName });
//       if (tag) {
//         tagObjectIds.push(tag._id);
//       } else {
//         console.error("Invalid tag name:", tagName);
//         return res.status(400).json({ error: "Invalid tag name" });
//       }
//     }

//     const slug = slugify(title, { lower: true });

//     const newPost: Post = await PostModel.create({
//       title,
//       content,
//       author: user._id,
//       avatar: user.image,
//       image,
//       category: category,
//       tags: tagObjectIds,
//       slug: slug,
//     });

//     // Construct the response object
//     const response: PostResponse = {
//       _id: newPost._id,
//       title: newPost.title,
//       content: newPost.content,
//       author: newPost.author,
//       avatar: newPost.avatar,
//       image: newPost.image,
//       category: newPost.category,
//       tags: tags,
//       createdAt: newPost.createdAt.toISOString(),
//       updatedAt: newPost.updatedAt.toISOString(),
//     };
//     res.status(201).json(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// //UPDATE /api/:slug
// export async function updatePost(req: NextRequest, res: NextResponse) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   const { slug } = req.query;
//   const { title, content, image } = req.body;

//   const decodedSlug = decodeURIComponent(slug as string);
//   console.log("Decoded Slug:", decodedSlug);
//   try {
//     const post = await PostModel.findOne({ slug: decodedSlug });
//     if (!post) {
//       console.log("Post not found in the database.");
//       return res.status(404).json({ error: "Post not found" });
//     }
//     post.title = title;
//     post.content = content;
//     post.image = image;

//     const updatedPost = await post.save();
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// // DELETE /api/posts/:id
// export async function deletePost(req: NextRequest, res: NextResponse) {
//   const { id } = req.query;
//   try {
//     http: if (!id) {
//       res.status(400).json({ message: "invalid postId" });
//       return;
//     }
//     const deletePost = await PostModel.findByIdAndDelete(id);
//     if (!deletePost) {
//       return res.status(404).json({ error: "Post not found" });
//     }
//     res.status(204).end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// // const uploadMiddleware = upload.single('image');
// export default async function postsHandler(
//   req: NextRequest,
//   res: NextResponse
// ) {
//   await initMongoose();
//   // uploadMiddleware(req, res, () => {
//   //   createPost(req, res);
//   // });

//   if (req.method === "GET") {
//     const { id } = req.query;
//     if (id) {
//       return getPostBySlug(req, res);
//     } else {
//       return getPosts(req, res);
//     }
//   } else if (req.method === "POST") {
//     return createPost(req, res);
//   } else if (req.method === "PUT") {
//     return updatePost(req, res);
//   } else if (req.method === "DELETE") {
//     return deletePost(req, res);
//   } else {
//     return res.status(405).json({ error: "Method not allowed" });
//   }
// }
