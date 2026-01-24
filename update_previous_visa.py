import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the PreviousCanadianVisa section
old_section = '''          <div class="question-group">
            <label>هل قمت بالتقديم على تأشيرة سياحية كندا قبل ذلك <span class="required">*</span></label>
            <div class="options-row" role="radiogroup">
              <label>
                <input type="radio" name="PreviousCanadianVisa" value="yes" required /> نعم
              </label>
              <label>
                <input type="radio" name="PreviousCanadianVisa" value="no" /> لا
              </label>
            </div>
          </div>'''

new_section = '''          <div class="question-group">
            <label>هل قمت بالتقديم على تأشيرة سياحية كندا قبل ذلك <span class="required">*</span></label>
            <div class="options-row" role="radiogroup">
              <label>
                <input type="radio" name="PreviousCanadianVisa" value="yes" required onchange="togglePreviousVisaFields()" /> نعم
              </label>
              <label>
                <input type="radio" name="PreviousCanadianVisa" value="no" onchange="togglePreviousVisaFields()" /> لا
              </label>
            </div>
            
            <div class="sub-fields" id="previousVisaFieldsContainer" style="display: none;">
              <div class="question-group">
                <label>متى قدمت على تأشيرة كندا السياحية سابقاً؟ (شهر - سنة)</label>
                <div class="date-row-small">
                  <input
                    type="number"
                    id="previousVisaMonth"
                    name="Previous_Canadian_Visa_Month"
                    placeholder="شهر"
                    min="1"
                    max="12"
                  />
                  <input
                    type="number"
                    id="previousVisaYear"
                    name="Previous_Canadian_Visa_Year"
                    placeholder="سنة"
                    min="1900"
                  />
                </div>
              </div>

              <div class="question-group">
                <label>ما كانت نتيجة الطلب السابق؟</label>
                <div class="options-row" role="radiogroup">
                  <label>
                    <input type="radio" name="Previous_Visa_Result" value="approved" /> تمت الموافقة
                  </label>
                  <label>
                    <input type="radio" name="Previous_Visa_Result" value="rejected" /> تم الرفض
                  </label>
                  <label>
                    <input type="radio" name="Previous_Visa_Result" value="pending" /> قيد المعالجة
                  </label>
                </div>
              </div>
            </div>
          </div>'''

content = content.replace(old_section, new_section)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('HTML updated: Added previous Canadian visa application date fields')
