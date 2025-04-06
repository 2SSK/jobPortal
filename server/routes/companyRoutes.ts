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

const router = express.Router();

// Reginster a Company
router.post("/register", upload.single("image"), registerCompany);

// Company Kogin
router.post("/login", loginCompany);

// Get Company Data
router.get("/company", getCompanyData);

// Post a Job
router.post("/post-job", postJob);

// Get Applicants Data of Company
router.get("/applicants", getCompanyJobApplicants);

// Get Company Job List
router.get("/list-jobs", getCompanyPostedJobs);

// Change Application Status
router.post("/change-status", changeJobApplicationStatus);

// Change Applications Visibility
router.post("/change-visibility", changeVisibility);

export default router;
