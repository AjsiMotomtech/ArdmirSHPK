import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import useWeb3Forms from "@web3forms/react";

const contactFormSchema = z.object({
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

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Web3Forms setup
  const { submit: submitToWeb3Forms } = useWeb3Forms({
    access_key: "ba8fd0b1-fecb-4fbb-8b06-59b54a761d27", // This is a test access key, you should replace it with your actual key
    settings: {
      from_name: "Ardmir Website Contact",
      subject: "New Contact Message from Ardmir Website",
    },
    onSuccess: (message) => {
      toast({
        title: t("contact.success.title"),
        description: t("contact.success.message"),
      });
      form.reset();
      setIsSending(false);
    },
    onError: (error) => {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.message"),
        variant: "destructive",
      });
      console.error("Web3Forms submission error:", error);
      setIsSending(false);
    }
  });

  // API submission (to store in our database)
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onError: (error) => {
      console.error("API submission error:", error);
      // We don't show an error here as Web3Forms is the primary method
      // and we don't want to confuse the user if only the internal storage fails
    }
  });

  function onSubmit(data: ContactFormValues) {
    setIsSending(true);
    
    // Send to Web3Forms (primary method for email)
    submitToWeb3Forms({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      replyto: "ardmirshpk@yahoo.com", // Reply to company email
    });
    
    // Also store in our database for admin panel
    contactMutation.mutate(data);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="kontakt" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={headerVariants}
            className="text-sm font-medium text-[#e67e22] uppercase tracking-wider mb-2"
          >
            {t("contact.subtitle")}
          </motion.h2>
          <motion.h3 
            variants={headerVariants}
            className="text-4xl font-heading font-bold text-[#1a365d]"
          >
            {t("contact.title")}
          </motion.h3>
          <motion.div 
            variants={headerVariants}
            className="w-20 h-1 bg-[#e67e22] mx-auto mt-6"
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <h4 className="font-heading font-bold text-xl text-[#1a365d] mb-6">
                {t("contact.form.title")}
              </h4>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.name")}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.email")}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.subject")}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.message")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d] min-h-[200px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-[#e67e22] hover:bg-[#d35400] text-white font-bold py-3 px-8 rounded-lg transition duration-300 w-full"
                    disabled={isSending}
                  >
                    {isSending ? t("contact.form.sending") : t("contact.form.submit")}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={contentVariants}
              className="bg-gray-50 p-8 rounded-lg shadow-lg mb-8"
            >
              <h4 className="font-heading font-bold text-xl text-[#1a365d] mb-6">
                {t("contact.info.title")}
              </h4>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#1a365d] flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="text-white" size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-800 mb-1">{t("contact.info.address.title")}</h5>
                    <p className="text-neutral-800">{t("contact.info.address.content")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#1a365d] flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="text-white" size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-800 mb-1">{t("contact.info.phone.title")}</h5>
                    <p className="text-neutral-800">{t("contact.info.phone.primary")}</p>
                    <p className="text-neutral-800">{t("contact.info.phone.secondary")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#1a365d] flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="text-white" size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-800 mb-1">{t("contact.info.email.title")}</h5>
                    <p className="text-neutral-800">{t("contact.info.email.primary")}</p>
                    <p className="text-neutral-800">{t("contact.info.email.secondary")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#1a365d] flex items-center justify-center flex-shrink-0 mr-4">
                    <Clock className="text-white" size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-800 mb-1">{t("contact.info.hours.title")}</h5>
                    <p className="text-neutral-800">{t("contact.info.hours.weekdays")}</p>
                    <p className="text-neutral-800">{t("contact.info.hours.weekend")}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h5 className="font-medium text-neutral-800 mb-4">{t("contact.info.social.title")}</h5>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1a365d] hover:bg-[#2c4f84] flex items-center justify-center transition duration-300">
                    <i className="fab fa-facebook-f text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1a365d] hover:bg-[#2c4f84] flex items-center justify-center transition duration-300">
                    <i className="fab fa-linkedin-in text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1a365d] hover:bg-[#2c4f84] flex items-center justify-center transition duration-300">
                    <i className="fab fa-instagram text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1a365d] hover:bg-[#2c4f84] flex items-center justify-center transition duration-300">
                    <i className="fab fa-youtube text-white"></i>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Map */}
            <motion.div 
              variants={contentVariants}
              className="h-80 rounded-lg overflow-hidden shadow-lg"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.3345877040184!2d21.155761!3d42.6629138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee1eff12b13%3A0xca7771ec2a587a80!2sRruga%20Ibrahim%20Rugova%2C%20Prishtin%C3%AB!5e0!3m2!1sen!2s!4v1624453513088!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false}
                loading="lazy"
                title="Ardmir Shpk location"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
