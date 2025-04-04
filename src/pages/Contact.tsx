import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import DOMPurify from 'dompurify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';
import { useToast } from "@/components/ui/use-toast";
import imageCompression from 'browser-image-compression';
import { storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Contact() {
  const [userType, setUserType] = useState<'jobSeeker' | 'employer' | ''>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  // Rate limiting configuration
  const RATE_LIMIT = {
    MAX_SUBMISSIONS_PER_DAY: 5,
    COOLDOWN_MINUTES: 15,
    STORAGE_KEY: 'contactFormSubmissions'
  };

  // Check if user has exceeded rate limits
  const checkRateLimit = (): { allowed: boolean; message?: string } => {
    try {
      // Get submission history from local storage
      const submissionHistoryJSON = localStorage.getItem(RATE_LIMIT.STORAGE_KEY);
      const submissionHistory = submissionHistoryJSON 
        ? JSON.parse(submissionHistoryJSON) as { timestamp: number }[]
        : [];
      
      // Current time
      const now = Date.now();
      
      // Filter out submissions older than 24 hours
      const recentSubmissions = submissionHistory.filter(
        submission => now - submission.timestamp < 24 * 60 * 60 * 1000
      );
      
      // Check if user has reached daily limit
      if (recentSubmissions.length >= RATE_LIMIT.MAX_SUBMISSIONS_PER_DAY) {
        return { 
          allowed: false, 
          message: `You've reached the maximum of ${RATE_LIMIT.MAX_SUBMISSIONS_PER_DAY} submissions per day. Please try again tomorrow.` 
        };
      }
      
      // Check if user is in cooldown period
      if (recentSubmissions.length > 0) {
        const lastSubmission = Math.max(...recentSubmissions.map(s => s.timestamp));
        const minutesSinceLastSubmission = (now - lastSubmission) / (60 * 1000);
        
        if (minutesSinceLastSubmission < RATE_LIMIT.COOLDOWN_MINUTES) {
          const minutesToWait = Math.ceil(RATE_LIMIT.COOLDOWN_MINUTES - minutesSinceLastSubmission);
          return { 
            allowed: false, 
            message: `Please wait ${minutesToWait} minute${minutesToWait !== 1 ? 's' : ''} before submitting another message.` 
          };
        }
      }
      
      return { allowed: true };
    } catch (error) {
      console.error('Error checking rate limit:', error);
      // If there's an error checking the rate limit, allow the submission
      return { allowed: true };
    }
  };

  // Record a new submission
  const recordSubmission = (): void => {
    try {
      // Get existing submission history
      const submissionHistoryJSON = localStorage.getItem(RATE_LIMIT.STORAGE_KEY);
      const submissionHistory = submissionHistoryJSON 
        ? JSON.parse(submissionHistoryJSON) as { timestamp: number }[]
        : [];
      
      // Add current submission
      submissionHistory.push({ timestamp: Date.now() });
      
      // Remove submissions older than 24 hours
      const now = Date.now();
      const recentSubmissions = submissionHistory.filter(
        submission => now - submission.timestamp < 24 * 60 * 60 * 1000
      );
      
      // Save updated history
      localStorage.setItem(RATE_LIMIT.STORAGE_KEY, JSON.stringify(recentSubmissions));
    } catch (error) {
      console.error('Error recording submission:', error);
      // If there's an error recording the submission, continue anyway
    }
  };

  // Function to upload file to Firebase Storage
  const uploadFileToStorage = async (file: File): Promise<string> => {
    try {
      // Create a unique filename to avoid collisions
      const timestamp = new Date().getTime();
      const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
      const fileName = `resumes/${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      
      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, fileName);
      
      // Check if file needs compression before upload (for large files)
      let fileToUpload = file;
      if (file.size > 1024 * 1024) { // If larger than 1MB
        try {
          const options = {
            maxSizeMB: 1, // Compress to 1MB max
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };
          
          // Only try compression for compatible file types
          if (file.type.includes('image')) {
            const compressedFile = await imageCompression(file, options);
            fileToUpload = new File([compressedFile], file.name, { 
              type: file.type,
              lastModified: file.lastModified 
            });
            console.log(`File compressed from ${(file.size / 1024 / 1024).toFixed(2)}MB to ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`);
          }
        } catch (compressionError) {
          console.error('Error compressing file:', compressionError);
          // Continue with original file if compression fails
        }
      }
      
      try {
        // Upload the file with metadata that includes CORS settings
        const metadata = {
          contentType: fileToUpload.type,
          customMetadata: {
            'uploaded-from': 'energize-your-career-contact-form'
          }
        };
        
        // Upload the file with metadata
        const snapshot = await uploadBytes(storageRef, fileToUpload, metadata);
        console.log('File uploaded successfully');
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at:', downloadURL);
        
        return downloadURL;
      } catch (uploadError) {
        console.error('Firebase upload error:', uploadError);
        
        // Fallback to base64 encoding for EmailJS if Firebase upload fails
        if (fileToUpload.size <= 45 * 1024) { // If file is small enough for EmailJS
          console.log('Falling back to base64 encoding for small file');
          
          // Convert file to base64 for direct email attachment
          const base64Data = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const base64 = result.split(',')[1]; // Remove the data URL prefix
              resolve(base64);
            };
            reader.readAsDataURL(fileToUpload);
          });
          
          // Return empty URL but we'll handle this in the email sending logic
          return '';
        } else {
          throw uploadError;
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check rate limit before proceeding
    const rateLimitResult = checkRateLimit();
    if (!rateLimitResult.allowed) {
      toast({
        title: "Error",
        description: rateLimitResult.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const sanitizedData: Record<string, any> = {};

    // Sanitize & validate form data
    for (const [key, value] of formData.entries()) {
      if (key === 'resume') {
        if (value instanceof File && value.size > 0) {
          // Check file size (5MB max)
          if (value.size > 5 * 1024 * 1024) {
            toast({
              title: "Error",
              description: "Resume file size must be less than 5MB",
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
          }
          
          // Check file type
          const allowedTypes = ['.pdf', '.doc', '.docx'];
          const fileExtension = value.name.substring(value.name.lastIndexOf('.')).toLowerCase();
          if (!allowedTypes.includes(fileExtension)) {
            toast({
              title: "Error",
              description: "Resume must be a PDF or Word document",
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
          }
          
          sanitizedData[key] = value;
        }
      } else {
        sanitizedData[key] = typeof value === 'string' ? DOMPurify.sanitize(value) : value;
      }
    }

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

    try {
      // Log EmailJS configuration for debugging
      console.log('EmailJS Config:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? 'Exists' : 'Missing'
      });

      // Build a custom subject line indicating Job Seeker or Employer
      const userRoleLabel = sanitizedData.userType === 'jobSeeker' ? 'Job Seeker' : 'Employer';
      const subjectLine = `${userRoleLabel}: ${sanitizedData.name} has sent you an email`;

      // Process resume if present
      let resumeDownloadURL = '';
      let resumeBase64 = '';
      let resumeMessage = 'No resume attached.';
      let resumeFileName = '';
      
      if (sanitizedData.resume instanceof File && sanitizedData.resume.size > 0) {
        resumeFileName = sanitizedData.resume.name;
        
        // Try to upload the file to Firebase Storage
        try {
          toast({
            title: "Processing",
            description: "Uploading resume file...",
          });
          
          // Try Firebase upload first
          try {
            resumeDownloadURL = await uploadFileToStorage(sanitizedData.resume);
            
            if (resumeDownloadURL) {
              console.log('Resume uploaded successfully, URL:', resumeDownloadURL);
              
              // Format the file type for the message
              let fileFormat = '';
              if (sanitizedData.resume.type === 'application/pdf' || sanitizedData.resume.name.endsWith('.pdf')) {
                fileFormat = ' (PDF format)';
              } else if (sanitizedData.resume.name.endsWith('.doc')) {
                fileFormat = ' (DOC format)';
              } else if (sanitizedData.resume.name.endsWith('.docx')) {
                fileFormat = ' (DOCX format)';
              }
              
              // Create a clickable link for the resume
              resumeMessage = `A resume has been attached to this submission${fileFormat}. Download it here: <a href="${resumeDownloadURL}" target="_blank">${resumeFileName}</a>`;
            } else if (sanitizedData.resume.size <= 45 * 1024) {
              // Small file that failed Firebase upload - try direct attachment
              console.log('Small file, using direct attachment via base64');
              
              // Convert file to base64 for direct email attachment
              resumeBase64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const result = reader.result as string;
                  const base64 = result.split(',')[1]; // Remove the data URL prefix
                  resolve(base64);
                };
                reader.readAsDataURL(sanitizedData.resume);
              });
              
              resumeMessage = `A resume has been attached directly to this email.`;
            } else {
              // Upload failed for large file
              toast({
                title: "Warning",
                description: "Could not upload your resume. The recipient will be notified to request it via email.",
              });
              resumeMessage = `A resume (${resumeFileName}) was attached but could not be uploaded. Please ask the applicant to send their resume directly to your email.`;
            }
          } catch (firebaseError) {
            console.error('Firebase error:', firebaseError);
            
            // Try direct attachment for small files if Firebase fails
            if (sanitizedData.resume.size <= 45 * 1024) {
              console.log('Firebase upload failed, trying direct attachment for small file');
              
              // Convert file to base64 for direct email attachment
              resumeBase64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const result = reader.result as string;
                  const base64 = result.split(',')[1]; // Remove the data URL prefix
                  resolve(base64);
                };
                reader.readAsDataURL(sanitizedData.resume);
              });
              
              resumeMessage = `A resume has been attached directly to this email.`;
            } else {
              toast({
                title: "Warning",
                description: "Could not upload your resume. The recipient will be notified to request it via email.",
              });
              resumeMessage = `A resume (${resumeFileName}) was attached but could not be uploaded. Please ask the applicant to send their resume directly to your email.`;
            }
          }
        } catch (error) {
          console.error('Error handling resume:', error);
          toast({
            title: "Warning",
            description: "Could not process your resume. The recipient will be notified to request it via email.",
          });
          resumeMessage = `A resume (${resumeFileName}) was attached but could not be processed. Please ask the applicant to send their resume directly to your email.`;
        }
      }

      // Build template parameters for EmailJS
      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        user_type: sanitizedData.userType,
        subject: sanitizedData.subject, // User's own subject
        message: sanitizedData.message,
        resume: resumeDownloadURL,      // URL to download the resume from Firebase (matches template variable)
        resumeURL: resumeDownloadURL,   // URL to download the resume from Firebase
        resumeFileName: resumeFileName, // Name of the resume file
        subjectLine,                    // Custom subject line for team notification
        resumeMessage,                  // Indicates whether a resume is attached with download link
        // Include a direct download link as a separate parameter
        resumeDownloadLink: resumeDownloadURL ? 
          `<a href="${resumeDownloadURL}" target="_blank" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:4px;margin-top:15px;margin-bottom:15px;">Download Resume</a>` : '',
        // Include base64 data if Firebase upload failed but file is small enough
        resumeBase64: resumeBase64 || '',
      };

      console.log('Sending email with template params:', {
        ...templateParams,
        message: templateParams.message.substring(0, 100) + '...' // Truncate for logging
      });

      // Debug EmailJS configuration
      console.log('EmailJS Config Check:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID ? 'Set' : 'Missing',
        TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID ? 'Set' : 'Missing',
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Missing',
      });

      try {
        // Send email using EmailJS (Team Notification Template)
        const response = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
        
        console.log('EmailJS Response:', response);

        // Record the submission
        recordSubmission();

        // Clear form and reset state
        (e.target as HTMLFormElement).reset();
        setUserType('');
        setSelectedFile(null);
        toast({
          title: "Success",
          description: "Your message has been sent successfully! We'll get back to you soon.",
        });
      } catch (error) {
        console.error('EmailJS Error:', error);
        setError('Failed to send email. Please try again or contact us directly.');
        setIsSubmitting(false);
        return;
      } finally {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Log more detailed error information
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
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
                  
                  <form ref={formRef} className="space-y-3 sm:space-y-6" onSubmit={handleSubmit}>
                    {/* Hidden inputs for dynamic template fields */}
                    <input type="hidden" name="subjectLine" id="subjectLine" />
                    <input type="hidden" name="resumeMessage" id="resumeMessage" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-stone-700">Name *</label>
                        <Input 
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
                        <Input 
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
                            ${userType === 'jobSeeker' ? 'border-alternative-600 bg-alternative-50 shadow-md' : 'border-stone-200'}
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
                                ${userType === 'jobSeeker' ? 'border-alternative-600 bg-alternative-600' : 'border-stone-300 bg-white'}
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
                            ${userType === 'employer' ? 'border-alternative-600 bg-alternative-50 shadow-md' : 'border-stone-200'}
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
                                ${userType === 'employer' ? 'border-alternative-600 bg-alternative-600' : 'border-stone-300 bg-white'}
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

                    {/* File Upload Section */}
                    <label className="block text-xs sm:text-sm font-medium text-stone-700 mb-1">
                      Upload Resume (Optional)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        console.log('File selected:', e.target.files?.[0]?.name);
                        setSelectedFile(e.target.files?.[0] || null);
                      }}
                    />
                    <div 
                      className="mt-1 sm:mt-2 flex justify-center px-3 sm:px-6 py-4 sm:py-8 border-2 border-dashed border-stone-200 rounded-lg transition-colors hover:border-alternative-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const fileInput = document.getElementById('resume') as HTMLInputElement;
                        if (fileInput) {
                          fileInput.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.add('border-alternative-500');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.remove('border-alternative-500');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.remove('border-alternative-500');
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          const fileInput = document.getElementById('resume') as HTMLInputElement;
                          if (fileInput) {
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(e.dataTransfer.files[0]);
                            fileInput.files = dataTransfer.files;
                            setSelectedFile(e.dataTransfer.files[0]);
                          }
                        }
                      }}
                    >
                      <div className="text-center">
                        {selectedFile ? (
                          <>
                            <CheckCircle className="mx-auto h-6 sm:h-8 w-6 sm:w-8 text-green-500 mb-1 sm:mb-2" />
                            <p className="text-sm text-stone-600">
                              <span className="font-medium text-green-600">File selected:</span> {selectedFile.name}
                            </p>
                            <p className="text-xs text-stone-500 mt-0.5 sm:mt-1">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <button
                              type="button"
                              className="mt-2 text-xs text-red-500 hover:text-red-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(null);
                                const fileInput = document.getElementById('resume') as HTMLInputElement;
                                if (fileInput) {
                                  fileInput.value = '';
                                }
                              }}
                            >
                              Remove file
                            </button>
                          </>
                        ) : (
                          <>
                            <Send className="mx-auto h-6 sm:h-8 w-6 sm:w-8 text-alternative-500 mb-1 sm:mb-2" />
                            <p className="text-sm text-stone-600">
                              <span className="font-medium text-alternative-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-stone-500 mt-0.5 sm:mt-1">PDF or Word (MAX 5MB)</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-stone-700">Subject *</label>
                      <Input 
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
                      <Textarea 
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500 focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="Your message"
                      ></Textarea>
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
              <div className="space-y-4 sm:space-y-8">
                <GlassCard className="p-4 sm:p-8">
                  <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-stone-900">Contact Information</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-alternative-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-lg font-semibold text-stone-900">Email</h4>
                        <p className="text-xs sm:text-base text-stone-600">info@voltifygroup.com</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 sm:p-8">
                  <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-stone-900">Frequently Asked Questions</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-alternative-600 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-lg font-semibold text-stone-900 mb-1 sm:mb-2">How quickly can you find candidates?</h4>
                        <p className="text-xs sm:text-base text-stone-600">We typically present qualified candidates within 1-2 weeks, depending on the position's requirements and market conditions.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-alternative-600 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
