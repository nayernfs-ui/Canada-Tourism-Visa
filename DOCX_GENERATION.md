# Word Document Generation Setup

## Overview

The Canada Tourism Visa application form now automatically generates a Word (.docx) document when users submit the form. This document is attached to the confirmation email sent via Brevo.

## Features

✅ **Automatic Document Generation** - A Word document is created for each submission  
✅ **Professional Formatting** - Formatted table with borders and headers  
✅ **Email Attachment** - Document is automatically attached to the confirmation email  
✅ **Unique Filenames** - Each document is named with the applicant's name and timestamp  
✅ **Complete Data** - All form fields are included in the document  

## How It Works

1. **Form Submission**: User submits the visa application form
2. **Document Generation**: The API automatically creates a .docx file with all submitted data
3. **Email with Attachment**: The Word document is converted to base64 and attached to the email
4. **Email Delivery**: The email with the Word document attachment is sent via Brevo

## File Structure

The document contains:
- Title: "Canada Tourism Visa Application"
- Submission timestamp
- Table with all form fields and their values
- Professional formatting with borders and headers

Example document structure:
```
Canada Tourism Visa Application
Submitted on: 01/24/2026 10:30 AM

[Table]
Field                    | Value
Full Name               | John Doe
Email                   | john@example.com
Phone                   | +1234567890
... (all other fields)
```

## Technical Implementation

### Dependencies
- **docx** (^8.5.0): Library for generating Word documents

### API Changes

The API endpoint `/api/send-form` now:

1. Receives form data via POST
2. Generates a Word document using the `docx` library
3. Converts the document to base64
4. Attaches it to the Brevo email API request
5. Sends the email with the attachment

### Code Structure

```javascript
// Generate Word document from form data
async function generateWordDocument(formData) {
  // Creates Document with:
  // - Title and timestamp
  // - Table of all form fields
  // - Professional formatting and borders
  
  return await Packer.toBuffer(doc);
}
```

## Installation & Deployment

### Local Setup
```bash
npm install docx
```

### Vercel Deployment
1. The `package.json` includes docx as a dependency
2. Push changes to your GitHub repository
3. Vercel automatically installs dependencies during build
4. No additional configuration needed

### Environment Variables
No new environment variables required. Uses existing:
- `SENDINBLUE_API_KEY`
- `SENDER_EMAIL`
- `RECIPIENT_EMAIL`

## Email Attachment Details

- **Format**: .docx (Microsoft Word format)
- **Filename**: `Canada_Visa_Application_[Full_Name]_[Timestamp].docx`
- **Size**: Varies based on data (typically 10-50 KB)
- **Compatibility**: Opens in Microsoft Word, Google Docs, LibreOffice, etc.

## Example Filename

```
Canada_Visa_Application_Ahmad_Ahmed_1704098000000.docx
```

## Benefits

1. **Permanent Record**: Applicants receive a copy of their submission
2. **Professional**: Word documents look professional and official
3. **Easy Sharing**: Recipients can easily share or print the document
4. **Archiving**: Documents can be organized and archived by date/name
5. **Accessibility**: Works with all major office software

## Testing

To test the Word document generation:

1. Fill out the visa application form
2. Submit the form
3. Check the email with the confirmation
4. Download and open the attached .docx file
5. Verify all form data appears in the table

## Troubleshooting

### Document Not Attached
- Verify Brevo API key is valid
- Check that `RECIPIENT_EMAIL` is set correctly
- Ensure the docx package is installed (`npm list docx`)

### Missing or Malformed Data
- Verify form data is being collected correctly
- Check browser console for validation errors
- Check Vercel logs for API errors

### Email Not Received
- Check spam/junk folder
- Verify email configuration in Brevo
- Check Vercel environment variables are set
- Wait 5 minutes after redeployment

## Future Enhancements

Possible improvements:
- [ ] Custom logo/branding in document
- [ ] Multi-page documents with sections
- [ ] Barcode/QR code for tracking
- [ ] Digital signature fields
- [ ] Multi-language document support
- [ ] PDF alternative format
- [ ] Document watermark with submission ID

## Notes

- Word documents are generated server-side for security
- Document generation uses the `docx` npm package
- All form data is preserved in the document
- Documents are sent via email and not stored on the server
- File naming includes applicant name for easy identification
