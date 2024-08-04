const fs = require('fs');
const path = require('path');
const { marked } = require('marked'); // Correctly import marked

// Directory for language files
const languagesDir = path.join(__dirname, '../languages');

// Function to convert Markdown to HTML
function convertMarkdownToHtml(fileContent) {
    return marked(fileContent); // Convert Markdown to HTML
}

// Read language directories
fs.readdir(languagesDir, (err, languageDirs) => {
    if (err) {
        console.error('Error reading languages directory:', err);
        return;
    }

    languageDirs.forEach(lang => {
        const langDir = path.join(languagesDir, lang);
        fs.readdir(langDir, (err, files) => {
            if (err) {
                console.error(`Error reading ${lang} directory:`, err);
                return;
            }

            files.forEach(file => {
                if (file.endsWith('.md')) {
                    const filePath = path.join(langDir, file);
                    fs.readFile(filePath, 'utf8', (err, fileContent) => {
                        if (err) {
                            console.error(`Error reading ${file} file:`, err);
                            return;
                        }

                        const htmlContent = convertMarkdownToHtml(fileContent);
                        const outputFile = filePath.replace('.md', '.html');
                        fs.writeFile(outputFile, htmlContent, err => {
                            if (err) {
                                console.error(`Error writing HTML file ${outputFile}:`, err);
                            } else {
                                console.log(`Converted ${file} to HTML.`);
                            }
                        });
                    });
                }
            });
        });
    });
});
