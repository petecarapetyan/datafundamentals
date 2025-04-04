import fs from 'fs';
import path from 'path';
import { globSync } from 'glob'; // Using named export from `glob`

// Define the folder where your *.njk files live
const njkFolder = './site/_includes/';

// Find all *.njk files
const allNunjucksFiles = globSync(`${njkFolder}/**/*.njk`);

const allSourceFiles = [
  './site/_includes/layout-home.njk',
  './site/_includes/layout-nav.njk',
  './site/_includes/layout-sidebar.njk',
];

// Helper function to find references
function findReferences(fileContent, filenames) {
  const references = [];
  filenames.forEach(file => {
    if (fileContent.includes(file)) {
      references.push(file);
    }
  });
  return references;
}

// Find unused nunjucks files
const usedFiles = new Set();
allSourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  allNunjucksFiles.forEach(njkFile => {
    if (content.includes(path.basename(njkFile))) {
      usedFiles.add(njkFile);
    }
  });
});

const unusedFiles = allNunjucksFiles.filter(file => !usedFiles.has(file));
console.log('Unused Nunjucks files:', unusedFiles);
