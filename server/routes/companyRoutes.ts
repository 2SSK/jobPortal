import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController";
import upload from "../config/multer";
import { protectCompany } from "../middlewares/authMiddleware";

const router = express.Router();

// Reginster a Company
router.post("/register", upload.single("image"), registerCompany);

// Company Kogin
router.post("/login", loginCompany);

// Get Company Data
router.get("/company", protectCompany, getCompanyData);

// Post a Job
router.post("/post-job", protectCompany, postJob);

// Get Applicants Data of Company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// Get Company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// Change Application Status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

// Change Applications Visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
