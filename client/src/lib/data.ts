import type { HeroSlide, Service, Project, Testimonial, AboutStat, ProjectCategory } from "./types";

export const heroSlides: HeroSlide[] = [
  {
    id: "slide1",
    title: "hero.slides.1.title",
    description: "hero.slides.1.description",
    image: "/images/hero/hero1.svg"
  },
  {
    id: "slide2",
    title: "hero.slides.2.title",
    description: "hero.slides.2.description",
    image: "/images/hero/hero2.svg"
  },
  {
    id: "slide3",
    title: "hero.slides.3.title",
    description: "hero.slides.3.description",
    image: "/images/hero/hero3.svg"
  }
];

export const aboutStats: AboutStat[] = [
  { value: "33+", label: "about.stats.years" },
  { value: "100+", label: "about.stats.projects" },
  { value: "30+", label: "about.stats.professionals" },
  { value: "10+", label: "about.stats.partners" }
];

export const services: Service[] = [
  {
    id: "service1",
    title: "services.items.import.title",
    description: "services.items.import.description",
    icon: "/images/services/import_export.svg"
  },
  {
    id: "service2",
    title: "services.items.construction.title",
    description: "services.items.construction.description",
    icon: "/images/services/construction_service.svg"
  },
  {
    id: "service3",
    title: "services.items.mining.title",
    description: "services.items.mining.description",
    icon: "/images/services/mining_service.svg"
  },
  {
    id: "service4",
    title: "services.items.machinery.title",
    description: "services.items.machinery.description",
    icon: "/images/services/machinery_service.svg"
  },
  {
    id: "service5",
    title: "services.items.river.title",
    description: "services.items.river.description",
    icon: "/images/services/river_service.svg"
  },
  {
    id: "service6",
    title: "services.items.industrial.title",
    description: "services.items.industrial.description",
    icon: "/images/services/industrial_service.svg"
  },
  {
    id: "service7",
    title: "services.items.transport.title",
    description: "services.items.transport.description",
    icon: "/images/services/transport_service.svg"
  },
  {
    id: "service8",
    title: "services.items.additional.title",
    description: "services.items.additional.description",
    icon: "/images/services/additional_service1.svg"
  }
];

export const projectCategories: ProjectCategory[] = ["construction", "infrastructure", "mining", "river-works"];

export const projects: Project[] = [
  {
    id: "project1",
    title: "projects.items.1.title",
    description: "projects.items.1.description",
    image: "/images/projects/river-works1.svg",
    category: "river-works"
  },
  {
    id: "project2",
    title: "projects.items.2.title",
    description: "projects.items.2.description",
    image: "/images/projects/river-works2.svg",
    category: "river-works"
  },
  {
    id: "project3",
    title: "projects.items.3.title",
    description: "projects.items.3.description",
    image: "/images/projects/river-works3.svg",
    category: "river-works"
  },
  {
    id: "project4",
    title: "projects.items.4.title",
    description: "projects.items.4.description",
    image: "/images/projects/construction1.svg",
    category: "construction"
  },
  {
    id: "project5",
    title: "projects.items.5.title",
    description: "projects.items.5.description",
    image: "/images/projects/construction2.svg",
    category: "construction"
  },
  {
    id: "project6",
    title: "projects.items.6.title",
    description: "projects.items.6.description",
    image: "/images/projects/infrastructure1.svg",
    category: "infrastructure"
  },
  {
    id: "project7",
    title: "projects.items.7.title",
    description: "projects.items.7.description",
    image: "/images/projects/infrastructure2.svg",
    category: "infrastructure"
  },
  {
    id: "project8",
    title: "projects.items.8.title",
    description: "projects.items.8.description",
    image: "/images/projects/mining1.svg",
    category: "mining"
  },
  {
    id: "project9",
    title: "projects.items.9.title",
    description: "projects.items.9.description",
    image: "/images/projects/mining2.svg",
    category: "mining"
  },
  {
    id: "project10",
    title: "projects.items.10.title",
    description: "projects.items.10.description",
    image: "/images/projects/infrastructure3.svg",
    category: "infrastructure"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial1",
    name: "testimonials.items.1.name",
    position: "testimonials.items.1.position",
    text: "testimonials.items.1.text",
    image: "/images/logo/company_logo.svg",
    rating: 5
  },
  {
    id: "testimonial2",
    name: "testimonials.items.2.name",
    position: "testimonials.items.2.position",
    text: "testimonials.items.2.text",
    image: "/images/logo/logo_alt.svg",
    rating: 4.5
  },
  {
    id: "testimonial3",
    name: "testimonials.items.3.name",
    position: "testimonials.items.3.position",
    text: "testimonials.items.3.text",
    image: "/images/logo/logo_square.svg",
    rating: 5
  }
];

