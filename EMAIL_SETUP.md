# Email Configuration Setup

The form now uses Web3Forms for email delivery. It's completely free and requires just one simple setup step.

## Quick Setup (2 minutes)

1. **Go to Web3Forms**: https://web3forms.com
2. **Sign up** with your email (nayer.nfs@gmail.com)
3. **Verify your email** (check your inbox)
4. **Copy your Access Key** from the dashboard
5. **Go to Vercel Project Settings**: https://vercel.com/projects
6. **Add Environment Variable**:
   - Name: `WEB3FORMS_ACCESS_KEY`
   - Value: Paste your access key
   - Click Save

## That's it! 🎉

The form will now send emails to nayer.nfs@gmail.com automatically when users submit the visa application.

## How it works

- Form data is sent to your Vercel API endpoint (`/api/send-form`)
- The API forwards the data to Web3Forms
- Web3Forms delivers the email to nayer.nfs@gmail.com
- All form fields are included in the email

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify email address on Web3Forms website
- Check that access key is correctly set in Vercel environment variables

**Need support?**
- Web3Forms: https://web3forms.com/help
- Vercel Environment Variables: https://vercel.com/docs/projects/environment-variables

