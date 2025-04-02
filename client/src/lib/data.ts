import type { HeroSlide, Service, Project, Testimonial, AboutStat, ProjectCategory } from "./types";

export const heroSlides: HeroSlide[] = [
  {
    id: "slide1",
    title: "hero.slides.1.title",
    description: "hero.slides.1.description",
    image: "https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    id: "slide2",
    title: "hero.slides.2.title",
    description: "hero.slides.2.description",
    image: "https://images.unsplash.com/photo-1590644178409-870d0e775c1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    id: "slide3",
    title: "hero.slides.3.title",
    description: "hero.slides.3.description",
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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

export const projectCategories: ProjectCategory[] = ["construction", "infrastructure", "mining", "river-works"];

export const projects: Project[] = [
  // River Works Projects
  {
    id: "project1",
    title: "projects.items.1.title",
    description: "projects.items.1.description",
    image: "/images/Picture8.jpg",
    category: "river-works"
  },
  {
    id: "project2",
    title: "projects.items.2.title",
    description: "projects.items.2.description",
    image: "/images/Picture4.jpg",
    category: "river-works"
  },
  {
    id: "project3",
    title: "projects.items.3.title",
    description: "projects.items.3.description",
    image: "/images/Picture5.jpg",
    category: "river-works"
  },
  {
    id: "project4",
    title: "projects.items.4.title",
    description: "projects.items.4.description",
    image: "/images/Picture6.jpg",
    category: "river-works"
  },
  {
    id: "project5",
    title: "projects.items.5.title",
    description: "projects.items.5.description",
    image: "/images/Picture3.jpg",
    category: "river-works"
  },

  // Infrastructure Project
  {
    id: "project6",
    title: "projects.items.6.title",
    description: "projects.items.6.description",
    image: "/images/Picture1.jpg",
    category: "infrastructure"
  },

  // Construction Projects
  {
    id: "project7",
    title: "Commercial Building Development",
    description: "Construction of a modern commercial building in Tirana with advanced energy efficiency features",
    image: "https://cicconstruction.com/app/uploads/2023/05/the-top-important-differences-between-commercial-and-residential-construction-jpg.webp",
    category: "construction"
  },
  {
    id: "project8",
    title: "Residential Complex",
    description: "Development of a multi-unit residential complex with community amenities and green spaces",
    image: "https://www.americanalarm.com/wp-content/uploads/2022/06/Residential-Construction-Site.jpg",
    category: "construction"
  },

  // Mining Projects
  {
    id: "project9",
    title: "Stone Quarry Operation",
    description: "Responsible extraction and processing of high-quality stone for construction projects",
    image: "https://www.garriock.co.uk/site/assets/files/1082/garriock-sullom-3.358x0-is-hidpi.jpg",
    category: "mining"
  },
  {
    id: "project10",
    title: "Gravel Mining and Processing",
    description: "Extraction and processing of gravel for construction and infrastructure projects in Albania",
    image: "https://www.garriock.co.uk/site/assets/files/1082/garriock-sullom-1.358x0-is-hidpi.jpg",
    category: "mining"
  },

  // Additional Infrastructure Projects
  {
    id: "project11",
    title: "Road Construction Project",
    description: "Construction and rehabilitation of rural roads connecting communities in northern Albania",
    image: "https://sewellbeard.com/us-72-west-road-project/construction-site-is-laying-new-asphalt-road-pavementroad-construction-workers-and-road-construction-machinery-scene-highway-construction-site-landscape/",
    category: "infrastructure"
  },
  {
    id: "project12",
    title: "Bridge Reconstruction",
    description: "Strengthening and modernization of aging bridge infrastructure for improved safety and capacity",
    image: "https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/how-are-bridges-built-hero.webp",
    category: "infrastructure"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial1",
    name: "testimonials.items.1.name",
    position: "testimonials.items.1.position",
    text: "testimonials.items.1.text",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "testimonial2",
    name: "testimonials.items.2.name",
    position: "testimonials.items.2.position",
    text: "testimonials.items.2.text",
    image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 4.5
  },
  {
    id: "testimonial3",
    name: "testimonials.items.3.name",
    position: "testimonials.items.3.position",
    text: "testimonials.items.3.text",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

