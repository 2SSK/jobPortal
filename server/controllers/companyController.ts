import { Request, Response } from "express";
import Company from "../models/Company";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateTokens";

// Register a new company
export const registerCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    res.status(400).json({ success: false, message: "Missing Details" });
    return;
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      res.status(409).json({
        success: false,
        message: "Company already registered",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Company login
export const loginCompany = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Get company login
export const getCompanyData = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Post a new job
export const postJob = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Change Job Application Status
export const changeJobApplicationStatus = async (
  req: Request,
  res: Response
) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Change Job Visibility
export const changeVisibility = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};
