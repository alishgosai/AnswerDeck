document.addEventListener("DOMContentLoaded", function() {
    const contentPlaceholder = document.getElementById("content-placeholder");
    const homeLink = document.getElementById("home-link");
    const javascriptLink = document.getElementById("javascript-link");
    const pythonLink = document.getElementById("python-link");

    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        loadHomeContent();
    });

    javascriptLink.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("../AnswerDeck/data/javascript-README.html", "javascript-content");
    });

    pythonLink.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent(".AnswerDeck/data/python-README.html", "python-content");
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
                contentPlaceholder.innerHTML = `
                    <div id="results-container"></div>
                    <div class="${contentClass}">
                        ${data}
                    </div>
                `;
                contentPlaceholder.className = contentClass; // Set the class name
            })
            .catch(error => {
                contentPlaceholder.innerHTML = `<p>Error loading content: ${error}</p>`;
                contentPlaceholder.className = ''; // Remove any previously added classes
            });
    }

    // Load home content initially
    loadHomeContent();
});
