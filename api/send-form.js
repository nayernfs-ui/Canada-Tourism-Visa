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

    // Format form data for email body
    const formDataHtml = Object.entries(formData)
      .map(([key, value]) => {
        const displayKey = key.replace(/_/g, ' ');
        return `<tr><td><strong>${displayKey}:</strong></td><td>${value || 'N/A'}</td></tr>`;
      })
      .join('');

    // Call Brevo API via REST endpoint
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { 
          name: 'Canada Visa Form', 
          email: SENDER_EMAIL 
        },
        to: [{ 
          email: RECIPIENT_EMAIL,
          name: 'Visa Team'
        }],
        subject: `Canada Tourism Visa Application - ${formData.Full_Name || 'Applicant'}`,
        htmlContent: `
          <h2>Canada Tourism Visa Application Submission</h2>
          <p>A new visa application has been submitted. Details below:</p>
          <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
            ${formDataHtml}
          </table>
          <hr>
          <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
        `
      })
    });

    const brevoResult = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error('Brevo API Error:', brevoResult);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: brevoResult.message || 'Unknown error'
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted and email sent successfully',
      messageId: brevoResult.messageId
    });
  } catch (error) {
    console.error('Email Processing Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process form',
      details: error.message 
    });
  }
}

