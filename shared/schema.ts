import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table schema (keeping original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Define project categories
export const projectCategoryEnum = z.enum([
  "construction", 
  "infrastructure", 
  "mining", 
  "river-works"
]);

export type ProjectCategory = z.infer<typeof projectCategoryEnum>;

// Define Hero Slide schema
export const heroSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
});

export type HeroSlide = z.infer<typeof heroSlideSchema>;

// Define Service schema
export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Service = z.infer<typeof serviceSchema>;

// Define Project schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  category: projectCategoryEnum,
});

export type Project = z.infer<typeof projectSchema>;

// Define Testimonial schema
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  text: z.string(),
  image: z.string().url(),
  rating: z.number().min(1).max(5),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// Define About Stat schema
export const aboutStatSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type AboutStat = z.infer<typeof aboutStatSchema>;
