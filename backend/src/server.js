import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"; // Correct: Use this import for cors
import path from "path";

// Remove: const cors = require('cors'); // This line is redundant and mixes module syntaxes

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

const allowedOrigins = [
  'http://localhost:5173',
  'https://streamify-2mnr.vercel.app'
];

// Middleware
// This should be the first express.json() call
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser()); // To parse cookies

// CORS configuration - placed before your routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server and connect to DB
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});