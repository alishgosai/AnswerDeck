document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultsContainer = document.getElementById("results-container");
    let searchData = [];

    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        fetchResults(query);
    });

    searchButton.addEventListener("click", function() {
        const query = searchInput.value.toLowerCase();
        fetchResults(query);
    });

    function fetchResults(query) {
        const results = searchData.filter(item => item.content.toLowerCase().includes(query));
        displayResults(results);
    }

    function displayResults(results) {
        resultsContainer.innerHTML = "";
        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>No results found</p>";
        } else {
            results.forEach(result => {
                const resultElement = document.createElement("div");
                resultElement.classList.add("result-item");
                resultElement.innerHTML = result.content;
                resultsContainer.appendChild(resultElement);
            });
        }
    }

    function loadSearchData() {
        fetch("../data/javascript-questions.json")
            .then(response => response.json())
            .then(data => {
                searchData = data;
            })
            .catch(error => {
                console.error("Error loading search data:", error);
            });

        fetch("../data/python-questions.json")
            .then(response => response.json())
            .then(data => {
                searchData = searchData.concat(data);
            })
            .catch(error => {
                console.error("Error loading search data:", error);
            });
    }

    loadSearchData();
});
