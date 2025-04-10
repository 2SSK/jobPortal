import "./config/instrument";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks";
import companyRoutes from "./routes/companyRoutes";
import connectCloudinary from "./config/cloudinary";
import jobRoutes from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";

// Initialize Express
const app = express();

// Apply CORS with options
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API is working!\n");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);

// Sentry Initialization for error tracking
Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Connect to Cloudinary
    await connectCloudinary();

    // PORT
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
