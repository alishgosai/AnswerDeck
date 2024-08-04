import fs from "fs";
import path from "path";
import { marked } from "marked";
import { fileURLToPath } from "url";

// Directory for language files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const languagesDir = path.join(__dirname, "../languages");
const dataDir = path.join(__dirname, "../data");

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Function to convert Markdown to HTML
function convertMarkdownToHtml(fileContent) {
  return marked(fileContent); // Convert Markdown to HTML
}

// Read language directories
fs.readdir(languagesDir, (err, languageDirs) => {
  if (err) {
    console.error("Error reading languages directory:", err);
    return;
  }

  languageDirs.forEach((lang) => {
    const langDir = path.join(languagesDir, lang);
    fs.readdir(langDir, (err, files) => {
      if (err) {
        console.error(`Error reading ${lang} directory:`, err);
        return;
      }

      files.forEach((file) => {
        if (file.toLowerCase() === "readme.md") {
          const filePath = path.join(langDir, file);
          fs.readFile(filePath, "utf8", (err, fileContent) => {
            if (err) {
              console.error(`Error reading ${file} file:`, err);
              return;
            }

            const htmlContent = convertMarkdownToHtml(fileContent);
            const outputFileName = `${lang}-README.html`;
            const outputFilePath = path.join(dataDir, outputFileName);
            fs.writeFile(outputFilePath, htmlContent, (err) => {
              if (err) {
                console.error(`Error writing HTML file ${outputFilePath}:`, err);
              } else {
                console.log(`Converted ${file} to HTML and saved as ${outputFileName} in the data folder.`);
              }
            });
          });
        }
      });
    });
  });
});
