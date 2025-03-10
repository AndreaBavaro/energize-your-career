import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const [userType, setUserType] = useState<'jobSeeker'|'employer'|''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Sanitize inputs
    const sanitizedData = {
      name: DOMPurify.sanitize(formData.get('name') as string).trim(),
      email: DOMPurify.sanitize(formData.get('email') as string).trim(),
      userType: formData.get('userType'),
      resume: formData.get('resume'),
      subject: DOMPurify.sanitize(formData.get('subject') as string).trim(),
      message: DOMPurify.sanitize(formData.get('message') as string).trim()
    };

    // Check if resume is an empty file input (when no file is selected)
    if (sanitizedData.resume instanceof File && sanitizedData.resume.size === 0 && sanitizedData.resume.name === '') {
      sanitizedData.resume = null;
    }

    // Validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.userType) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(sanitizedData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (sanitizedData.resume instanceof File) {
      if (sanitizedData.resume.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Resume file size must be less than 5MB",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(sanitizedData.resume.type)) {
        toast({
          title: "Error",
          description: "Only PDF and Word documents are allowed",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // Convert resume to base64 if it exists
      let resumeBase64 = '';
      if (sanitizedData.resume instanceof File) {
        resumeBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(sanitizedData.resume);
        });
      }

      // Prepare email template parameters
      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        user_type: sanitizedData.userType,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        resume: resumeBase64,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Clear form
      (e.target as HTMLFormElement).reset();
      setUserType('');

      // Show success message
      toast({
        title: "Success",
        description: "Your message has been sent successfully! We'll get back to you soon.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow relative">
        <section className="py-16 md:py-24 white-brick-bg relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-alternative-50 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <SectionHeading 
              title="Contact Us"
              subtitle="Get in touch with our team to discuss how we can help energize your career or business."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
              {/* Contact Form */}
              <div>
                <GlassCard className="p-4 sm:p-8 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-stone-900">Send Us a Message</h3>
                  
                  <form className="space-y-3 sm:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-stone-700">Name *</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-stone-700">Email *</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-stone-700">
                        I am a: *
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-1 sm:mt-2">
                          <label className={`
                            p-2 sm:p-4 rounded-xl border-2 transition-all cursor-pointer
                            ${userType === 'jobSeeker' 
                              ? 'border-alternative-600 bg-alternative-50 shadow-md' 
                              : 'border-stone-200'}
                          `}>
                            <input
                              type="radio"
                              name="userType"
                              value="jobSeeker"
                              className="sr-only"
                              checked={userType === 'jobSeeker'}
                              onChange={(e) => setUserType(e.target.value as 'jobSeeker')}
                              required
                            />
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`
                                h-4 sm:h-5 w-4 sm:w-5 rounded-full border-2 flex items-center justify-center
                                ${userType === 'jobSeeker' 
                                  ? 'border-alternative-600 bg-alternative-600' 
                                  : 'border-stone-300 bg-white'}
                              `}>
                                <div className={`
                                  h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full
                                  ${userType === 'jobSeeker' ? 'bg-white' : ''}
                                `}></div>
                              </div>
                              <span className="text-stone-700 font-medium text-sm">Job Seeker</span>
                            </div>
                          </label>
                          
                          <label className={`
                            p-2 sm:p-4 rounded-xl border-2 transition-all cursor-pointer
                            ${userType === 'employer' 
                              ? 'border-alternative-600 bg-alternative-50 shadow-md' 
                              : 'border-stone-200'}
                          `}>
                            <input
                              type="radio"
                              name="userType"
                              value="employer"
                              className="sr-only"
                              checked={userType === 'employer'}
                              onChange={(e) => setUserType(e.target.value as 'employer')}
                              required
                            />
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`
                                h-4 sm:h-5 w-4 sm:w-5 rounded-full border-2 flex items-center justify-center
                                ${userType === 'employer' 
                                  ? 'border-alternative-600 bg-alternative-600' 
                                  : 'border-stone-300 bg-white'}
                              `}>
                                <div className={`
                                  h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full
                                  ${userType === 'employer' ? 'bg-white' : ''}
                                `}></div>
                              </div>
                              <span className="text-stone-700 font-medium text-sm">Employer</span>
                            </div>
                          </label>
                        </div>
                      </label>
                    </div>

                    {userType === 'jobSeeker' && (
                      <div className="space-y-1 sm:space-y-2">
                        <label className="block text-xs sm:text-sm font-medium text-stone-700">
                          Upload Resume (Optional)
                          <div className="mt-1 sm:mt-2 flex justify-center px-3 sm:px-6 py-4 sm:py-8 border-2 border-dashed border-stone-200 rounded-lg transition-colors cursor-pointer">
                            <input
                              type="file"
                              id="resume"
                              name="resume"
                              accept=".pdf,.doc,.docx"
                              className="sr-only"
                              required={false}
                            />
                            <div className="text-center">
                              <Send className="mx-auto h-6 sm:h-8 w-6 sm:w-8 text-alternative-500 mb-1 sm:mb-2" />
                              <p className="text-sm text-stone-600">
                                <span className="font-medium text-alternative-600">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-stone-500 mt-0.5 sm:mt-1">PDF or Word (MAX 5MB)</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    )}

                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-stone-700">Subject *</label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500 focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="Subject"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-stone-700">Message *</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500 focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-4 bg-alternative-600 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 sm:h-5 w-4 sm:w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </GlassCard>
              </div>
              
              {/* Contact Information and FAQ Section */}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:space-y-8 sm:gap-0">
                <div className="grid grid-rows-2 gap-4 sm:space-y-8 sm:gap-0">
                  <GlassCard className="p-4 sm:p-8">
                    <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-stone-900">Contact Information</h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-alternative-100 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-4 sm:h-6 w-4 sm:w-6 text-alternative-600" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-lg font-semibold text-stone-900">Email</h4>
                          <p className="text-xs sm:text-base text-stone-600">info@energizeyourcareer.com</p>
                          <p className="text-xs sm:text-base text-stone-600">support@energizeyourcareer.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-alternative-100 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-4 sm:h-6 w-4 sm:w-6 text-alternative-600" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-lg font-semibold text-stone-900">Phone</h4>
                          <p className="text-xs sm:text-base text-stone-600">+1 (555) 123-4567</p>
                          <p className="text-xs sm:text-base text-stone-600">+1 (555) 987-6543</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-alternative-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-4 sm:h-6 w-4 sm:w-6 text-alternative-600" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-lg font-semibold text-stone-900">Office</h4>
                          <p className="text-xs sm:text-base text-stone-600">123 Business Avenue</p>
                          <p className="text-xs sm:text-base text-stone-600">Suite 456</p>
                          <p className="text-xs sm:text-base text-stone-600">Houston, TX 77002</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-4 sm:p-8">
                    <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-stone-900">Frequently Asked Questions</h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-alternative-100 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-4 sm:h-5 w-4 sm:w-5 text-alternative-600" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-lg font-semibold text-stone-900 mb-1 sm:mb-2">How quickly can you find candidates?</h4>
                          <p className="text-xs sm:text-base text-stone-600">We typically present qualified candidates within 1-2 weeks, depending on the position's requirements and market conditions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-alternative-100 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-4 sm:h-5 w-4 sm:w-5 text-alternative-600" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-lg font-semibold text-stone-900 mb-1 sm:mb-2">What industries do you specialize in?</h4>
                          <p className="text-xs sm:text-base text-stone-600">We specialize in IT, energy, healthcare, finance, and marketing sectors, but our expertise extends to various other industries as well.</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
