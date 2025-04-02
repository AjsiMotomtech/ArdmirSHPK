import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Project, Service, HeroSlide, Testimonial, ProjectCategory } from '@shared/schema';

// Get the directory path for the current module in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the data file
const dataFilePath = path.join(__dirname, 'data.json');

// Read data from the file
function readDataFile() {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading data file:', error);
    return null;
  }
}

// Write data to the file
function writeDataFile(data: any) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
}

// Projects API
export function getProjects(): Project[] {
  const data = readDataFile();
  return data?.projects || [];
}

export function getProject(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(project => project.id === id);
}

export function createProject(newProject: Project): Project | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Add the new project to the projects array
  data.projects.push(newProject);
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return newProject;
  }
  
  return null;
}

export function updateProject(updatedProject: Project): Project | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Find the index of the project to update
  const projectIndex = data.projects.findIndex((p: Project) => p.id === updatedProject.id);
  
  if (projectIndex === -1) return null;
  
  // Update the project
  data.projects[projectIndex] = updatedProject;
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return updatedProject;
  }
  
  return null;
}

export function deleteProject(id: string): boolean {
  const data = readDataFile();
  if (!data) return false;
  
  // Filter out the project to delete
  data.projects = data.projects.filter((p: Project) => p.id !== id);
  
  // Write updated data back to the file
  return writeDataFile(data);
}

// Services API
export function getServices(): Service[] {
  const data = readDataFile();
  return data?.services || [];
}

export function getService(id: string): Service | undefined {
  const services = getServices();
  return services.find(service => service.id === id);
}

export function createService(newService: Service): Service | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Add the new service to the services array
  data.services.push(newService);
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return newService;
  }
  
  return null;
}

export function updateService(updatedService: Service): Service | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Find the index of the service to update
  const serviceIndex = data.services.findIndex((s: Service) => s.id === updatedService.id);
  
  if (serviceIndex === -1) return null;
  
  // Update the service
  data.services[serviceIndex] = updatedService;
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return updatedService;
  }
  
  return null;
}

export function deleteService(id: string): boolean {
  const data = readDataFile();
  if (!data) return false;
  
  // Filter out the service to delete
  data.services = data.services.filter((s: Service) => s.id !== id);
  
  // Write updated data back to the file
  return writeDataFile(data);
}

// Hero Slides API
export function getSlides(): HeroSlide[] {
  const data = readDataFile();
  return data?.heroSlides || [];
}

export function getSlide(id: string): HeroSlide | undefined {
  const slides = getSlides();
  return slides.find(slide => slide.id === id);
}

export function createSlide(newSlide: HeroSlide): HeroSlide | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Add the new slide to the heroSlides array
  data.heroSlides.push(newSlide);
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return newSlide;
  }
  
  return null;
}

export function updateSlide(updatedSlide: HeroSlide): HeroSlide | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Find the index of the slide to update
  const slideIndex = data.heroSlides.findIndex((s: HeroSlide) => s.id === updatedSlide.id);
  
  if (slideIndex === -1) return null;
  
  // Update the slide
  data.heroSlides[slideIndex] = updatedSlide;
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return updatedSlide;
  }
  
  return null;
}

export function deleteSlide(id: string): boolean {
  const data = readDataFile();
  if (!data) return false;
  
  // Filter out the slide to delete
  data.heroSlides = data.heroSlides.filter((s: HeroSlide) => s.id !== id);
  
  // Write updated data back to the file
  return writeDataFile(data);
}

// Testimonials API
export function getTestimonials(): Testimonial[] {
  const data = readDataFile();
  return data?.testimonials || [];
}

export function getTestimonial(id: string): Testimonial | undefined {
  const testimonials = getTestimonials();
  return testimonials.find(testimonial => testimonial.id === id);
}

export function createTestimonial(newTestimonial: Testimonial): Testimonial | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Add the new testimonial to the testimonials array
  data.testimonials.push(newTestimonial);
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return newTestimonial;
  }
  
  return null;
}

export function updateTestimonial(updatedTestimonial: Testimonial): Testimonial | null {
  const data = readDataFile();
  if (!data) return null;
  
  // Find the index of the testimonial to update
  const testimonialIndex = data.testimonials.findIndex((t: Testimonial) => t.id === updatedTestimonial.id);
  
  if (testimonialIndex === -1) return null;
  
  // Update the testimonial
  data.testimonials[testimonialIndex] = updatedTestimonial;
  
  // Write updated data back to the file
  if (writeDataFile(data)) {
    return updatedTestimonial;
  }
  
  return null;
}

export function deleteTestimonial(id: string): boolean {
  const data = readDataFile();
  if (!data) return false;
  
  // Filter out the testimonial to delete
  data.testimonials = data.testimonials.filter((t: Testimonial) => t.id !== id);
  
  // Write updated data back to the file
  return writeDataFile(data);
}

// Project Categories API
export function getProjectCategories(): ProjectCategory[] {
  const data = readDataFile();
  return data?.projectCategories || [];
}

export function updateProjectCategories(categories: ProjectCategory[]): boolean {
  const data = readDataFile();
  if (!data) return false;
  
  // Update the categories
  data.projectCategories = categories;
  
  // Write updated data back to the file
  return writeDataFile(data);
}

// About Stats API
export function getAboutStats() {
  const data = readDataFile();
  return data?.aboutStats || [];
}

export function updateAboutStats(stats: any[]): boolean {
  const data = readDataFile();
  if (!data) return false;
  
  // Update the stats
  data.aboutStats = stats;
  
  // Write updated data back to the file
  return writeDataFile(data);
}