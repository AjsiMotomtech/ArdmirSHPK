import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, insertMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission API
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);

      // Store the message in our database
      await storage.createMessage(validatedData);

      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      
      if (error?.name === "ZodError") {
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

  // API to get all messages (for admin panel)
  app.get("/api/messages", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getAllMessages();
      return res.status(200).json({ success: true, messages });
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  // API to mark a message as read
  app.patch("/api/messages/:id/read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid message ID" 
        });
      }

      const updatedMessage = await storage.markMessageAsRead(id);
      if (!updatedMessage) {
        return res.status(404).json({ 
          success: false, 
          message: "Message not found" 
        });
      }

      return res.status(200).json({ 
        success: true, 
        message: updatedMessage 
      });
    } catch (error: any) {
      console.error("Error marking message as read:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update message" 
      });
    }
  });

  // API to delete a message
  app.delete("/api/messages/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid message ID" 
        });
      }

      const success = await storage.deleteMessage(id);
      if (!success) {
        return res.status(404).json({ 
          success: false, 
          message: "Message not found" 
        });
      }

      return res.status(200).json({ 
        success: true, 
        message: "Message deleted successfully" 
      });
    } catch (error: any) {
      console.error("Error deleting message:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to delete message" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
