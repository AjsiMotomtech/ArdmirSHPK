import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { projects, services, testimonials, heroSlides } from "@/lib/data";
import { Project, Service, Testimonial, HeroSlide, ProjectCategory } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({});
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({});
  const [slideForm, setSlideForm] = useState<Partial<HeroSlide>>({});

  // Handle selecting an item for editing
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setProjectForm({ ...project });
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setServiceForm({ ...service });
  };

  const handleSelectTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setTestimonialForm({ ...testimonial });
  };

  const handleSelectSlide = (slide: HeroSlide) => {
    setSelectedSlide(slide);
    setSlideForm({ ...slide });
  };

  // Handle form input changes
  const handleProjectChange = (field: string, value: string) => {
    setProjectForm({ ...projectForm, [field]: value });
  };

  const handleServiceChange = (field: string, value: string) => {
    setServiceForm({ ...serviceForm, [field]: value });
  };

  const handleTestimonialChange = (field: string, value: string | number) => {
    setTestimonialForm({ ...testimonialForm, [field]: value });
  };

  const handleSlideChange = (field: string, value: string) => {
    setSlideForm({ ...slideForm, [field]: value });
  };

  // Mock save functions (would connect to backend in real implementation)
  const saveProject = () => {
    if (!projectForm.title || !projectForm.description || !projectForm.image || !projectForm.category) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would send data to the server
    toast({
      title: "Project saved",
      description: "The project has been saved successfully",
    });
    
    // Reset selection
    setSelectedProject(null);
    setProjectForm({});
  };

  const saveService = () => {
    if (!serviceForm.title || !serviceForm.description || !serviceForm.icon) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Service saved",
      description: "The service has been saved successfully",
    });
    
    setSelectedService(null);
    setServiceForm({});
  };

  const saveTestimonial = () => {
    if (!testimonialForm.name || !testimonialForm.position || !testimonialForm.text || !testimonialForm.image) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Testimonial saved",
      description: "The testimonial has been saved successfully",
    });
    
    setSelectedTestimonial(null);
    setTestimonialForm({});
  };

  const saveSlide = () => {
    if (!slideForm.title || !slideForm.description || !slideForm.image) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Slide saved",
      description: "The slide has been saved successfully",
    });
    
    setSelectedSlide(null);
    setSlideForm({});
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="mb-8">
        <CardHeader className="bg-[#1a365d] text-white">
          <CardTitle className="text-2xl font-bold">Ardmir Shpk Admin Panel</CardTitle>
          <CardDescription className="text-gray-200">Manage website content</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="projects">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="hero">Hero Slides</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Select Project to Edit</h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {projects.map((project) => (
                      <div 
                        key={project.id}
                        className={`p-3 rounded-lg cursor-pointer ${selectedProject?.id === project.id ? 'bg-[#1a365d] text-white' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => handleSelectProject(project)}
                      >
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm truncate">{project.category}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#e67e22] hover:bg-[#d35400]"
                    onClick={() => {
                      setSelectedProject(null);
                      setProjectForm({
                        id: `project${projects.length + 1}`,
                        title: "",
                        description: "",
                        image: "",
                        category: "construction"
                      });
                    }}
                  >
                    Add New Project
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedProject ? `Edit Project: ${selectedProject.title}` : 'Create New Project'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Title</Label>
                      <Input 
                        id="project-title"
                        value={projectForm.title || ""}
                        onChange={(e) => handleProjectChange("title", e.target.value)}
                        placeholder="Project title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea 
                        id="project-description"
                        value={projectForm.description || ""}
                        onChange={(e) => handleProjectChange("description", e.target.value)}
                        placeholder="Project description"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="project-image">Image URL</Label>
                      <Input 
                        id="project-image"
                        value={projectForm.image || ""}
                        onChange={(e) => handleProjectChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="project-category">Category</Label>
                      <Select 
                        value={projectForm.category as string || "construction"}
                        onValueChange={(value) => handleProjectChange("category", value)}
                      >
                        <SelectTrigger id="project-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="mining">Mining</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4 flex space-x-4">
                      <Button 
                        className="bg-[#e67e22] hover:bg-[#d35400]"
                        onClick={saveProject}
                      >
                        Save Project
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedProject(null);
                          setProjectForm({});
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Select Service to Edit</h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {services.map((service) => (
                      <div 
                        key={service.id}
                        className={`p-3 rounded-lg cursor-pointer ${selectedService?.id === service.id ? 'bg-[#1a365d] text-white' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => handleSelectService(service)}
                      >
                        <h4 className="font-medium">{service.title}</h4>
                        <p className="text-sm truncate">{service.icon}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#e67e22] hover:bg-[#d35400]"
                    onClick={() => {
                      setSelectedService(null);
                      setServiceForm({
                        id: `service${services.length + 1}`,
                        title: "",
                        description: "",
                        icon: ""
                      });
                    }}
                  >
                    Add New Service
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedService ? `Edit Service: ${selectedService.title}` : 'Create New Service'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="service-title">Title</Label>
                      <Input 
                        id="service-title"
                        value={serviceForm.title || ""}
                        onChange={(e) => handleServiceChange("title", e.target.value)}
                        placeholder="Service title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service-description">Description</Label>
                      <Textarea 
                        id="service-description"
                        value={serviceForm.description || ""}
                        onChange={(e) => handleServiceChange("description", e.target.value)}
                        placeholder="Service description"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service-icon">Icon Class</Label>
                      <Input 
                        id="service-icon"
                        value={serviceForm.icon || ""}
                        onChange={(e) => handleServiceChange("icon", e.target.value)}
                        placeholder="fas fa-building"
                      />
                      <p className="text-sm text-gray-500 mt-1">Use FontAwesome classes (e.g., fas fa-building)</p>
                    </div>
                    
                    <div className="pt-4 flex space-x-4">
                      <Button 
                        className="bg-[#e67e22] hover:bg-[#d35400]"
                        onClick={saveService}
                      >
                        Save Service
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedService(null);
                          setServiceForm({});
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Select Testimonial to Edit</h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {testimonials.map((testimonial: Testimonial) => (
                      <div 
                        key={testimonial.id}
                        className={`p-3 rounded-lg cursor-pointer ${selectedTestimonial?.id === testimonial.id ? 'bg-[#1a365d] text-white' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => handleSelectTestimonial(testimonial)}
                      >
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm truncate">{testimonial.position}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#e67e22] hover:bg-[#d35400]"
                    onClick={() => {
                      setSelectedTestimonial(null);
                      setTestimonialForm({
                        id: `testimonial${testimonials.length + 1}`,
                        name: "",
                        position: "",
                        text: "",
                        image: "",
                        rating: 5
                      });
                    }}
                  >
                    Add New Testimonial
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedTestimonial ? `Edit Testimonial: ${selectedTestimonial.name}` : 'Create New Testimonial'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="testimonial-name">Client Name</Label>
                      <Input 
                        id="testimonial-name"
                        value={testimonialForm.name || ""}
                        onChange={(e) => handleTestimonialChange("name", e.target.value)}
                        placeholder="Client name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="testimonial-position">Position</Label>
                      <Input 
                        id="testimonial-position"
                        value={testimonialForm.position || ""}
                        onChange={(e) => handleTestimonialChange("position", e.target.value)}
                        placeholder="Client position"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="testimonial-text">Testimonial Text</Label>
                      <Textarea 
                        id="testimonial-text"
                        value={testimonialForm.text || ""}
                        onChange={(e) => handleTestimonialChange("text", e.target.value)}
                        placeholder="Testimonial content"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="testimonial-image">Client Photo URL</Label>
                      <Input 
                        id="testimonial-image"
                        value={testimonialForm.image || ""}
                        onChange={(e) => handleTestimonialChange("image", e.target.value)}
                        placeholder="https://example.com/client-photo.jpg"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="testimonial-rating">Rating (1-5)</Label>
                      <Select 
                        value={String(testimonialForm.rating || 5)}
                        onValueChange={(value) => handleTestimonialChange("rating", Number(value))}
                      >
                        <SelectTrigger id="testimonial-rating">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Star</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="4.5">4.5 Stars</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4 flex space-x-4">
                      <Button 
                        className="bg-[#e67e22] hover:bg-[#d35400]"
                        onClick={saveTestimonial}
                      >
                        Save Testimonial
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedTestimonial(null);
                          setTestimonialForm({});
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Hero Slides Tab */}
            <TabsContent value="hero">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Select Slide to Edit</h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {heroSlides.map((slide) => (
                      <div 
                        key={slide.id}
                        className={`p-3 rounded-lg cursor-pointer ${selectedSlide?.id === slide.id ? 'bg-[#1a365d] text-white' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => handleSelectSlide(slide)}
                      >
                        <h4 className="font-medium">{slide.title}</h4>
                        <p className="text-sm truncate">{slide.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#e67e22] hover:bg-[#d35400]"
                    onClick={() => {
                      setSelectedSlide(null);
                      setSlideForm({
                        id: `slide${heroSlides.length + 1}`,
                        title: "",
                        description: "",
                        image: ""
                      });
                    }}
                  >
                    Add New Slide
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedSlide ? `Edit Slide: ${selectedSlide.title}` : 'Create New Slide'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="slide-title">Title</Label>
                      <Input 
                        id="slide-title"
                        value={slideForm.title || ""}
                        onChange={(e) => handleSlideChange("title", e.target.value)}
                        placeholder="Slide title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slide-description">Description</Label>
                      <Textarea 
                        id="slide-description"
                        value={slideForm.description || ""}
                        onChange={(e) => handleSlideChange("description", e.target.value)}
                        placeholder="Slide description"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slide-image">Background Image URL</Label>
                      <Input 
                        id="slide-image"
                        value={slideForm.image || ""}
                        onChange={(e) => handleSlideChange("image", e.target.value)}
                        placeholder="https://example.com/slide-background.jpg"
                      />
                    </div>
                    
                    <div className="pt-4 flex space-x-4">
                      <Button 
                        className="bg-[#e67e22] hover:bg-[#d35400]"
                        onClick={saveSlide}
                      >
                        Save Slide
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedSlide(null);
                          setSlideForm({});
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;