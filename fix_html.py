# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add missing </fieldset> after Work Experience section
old_text1 = '''          <button type="button" class="btn btn-secondary" onclick="addJobEntry()" style="margin-top: 15px;">+ إضافة وظيفة أخرى</button>

        <!-- Travel History Section -->'''

new_text1 = '''          <button type="button" class="btn btn-secondary" onclick="addJobEntry()" style="margin-top: 15px;">+ إضافة وظيفة أخرى</button>
        </fieldset>

        <!-- Travel History Section -->'''

content = content.replace(old_text1, new_text1)

# Fix 2: Wrap submit buttons in form-actions div
old_text2 = '''        <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">إرسال</button>
          <button type="reset" class="btn btn-secondary">مسح النموذج</button>
        </div>'''

new_text2 = '''        <!-- Submit Buttons -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">إرسال</button>
          <button type="reset" class="btn btn-secondary">مسح النموذج</button>
        </div>'''

content = content.replace(old_text2, new_text2)

# Fix 3: Update form action to correct endpoint
content = content.replace(
    '<form id="visaForm" method="POST" action="/api/submit">',
    '<form id="visaForm" method="POST" action="/api/send-form">'
)

# Write the fixed content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('HTML file fixed successfully!')
