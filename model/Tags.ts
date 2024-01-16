import mongoose, { Schema, Document, Types } from "mongoose";
import { Post } from "./Posts";

export interface ITag extends Document {
  name: string;
  slug: string;
  posts: Types.ObjectId[] | Post[];
  categories: Schema.Types.ObjectId;
  timestamp: Date;
}

const TagSchema: Schema<ITag> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

export default mongoose.models.Tag || mongoose.model<ITag>("Tag", TagSchema);
