import React, { useState, useEffect } from 'react';
import { firestore } from '@/config/firebase';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { getActiveSubscribers, notifySubscribersAboutNewPost } from '@/services/subscriberService';

// Lazy load components for better performance
const AdminLayout = React.lazy(() => import('@/components/admin/AdminLayout'));

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscriptionDate: Timestamp;
  isActive: boolean;
  lastNotified?: Timestamp;
}

const NewsletterAdmin: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationUrl, setNotificationUrl] = useState('');
  const [notificationExcerpt, setNotificationExcerpt] = useState('');
  const [sendingNotification, setSendingNotification] = useState(false);

  // Load subscribers on component mount
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const activeSubscribers = await getActiveSubscribers();
      
      // Convert to the component's Subscriber type
      const formattedSubscribers = activeSubscribers.map(sub => ({
        id: sub.id || '',
        email: sub.email,
        name: sub.name,
        subscriptionDate: sub.subscriptionDate,
        isActive: sub.isActive,
        lastNotified: sub.lastNotified
      }));
      
      setSubscribers(formattedSubscribers);
      setError('');
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      setError('Failed to load subscribers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateSubscriber = async (subscriberId: string) => {
    try {
      const subscriberRef = doc(firestore, 'newsletter_subscribers', subscriberId);
      await updateDoc(subscriberRef, { isActive: false });
      
      // Update local state
      setSubscribers(prev => 
        prev.map(sub => 
          sub.id === subscriberId ? { ...sub, isActive: false } : sub
        )
      );
    } catch (err) {
      console.error('Error deactivating subscriber:', err);
      setError('Failed to deactivate subscriber. Please try again.');
    }
  };

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this subscriber?')) {
      return;
    }
    
    try {
      const subscriberRef = doc(firestore, 'newsletter_subscribers', subscriberId);
      await deleteDoc(subscriberRef);
      
      // Update local state
      setSubscribers(prev => prev.filter(sub => sub.id !== subscriberId));
    } catch (err) {
      console.error('Error deleting subscriber:', err);
      setError('Failed to delete subscriber. Please try again.');
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notificationTitle || !notificationUrl) {
      setNotificationStatus('Please provide both title and URL for the notification.');
      return;
    }
    
    try {
      setSendingNotification(true);
      
      const result = await notifySubscribersAboutNewPost(
        notificationTitle,
        notificationUrl,
        notificationExcerpt
      );
      
      if (result.success) {
        setNotificationStatus(`Success! ${result.message}`);
        // Clear form
        setNotificationTitle('');
        setNotificationUrl('');
        setNotificationExcerpt('');
      } else {
        setNotificationStatus(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error('Error sending notification:', err);
      setNotificationStatus('Failed to send notification. Please try again.');
    } finally {
      setSendingNotification(false);
    }
  };

  return (
    <React.Suspense fallback={<div className="p-8 text-center">Loading admin panel...</div>}>
      <AdminLayout title="Newsletter Management">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Post Title
                </label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter blog post title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Post URL
                </label>
                <input
                  type="url"
                  value={notificationUrl}
                  onChange={(e) => setNotificationUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://voltifygroup.com/blog/post-slug"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Post Excerpt (optional)
                </label>
                <textarea
                  value={notificationExcerpt}
                  onChange={(e) => setNotificationExcerpt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter a short excerpt from the blog post"
                  rows={3}
                />
              </div>
              
              <button
                type="submit"
                disabled={sendingNotification}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {sendingNotification ? 'Sending...' : 'Send Notification'}
              </button>
              
              {notificationStatus && (
                <p className={`text-sm ${notificationStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                  {notificationStatus}
                </p>
              )}
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Subscriber List</h2>
              <p className="text-sm text-gray-600 mt-1">
                Total Active Subscribers: {subscribers.filter(s => s.isActive).length}
              </p>
            </div>
            
            {loading ? (
              <div className="p-6 text-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-gray-600">Loading subscribers...</p>
              </div>
            ) : subscribers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No subscribers found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Notified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{subscriber.name || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {subscriber.subscriptionDate?.toDate().toLocaleDateString() || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {subscriber.lastNotified?.toDate().toLocaleDateString() || 'Never'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeactivateSubscriber(subscriber.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Deactivate
                          </button>
                          <button
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </React.Suspense>
  );
};

export default NewsletterAdmin;
