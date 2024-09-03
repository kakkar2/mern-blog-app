import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      default:
        "https://cdn.pixabay.com/photo/2017/03/17/11/38/blog-2151307_1280.png",
    },
    category: {
      type: String,
      trim: true,
      enum: ["Coding", "Technology", "Food", "Lifestyle", "Vehicles", "others"],
      default: "others",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
