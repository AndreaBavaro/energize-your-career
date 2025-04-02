import emailjs from '@emailjs/browser';
import { addSubscriber } from './subscriberService';

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

    // First add the subscriber to Firebase
    const firebaseResult = await addSubscriber(data);
    
    // If the subscriber was already in the database, return that result
    if (!firebaseResult.success && firebaseResult.message.includes('already subscribed')) {
      return firebaseResult;
    }

    // Prepare template parameters for welcome email
    const templateParams = {
      email: data.email,
      name: data.name || '',
      subscription_date: new Date().toISOString(),
      subscription_source: data.source || window.location.pathname
    };

    // Send welcome email via EmailJS
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (result.text === 'OK') {
      return { success: true, message: 'Thank you for subscribing to our newsletter!' };
    } else {
      throw new Error('Failed to send welcome email');
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    // If we already added to Firebase but EmailJS failed, still consider it a success
    // since the subscriber is in our database
    return { success: true, message: 'You have been subscribed to our newsletter!' };
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
