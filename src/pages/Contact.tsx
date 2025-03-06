import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function Contact() {
  const [userType, setUserType] = useState<'jobSeeker'|'employer'|''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    // Validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.userType) {
      alert('Please fill out all required fields');
      return;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(sanitizedData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (userType === 'jobSeeker' && !sanitizedData.resume) {
      alert('Resume is required for job seekers');
      return;
    }

    if (sanitizedData.resume instanceof File) {
      if (sanitizedData.resume.size > 5 * 1024 * 1024) {
        alert('Resume file size must be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(sanitizedData.resume.type)) {
        alert('Only PDF and Word documents are allowed');
        return;
      }
    }

    // Submit logic here
    console.log('Submitting:', sanitizedData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow relative">
        <section className="py-16 md:py-24 white-brick-bg relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <SectionHeading 
              title="Contact Us"
              subtitle="Get in touch with our team to discuss how we can help energize your career or business."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
              {/* Contact Form */}
              <div>
                <GlassCard className="p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6 text-stone-900">Send Us a Message</h3>
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">
                        I am a:
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          <label className={`
                            p-4 rounded-xl border-2 transition-all
                            ${userType === 'jobSeeker' 
                              ? 'border-voltify-600 bg-voltify-50 shadow-md' 
                              : 'border-stone-200 hover:border-voltify-400 hover:bg-white'}
                          `}>
                            <div className="flex items-center gap-3">
                              <div className={`
                                h-5 w-5 rounded-full border-2 flex items-center justify-center
                                ${userType === 'jobSeeker' 
                                  ? 'border-voltify-600 bg-voltify-600' 
                                  : 'border-stone-300 bg-white'}
                              `}>
                                <div className={`
                                  h-2 w-2 rounded-full
                                  ${userType === 'jobSeeker' ? 'bg-white' : ''}
                                `}></div>
                              </div>
                              <span className="text-stone-700 font-medium">Job Seeker</span>
                            </div>
                          </label>
                          
                          <label className={`
                            p-4 rounded-xl border-2 transition-all
                            ${userType === 'employer' 
                              ? 'border-voltify-600 bg-voltify-50 shadow-md' 
                              : 'border-stone-200 hover:border-voltify-400 hover:bg-white'}
                          `}>
                            <div className="flex items-center gap-3">
                              <div className={`
                                h-5 w-5 rounded-full border-2 flex items-center justify-center
                                ${userType === 'employer' 
                                  ? 'border-voltify-600 bg-voltify-600' 
                                  : 'border-stone-300 bg-white'}
                              `}>
                                <div className={`
                                  h-2 w-2 rounded-full
                                  ${userType === 'employer' ? 'bg-white' : ''}
                                `}></div>
                              </div>
                              <span className="text-stone-700 font-medium">Employer</span>
                            </div>
                          </label>
                        </div>
                      </label>
                    </div>

                    {userType === 'jobSeeker' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-stone-700">
                          Upload Resume
                          <div className="mt-2 flex justify-center px-6 py-8 border-2 border-dashed border-stone-200 rounded-lg hover:border-voltify-400 transition-colors cursor-pointer">
                            <input
                              type="file"
                              id="resume"
                              name="resume"
                              accept=".pdf,.doc,.docx"
                              className="sr-only"
                            />
                            <div className="text-center">
                              <Send className="mx-auto h-8 w-8 text-voltify-500 mb-2" />
                              <p className="text-stone-600">
                                <span className="font-medium text-voltify-600 hover:text-voltify-700">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-stone-500 mt-1">PDF or Word (MAX 5MB)</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-stone-700">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                        placeholder="Subject"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    
                    <Button className="w-full py-6 sm:py-4 bg-voltify-600 hover:bg-voltify-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </GlassCard>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-stone-900">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-voltify-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900">Email</h4>
                        <p className="text-stone-600">info@energizeyourcareer.com</p>
                        <p className="text-stone-600">support@energizeyourcareer.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-voltify-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900">Phone</h4>
                        <p className="text-stone-600">+1 (555) 123-4567</p>
                        <p className="text-stone-600">+1 (555) 987-6543</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-voltify-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-900">Office</h4>
                        <p className="text-stone-600">123 Business Avenue</p>
                        <p className="text-stone-600">Suite 456</p>
                        <p className="text-stone-600">Houston, TX 77002</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-stone-900">Office Hours</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700 font-medium">Monday - Friday</span>
                      <span className="text-stone-900 font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700 font-medium">Saturday</span>
                      <span className="text-stone-900 font-semibold">10:00 AM - 2:00 PM</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-stone-700 font-medium">Sunday</span>
                      <span className="text-stone-900 font-semibold">Closed</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-12 md:mt-16">
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-stone-900">Frequently Asked Questions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-voltify-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-stone-900 mb-2">How quickly can you find candidates?</h4>
                      <p className="text-stone-600">We typically present qualified candidates within 1-2 weeks, depending on the position's requirements and market conditions.</p>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-voltify-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-stone-900 mb-2">What industries do you specialize in?</h4>
                      <p className="text-stone-600">We specialize in IT, energy, healthcare, finance, and marketing sectors, but our expertise extends to various other industries as well.</p>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-voltify-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-stone-900 mb-2">Do you offer temporary staffing?</h4>
                      <p className="text-stone-600">Yes, we provide both temporary and permanent staffing solutions to meet your business needs, including contract-to-hire options.</p>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-voltify-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-voltify-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-stone-900 mb-2">What is your fee structure?</h4>
                      <p className="text-stone-600">Our fees are competitive and typically based on a percentage of the candidate's first-year salary. Contact us for specific details.</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
