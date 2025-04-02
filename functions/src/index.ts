import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin
admin.initializeApp();
const firestore = admin.firestore();

// Configure email transporter
// Note: In production, use environment variables for these credentials
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

/**
 * Cloud Function triggered when a new blog post is added to Firestore
 * It sends an email notification to all active subscribers
 */
export const sendNewBlogPostNotification = functions.firestore
  .document('blog_posts/{postId}')
  .onCreate(async (snapshot, context) => {
    try {
      const postData = snapshot.data();
      const postId = context.params.postId;
      
      // Only send notifications for published posts
      if (!postData.isPublished) {
        console.log('Post is not published, skipping notification');
        return null;
      }
      
      // Get all active subscribers
      const subscribersSnapshot = await firestore
        .collection('newsletter_subscribers')
        .where('isActive', '==', true)
        .get();
      
      if (subscribersSnapshot.empty) {
        console.log('No active subscribers found');
        return null;
      }
      
      // Prepare email content
      const emailSubject = `New Blog Post: ${postData.title}`;
      const blogUrl = `https://voltifygroup.com/blog/${postId}`;
      
      // Create email content with responsive design
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailSubject}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              max-width: 150px;
              height: auto;
            }
            .content {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #4a6cf7;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              font-weight: bold;
            }
            .footer {
              font-size: 12px;
              text-align: center;
              color: #666;
              margin-top: 30px;
            }
            .unsubscribe {
              color: #999;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://voltifygroup.com/images/logo.png" alt="Voltify Group" class="logo">
            <h1>New Blog Post</h1>
          </div>
          
          <div class="content">
            <h2>${postData.title}</h2>
            <p>${postData.excerpt || 'Check out our latest blog post!'}</p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="${blogUrl}" class="button">Read Full Article</a>
            </p>
          </div>
          
          <div class="footer">
            <p>  ${new Date().getFullYear()} Voltify Group. All rights reserved.</p>
            <p>
              <a href="https://voltifygroup.com/unsubscribe" class="unsubscribe">
                Unsubscribe from these emails
              </a>
            </p>
          </div>
        </body>
        </html>
      `;
      
      // Send emails to all subscribers
      const emailPromises = subscribersSnapshot.docs.map(async (doc) => {
        const subscriber = doc.data();
        
        const mailOptions = {
          from: `"Voltify Group" <${process.env.EMAIL_USER}>`,
          to: subscriber.email,
          subject: emailSubject,
          html: htmlContent,
        };
        
        try {
          await transporter.sendMail(mailOptions);
          
          // Update the lastNotified timestamp for this subscriber
          await doc.ref.update({
            lastNotified: admin.firestore.FieldValue.serverTimestamp()
          });
          
          return { email: subscriber.email, success: true };
        } catch (error) {
          console.error(`Error sending email to ${subscriber.email}:`, error);
          return { email: subscriber.email, success: false, error: String(error) };
        }
      });
      
      const results = await Promise.all(emailPromises);
      const successCount = results.filter(r => r.success).length;
      
      console.log(`Successfully sent ${successCount} of ${results.length} emails`);
      return { success: true, emailsSent: successCount, totalSubscribers: results.length };
    } catch (error) {
      console.error('Error in sendNewBlogPostNotification:', error);
      return { success: false, error: String(error) };
    }
  });

/**
 * HTTP endpoint to manually trigger sending a notification about a specific blog post
 */
export const manualSendBlogNotification = functions.https.onCall(async (data, context) => {
  // Check if the request is made by an admin (you would implement proper auth checks)
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to trigger notifications'
    );
  }
  
  try {
    const { postId } = data;
    if (!postId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Post ID is required'
      );
    }
    
    // Get the post data
    const postDoc = await firestore.collection('blog_posts').doc(postId).get();
    if (!postDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Blog post not found'
      );
    }
    
    // Create a temporary document to trigger the onCreate function
    const tempRef = firestore.collection('temp_notifications').doc();
    await tempRef.set({
      triggeredBy: context.auth.uid,
      postId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true, message: 'Notification process started' };
  } catch (error: unknown) {
    console.error('Error in manualSendBlogNotification:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new functions.https.HttpsError(
      'internal',
      errorMessage
    );
  }
});

/**
 * Scheduled function to clean up inactive subscribers
 * Runs once a month
 */
export const cleanupInactiveSubscribers = functions.pubsub
  .schedule('0 0 1 * *') // Run at midnight on the 1st of every month
  .timeZone('America/New_York')
  .onRun(async (context) => {
    try {
      // Get subscribers who haven't been active for over 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const inactiveSnapshot = await firestore
        .collection('newsletter_subscribers')
        .where('lastNotified', '<', admin.firestore.Timestamp.fromDate(sixMonthsAgo))
        .get();
      
      if (inactiveSnapshot.empty) {
        console.log('No inactive subscribers to clean up');
        return null;
      }
      
      // Mark subscribers as inactive rather than deleting them
      const updatePromises = inactiveSnapshot.docs.map(doc => 
        doc.ref.update({ isActive: false })
      );
      
      await Promise.all(updatePromises);
      
      console.log(`Marked ${inactiveSnapshot.size} subscribers as inactive`);
      return { success: true, inactiveCount: inactiveSnapshot.size };
    } catch (error: unknown) {
      console.error('Error in cleanupInactiveSubscribers:', error);
      return { success: false, error: String(error) };
    }
  });
