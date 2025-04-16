import express from "express";
import upload from "../config/multer.js"; // multer config
import Memory from "../models/Memory.js"; // Mongoose model

const router = express.Router();

// @route   POST /api/memories/upload
// @desc    Upload memory with images
// @access  Public
router.post("/upload", upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, location, country } = req.body;

    // Basic validation
    if (!title || !description || !location || !country) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const parsedLocation = JSON.parse(location);
    console.log("Received memory:", { title, description, parsedLocation, country });
    console.log("Uploaded files:", req.files);

    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newMemory = new Memory({
      title,
      description,
      location: parsedLocation,
      country,
      images
    });

    await newMemory.save();
    res.status(201).json({ message: "Memory created successfully!", memory: newMemory });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ message: "Error uploading memory", error: error.message });
  }
});

// @route   GET /api/memories
// @desc    Get all memories
// @access  Public
router.get("/", async (req, res) => {
  try {
    const memories = await Memory.find();
    res.status(200).json(memories);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch memories", error: error.message });
  }
});

export default router;
