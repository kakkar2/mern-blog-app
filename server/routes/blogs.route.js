import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware.js";

import {
  handleAddNewBlog,
  handleBlogs,
  handleDeleteBlog,
  handleUpdateBlog,
} from "../controllers/blogs.controller.js";

const blogRoute = Router();

//blogs routes
// blogRoute.get("/admin/all-blogs", verifyToken, handleViewBlogs);
blogRoute.get("/all-blogs", handleBlogs);
blogRoute.post("/add-new", verifyToken, handleAddNewBlog);
blogRoute.put("/update-blog/:id", verifyToken, handleUpdateBlog);
blogRoute.delete("/delete/:id", verifyToken, handleDeleteBlog);

export default blogRoute;
