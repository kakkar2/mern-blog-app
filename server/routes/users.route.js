import { Router } from "express";
import {
  handleAllUser,
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
} from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const userRoute = Router();
// Auth routes
userRoute.post("/login", handleLoginUser);
userRoute.post("/register", handleRegisterUser);
userRoute.get("/logout", handleLogoutUser);
//get all users
userRoute.get("/", verifyToken, handleAllUser);

export default userRoute;
