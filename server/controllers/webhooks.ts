import { Request, Response } from "express";
import { Webhook } from "svix";
import User from "../models/User";

// API Controller function to Manage Clerk User with database
export const clerkWebhooks = async (req: Request, res: Response) => {
  try {
    // Create a svix instance with clerk webhook secret.
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }
    const whook = new Webhook(webhookSecret);

    // Veryifying Headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    });

    // Getting Data from request body
    const { data, type } = req.body;

    // Switch case for different Events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : String(error));
    res.status(400).json({ success: false, message: "Webhooks Error" });
  }
};
