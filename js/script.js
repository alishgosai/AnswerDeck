// script.js

// Example common functions or setup code

// Example function to handle form submissions
function handleFormSubmission(event) {
  event.preventDefault();
  alert('Form submitted!');
}

// Attach event listeners to forms if they exist
document.getElementById('contactForm')?.addEventListener('submit', handleFormSubmission);
