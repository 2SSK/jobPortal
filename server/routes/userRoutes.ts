import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController";
import upload from "../config/multer";

const router = express.Router();

// Get User Data
router.get("/user", getUserData);

// Apply for a Job 
router.post("/apply", applyForJob); 

// Get Applied Jobs data
router.get("/applications", getUserJobApplications);

// Update user profile (resume) - Changed from GET to POST
router.post("/update-resume", upload.single("resume"), updateUserResume); 

export default router;
