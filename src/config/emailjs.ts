import emailjs from '@emailjs/browser';

// Debug: Log environment variables
console.log('EmailJS Environment Variables Status:', {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID ? 'Exists' : 'Missing',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? 'Exists' : 'Missing',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? 'Exists' : 'Missing',
  // Only log partial values in development for debugging
  ...(import.meta.env.DEV ? {
    SERVICE_ID_VALUE: import.meta.env.VITE_EMAILJS_SERVICE_ID?.substring(0, 3) + '...',
    TEMPLATE_ID_VALUE: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.substring(0, 3) + '...',
    PUBLIC_KEY_VALUE: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.substring(0, 3) + '...',
  } : {})
});

// Use environment variables without fallbacks
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Log the actual config being used (with partial key for security)
console.log('EmailJS Config Being Used:', {
  SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID ? EMAILJS_CONFIG.SERVICE_ID.substring(0, 3) + '...' : 'Missing',
  TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID ? EMAILJS_CONFIG.TEMPLATE_ID.substring(0, 3) + '...' : 'Missing',
  PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 3) + '...' : 'Missing',
});

// Initialize EmailJS with your public key
if (EMAILJS_CONFIG.PUBLIC_KEY) {
  console.log('Initializing EmailJS with public key');
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
  }
} else {
  console.error('EmailJS initialization failed: Missing public key');
}
