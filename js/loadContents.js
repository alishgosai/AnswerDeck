document.addEventListener("DOMContentLoaded", function() {
  const contentPlaceholder = document.getElementById("javascript-content-placeholder");

  // Define mapping between page names and content files
  const contentMap = {
    "javascript.html": "../data/javascript-README.html",
    "python.html": "../data/python-README.html",
    "react.html": "../data/react-README.html",
    "node.html": "../data/node-README.html"
    // Add more mappings as needed
  };

  // Determine the current page
  const currentPage = window.location.pathname.split("/").pop();

  // Load content based on the current page
  if (contentMap[currentPage]) {
    loadContent(contentMap[currentPage]);
  } else {
    contentPlaceholder.innerHTML = "<p>Content not found.</p>";
  }

  function loadContent(url) {
    fetch(url)
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
        contentPlaceholder.innerHTML = `<p>Error loading content: ${error.message}</p>`;
      });
  }
});
