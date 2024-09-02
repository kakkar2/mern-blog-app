import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute, blogRoute, commentRouter } from "./routes/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// routes
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRouter);

// server running & database connection
app.listen(process.env.PORT, async() => {
 try {
   await mongoose
      .connect(process.env.DATABASE_URL)
      // .then(() =>
      //   console.log(
      //     `SERVER RUNNING AT PORT ${process.env.PORT}. MONGODB CONNECTED.`
      //   )
      // )
      // .catch((error) =>
      //   console.log("ERROR OCCUR WHILE CONNECTING TO DATABASE", error.message)
      // );
  } catch (error) {
    console.log(error.message);
  }
});
