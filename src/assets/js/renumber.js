// renumber.js
import { readFileSync, writeFileSync } from 'fs';

// Load the JSON file
const infoTable = JSON.parse(readFileSync('../infoTable.json', 'utf8'));

// Renumber the first 146 records
infoTable.slice(0, 146).forEach((entry, index) => {
  entry.id = index + 1;
});

// Write out the updated file
writeFileSync(
  'infoTable-renumbered.json',
  JSON.stringify(infoTable, null, 2),
  'utf8'
);

console.log('Renumbering complete. Output written to infoTable-renumbered.json');