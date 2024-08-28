import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute, blogRoute } from "./routes/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

// routes
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

// server running & database connection
app.listen(process.env.PORT || 8000, () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() =>
      console.log(
        `SERVER RUNNING AT PORT ${process.env.PORT}. MONGODB CONNECTED.`
      )
    )
    .catch((error) =>
      console.log("ERROR OCCUR WHILE CONNECTING TO DATABASE", error.message)
    );
});
