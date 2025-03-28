import type { HeroSlide, Service, Project, Testimonial, AboutStat, ProjectCategory } from "./types";

export const heroSlides: HeroSlide[] = [
  {
    id: "slide1",
    title: "hero.slides.1.title",
    description: "hero.slides.1.description",
    image: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    id: "slide2",
    title: "hero.slides.2.title",
    description: "hero.slides.2.description",
    image: "https://images.unsplash.com/photo-1613685703305-806cc0aae1e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    id: "slide3",
    title: "hero.slides.3.title",
    description: "hero.slides.3.description",
    image: "https://images.unsplash.com/photo-1574861198799-894a9e7c3280?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  }
];

export const aboutStats: AboutStat[] = [
  { value: "15+", label: "about.stats.years" },
  { value: "150+", label: "about.stats.projects" },
  { value: "50+", label: "about.stats.professionals" },
  { value: "12+", label: "about.stats.partners" }
];

export const services: Service[] = [
  {
    id: "service1",
    title: "services.items.import.title",
    description: "services.items.import.description",
    icon: "fas fa-ship"
  },
  {
    id: "service2",
    title: "services.items.construction.title",
    description: "services.items.construction.description",
    icon: "fas fa-hard-hat"
  },
  {
    id: "service3",
    title: "services.items.mining.title",
    description: "services.items.mining.description",
    icon: "fas fa-mountain"
  },
  {
    id: "service4",
    title: "services.items.machinery.title",
    description: "services.items.machinery.description",
    icon: "fas fa-truck-monster"
  },
  {
    id: "service5",
    title: "services.items.additional.title",
    description: "services.items.additional.description",
    icon: "fas fa-tree"
  },
  {
    id: "service6",
    title: "services.items.agriculture.title",
    description: "services.items.agriculture.description",
    icon: "fas fa-seedling"
  }
];

export const projectCategories: ProjectCategory[] = ["construction", "infrastructure", "mining", "industrial"];

export const projects: Project[] = [
  {
    id: "project1",
    title: "projects.items.1.title",
    description: "projects.items.1.description",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "construction"
  },
  {
    id: "project2",
    title: "projects.items.2.title",
    description: "projects.items.2.description",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "infrastructure"
  },
  {
    id: "project3",
    title: "projects.items.3.title",
    description: "projects.items.3.description",
    image: "https://images.unsplash.com/photo-1518873247959-c0989882d335?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "mining"
  },
  {
    id: "project4",
    title: "projects.items.4.title",
    description: "projects.items.4.description",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "industrial"
  },
  {
    id: "project5",
    title: "projects.items.5.title",
    description: "projects.items.5.description",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "construction"
  },
  {
    id: "project6",
    title: "projects.items.6.title",
    description: "projects.items.6.description",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "infrastructure"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial1",
    name: "testimonials.items.1.name",
    position: "testimonials.items.1.position",
    text: "testimonials.items.1.text",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: "testimonial2",
    name: "testimonials.items.2.name",
    position: "testimonials.items.2.position",
    text: "testimonials.items.2.text",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: "testimonial3",
    name: "testimonials.items.3.name",
    position: "testimonials.items.3.position",
    text: "testimonials.items.3.text",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4.5
  }
];
