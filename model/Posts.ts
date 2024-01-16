import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";
import slugify from "slugify";

export interface Post extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  avatar: IUser["image"];
  tags: Types.ObjectId[];
  category: Types.ObjectId;
  image: {
    type: string;
    lastModified: number;
    name: string;
    size: number;
  };
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

const postSchema: Schema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: String,
      ref: "User",
    },
    image: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

postSchema.pre<Post>("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

export default mongoose.models.Post || mongoose.model<Post>("Post", postSchema);
