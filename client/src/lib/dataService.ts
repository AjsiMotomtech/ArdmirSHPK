import { Project, Service, HeroSlide, ProjectCategory, AboutStat, Testimonial } from "./types";
import { apiRequest } from "./queryClient";
import { projects as fallbackProjects, services as fallbackServices, heroSlides as fallbackSlides } from "./data";

// Collection of real titles from i18n (to be populated when available)
const realTitles: Record<string, string> = {};

// Project operations
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      console.error('Projects data is not an array:', data);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProject = async (id: string): Promise<Project | undefined> => {
  try {
    const response = await apiRequest<Project>(`/api/projects/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return fallbackProjects.find(p => p.id === id);
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    const response = await apiRequest<Project>('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    return response;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (updatedProject: Project): Promise<Project | null> => {
  try {
    const response = await apiRequest<Project>(`/api/projects/${updatedProject.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject)
    });
    return response;
  } catch (error) {
    console.error(`Error updating project ${updatedProject.id}:`, error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    await apiRequest(`/api/projects/${id}`, { method: 'DELETE' });
    return true;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    return false;
  }
};

// Service operations
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await apiRequest<Service[]>('/api/services');
    return response || fallbackServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    return fallbackServices;
  }
};

export const getService = async (id: string): Promise<Service | undefined> => {
  try {
    const response = await apiRequest<Service>(`/api/services/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error);
    return fallbackServices.find(s => s.id === id);
  }
};

export const createService = async (service: Omit<Service, 'id'>): Promise<Service | null> => {
  try {
    const response = await apiRequest<Service>('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service)
    });
    return response;
  } catch (error) {
    console.error('Error creating service:', error);
    return null;
  }
};

export const updateService = async (updatedService: Service): Promise<Service | null> => {
  try {
    const response = await apiRequest<Service>(`/api/services/${updatedService.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedService)
    });
    return response;
  } catch (error) {
    console.error(`Error updating service ${updatedService.id}:`, error);
    return null;
  }
};

export const deleteService = async (id: string): Promise<boolean> => {
  try {
    await apiRequest(`/api/services/${id}`, { method: 'DELETE' });
    return true;
  } catch (error) {
    console.error(`Error deleting service ${id}:`, error);
    return false;
  }
};

// Hero slide operations
export const getSlides = async (): Promise<HeroSlide[]> => {
  try {
    const response = await apiRequest<HeroSlide[]>('/api/slides');
    return response || fallbackSlides;
  } catch (error) {
    console.error('Error fetching slides:', error);
    return fallbackSlides;
  }
};

export const getSlide = async (id: string): Promise<HeroSlide | undefined> => {
  try {
    const response = await apiRequest<HeroSlide>(`/api/slides/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching slide ${id}:`, error);
    return fallbackSlides.find(s => s.id === id);
  }
};

export const createSlide = async (slide: Omit<HeroSlide, 'id'>): Promise<HeroSlide | null> => {
  try {
    const response = await apiRequest<HeroSlide>('/api/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide)
    });
    return response;
  } catch (error) {
    console.error('Error creating slide:', error);
    return null;
  }
};

export const updateSlide = async (updatedSlide: HeroSlide): Promise<HeroSlide | null> => {
  try {
    const response = await apiRequest<HeroSlide>(`/api/slides/${updatedSlide.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSlide)
    });
    return response;
  } catch (error) {
    console.error(`Error updating slide ${updatedSlide.id}:`, error);
    return null;
  }
};

export const deleteSlide = async (id: string): Promise<boolean> => {
  try {
    await apiRequest(`/api/slides/${id}`, { method: 'DELETE' });
    return true;
  } catch (error) {
    console.error(`Error deleting slide ${id}:`, error);
    return false;
  }
};

// Project categories operations
export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
  try {
    const response = await apiRequest<ProjectCategory[]>('/api/project-categories');
    return response;
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return ["construction", "infrastructure", "mining", "river-works"];
  }
};

export const updateProjectCategories = async (categories: ProjectCategory[]): Promise<boolean> => {
  try {
    await apiRequest('/api/project-categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories)
    });
    return true;
  } catch (error) {
    console.error('Error updating project categories:', error);
    return false;
  }
};

// About stats operations
export const getAboutStats = async (): Promise<AboutStat[]> => {
  try {
    const response = await apiRequest<AboutStat[]>('/api/about-stats');
    return response;
  } catch (error) {
    console.error('Error fetching about stats:', error);
    return [];
  }
};

export const updateAboutStats = async (stats: AboutStat[]): Promise<boolean> => {
  try {
    await apiRequest('/api/about-stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats)
    });
    return true;
  } catch (error) {
    console.error('Error updating about stats:', error);
    return false;
  }
};

// Title mapping functions
export const setRealTitle = (key: string, value: string): void => {
  realTitles[key] = value;
};

export const getRealTitle = (key: string): string => {
  return realTitles[key] || key;
};