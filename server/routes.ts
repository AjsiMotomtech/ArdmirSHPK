import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./emails";
import { contactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission API
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);

      // Send email notification
      await sendContactEmail(validatedData);

      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact form. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
