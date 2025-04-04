import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Interface for subscriber data
export interface SubscriberData {
  email: string;
  name?: string;
  source?: string;
}

/**
 * Subscribe a user to the newsletter
 * @param data Subscriber data including email
 * @returns Promise with the result of the subscription
 */
export const subscribeToNewsletter = async (data: SubscriberData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate email
    if (!data.email) {
      return { success: false, message: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Prepare template parameters
    const templateParams = {
      email: data.email,
      name: data.name || '',
      subscription_date: new Date().toISOString(),
      subscription_source: data.source || window.location.pathname
    };

    // Send to EmailJS
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (result.text === 'OK') {
      return { success: true, message: 'Thank you for subscribing to our newsletter!' };
    } else {
      throw new Error('Failed to subscribe');
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, message: 'Failed to subscribe. Please try again later.' };
  }
};

/**
 * Initialize EmailJS
 * Should be called once when the app starts
 */
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};

export default {
  subscribeToNewsletter,
  initEmailJS
};
