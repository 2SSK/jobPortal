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
router.get("/apply", applyForJob);

// Get Applied Jobs data
router.get("/applications", getUserJobApplications);

// Update uesr profile (resume)
router.get("/update-resume", upload.single("resume"), updateUserResume);

export default router;
