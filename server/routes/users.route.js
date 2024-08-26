import { Router } from "express";
import {
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
} from "../controllers/users.controller.js";

const userRoute = Router();
// Auth routes
userRoute.post("/login", handleLoginUser);
userRoute.post("/register", handleRegisterUser);
userRoute.get("/logout", handleLogoutUser);

export default userRoute;
