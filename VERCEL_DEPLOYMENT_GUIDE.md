# Vercel Deployment & Environment Variables Setup Guide

## ✅ Code Successfully Pushed to GitHub!

Your fixes have been pushed to GitHub and Vercel will automatically deploy them.

---

## 🔐 Required Environment Variables

You need to configure these environment variables in your Vercel project:

### 1. **SENDINBLUE_API_KEY** (Required)
- **Description:** Your Brevo (Sendinblue) API key for sending emails
- **How to get it:**
  1. Go to https://app.brevo.com/
  2. Login to your account
  3. Go to Settings → SMTP & API → API Keys
  4. Create a new API key or copy existing one
  5. Copy the API key (starts with `xkeysib-...`)

### 2. **RECIPIENT_EMAIL** (Required)
- **Description:** Email address where visa applications will be sent
- **Example:** `nayer.nfs@gmail.com`
- **Note:** This is where all form submissions will be delivered

### 3. **SENDER_EMAIL** (Required)
- **Description:** The "from" email address for sent emails
- **Example:** `nayer.nfs@gmail.com`
- **Note:** Must be verified in your Brevo account

---

## 📝 How to Add Environment Variables to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Login to your account

2. **Select Your Project:**
   - Click on "Canada-Tourism-Visa" project

3. **Open Settings:**
   - Click "Settings" tab at the top

4. **Add Environment Variables:**
   - Click "Environment Variables" from the left sidebar
   - Add each variable:

   **Variable 1:**
   ```
   Name: SENDINBLUE_API_KEY
   Value: [Your Brevo API Key - starts with xkeysib-...]
   Environment: Production, Preview, Development (select all)
   ```

   **Variable 2:**
   ```
   Name: RECIPIENT_EMAIL
   Value: nayer.nfs@gmail.com
   Environment: Production, Preview, Development (select all)
   ```

   **Variable 3:**
   ```
   Name: SENDER_EMAIL
   Value: nayer.nfs@gmail.com
   Environment: Production, Preview, Development (select all)
   ```

5. **Save:**
   - Click "Save" for each variable

6. **Redeploy:**
   - Go to "Deployments" tab
   - Click the three dots (...) on the latest deployment
   - Click "Redeploy"
   - Select "Use existing Build Cache" and click "Redeploy"

---

### Method 2: Using Vercel CLI (Alternative)

If you have Vercel CLI installed:

```bash
# Login to Vercel
vercel login

# Navigate to project
cd D:\Canada-Tourism-Visa

# Add environment variables
vercel env add SENDINBLUE_API_KEY
# [Paste your API key when prompted]

vercel env add RECIPIENT_EMAIL
# [Enter: nayer.nfs@gmail.com]

vercel env add SENDER_EMAIL
# [Enter: nayer.nfs@gmail.com]

# Deploy
vercel --prod
```

---

## 🔍 Verify Deployment

After adding environment variables and redeploying:

1. **Check Deployment Status:**
   - Go to Vercel Dashboard → Deployments
   - Wait for deployment to complete (green checkmark)

2. **Test Your Site:**
   - Visit your production URL (e.g., `https://canada-tourism-visa.vercel.app`)
   - Fill out the form
   - Submit and check if you receive the email

3. **Check Logs (if issues occur):**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Click "Function Logs" to see any errors

---

## ⚠️ Important Notes

### Brevo (Sendinblue) Setup:
1. **Verify Sender Email:**
   - Login to Brevo dashboard
   - Go to Senders → Add a new sender
   - Add and verify `nayer.nfs@gmail.com`
   - Check your email for verification link

2. **API Key Permissions:**
   - Ensure your API key has "Send emails" permission
   - You can check this in Brevo → Settings → API Keys

3. **Free Tier Limits:**
   - Brevo free tier: 300 emails per day
   - Should be sufficient for this application

---

## 🐛 Troubleshooting

### If form submission fails:

1. **Check Browser Console:**
   - Press F12 in browser
   - Go to Console tab
   - Look for error messages

2. **Check Vercel Function Logs:**
   - Vercel Dashboard → Deployments → Latest → Function Logs
   - Look for errors in `/api/send-form` function

3. **Common Issues:**
   - ❌ API key not set → Add environment variable
   - ❌ Email not verified → Verify sender in Brevo
   - ❌ Invalid API key → Check if key is correct
   - ❌ Daily limit reached → Upgrade Brevo plan or wait 24hrs

---

## 📊 Deployment Status

- ✅ Code pushed to GitHub
- ⏳ Vercel auto-deployment in progress
- ⏳ Environment variables need to be configured
- ⏳ Testing required after variables are set

---

## 🎯 Next Steps

1. [ ] Get Brevo API key from https://app.brevo.com/
2. [ ] Add environment variables to Vercel dashboard
3. [ ] Redeploy the application
4. [ ] Test form submission
5. [ ] Check email delivery
6. [ ] Verify Word document attachment

---

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel function logs
2. Verify Brevo dashboard for email activity
3. Test with a simple form submission
4. Check browser console for client-side errors

---

**Current Vercel Project URL:** https://canada-tourism-visa.vercel.app
(or your custom domain if configured)
