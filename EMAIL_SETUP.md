# Email Configuration Setup

The form now uses **Brevo (SendInBlue)** for reliable email delivery. It's free and professional.

## Quick Setup (5 minutes)

### Step 1: Sign up for Brevo
1. **Go to Brevo**: https://www.brevo.com/
2. **Sign up** with your email (nayer.nfs@gmail.com)
3. **Verify your email** (check your inbox)
4. **Navigate to API & Apps** section
5. **Copy your SMTP API Key** (it starts with `xsmtpapi-`)

### Step 2: Configure Vercel Environment Variables
1. **Go to Vercel Project Settings**: https://vercel.com/projects
2. **Select your Canada Tourism Visa project**
3. **Go to Settings → Environment Variables**
4. **Add THREE environment variables**:
   - Name: `SENDINBLUE_API_KEY`
     Value: Your SMTP API key from Brevo (starts with `xsmtpapi-`)
   - Name: `SENDER_EMAIL`
     Value: Your sender email (e.g., nayer.nfs@gmail.com)
   - Name: `RECIPIENT_EMAIL`
     Value: Where to receive applications (e.g., nayer.nfs@gmail.com)
5. **Click Save**

### Step 3: Redeploy
- Go back to your Vercel dashboard
- Click **Redeploy** to apply the new environment variables
- OR push a new commit to trigger automatic deployment

## That's it! 🎉

The form will now send emails through Brevo when users submit the visa application.

## How it works

- Form data is sent to your Vercel API endpoint (`/api/send-form`)
- The API uses Brevo's SMTP API to send formatted emails
- Emails arrive at your RECIPIENT_EMAIL with all application details
- Brevo provides delivery tracking and inbox placement tools

## Brevo Benefits
- **Free plan**: Up to 300 emails/day
- **Professional delivery**: Better inbox placement than form services
- **Tracking**: See delivery status and opens
- **Attachments**: Can add PDF/DOCX files if needed
- **Support**: Professional support team

## Troubleshooting

**Email not received?**
- Check that all 3 environment variables are set in Vercel
- Verify the API key starts with `xsmtpapi-`
- Check your RECIPIENT_EMAIL setting matches your email
- Check spam/junk folder
- Wait 5 minutes after redeploy for changes to take effect

**"Email service not configured" error?**
- Go to Vercel → Project Settings → Environment Variables
- Confirm `SENDINBLUE_API_KEY` is set with a valid key
- Redeploy your project

**Need support?**
- Brevo Help: https://www.brevo.com/help
- Vercel Environment Variables: https://vercel.com/docs/projects/environment-variables


