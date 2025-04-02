import { firestore } from '@/config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { subscribeToNewsletter, SubscriberData } from './newsletterService';

// Collection name for newsletter subscribers
const SUBSCRIBERS_COLLECTION = 'newsletter_subscribers';

/**
 * Interface for a newsletter subscriber
 */
export interface NewsletterSubscriber {
  email: string;
  name?: string;
  subscriptionDate: Timestamp;
  source?: string;
  isActive: boolean;
  lastNotified?: Timestamp;
  preferences?: {
    frequency?: 'immediate' | 'daily' | 'weekly';
    topics?: string[];
  };
}

/**
 * Add a new subscriber to the newsletter
 * @param subscriberData The subscriber data
 * @returns Promise with success status and message
 */
export const addSubscriber = async (subscriberData: SubscriberData): Promise<{ success: boolean; message: string }> => {
  try {
    // First check if the email already exists
    const subscribersRef = collection(firestore, SUBSCRIBERS_COLLECTION);
    const q = query(subscribersRef, where('email', '==', subscriberData.email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, message: 'This email is already subscribed to our newsletter.' };
    }
    
    // Add the subscriber to Firestore
    const newSubscriber: Omit<NewsletterSubscriber, 'subscriptionDate'> & { subscriptionDate: any } = {
      email: subscriberData.email,
      name: subscriberData.name || '',
      subscriptionDate: serverTimestamp(),
      source: subscriberData.source || '',
      isActive: true,
      preferences: {
        frequency: 'immediate',
        topics: []
      }
    };
    
    await addDoc(collection(firestore, SUBSCRIBERS_COLLECTION), newSubscriber);
    
    // Also send the welcome email via EmailJS
    const emailResult = await subscribeToNewsletter(subscriberData);
    
    return { 
      success: true, 
      message: 'Thank you for subscribing to our newsletter! You will be notified when new content is published.' 
    };
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again later.' 
    };
  }
};

/**
 * Get all active subscribers
 * @returns Promise with array of subscribers
 */
export const getActiveSubscribers = async (): Promise<NewsletterSubscriber[]> => {
  try {
    const subscribersRef = collection(firestore, SUBSCRIBERS_COLLECTION);
    const q = query(subscribersRef, where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    
    const subscribers: NewsletterSubscriber[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      subscribers.push({
        email: data.email,
        name: data.name,
        subscriptionDate: data.subscriptionDate,
        source: data.source,
        isActive: data.isActive,
        lastNotified: data.lastNotified,
        preferences: data.preferences,
        id: doc.id
      } as NewsletterSubscriber);
    });
    
    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return [];
  }
};

/**
 * Send a notification to all subscribers about a new blog post
 * @param postTitle The title of the new blog post
 * @param postUrl The URL of the new blog post
 * @param postExcerpt A short excerpt from the post
 * @returns Promise with success status and message
 */
export const notifySubscribersAboutNewPost = async (
  postTitle: string,
  postUrl: string,
  postExcerpt: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // This function would be called from a Firebase Cloud Function
    // when a new blog post is published
    // For now, we'll just return a success message
    return { 
      success: true, 
      message: `Notification about "${postTitle}" would be sent to all subscribers.` 
    };
  } catch (error) {
    console.error('Error notifying subscribers:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to notify subscribers.' 
    };
  }
};

export default {
  addSubscriber,
  getActiveSubscribers,
  notifySubscribersAboutNewPost
};
