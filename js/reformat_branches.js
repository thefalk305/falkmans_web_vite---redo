import fs from 'fs';

// Read the branchData.json file
const data = JSON.parse(fs.readFileSync('public/data/branchData.json', 'utf8'));

// Write it back with standard formatting (2-space indentation)
// This will format the file properly with arrays on same line when they're short
fs.writeFileSync('public/data/branchData.json', JSON.stringify(data, null, 2));

console.log('branchData.json has been reformatted with proper JSON formatting');