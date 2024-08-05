document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const contentPlaceholder = document.getElementById("content-placeholder");
  const resultsContainer = document.getElementById("results-container");
  let searchData = [];

  // Load search data when the page is loaded
  loadSearchData();
  loadHomeContent(); // Initially load home content

  searchButton.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase().trim();
      console.log("Search query:", query);  // Debugging
      fetchResults(query);
  });

  function fetchResults(query) {
      if (!searchData.length) {
          resultsContainer.innerHTML = "<p>No data available</p>";
          console.log("No search data available.");  // Debugging
          return;
      }

      // Perform search with improved logic
      const results = searchData
          .filter(item => item.content.toLowerCase().includes(query))
          .sort((a, b) => {
              // Sort by relevance: position of the query in the content
              const aIndex = a.content.toLowerCase().indexOf(query);
              const bIndex = b.content.toLowerCase().indexOf(query);
              return aIndex - bIndex;
          });

      console.log("Search results:", results);  // Debugging
      displayResults(results);
  }

  function displayResults(results) {
      // Ensure content from README is hidden
      const resultContent = document.querySelector(".result-content");
      if (resultContent) {
          resultContent.style.display = "none";
      }

      resultsContainer.innerHTML = "";
      if (!results.length) {
          resultsContainer.innerHTML = "<p>No results found</p>";
      } else {
          results.forEach(result => {
              const resultElement = document.createElement("div");
              resultElement.classList.add("result-item");
              resultElement.innerHTML = `
                  <h3>${result.title}</h3>
                  <div class="result-content">${result.content}</div>
              `;
              resultsContainer.appendChild(resultElement);
          });
      }
  }

  async function loadSearchData() {
      try {
          const [javascriptData, pythonData] = await Promise.all([
              fetch("../data/javascript-questions.json").then(response => response.json()),
              fetch("../data/python-questions.json").then(response => response.json())
          ]);
          
          // Combine and index the data
          searchData = [...javascriptData, ...pythonData].map(item => ({
              title: item.fileName,
              content: item.content
          }));
          console.log("Search data loaded:", searchData);  // Debugging

      } catch (error) {
          console.error("Error loading search data:", error);
          resultsContainer.innerHTML = "<p>Error loading data</p>";
      }
  }

  // Content loading for different sections
  const homeLink = document.getElementById("home-link");
  const javascriptLink = document.getElementById("javascript-link");
  const pythonLink = document.getElementById("python-link");

  homeLink.addEventListener("click", function(event) {
      event.preventDefault();
      loadHomeContent();
  });

  javascriptLink.addEventListener("click", function(event) {
      event.preventDefault();
      loadContent("../data/javascript-README.html", "javascript-content");
  });

  pythonLink.addEventListener("click", function(event) {
      event.preventDefault();
      loadContent("../data/python-README.html", "python-content");
  });

  function loadHomeContent() {
      contentPlaceholder.innerHTML = `
          <h2>Welcome to the Search Website</h2>
          <div id="results-container"></div>
      `;
      contentPlaceholder.className = ''; // Remove any previously added classes
  }

  function loadContent(url, contentClass) {
      fetch(url)
          .then(response => response.text())
          .then(data => {
              // Insert the loaded data into the contentPlaceholder
              contentPlaceholder.innerHTML = `
                  <div class="temp-container">
                      ${data}
                  </div>
              `;
              // Create and append the results container to the loaded content
              const tempContainer = contentPlaceholder.querySelector(".temp-container");
              const newResultsContainer = document.createElement("div");
              newResultsContainer.id = "results-container";
              tempContainer.appendChild(newResultsContainer);

              contentPlaceholder.className = contentClass; // Set the class name
          })
          .catch(error => {
              contentPlaceholder.innerHTML = `<p>Error loading content: ${error}</p>`;
              contentPlaceholder.className = ''; // Remove any previously added classes
          });
  }
});
