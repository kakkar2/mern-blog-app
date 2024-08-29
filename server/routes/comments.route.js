import Router from "express";
import verifyToken from "../middleware/verifyToken.middleware.js";
import {
  handleComment,
  handlePostComment,
} from "../controllers/comments.controller.js";

const commentRouter = Router();

commentRouter.get("/:id", handleComment);
commentRouter.post("/add-comment/:id", verifyToken, handlePostComment);
// commentRouter.post("/edit/", verifyToken, handlePostComment);

export default commentRouter;
