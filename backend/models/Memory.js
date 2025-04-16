import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  country: { type: String, required: true }, // Added country field
  images: [{ type: String }], // Stores image URLs
  createdAt: { type: Date, default: Date.now }
});

const Memory = mongoose.model("Memory", MemorySchema);

export default Memory;
