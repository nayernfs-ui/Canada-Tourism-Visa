# Email Configuration Setup

To enable email sending for the visa application form, follow these steps:

## 1. Create an EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com)
- Sign up for a free account
- Verify your email address

## 2. Get Your Public Key
- In EmailJS dashboard, go to **Account**
- Copy your **Public Key**

## 3. Update the Script
Replace `YOUR_EMAILJS_PUBLIC_KEY` in `script.js` with your actual public key:

```javascript
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY_HERE');
```

## 4. Create Email Service and Template

### Option A: Quick Setup (Recommended)
1. In EmailJS dashboard, go to **Email Services**
2. Create a new service or use Gmail/Outlook
3. Note your **Service ID** (e.g., `default_service`)
4. Go to **Email Templates**
5. Create a template with:
   - **Name**: Use the template name in the code
   - **Template ID**: Create one or use `default_template`
   - **Subject**: `New Canada Tourism Visa Application`
   - **Content**: 
     ```
     {{form_content}}
     
     From: {{from_name}}
     Reply-to: {{reply_to}}
     ```

### Option B: Using Built-in Service
1. Use your own email or Gmail account in EmailJS
2. Update the service and template IDs in `script.js` line 153-160

## 5. Test the Configuration
- Submit a test form entry
- Check your inbox at nayer.nfs@gmail.com
- Verify you receive the application data

## Environment Variables (Optional for Production)
For security, you can also store the public key as an environment variable in Vercel:
1. Go to your Vercel project settings
2. Add environment variable: `VITE_EMAILJS_PUBLIC_KEY`
3. Update the initialization code accordingly

## Support
For more details, visit [EmailJS Documentation](https://www.emailjs.com/docs/)
