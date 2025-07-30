import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Tour from "../models/Tour.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_FOLDER = path.join(__dirname, "..", "uploads");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// GET all tours (public)
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tours" });
  }
});

// POST add new tour (admin)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, location, description, rating, type, price, duration } = req.body;

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const newTour = new Tour({
      title,
      location,
      description,
      rating: rating ? Number(rating) : 0,
      type,
      price: price ? Number(price) : 0,
      duration,
      imageUrl: `/uploads/${req.file.filename}`,
      imageFileName: req.file.originalname,
    });

    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add tour" });
  }
});

// PUT update tour (admin)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, rating, type, price, duration } = req.body;

    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    tour.title = title || tour.title;
    tour.location = location || tour.location;
    tour.description = description || tour.description;
    tour.rating = rating !== undefined ? Number(rating) : tour.rating;
    tour.type = type || tour.type;
    tour.price = price !== undefined ? Number(price) : tour.price;
    tour.duration = duration || tour.duration;

    if (req.file) {
      // Delete old image file if exists
      const oldImagePath = path.join(__dirname, "..", tour.imageUrl.replace("/uploads/", "uploads/"));
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

      tour.imageUrl = `/uploads/${req.file.filename}`;
      tour.imageFileName = req.file.originalname;
    }

    await tour.save();
    res.json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update tour" });
  }
});

// DELETE a tour (admin)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    if (tour.imageUrl) {
      const imagePath = path.join(__dirname, "..", tour.imageUrl.replace("/uploads/", "uploads/"));
      console.log("Deleting image at:", imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted");
      } else {
        console.log("Image file not found on disk");
      }
    } else {
      console.log("No imageUrl found on tour");
    }

    await tour.deleteOne();

    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete tour" });
  }
});


export default router;
