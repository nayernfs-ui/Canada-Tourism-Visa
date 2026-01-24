const { Document, Packer, Paragraph, Table, TableCell, TableRow, BorderStyle, VerticalAlign, convertInchesToTwip, HeadingLevel } = require('docx');

module.exports = async function handler(req, res) {
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

    // Generate Word document
    const docxBuffer = await generateWordDocument(formData);

    // Format form data for email body
    const formDataHtml = Object.entries(formData)
      .map(([key, value]) => {
        const displayKey = key.replace(/_/g, ' ');
        return `<tr><td><strong>${displayKey}:</strong></td><td>${value || 'N/A'}</td></tr>`;
      })
      .join('');

    // Convert buffer to base64 for email attachment
    const base64Document = docxBuffer.toString('base64');

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
        `,
        attachment: [
          {
            name: `Canada_Visa_Application_${formData.Full_Name || 'Application'}_${new Date().getTime()}.docx`,
            content: base64Document
          }
        ]
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
      message: 'Form submitted and email sent successfully with Word document attachment',
      messageId: brevoResult.messageId
    });
  } catch (error) {
    console.error('Email Processing Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process form',
      details: error.message 
    });
  }
};

// Function to generate Word document
async function generateWordDocument(formData) {
  // Convert form data to table rows
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Field')],
          shading: { fill: '4472C4' },
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
        }),
        new TableCell({
          children: [new Paragraph('Value')],
          shading: { fill: '4472C4' },
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
        }),
      ],
    }),
    ...Object.entries(formData).map(([key, value]) => {
      const displayKey = key.replace(/_/g, ' ');
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(displayKey)],
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
          }),
          new TableCell({
            children: [new Paragraph(value || 'N/A')],
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
          }),
        ],
      });
    }),
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'Canada Tourism Visa Application',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: `Submitted on: ${new Date().toLocaleString()}`,
            style: 'Normal',
          }),
          new Paragraph(''),
          new Table({
            width: { size: 100, type: 'percentage' },
            rows: tableRows,
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            },
          }),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

