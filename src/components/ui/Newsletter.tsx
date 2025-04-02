import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { subscribeToNewsletter, SubscriberData } from '@/services/newsletterService';
import { addSubscriber } from '@/services/subscriberService';

interface NewsletterProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const Newsletter: React.FC<NewsletterProps> = ({ 
  className = "", 
  variant = 'default' 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    
    try {
      const subscriberData: SubscriberData = {
        email,
        name: name || undefined,
        source: window.location.pathname
      };
      
      // Store subscriber in Firebase and send welcome email
      const result = await addSubscriber(subscriberData);
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
        setName('');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className={`${className}`}>
      {variant === 'default' && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-stone-800 mb-2">Subscribe to our Newsletter</h3>
          <p className="text-sm text-stone-600">
            Stay updated with our latest blog posts and news.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-2">
        {variant === 'default' && (
          <input
            type="text"
            placeholder="Your name (optional)"
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'loading'}
          />
        )}
        
        <div className="relative">
          <input
            type="email"
            placeholder="Your email address"
            className={`w-full px-4 py-2 ${variant === 'compact' ? 'pr-10' : 'pr-24'} rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-alternative-500`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className={`absolute ${variant === 'compact' ? 'right-2 top-2 p-1' : 'right-2 top-1 px-4 py-1'} bg-alternative-600 text-white rounded-md hover:bg-alternative-700 transition-colors disabled:opacity-50`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {variant === 'default' && "Subscribing..."}
              </span>
            ) : (
              <span className="flex items-center">
                {variant === 'default' && "Subscribe"}
                <Send size={variant === 'compact' ? 16 : 18} className={variant === 'default' ? "ml-1" : ""} />
              </span>
            )}
          </button>
        </div>
      </form>
      
      {status !== 'idle' && message && (
        <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Newsletter;
