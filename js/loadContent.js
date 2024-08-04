document.addEventListener("DOMContentLoaded", function() {
    const contentPlaceholder = document.getElementById("content-placeholder");
    const homeLink = document.getElementById("home-link");
    const javascriptLink = document.getElementById("javascript-link");
    const pythonLink = document.getElementById("python-link");

    homeLink.addEventListener("click", function() {
        loadHomeContent();
    });

    javascriptLink.addEventListener("click", function() {
        loadContent("../languages/javascript/README.html");
    });

    pythonLink.addEventListener("click", function() {
        loadContent("../languages/python/README.html");
    });

    function loadHomeContent() {
        contentPlaceholder.innerHTML = `
            <h2>Welcome to the Search Website</h2>
            <p>This is the main content area where you can display information.</p>
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Search for questions...">
                <div id="results-container"></div>
            </div>
        `;
    }

    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentPlaceholder.innerHTML = data;
            })
            .catch(error => {
                contentPlaceholder.innerHTML = `<p>Error loading content: ${error}</p>`;
            });
    }

    // Load home content initially
    loadHomeContent();
});
