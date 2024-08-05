document.addEventListener("DOMContentLoaded", function() {
  const contentPlaceholder = document.getElementById("javascript-content-placeholder");

  // Load README content initially
  loadREADMEContent();

  function loadREADMEContent() {
      fetch("../data/javascript-README.html")
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
          })
          .then(data => {
              contentPlaceholder.innerHTML = data;
          })
          .catch(error => {
              contentPlaceholder.innerHTML = `<p>Error loading README content: ${error.message}</p>`;
          });
  }
});
