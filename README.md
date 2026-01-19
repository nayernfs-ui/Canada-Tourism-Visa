# Canada Tourism Visa Application Form

A comprehensive web form for applying for Canadian tourism visas. This project is built with HTML, CSS, and JavaScript, providing form validation and a user-friendly interface.

## Features

- **Personal Information**: Collect applicant details including name, date of birth, gender, nationality, and passport information
- **Contact Information**: Gather email, phone, and residential address
- **Travel Details**: Capture purpose of visit, duration, planned arrival date, and accommodation details
- **Employment & Financial Info**: Record occupation, employer, income, and fund sources
- **Documentation**: Track submitted supporting documents and insurance details
- **Form Validation**: Real-time client-side validation with error messages
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Semantic HTML with ARIA labels for screen readers

## Form Sections

1. **Personal Information** - Name, DOB, gender, nationality, passport
2. **Contact Information** - Email, phone, address, city, country
3. **Travel Details** - Purpose, duration, arrival date, accommodation
4. **Employment & Financial** - Occupation, employer, income, fund source
5. **Documentation** - Passport validity, insurance, supporting documents
6. **Declaration** - Truthfulness declaration and terms acknowledgment

## Installation

1. Clone or download this project
2. Navigate to the project directory
3. Open `index.html` in a web browser or use a local server

### Using Python HTTP Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Using Node.js HTTP Server
```bash
npx http-server
```

## Validation Rules

The form includes validation for:
- Required fields
- Email format
- Phone number format
- Year format (YYYY)
- Minimum length requirements
- Future dates for travel dates
- Checkbox confirmations

## File Structure

```
Canada-Tourism-Visa/
├── index.html       # Main HTML form
├── style.css        # Styling and responsive design
├── script.js        # Form validation and functionality
├── package.json     # Project metadata
└── README.md        # This file
```

## Customization

### Adding New Fields
1. Add the input field in `index.html`
2. Add validation rule in `script.js`'s `validationRules` object
3. Add corresponding error message element with appropriate ID

### Styling
- Update colors in `style.css`
- Modify the gradient colors in header and buttons
- Adjust breakpoints for responsive design

## API Integration

To integrate with a backend API:

1. Update the form submission in `script.js`:
```javascript
fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => { /* Handle response */ })
.catch(error => { /* Handle error */ });
```

2. Create an API endpoint to process the form data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Feel free to use this project for your visa application needs.

## Support

For issues or questions, please create an issue in the project repository.
