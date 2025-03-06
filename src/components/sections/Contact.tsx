import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const userType = formData.get('userType');
    const resume = formData.get('resume');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Input sanitization
    if (!name || !email || !userType || !resume || !subject || !message) {
      alert('Please fill out all fields');
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Invalid email address');
      return;
    }

    if (resume.size > 1024 * 1024 * 5) {
      alert('Resume file size exceeds 5MB');
      return;
    }

    // Handle form data submission
    console.log(formData);
  };

  return (
    <section id="contact" className="py-24 white-brick-bg relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-voltify-50 rounded-full filter blur-3xl opacity-30 transform translate-x-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionHeading 
          title="Contact Us"
          subtitle="Get in touch with our team to discuss how we can help energize your career or business."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mt-12">
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
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                {/* User Type Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">I am a:</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="userType" value="jobSeeker" className="form-radio" required />
                      <span className="ml-2 text-stone-700">Job Seeker</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="userType" value="employer" className="form-radio" required />
                      <span className="ml-2 text-stone-700">Employer</span>
                    </label>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <label htmlFor="resume" className="block text-sm font-medium text-stone-700">Upload Resume</label>
                  <input 
                    type="file" 
                    id="resume" 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-700">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-voltify-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full py-6 bg-voltify-600 hover:bg-voltify-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
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
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-stone-900">Frequently Asked Questions</h3>
          
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
  );
}
