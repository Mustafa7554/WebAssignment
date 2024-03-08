const applicationForm = document.getElementById('application-form');
const viewApplicationsButton = document.getElementById('view-applications');
const applicationsTable = document.getElementById('applications-table');

let applications = [];

applicationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Validate form data (replace with your preferred validation library)
  if (!validateForm()) {
    return;
  }

  const formData = new FormData(applicationForm);
  const applicationData = {};

  for (const [key, value] of formData.entries()) {
    applicationData[key] = value;
  }

  applications.push(applicationData);

  console.log('Application submitted:', applicationData);

  // Clear form after successful submission
  applicationForm.reset();
});

viewApplicationsButton.addEventListener('click', function() {
  applicationsTable.innerHTML = '';

  if (applications.length === 0) {
    applicationsTable.innerHTML = '<p>No applications submitted yet.</p>';
    alert('No applications submitted');
    return;
  }

  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  // Create table header row
  const tableHeadRow = document.createElement('tr');
  for (const key in applications[0]) {
    const tableHeadCell = document.createElement('th');
    tableHeadCell.textContent = key.replace(/_/g, ' '); // Replace underscores with spaces
    tableHeadRow.appendChild(tableHeadCell);
  }
  tableHead.appendChild(tableHeadRow);

  // Create table rows for each application
  applications.forEach(application => {
    const tableBodyRow = document.createElement('tr');
    for (const key in application) {
      const tableBodyCell = document.createElement('td');
      tableBodyCell.textContent = application[key];
      tableBodyRow.appendChild(tableBodyCell);
    }
    tableBody.appendChild(tableBodyRow);
  });

  table.appendChild(tableHead);
  table.appendChild(tableBody);
  applicationsTable.appendChild(table);
});

// Add functionality for adding additional employment entries and references
const addEmploymentButton = document.getElementById('add-employment');
const addReferenceButton = document.getElementById('add-reference');

addEmploymentButton.addEventListener('click', function() {
  const newEmploymentEntry = document.createElement('div');
  newEmploymentEntry.classList.add('employment-entry');
  newEmploymentEntry.innerHTML = `<h3>Previous Job</h3>
  <div class="form-group">
    <label for="job_title">Job Title:</label>
    <input type="text" id="job_title" name="job_title[]" required>
  </div>
  <div class="form-group">
    <label for="company_name">Company Name:</label>
    <input type="text" id="company_name" name="company_name[]" required>
  </div>
  <div class="form-group">
    <label for="start_date">Start Date (YYYY-MM-DD):</label>
    <input type="date" id="start_date" name="start_date[]" required>
  </div>
  <div class="form-group">
    <label for="end_date">End Date (YYYY-MM-DD):</label>
    <input type="date" id="end_date" name="end_date[]" required>
  </div>
  <div class="form-group">
    <label for="job_responsibilities">Job Responsibilities:</label>
    <textarea id="job_responsibilities" name="job_responsibilities[]" rows="5" required></textarea>
  </div>`;
  document.getElementById('employment-history').appendChild(newEmploymentEntry);
});
addReferenceButton.addEventListener('click', function() {
    const newReferenceEntry = document.createElement('div');
    newReferenceEntry.classList.add('reference-entry');
    newReferenceEntry.innerHTML = `<h3>Reference ${applications.length + 1}</h3>
    <div class="form-group">
      <label for="reference_name">Name:</label>
      <input type="text" id="reference_name" name="reference_name[]" required>
    </div>
    <div class="form-group">
      <label for="reference_contact">Contact Information:</label>
      <input type="text" id="reference_contact" name="reference_contact[]" required>
    </div>
    <div class="form-group">
      <label for="reference_relationship">Relationship:</label>
      <input type="text" id="reference_relationship" name="reference_relationship[]" required>
    </div>`;
    document.getElementById('references').appendChild(newReferenceEntry);
  });
  
  // Simple form validation (replace with your preferred library)
  function validateForm() {
    let isValid = true;
  
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone_number').value;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Example phone number format
  
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      isValid = false;
    }
  
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number in XXX-XXX-XXXX format.');
      isValid = false;
    }
  
    // Add more validation checks as needed for other fields
  
    return isValid;
  }
  
