const SibApiV3Sdk = require('sib-api-v3-sdk');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Configuration using environment variables
    const API_KEY = process.env.SENDINBLUE_API_KEY;
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'nayer.nfs@gmail.com';
    const SENDER_EMAIL = process.env.SENDER_EMAIL || 'nayer.nfs@gmail.com';

    if (!API_KEY) {
      return res.status(500).json({ 
        error: 'Email service not configured',
        message: 'SENDINBLUE_API_KEY environment variable is missing'
      });
    }

    // Initialize Brevo Client
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = API_KEY;
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Format form data for email body
    const formDataHtml = Object.entries(formData)
      .map(([key, value]) => {
        const displayKey = key.replace(/_/g, ' ');
        return `<tr><td><strong>${displayKey}:</strong></td><td>${value || 'N/A'}</td></tr>`;
      })
      .join('');

    // Construct Brevo Email
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `Canada Tourism Visa Application - ${formData.Full_Name || 'Applicant'}`;
    sendSmtpEmail.htmlContent = `
      <h2>Canada Tourism Visa Application Submission</h2>
      <p>A new visa application has been submitted. Details below:</p>
      <table border="1" cellpadding="10">
        ${formDataHtml}
      </table>
    `;
    sendSmtpEmail.sender = { name: 'Canada Visa Form', email: SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: RECIPIENT_EMAIL }];

    // Send the Email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted and email sent successfully' 
    });
  } catch (error) {
    console.error('Brevo Email Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process form',
      details: error.message 
    });
  }
}

