import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(postsRoutes);
app.use(userRoutes);

// Serve static files
app.use(express.static("uploads"));

// Connect to MongoDB and start the server
const start = async () => {
  try {
    // Use the environment variable for MongoDB URI
    await mongoose.connect("mongodb+srv://adityaambhore06:googler12345@clusterlinkedin.qf52m.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLinkedin");
    console.log("Connected to MongoDB");
  


    const PORT = process.env.PORT || 9090;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

start();
