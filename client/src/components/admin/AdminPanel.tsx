import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Message } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Project, Service, HeroSlide, ProjectCategory } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { 
  getProjects, getServices, getSlides, 
  updateProject, updateService, updateSlide
} from "@/lib/dataService";

const AdminPanel = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages } = useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await fetch('/api/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return response.json();
    }
  });

  // Mark message as read
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: number) => {
      const response = await fetch(`/api/messages/${messageId}/read`, {
        method: 'PATCH'
      });
      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const handleMarkAsRead = (messageId: number) => {
    markAsReadMutation.mutate(messageId);
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({});
  const [slideForm, setSlideForm] = useState<Partial<HeroSlide>>({});

  // Load data
  useEffect(() => {
    setProjects(getProjects());
    setServices(getServices());
    setHeroSlides(getSlides());
  }, []);

  // Handle selecting an item for editing
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setProjectForm({ 
      ...project,
      // If the title is a translation key, try to resolve it
      title: project.title.startsWith("projects.") ? t(project.title) : project.title,
      description: project.description.startsWith("projects.") ? t(project.description) : project.description
    });
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setServiceForm({ 
      ...service,
      title: service.title.startsWith("services.") ? t(service.title) : service.title,
      description: service.description.startsWith("services.") ? t(service.description) : service.description 
    });
  };

  const handleSelectSlide = (slide: HeroSlide) => {
    setSelectedSlide(slide);
    setSlideForm({ 
      ...slide,
      title: slide.title.startsWith("hero.") ? t(slide.title) : slide.title,
      description: slide.description.startsWith("hero.") ? t(slide.description) : slide.description 
    });
  };

  // Handle form input changes
  const handleProjectChange = (field: string, value: string) => {
    setProjectForm({ ...projectForm, [field]: value });
  };

  const handleServiceChange = (field: string, value: string) => {
    setServiceForm({ ...serviceForm, [field]: value });
  };

  const handleSlideChange = (field: string, value: string) => {
    setSlideForm({ ...slideForm, [field]: value });
  };

  // Save functions that actually update data
  const saveProject = () => {
    if (!projectForm.title || !projectForm.description || !projectForm.image || !projectForm.category) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    // Ensure we have a complete project object
    const completeProject: Project = {
      id: projectForm.id || `project${projects.length + 1}`,
      title: projectForm.title,
      description: projectForm.description,
      image: projectForm.image,
      category: projectForm.category as ProjectCategory
    };

    // Update the project in our data service
    updateProject(completeProject);

    // Refresh the projects list
    setProjects(getProjects());

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

    // Ensure we have a complete service object
    const completeService: Service = {
      id: serviceForm.id || `service${services.length + 1}`,
      title: serviceForm.title,
      description: serviceForm.description,
      icon: serviceForm.icon
    };

    // Update the service in our data service
    updateService(completeService);

    // Refresh the services list
    setServices(getServices());

    toast({
      title: "Service saved",
      description: "The service has been saved successfully",
    });

    setSelectedService(null);
    setServiceForm({});
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

    // Ensure we have a complete slide object
    const completeSlide: HeroSlide = {
      id: slideForm.id || `slide${heroSlides.length + 1}`,
      title: slideForm.title,
      description: slideForm.description,
      image: slideForm.image
    };

    // Update the slide in our data service
    updateSlide(completeSlide);

    // Refresh the slides list
    setHeroSlides(getSlides());

    toast({
      title: "Slide saved",
      description: "The slide has been saved successfully",
    });

    setSelectedSlide(null);
    setSlideForm({});
  };

  const deleteProject = (projectId: string) => {
    //  Implementation to delete project from your data source.
    // This is a placeholder, replace with your actual deletion logic.
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);

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
              <TabsTrigger value="hero">Hero Slides</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
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
                        <h4 className="font-medium">
                          {project.title.startsWith("projects.") ? t(project.title) : project.title}
                        </h4>
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
                        category: "river-works"
                      });
                    }}
                  >
                    Add New Project
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    {selectedProject 
                      ? `Edit Project: ${selectedProject.title.startsWith("projects.") 
                          ? t(selectedProject.title) 
                          : selectedProject.title}`
                      : 'Create New Project'
                    }
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
                        value={projectForm.category as string || "river-works"}
                        onValueChange={(value) => handleProjectChange("category", value)}
                      >
                        <SelectTrigger id="project-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="mining">Mining</SelectItem>
                          <SelectItem value="river-works">River Protection Works</SelectItem>
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
                      {selectedProject && (
                        <Button 
                          variant="destructive"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this project?')) {
                              deleteProject(selectedProject.id);
                              setProjects(getProjects());
                              setSelectedProject(null);
                              setProjectForm({});
                              toast({
                                title: "Project deleted",
                                description: "The project has been deleted successfully",
                              });
                            }
                          }}
                        >
                          Delete
                        </Button>
                      )}
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
                        <h4 className="font-medium">
                          {service.title.startsWith("services.") ? t(service.title) : service.title}
                        </h4>
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
                    {selectedService 
                      ? `Edit Service: ${selectedService.title.startsWith("services.") 
                          ? t(selectedService.title) 
                          : selectedService.title}`
                      : 'Create New Service'
                    }
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
                        <h4 className="font-medium">
                          {slide.title.startsWith("hero.") ? t(slide.title) : slide.title}
                        </h4>
                        <p className="text-sm truncate">
                          {slide.description.startsWith("hero.") ? t(slide.description) : slide.description}
                        </p>
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
                    {selectedSlide 
                      ? `Edit Slide: ${selectedSlide.title.startsWith("hero.") 
                          ? t(selectedSlide.title) 
                          : selectedSlide.title}`
                      : 'Create New Slide'
                    }
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

            {/* Messages Tab */}
            <TabsContent value="messages">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Contact Form Messages</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {messages?.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 rounded-lg bg-white border ${message.read === "true" ? 'border-gray-200' : 'border-[#e67e22]'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-lg">{message.subject}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(message.id)}
                          className={message.read === "true" ? 'text-gray-400' : 'text-[#e67e22]'}
                        >
                          {message.read === "true" ? 'Read' : 'Mark as Read'}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">From: {message.name} ({message.email})</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Received: {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {(!messages || messages.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No messages received yet
                    </div>
                  )}
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