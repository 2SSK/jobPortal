import { Request, Response } from "express";

// Register a new company
export const registerCompany = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;
};

// Company login
export const loginCompany = async (req: Request, res: Response) => {};

// Get company login
export const getCompanyData = async (req: Request, res: Response) => {};

// Post a new job
export const postJob = async (req: Request, res: Response) => {};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (
  req: Request,
  res: Response
) => {};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req: Request, res: Response) => {};

// Change Job Application Status
export const changeJobApplicationStatus = async (
  req: Request,
  res: Response
) => {};

// Change Job Visibility
export const changeVisibility = async (req: Request, res: Response) => {};
