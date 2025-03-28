import { Project, Service, HeroSlide } from "./types";
import { projects as initialProjects, services as initialServices, heroSlides as initialSlides } from "./data";

// Create mutable copies of the data
let projectsData = [...initialProjects];
let servicesData = [...initialServices];
let slidesData = [...initialSlides];

// Collection of real titles from i18n (to be populated when available)
const realTitles: Record<string, string> = {};

// Project operations
export const getProjects = (): Project[] => {
  return projectsData;
};

export const getProject = (id: string): Project | undefined => {
  return projectsData.find(project => project.id === id);
};

export const updateProject = (updatedProject: Project): Project => {
  const index = projectsData.findIndex(p => p.id === updatedProject.id);
  
  if (index !== -1) {
    // Update existing project
    projectsData[index] = updatedProject;
  } else {
    // Add new project
    projectsData.push(updatedProject);
  }
  
  return updatedProject;
};

export const deleteProject = (id: string): boolean => {
  const initialLength = projectsData.length;
  projectsData = projectsData.filter(p => p.id !== id);
  return projectsData.length < initialLength;
};

// Service operations
export const getServices = (): Service[] => {
  return servicesData;
};

export const getService = (id: string): Service | undefined => {
  return servicesData.find(service => service.id === id);
};

export const updateService = (updatedService: Service): Service => {
  const index = servicesData.findIndex(s => s.id === updatedService.id);
  
  if (index !== -1) {
    // Update existing service
    servicesData[index] = updatedService;
  } else {
    // Add new service
    servicesData.push(updatedService);
  }
  
  return updatedService;
};

export const deleteService = (id: string): boolean => {
  const initialLength = servicesData.length;
  servicesData = servicesData.filter(s => s.id !== id);
  return servicesData.length < initialLength;
};

// Hero slide operations
export const getSlides = (): HeroSlide[] => {
  return slidesData;
};

export const getSlide = (id: string): HeroSlide | undefined => {
  return slidesData.find(slide => slide.id === id);
};

export const updateSlide = (updatedSlide: HeroSlide): HeroSlide => {
  const index = slidesData.findIndex(s => s.id === updatedSlide.id);
  
  if (index !== -1) {
    // Update existing slide
    slidesData[index] = updatedSlide;
  } else {
    // Add new slide
    slidesData.push(updatedSlide);
  }
  
  return updatedSlide;
};

export const deleteSlide = (id: string): boolean => {
  const initialLength = slidesData.length;
  slidesData = slidesData.filter(s => s.id !== id);
  return slidesData.length < initialLength;
};

// Title mapping functions
export const setRealTitle = (key: string, value: string): void => {
  realTitles[key] = value;
};

export const getRealTitle = (key: string): string => {
  return realTitles[key] || key;
};