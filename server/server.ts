import "./config/instrument";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db";
import "./config/instrument";
import * as Sentry from "@sentry/node";

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is working!\n");
});

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // PORT
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
