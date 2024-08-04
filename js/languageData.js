// languageData.js
async function loadLanguageData(language) {
  const response = await fetch(`/data/${language}-data.json`);
  const data = await response.json();
  return data;
}

// Example usage
loadLanguageData('javascript').then(data => {
  console.log(data); // Handle the loaded data
});
