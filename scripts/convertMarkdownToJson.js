// Example: convertMarkdownToJson.js
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const languages = ['javascript', 'python']; // Add other languages as needed

languages.forEach(lang => {
  const questionsDir = path.join(__dirname, `../languages/${lang}/questions`);
  const outputFile = path.join(__dirname, `../data/${lang}-data.json`);

  const files = fs.readdirSync(questionsDir).filter(file => file.endsWith('.md'));
  const data = files.map(file => {
    const filePath = path.join(questionsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return {
      fileName: file,
      content: marked(fileContent) // Convert Markdown to HTML
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Created data file for ${lang}: ${outputFile}`);
});
