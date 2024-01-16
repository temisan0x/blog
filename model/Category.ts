import mongoose, { Schema, Document, Types } from "mongoose";
import slugify from "slugify";
import { Post } from "./Posts";

export interface Category extends Document {
  name: string;
  slug: string;
  posts: Types.ObjectId[] | Post[];
  tags: Schema.Types.ObjectId;
  timestamp: Date;
}

const categorySchema: Schema = new mongoose.Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    slug: {
      type: String,
      unique: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

categorySchema.pre<Category>("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

export default mongoose.models.Category ||
  mongoose.model<Category>("Category", categorySchema);
