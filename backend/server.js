import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";

dotenv.config();
const app = express();

// ➤ Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ✅ Allows frontend access
app.use(express.json()); // ✅ Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // 🟡 Suggest adding this for form data (like FormData from frontend)

// ➤ Serve Uploaded Images
app.use("/uploads", express.static("uploads")); // ✅ Serves uploaded images via http://localhost:5000/uploads/filename.jpg

// ➤ Routes
app.use("/api/users", userRoutes); // ✅
app.use("/api/memories", memoryRoutes); // ✅

// ➤ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ➤ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
