export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Send to Web3Forms endpoint
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        email: 'nayer.nfs@gmail.com',
        subject: 'New Canada Tourism Visa Application',
        from_name: formData.Full_Name || 'Visa Applicant',
        ...formData
      })
    });

    const result = await response.json();

    if (result.success) {
      return res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } else {
      return res.status(400).json({ error: 'Failed to submit form', details: result });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ error: 'Failed to process form', details: error.message });
  }
}

