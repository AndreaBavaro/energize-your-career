# Newsletter Subscription and Notification System

This document outlines how the newsletter subscription and notification system works for the Energize Your Career website.

## Overview

The system allows users to subscribe to the newsletter from the website and automatically sends email notifications when new blog posts are published. It uses Firebase Firestore for storing subscriber data and Firebase Cloud Functions for sending email notifications.

## Components

1. **Frontend Newsletter Component**: Collects user email addresses
2. **Subscriber Service**: Stores subscriber data in Firebase Firestore
3. **EmailJS Integration**: Sends welcome emails to new subscribers
4. **Firebase Cloud Functions**: Sends notifications when new blog posts are published

## Setup Instructions

### 1. Firebase Configuration

Ensure your Firebase project has Firestore enabled:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init
```

### 2. Deploy Firebase Functions

```bash
# Navigate to the functions directory
cd functions

# Install dependencies
npm install

# Deploy functions
npm run deploy
```

### 3. Configure EmailJS

1. Sign up for an [EmailJS account](https://www.emailjs.com/)
2. Create an email service and template for welcome emails
3. Update the credentials in `src/services/newsletterService.ts`:
   ```typescript
   const SERVICE_ID = 'YOUR_SERVICE_ID';
   const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```

### 4. Configure Email Notifications

For the Firebase Cloud Function to send emails, you need to set environment variables:

```bash
# Set Gmail credentials for the Cloud Function
firebase functions:config:set email.user="your-email@gmail.com" email.password="your-app-password"

# Note: For Gmail, you'll need to use an App Password, not your regular password
# See: https://support.google.com/accounts/answer/185833
```

## How It Works

### Subscription Process

1. User enters their email in the newsletter form
2. The email is validated on the frontend
3. The subscriber is added to the Firestore database
4. A welcome email is sent via EmailJS

### Notification Process

1. When a new blog post is added to Firestore, a Cloud Function is triggered
2. The function retrieves all active subscribers
3. It sends an email notification to each subscriber
4. It updates the `lastNotified` timestamp for each subscriber

### Maintenance

- A scheduled Cloud Function runs monthly to mark subscribers as inactive if they haven't been notified in 6+ months
- You can manually trigger notifications for specific blog posts using the `manualSendBlogNotification` function

## Data Structure

### Firestore Collections

#### `newsletter_subscribers`

```typescript
interface NewsletterSubscriber {
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
```

#### `blog_posts`

```typescript
interface BlogPost {
  title: string;
  content: string;
  excerpt?: string;
  isPublished: boolean;
  publishDate: Timestamp;
  // Other blog post fields
}
```

## Performance Considerations

- The system is designed to be efficient and scalable:
  - Uses Firestore for real-time data storage
  - Implements batch processing for sending emails
  - Optimizes email HTML for fast loading
  - Uses responsive design for better mobile experience

## Future Enhancements

1. **Subscription Preferences**: Allow subscribers to choose topics of interest
2. **Email Frequency Options**: Let subscribers choose daily/weekly digests instead of immediate notifications
3. **Analytics Integration**: Track open rates and click-through rates
4. **Unsubscribe Portal**: Create a self-service portal for managing subscriptions

## Troubleshooting

If emails are not being sent:

1. Check Firebase Function logs: `firebase functions:log`
2. Verify EmailJS credentials are correct
3. Ensure the Gmail account used for sending has "Less secure app access" enabled or is using App Passwords
4. Check if there are any Firebase quota limitations
