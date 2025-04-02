import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, ValidationError } from '@formspree/react';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { createMessage } from "@/lib/dataService";

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Initialize Formspree form with your form ID
  const [state, handleSubmit] = useForm("xjkyabzg");
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const message = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };
    
    try {
      // First, send the form using Formspree
      handleSubmit(e);
      
      // Then save the message in our system
      await createMessage(message).catch(err => {
        console.error('Failed to save message in system database:', err);
      });
    } catch (error) {
      console.error('Error processing form submission:', error);
      toast({
        title: t("contact.error.title") || "Error",
        description: t("contact.error.message") || "Failed to send your message. Please try again.",
        variant: "destructive"
      });
    }
  };
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Show success message when form is successfully submitted
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      toast({
        title: t("contact.success.title"),
        description: t("contact.success.message"),
      });
    }
  }, [state.succeeded, t, toast]);
  
  // Reset success state after 5 seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccess]);

  return (
    <section id="kontakt" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-[#e67e22] uppercase tracking-wider mb-2">
            {t("contact.subtitle")}
          </h2>
          <h3 className="text-4xl font-heading font-bold text-[#1a365d]">
            {t("contact.title")}
          </h3>
          <div className="w-20 h-1 bg-[#e67e22] mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <h4 className="font-heading font-bold text-xl text-[#1a365d] mb-6">
                {t("contact.form.title")}
              </h4>
              
              {showSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h4 className="font-medium text-green-700 text-lg mb-2">{t("contact.success.title")}</h4>
                  <p className="text-green-600">{t("contact.success.message")}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.name")}
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                      />
                      <ValidationError prefix={t("contact.form.name")} field="name" errors={state.errors} className="mt-1 text-sm text-red-600" />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.form.email")}
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                      />
                      <ValidationError prefix={t("contact.form.email")} field="email" errors={state.errors} className="mt-1 text-sm text-red-600" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.subject")}
                    </label>
                    <Input 
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                    />
                    <ValidationError prefix={t("contact.form.subject")} field="subject" errors={state.errors} className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.message")}
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                    />
                    <ValidationError prefix={t("contact.form.message")} field="message" errors={state.errors} className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-[#e67e22] hover:bg-[#d35400] text-white font-bold py-3 px-8 rounded-lg transition duration-300 w-full"
                    disabled={state.submitting}
                  >
                    {state.submitting ? t("contact.form.sending") : t("contact.form.submit")}
                  </Button>
                </form>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-8">
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
            </div>
            
            {/* Map */}
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.3345877040184!2d21.155761!3d42.6629138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee1eff12b13%3A0xca7771ec2a587a80!2sRruga%20Ibrahim%20Rugova%2C%20Prishtin%C3%AB!5e0!3m2!1sen!2s!4v1624453513088!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false}
                loading="lazy"
                title="Ardmir Shpk location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
