export type ProjectCategory = "construction" | "infrastructure" | "mining" | "river-works";

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  text: string;
  image: string;
  rating: number;
}


export interface AboutStat {
  value: string;
  label: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
