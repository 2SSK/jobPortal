import { Request, Response } from "express";
import User from "../models/User";
import { ExpressRequestWithAuth } from "@clerk/express";
import JobApplication from "../models/jobApplication";
import Job from "../models/job";

// Get User  data
export const getUserData = async (req: Request, res: Response) => {
  const userId = (req as ExpressRequestWithAuth).auth?.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const applyForJob = async (req: Request, res: Response) => {
  const { jobId } = req.body;
  const userId = (req as ExpressRequestWithAuth).auth?.userId;
  try {
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

    if (isAlreadyApplied) {
      res.status(400).json({ success: false, message: "Already applied" });
      return;
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.status(200).json({ success: true, message: "Applied successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get user applied applications
export const getUserJobApplications = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Update user profile (resume)
export const updateUserResume = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};
