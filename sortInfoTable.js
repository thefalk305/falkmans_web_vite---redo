// Script to sort infotable.json: put "id" first and sort other fields alphabetically
import { readFileSync, writeFileSync } from 'fs';

// Read the current infotable.json file
const filePath = './src/assets/infotable.json';
const rawData = readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData);

// Function to reorder object properties with 'id' first, others alphabetically
function reorderObject(obj) {
  const { id, ...rest } = obj; // Extract the id property
  const orderedObj = { id }; // Create new object with id first
  
  // Sort remaining properties alphabetically and add them
  const sortedKeys = Object.keys(rest).sort();
  for (const key of sortedKeys) {
    orderedObj[key] = rest[key];
  }
  
  return orderedObj;
}

// Reorder each entry in the data array
const reorderedData = data.map(reorderObject);

// Write the sorted data back to the file
writeFileSync(filePath, JSON.stringify(reorderedData, null, 2));

console.log(`Sorted ${data.length} records in infotable.json with 'id' first and other fields alphabetically sorted.`);