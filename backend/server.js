import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv"; // Load .env
dotenv.config(); // Run config

import commentsRouter from "./routes/comments.js";
import homeContentRouter from "./routes/homeContent.js";
import toursRouter from "./routes/tours.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import blogsRouter from "./routes/blogs.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use the MONGO_URI from .env
const MONGODB_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/comments", commentsRouter);
app.use("/api/home-content", homeContentRouter);
app.use("/api/tours", toursRouter);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogsRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch((err) => console.error(err));
