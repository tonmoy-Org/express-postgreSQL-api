const express = require("express");
const cors = require("cors");
require("dotenv").config();
const postRoutes = require("./app/routes/post.routes");
const errorHandler = require("./app/middlewares/errorHandler");

const app = express();

// Enable CORS for all origins (customize if needed)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount post routes at /api/posts
app.use("/api/posts", postRoutes);

// Simple root route for health check
app.get("/", (req, res) => res.send("Express + PostgreSQL API is running"));

// Use error handler middleware (if implemented)
app.use(errorHandler);

module.exports = app;
