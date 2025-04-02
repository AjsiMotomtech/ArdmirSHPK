import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./emails";
import { contactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import * as dataService from "./dataService";
import { v4 as uuidv4 } from 'uuid';

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
      
      if (error && typeof error === 'object' && 'name' in error && error.name === "ZodError") {
        const validationError = fromZodError(error as any);
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
  
  // ==== Messages API ====
  
  // Get all messages
  app.get("/api/messages", (req: Request, res: Response) => {
    try {
      const messages = dataService.getMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error getting messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get messages" 
      });
    }
  });
  
  // Create a new message
  app.post("/api/messages", (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Create the message
      const createdMessage = dataService.createMessage(validatedData);
      
      if (createdMessage) {
        // Also send email notification
        sendContactEmail(validatedData).catch(err => {
          console.error("Failed to send email notification:", err);
        });
        
        res.status(201).json(createdMessage);
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create message" 
        });
      }
    } catch (error) {
      console.error("Error creating message:", error);
      
      if (error && typeof error === 'object' && 'name' in error && error.name === "ZodError") {
        const validationError = fromZodError(error as any);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to create message" 
      });
    }
  });
  
  // Delete a message
  app.delete("/api/messages/:id", (req: Request, res: Response) => {
    try {
      const success = dataService.deleteMessage(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Message not found or delete failed" 
        });
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete message" 
      });
    }
  });

  // ==== Projects API ====
  
  // Get all projects
  app.get("/api/projects", (req: Request, res: Response) => {
    try {
      const projects = dataService.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error getting projects:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get projects" 
      });
    }
  });

  // Get a single project by ID
  app.get("/api/projects/:id", (req: Request, res: Response) => {
    try {
      const project = dataService.getProject(req.params.id);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }
    } catch (error) {
      console.error("Error getting project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get project" 
      });
    }
  });

  // Create a new project
  app.post("/api/projects", (req: Request, res: Response) => {
    try {
      const newProject = req.body;
      // Generate a unique ID if not provided
      if (!newProject.id) {
        newProject.id = `project-${uuidv4()}`;
      }
      
      const createdProject = dataService.createProject(newProject);
      if (createdProject) {
        res.status(201).json(createdProject);
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create project" 
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create project" 
      });
    }
  });

  // Update an existing project
  app.put("/api/projects/:id", (req: Request, res: Response) => {
    try {
      const updatedProject = req.body;
      // Ensure ID in body matches ID in URL
      updatedProject.id = req.params.id;
      
      const result = dataService.updateProject(updatedProject);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Project not found or update failed" 
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update project" 
      });
    }
  });

  // Delete a project
  app.delete("/api/projects/:id", (req: Request, res: Response) => {
    try {
      const success = dataService.deleteProject(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Project not found or delete failed" 
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete project" 
      });
    }
  });

  // ==== Services API ====
  
  // Get all services
  app.get("/api/services", (req: Request, res: Response) => {
    try {
      const services = dataService.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error getting services:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get services" 
      });
    }
  });

  // Get a single service by ID
  app.get("/api/services/:id", (req: Request, res: Response) => {
    try {
      const service = dataService.getService(req.params.id);
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Service not found" 
        });
      }
    } catch (error) {
      console.error("Error getting service:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get service" 
      });
    }
  });

  // Create a new service
  app.post("/api/services", (req: Request, res: Response) => {
    try {
      const newService = req.body;
      // Generate a unique ID if not provided
      if (!newService.id) {
        newService.id = `service-${uuidv4()}`;
      }
      
      const createdService = dataService.createService(newService);
      if (createdService) {
        res.status(201).json(createdService);
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create service" 
        });
      }
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create service" 
      });
    }
  });

  // Update an existing service
  app.put("/api/services/:id", (req: Request, res: Response) => {
    try {
      const updatedService = req.body;
      // Ensure ID in body matches ID in URL
      updatedService.id = req.params.id;
      
      const result = dataService.updateService(updatedService);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Service not found or update failed" 
        });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update service" 
      });
    }
  });

  // Delete a service
  app.delete("/api/services/:id", (req: Request, res: Response) => {
    try {
      const success = dataService.deleteService(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Service not found or delete failed" 
        });
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete service" 
      });
    }
  });

  // ==== Slides API ====
  
  // Get all slides
  app.get("/api/slides", (req: Request, res: Response) => {
    try {
      const slides = dataService.getSlides();
      res.json(slides);
    } catch (error) {
      console.error("Error getting slides:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get slides" 
      });
    }
  });

  // Get a single slide by ID
  app.get("/api/slides/:id", (req: Request, res: Response) => {
    try {
      const slide = dataService.getSlide(req.params.id);
      if (slide) {
        res.json(slide);
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Slide not found" 
        });
      }
    } catch (error) {
      console.error("Error getting slide:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get slide" 
      });
    }
  });

  // Create a new slide
  app.post("/api/slides", (req: Request, res: Response) => {
    try {
      const newSlide = req.body;
      // Generate a unique ID if not provided
      if (!newSlide.id) {
        newSlide.id = `slide-${uuidv4()}`;
      }
      
      const createdSlide = dataService.createSlide(newSlide);
      if (createdSlide) {
        res.status(201).json(createdSlide);
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create slide" 
        });
      }
    } catch (error) {
      console.error("Error creating slide:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create slide" 
      });
    }
  });

  // Update an existing slide
  app.put("/api/slides/:id", (req: Request, res: Response) => {
    try {
      const updatedSlide = req.body;
      // Ensure ID in body matches ID in URL
      updatedSlide.id = req.params.id;
      
      const result = dataService.updateSlide(updatedSlide);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Slide not found or update failed" 
        });
      }
    } catch (error) {
      console.error("Error updating slide:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update slide" 
      });
    }
  });

  // Delete a slide
  app.delete("/api/slides/:id", (req: Request, res: Response) => {
    try {
      const success = dataService.deleteSlide(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ 
          success: false, 
          message: "Slide not found or delete failed" 
        });
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete slide" 
      });
    }
  });

  // ==== Project Categories API ====
  
  // Get all project categories
  app.get("/api/project-categories", (req: Request, res: Response) => {
    try {
      const categories = dataService.getProjectCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error getting project categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get project categories" 
      });
    }
  });

  // Update project categories
  app.put("/api/project-categories", (req: Request, res: Response) => {
    try {
      const categories = req.body;
      const success = dataService.updateProjectCategories(categories);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to update project categories" 
        });
      }
    } catch (error) {
      console.error("Error updating project categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update project categories" 
      });
    }
  });

  // ==== About Stats API ====
  
  // Get all about stats
  app.get("/api/about-stats", (req: Request, res: Response) => {
    try {
      const stats = dataService.getAboutStats();
      res.json(stats);
    } catch (error) {
      console.error("Error getting about stats:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get about stats" 
      });
    }
  });

  // Update about stats
  app.put("/api/about-stats", (req: Request, res: Response) => {
    try {
      const stats = req.body;
      const success = dataService.updateAboutStats(stats);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to update about stats" 
        });
      }
    } catch (error) {
      console.error("Error updating about stats:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update about stats" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
