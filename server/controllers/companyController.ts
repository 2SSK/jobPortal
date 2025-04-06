import { Request, Response } from "express";
import Company from "../models/Company";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateTokens";
import { CompanyRequest } from "../middlewares/authMiddleware";
import Job from "../models/job";

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
export const loginCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
    return;
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Compare Passwords
    const isPasswordMatch = await bcrypt.compare(password, company.password);

    if (isPasswordMatch) {
      res.status(200).json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get company login
export const getCompanyData = async (req: CompanyRequest, res: Response) => {
  try {
    const company = req.company;
    if (!company) {
      res.status(401).json({
        success: false,
        message: "Company not authenticated",
      });
      return;
    }
    res.status(200).json({ success: true, company });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Post a new job
export const postJob = async (req: CompanyRequest, res: Response) => {
  const { title, description, category, location, salary, level } = req.body;

  if (!title || !description || !category || !location || !salary || !level) {
    res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: title, description, category, location, salary, level",
    });
    return;
  }

  const companyId = req.company?._id;
  if (!companyId) {
    res.status(401).json({
      success: false,
      message: "Company not authenticated",
    });
    return;
  }
  try {
    const newJob = await Job.create({
      title,
      description,
      category,
      location,
      salary: Number(salary),
      date: Date.now(),
      level,
      companyId,
    });
    await newJob.save();
    res.status(201).json({ success: true, newJob });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req: Request, res: Response) => {
  // Placeholder implementation
  res.status(501).json({ message: "Not implemented yet" });
};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (
  req: CompanyRequest,
  res: Response
) => {
  try {
    const companyId = req.company?._id;

    const jobs = await Job.find({ companyId });

    // TODO: Add No. of applicants info in data

    res.status(200).json({ success: true, jobsData: jobs });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
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
export const changeVisibility = async (req: CompanyRequest, res: Response) => {
  try {
    const { id } = req.body;
    const companyId = req.company?._id;

    const job = await Job.findById(id);

    // Check if job exists
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    // Check if the companyId matches the job's companyId
    if (companyId?.toString() === job?.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job?.save();
    res.status(200).json({ success: true, job });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
