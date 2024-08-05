document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultsContainer = document.getElementById("results-container");
    let searchData = [];

    // Load data when the page is loaded
    loadSearchData();

    searchButton.addEventListener("click", () => {
        performSearch();
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        console.log("Search query:", query);  // Debugging
        fetchResults(query);
    }

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
});
