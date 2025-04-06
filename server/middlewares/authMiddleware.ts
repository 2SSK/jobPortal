import jwt from "jsonwebtoken";
import Company from "../models/Company";
import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

interface ICompany extends Document {
  _id: string;
  name: string;
  email: string;
  image: string;
  password: string;
}

export interface CompanyRequest extends Request {
  company?: ICompany;
}

export const protectCompany = async (
  req: CompanyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, Login Again",
    });
    return;
  }

  try {
    const tokenString = Array.isArray(token) ? token[0] : token;
    const decoded = jwt.verify(
      tokenString,
      process.env.JWT_SECRET as string
    ) as { id: string };
    req.company = await Company.findById(decoded.id).select("-password");

    next();
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
