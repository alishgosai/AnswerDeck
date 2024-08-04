import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { marked } from 'marked';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const languages = ['javascript', 'python']; // Add other languages as needed

languages.forEach(lang => {
  const questionsDir = join(__dirname, `../languages/${lang}/questions`);
  const outputFile = join(__dirname, `../data/${lang}-data.json`);

  const files = readdirSync(questionsDir).filter(file => file.endsWith('.md'));
  const data = files.map(file => {
    const filePath = join(questionsDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');

    // Extract the question number from the file name, e.g., "Question1.md" -> 1
    const questionNumber = file.match(/Question(\d+)/)[1];

    return {
      language: lang,
      questionNumber: parseInt(questionNumber, 10),
      fileName: file,
      content: marked.parse(fileContent) // Convert Markdown to HTML
    };
  });

  // Sort by question number to ensure order
  data.sort((a, b) => a.questionNumber - b.questionNumber);

  writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Created data file for ${lang}: ${outputFile}`);
});
