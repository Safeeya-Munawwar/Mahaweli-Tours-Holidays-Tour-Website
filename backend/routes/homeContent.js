import express from "express";
import HomeContent from "../models/HomeContent.js";

const router = express.Router();

// GET home content
router.get("/", async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (err) {
    console.error("GET /api/home-content error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update or create home content
router.put("/", async (req, res) => {
  try {
    console.log("PUT /api/home-content body:", req.body);

    const { title, intro, description, contact, stats } = req.body;

    // Basic validation
    if (
      typeof title !== "string" ||
      typeof intro !== "string" ||
      typeof description !== "string" ||
      typeof contact !== "string" ||
      !Array.isArray(stats)
    ) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Sanitize stats array
    const cleanStats = stats.map((s) => ({
      number: String(s.number || ""),
      label: String(s.label || ""),
    }));

    const existing = await HomeContent.findOne();

    if (existing) {
      const updated = await HomeContent.findByIdAndUpdate(
        existing._id,
        { title, intro, description, contact, stats: cleanStats },
        { new: true, runValidators: true }
      );
      return res.json(updated);
    } else {
      const created = await HomeContent.create({
        title,
        intro,
        description,
        contact,
        stats: cleanStats,
      });
      return res.json(created);
    }
  } catch (err) {
    console.error("PUT /api/home-content error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
