import { Request, Response } from "express";
import User from "../models/User";

export interface ClerkRequest extends Request {
  auth: {
    userId: string;
    sessionId: string;
    getToken: () => Promise<string | null>;
  };
}

// Get User  data
export const getUserData = async (req: Request, res: Response) => {
  const userId = req.auth?.userId;

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
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
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
