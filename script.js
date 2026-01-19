// Form Validation
const form = document.getElementById('visaForm');

// Validation rules
const validationRules = {
  Full_Name: { required: true, minLength: 2, message: 'Please enter a valid full name' },
  DOB_Day: { required: true, message: 'Please select a day' },
  DOB_Month: { required: true, message: 'Please select a month' },
  DOB_Year: { 
    required: true, 
    pattern: /^\d{4}$/, 
    message: 'Please enter a valid year (YYYY)' 
  },
  Gender: { required: true, message: 'Please select a gender' },
  Nationality: { required: true, message: 'Please enter your nationality' },
  Passport_Number: { required: true, minLength: 5, message: 'Please enter a valid passport number' },
  Email: { 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    message: 'Please enter a valid email address' 
  },
  Phone: { 
    required: true, 
    pattern: /^[+]?[\d\s().-]{10,}$/, 
    message: 'Please enter a valid phone number' 
  },
  Address: { required: true, message: 'Please enter your residential address' },
  City: { required: true, message: 'Please enter your city' },
  Country: { required: true, message: 'Please enter your country' },
  Purpose: { required: true, message: 'Please select the purpose of visit' },
  Visit_Duration: { required: true, min: 1, message: 'Please enter a valid duration' },
  Arrival_Day: { required: true, message: 'Please select a day' },
  Arrival_Month: { required: true, message: 'Please select a month' },
  Arrival_Year: { 
    required: true, 
    pattern: /^\d{4}$/, 
    message: 'Please enter a valid year (YYYY)' 
  },
  Occupation: { required: true, message: 'Please enter your occupation' },
  TruthfulDeclaration: { required: true, message: 'You must declare the information is truthful' },
  UnderstandTerms: { required: true, message: 'You must acknowledge the terms' },
};

// Validate a single field
function validateField(fieldName, fieldElement) {
  const rule = validationRules[fieldName];
  if (!rule) return true; // No validation rule

  let value = fieldElement.value.trim();
  const errorElement = document.getElementById(`error-${fieldName}`) || 
                       document.getElementById(`error-${fieldName.toLowerCase()}`);

  // Check for checkboxes
  if (fieldElement.type === 'checkbox') {
    if (rule.required && !fieldElement.checked) {
      if (errorElement) {
        errorElement.textContent = rule.message;
        errorElement.classList.remove('hidden');
      }
      return false;
    }
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
    }
    return true;
  }

  // Check required
  if (rule.required && !value) {
    if (errorElement) {
      errorElement.textContent = rule.message;
      errorElement.classList.remove('hidden');
    }
    return false;
  }

  // Check minLength
  if (rule.minLength && value.length < rule.minLength) {
    if (errorElement) {
      errorElement.textContent = rule.message;
      errorElement.classList.remove('hidden');
    }
    return false;
  }

  // Check pattern
  if (rule.pattern && value && !rule.pattern.test(value)) {
    if (errorElement) {
      errorElement.textContent = rule.message;
      errorElement.classList.remove('hidden');
    }
    return false;
  }

  // Check min value
  if (rule.min !== undefined && parseInt(value) < rule.min) {
    if (errorElement) {
      errorElement.textContent = rule.message;
      errorElement.classList.remove('hidden');
    }
    return false;
  }

  // Clear error message
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }

  return true;
}

// Validate all fields
function validateForm() {
  const formElements = form.querySelectorAll('input, select, textarea');
  let isValid = true;

  formElements.forEach((element) => {
    if (element.name && validationRules[element.name]) {
      if (!validateField(element.name, element)) {
        isValid = false;
      }
    }
  });

  return isValid;
}

// Add real-time validation
document.querySelectorAll('input, select, textarea').forEach((element) => {
  if (element.name && validationRules[element.name]) {
    element.addEventListener('blur', () => {
      validateField(element.name, element);
    });

    element.addEventListener('change', () => {
      validateField(element.name, element);
    });
  }
});

// Form submission handler
function handleFormSubmit(e) {
  e.preventDefault();

  if (validateForm()) {
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Send form data via API
    fetch('/api/send-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert('Application submitted successfully! We will review your information and contact you soon.');
          form.reset();
        } else {
          alert('Application submitted but there was an issue sending the confirmation email. Please contact support.');
          form.reset();
        }
      })
      .catch(error => {
        console.error('Error sending form:', error);
        alert('Application submitted but there was an issue sending the confirmation email. Please contact support.');
        form.reset();
      });
  } else {
    alert('Please fix the errors in the form before submitting.');
    // Scroll to first error
    const firstError = document.querySelector('.error-message:not(.hidden)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Initialize EmailJS
window.addEventListener('load', () => {
  // Attach form submission handler after DOM is ready
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
    sendFormEmail(emailContent, data)
      .then(() => {
        alert('Application submitted successfully! We will review your information and contact you soon.');
        form.reset();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Application submitted but there was an issue sending the confirmation email. Please contact support.');
        form.reset();
      });
  } else {
    alert('Please fix the errors in the form before submitting.');
    // Scroll to first error
    const firstError = document.querySelector('.error-message:not(.hidden)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Date validation helper
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === parseInt(month) - 1 &&
    date.getDate() === parseInt(day)
  );
}

// Validate that arrival date is in the future
document.getElementById('arrivalYear')?.addEventListener('change', () => {
  const day = document.getElementById('arrivalDay').value;
  const month = document.getElementById('arrivalMonth').value;
  const year = document.getElementById('arrivalYear').value;

  if (day && month && year) {
    const arrivalDate = new Date(year, month - 1, day);
    const today = new Date();
    if (arrivalDate < today) {
      const errorElement = document.getElementById('error-arrivalDate');
      if (errorElement) {
        errorElement.textContent = 'Arrival date must be in the future';
        errorElement.classList.remove('hidden');
      }
    }
  }
});

// Log form state (for debugging)
console.log('Canada Tourism Visa Form loaded successfully');
// Toggle stay fields visibility
function toggleStayFields() {
  const stayFieldsContainer = document.getElementById('stayFieldsContainer');
  const radioButtons = document.getElementsByName('stayOutsideOriginCountry');
  
  const selectedValue = Array.from(radioButtons).find(radio => radio.checked)?.value;
  
  if (selectedValue === 'نعم') {
    stayFieldsContainer.style.display = 'block';
  } else {
    stayFieldsContainer.style.display = 'none';
  }
}

// Add new country entry
let countryCount = 1;

function addCountryEntry() {
  countryCount++;
  const countriesContainer = document.getElementById('countriesContainer');
  
  const newCountryEntry = document.createElement('div');
  newCountryEntry.className = 'country-entry';
  newCountryEntry.innerHTML = `
    <div class="country-entry-header">
      <h4>البلد ${countryCount}</h4>
      <button type="button" class="btn-remove-country" onclick="removeCountryEntry(this)">حذف</button>
    </div>
    
    <div class="question-group">
      <label>اسم البلد</label>
      <input
        type="text"
        class="countryName"
        name="Country_Name_${countryCount}"
        placeholder="أدخل اسم البلد"
      />
    </div>

    <div class="question-group">
      <label>الحالة (مواطن - مقيم - مهاجر - اخرى)</label>
      <input
        type="text"
        class="countryStatus"
        name="Country_Status_${countryCount}"
        placeholder="اختر الحالة"
      />
    </div>

    <div class="question-group">
      <label>من يوم - شهر - سنة</label>
      <div class="date-row-small">
        <input
          type="number"
          name="Country_ResidenceDay_${countryCount}"
          placeholder="يوم"
          min="1"
          max="31"
        />
        <input
          type="number"
          name="Country_ResidenceMonth_${countryCount}"
          placeholder="شهر"
          min="1"
          max="12"
        />
        <input
          type="number"
          name="Country_ResidenceYear_${countryCount}"
          placeholder="سنة"
          min="1900"
        />
      </div>
    </div>

    <div class="question-group">
      <label>إلى يوم - شهر - سنة</label>
      <div class="date-row-small">
        <input
          type="number"
          name="Country_ResidenceEndDay_${countryCount}"
          placeholder="يوم"
          min="1"
          max="31"
        />
        <input
          type="number"
          name="Country_ResidenceEndMonth_${countryCount}"
          placeholder="شهر"
          min="1"
          max="12"
        />
        <input
          type="number"
          name="Country_ResidenceEndYear_${countryCount}"
          placeholder="سنة"
          min="1900"
        />
      </div>
    </div>
  `;
  
  countriesContainer.appendChild(newCountryEntry);
}

// Remove country entry
function removeCountryEntry(button) {
  button.closest('.country-entry').remove();
}

// Add new education entry
let educationCount = 1;
let childCount = 1;

function addEducationEntry() {
  educationCount++;
  const educationContainer = document.getElementById('educationContainer');
  
  const newEducationEntry = document.createElement('div');
  newEducationEntry.className = 'education-entry';
  newEducationEntry.innerHTML = `
    <div class="education-entry-header">
      <h4>التعليم ${educationCount}</h4>
      <button type="button" class="btn-remove-education" onclick="removeEducationEntry(this)">حذف</button>
    </div>

    <div class="question-group">
      <label>اسم المؤهل التعليمي <span class="required">*</span></label>
      <input
        type="text"
        class="qualificationName"
        name="Qualification_Name_${educationCount}"
        placeholder="أدخل اسم المؤهل التعليمي"
      />
    </div>

    <div class="question-group">
      <label>اسم المؤسسة التعليمية <span class="required">*</span></label>
      <input
        type="text"
        class="institutionName"
        name="Institution_Name_${educationCount}"
        placeholder="أدخل اسم المؤسسة التعليمية"
      />
    </div>

    <div class="question-group">
      <label>تاريخ التخرج <span class="required">*</span></label>
      <div class="date-row">
        <input
          type="number"
          name="Graduation_Day_${educationCount}"
          placeholder="يوم"
          min="1"
          max="31"
        />
        <input
          type="number"
          name="Graduation_Month_${educationCount}"
          placeholder="شهر"
          min="1"
          max="12"
        />
        <input
          type="number"
          name="Graduation_Year_${educationCount}"
          placeholder="سنة"
          min="1900"
        />
      </div>
    </div>

    <div class="question-group">
      <label>الشعبة <span class="required">*</span></label>
      <input
        type="text"
        class="certificate"
        name="Certificate_${educationCount}"
        placeholder="أدخل نوع الشعبة"
      />
    </div>

    <div class="question-group">
      <label>عنوان المؤسسة التعليمية بالتفصيل <span class="required">*</span></label>
      <textarea
        class="institutionAddress"
        name="Institution_Address_${educationCount}"
        placeholder="أدخل عنوان المؤسسة التعليمية بالتفصيل"
        rows="3"
      ></textarea>
    </div>
  `;
  
  educationContainer.appendChild(newEducationEntry);
}

// Remove education entry
function removeEducationEntry(button) {
  button.closest('.education-entry').remove();
}

// Toggle military fields visibility
function toggleMilitaryFields() {
  const militaryFieldsContainer = document.getElementById('militaryFieldsContainer');
  const radioButtons = document.getElementsByName('militaryService');
  
  const selectedValue = Array.from(radioButtons).find(radio => radio.checked)?.value;
  
  if (selectedValue === 'نعم') {
    militaryFieldsContainer.style.display = 'block';
  } else {
    militaryFieldsContainer.style.display = 'none';
  }
}

// Add new job entry
let jobCount = 1;

function addJobEntry() {
  jobCount++;
  const jobsContainer = document.getElementById('jobsContainer');
  
  const newJobEntry = document.createElement('div');
  newJobEntry.className = 'job-entry';
  newJobEntry.innerHTML = `
    <div class="job-entry-header">
      <h4>الوظيفة ${jobCount}</h4>
      <button type="button" class="btn-remove-job" onclick="removeJobEntry(this)">حذف</button>
    </div>

    <div class="question-group">
      <label>المسمى الوظيفي</label>
      <input
        type="text"
        class="jobTitle"
        name="Job_Title_${jobCount}"
        placeholder="أدخل المسمى الوظيفي"
      />
    </div>

    <div class="question-group">
      <label>اسم الشركة</label>
      <input
        type="text"
        class="companyName"
        name="Company_Name_${jobCount}"
        placeholder="أدخل اسم الشركة"
      />
    </div>

    <div class="question-group">
      <label>عنوان الشركة بالتفصيل</label>
      <textarea
        class="companyAddress"
        name="Company_Address_${jobCount}"
        placeholder="أدخل عنوان الشركة بالتفصيل"
        rows="2"
      ></textarea>
    </div>

    <div class="question-group">
      <label>تاريخ البداية والنهاية (شهر وسنة)</label>
      <div class="date-range-row">
        <div>
          <label class="sub-label">من</label>
          <div class="date-row-small">
            <input
              type="number"
              name="Work_Start_Month_${jobCount}"
              placeholder="شهر"
              min="1"
              max="12"
            />
            <input
              type="number"
              name="Work_Start_Year_${jobCount}"
              placeholder="سنة"
              min="1900"
            />
          </div>
        </div>
        <div>
          <label class="sub-label">إلى</label>
          <div class="date-row-small">
            <input
              type="number"
              name="Work_End_Month_${jobCount}"
              placeholder="شهر"
              min="1"
              max="12"
            />
            <input
              type="number"
              name="Work_End_Year_${jobCount}"
              placeholder="سنة"
              min="1900"
            />
          </div>
        </div>
      </div>
    </div>
  `;
  
  jobsContainer.appendChild(newJobEntry);
}

// Remove job entry
function removeJobEntry(button) {
  button.closest('.job-entry').remove();
}

// Toggle travel fields visibility
function toggleTravelFields() {
  const travelFieldsContainer = document.getElementById('travelFieldsContainer');
  const radioButtons = document.getElementsByName('travelHistory');
  
  const selectedValue = Array.from(radioButtons).find(radio => radio.checked)?.value;
  
  if (selectedValue === 'نعم') {
    travelFieldsContainer.style.display = 'block';
  } else {
    travelFieldsContainer.style.display = 'none';
  }
}

// Add new travel entry
let travelCount = 1;

function addTravelEntry() {
  travelCount++;
  const travelsContainer = document.getElementById('travelsContainer');
  
  const newTravelEntry = document.createElement('div');
  newTravelEntry.className = 'travel-entry';
  newTravelEntry.innerHTML = `
    <div class="travel-entry-header">
      <h4>الرحلة ${travelCount}</h4>
      <button type="button" class="btn-remove-travel" onclick="removeTravelEntry(this)">حذف</button>
    </div>

    <div class="question-group">
      <label>اسم البلد</label>
      <input
        type="text"
        class="travelCountry"
        name="Travel_Country_${travelCount}"
        placeholder="أدخل اسم البلد"
      />
    </div>

    <div class="question-group">
      <label>المدينة</label>
      <input
        type="text"
        class="travelCity"
        name="Travel_City_${travelCount}"
        placeholder="أدخل المدينة"
      />
    </div>

    <div class="question-group">
      <label>غرض الزيارة</label>
      <input
        type="text"
        class="travelPurpose"
        name="Travel_Purpose_${travelCount}"
        placeholder="أدخل غرض الزيارة"
      />
    </div>

    <div class="question-group">
      <label>تاريخ للدخول والخروج (شهر وسنة)</label>
      <div class="date-range-row">
        <div>
          <label class="sub-label">دخول</label>
          <div class="date-row-small">
            <input
              type="number"
              name="Travel_Entry_Month_${travelCount}"
              placeholder="شهر"
              min="1"
              max="12"
            />
            <input
              type="number"
              name="Travel_Entry_Year_${travelCount}"
              placeholder="سنة"
              min="1900"
            />
          </div>
        </div>
        <div>
          <label class="sub-label">خروج</label>
          <div class="date-row-small">
            <input
              type="number"
              name="Travel_Exit_Month_${travelCount}"
              placeholder="شهر"
              min="1"
              max="12"
            />
            <input
              type="number"
              name="Travel_Exit_Year_${travelCount}"
              placeholder="سنة"
              min="1900"
            />
          </div>
        </div>
      </div>
    </div>
  `;
  
  travelsContainer.appendChild(newTravelEntry);
}

// Remove travel entry
function removeTravelEntry(button) {
  button.closest('.travel-entry').remove();
}

// Add child entry
function addChildEntry() {
  childCount++;
  const childrenContainer = document.getElementById('childrenContainer');
  
  const newChildEntry = document.createElement('div');
  newChildEntry.className = 'child-entry';
  newChildEntry.innerHTML = `
    <div class="child-entry-header">
      <h4>الابن ${childCount}</h4>
      <button type="button" class="btn-remove-child" onclick="removeChildEntry(this)">حذف</button>
    </div>

    <div class="question-group">
      <label>اسم الابن</label>
      <input
        type="text"
        class="childName"
        name="Child_Name_${childCount}"
        placeholder="أدخل اسم الابن"
      />
    </div>

    <div class="question-group">
      <label>تاريخ الميلاد (يوم - شهر - سنة)</label>
      <div class="date-row-small">
        <input
          type="number"
          name="Child_Birth_Day_${childCount}"
          placeholder="يوم"
          min="1"
          max="31"
        />
        <input
          type="number"
          name="Child_Birth_Month_${childCount}"
          placeholder="شهر"
          min="1"
          max="12"
        />
        <input
          type="number"
          name="Child_Birth_Year_${childCount}"
          placeholder="سنة"
          min="1900"
        />
      </div>
    </div>

    <div class="question-group">
      <label>محافظة الميلاد</label>
      <input
        type="text"
        class="childBirthGovernorate"
        name="Child_Birth_Governorate_${childCount}"
        placeholder="أدخل محافظة الميلاد"
      />
    </div>
  `;
  
  childrenContainer.appendChild(newChildEntry);
  
  // Show delete buttons on all entries if there's more than one
  const deleteButtons = document.querySelectorAll('.btn-remove-child');
  deleteButtons.forEach(btn => btn.style.display = 'block');
}

// Remove child entry
function removeChildEntry(button) {
  button.closest('.child-entry').remove();
  
  // Hide delete button if only one child remains
  const deleteButtons = document.querySelectorAll('.btn-remove-child');
  if (deleteButtons.length === 1) {
    deleteButtons[0].style.display = 'none';
  }
}

// Toggle marital status sections
function toggleMaritalStatusSection() {
  const maritalStatus = document.querySelector('input[name="MaritalStatus"]:checked')?.value;
  const spouseInfoSection = document.getElementById('spouseInfo');
  const divorcedInfoSection = document.getElementById('divorcedInfo');
  const widowedInfoSection = document.getElementById('widowedInfo');
  
  // Show spouse information section based on marital status
  if (maritalStatus === 'married') {
    spouseInfoSection.style.display = 'block';
    divorcedInfoSection.style.display = 'none';
    widowedInfoSection.style.display = 'none';
  } else if (maritalStatus === 'divorced') {
    divorcedInfoSection.style.display = 'block';
    spouseInfoSection.style.display = 'none';
    widowedInfoSection.style.display = 'none';
  } else if (maritalStatus === 'widowed') {
    widowedInfoSection.style.display = 'block';
    spouseInfoSection.style.display = 'none';
    divorcedInfoSection.style.display = 'none';
  } else {
    spouseInfoSection.style.display = 'none';
    divorcedInfoSection.style.display = 'none';
    widowedInfoSection.style.display = 'none';
  }
}