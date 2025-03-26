# Firebase Storage Setup Guide

## Step 1: Enable Firebase Storage in Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/voltify-c2a99/storage)
2. Click the "Get Started" button for Firebase Storage
3. Choose your preferred storage location (usually the one closest to your users)
4. Select "Start in Production Mode" (we'll update the rules later)
5. Click "Next" and complete the setup

## Step 2: Deploy Storage Rules

After completing the console setup, run this command in your terminal:

```bash
firebase deploy --only storage
```

This will deploy the storage rules we've already created that allow uploads from:
- localhost:8080 (for development)
- voltifygroup.com
- www.voltifygroup.com

## Step 3: Test Your Contact Form

Once the rules are deployed, your contact form should work properly with resume uploads!

## Troubleshooting

If you still encounter CORS issues:
1. Make sure you've completed both steps above
2. Check that your Firebase project is on the Blaze plan (pay-as-you-go) as some features require this
3. Try using the fallback mechanism we've implemented (it will use direct email attachments for small files)
