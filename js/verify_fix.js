import fs from 'fs';

// Read the branchData.json file
const data = JSON.parse(fs.readFileSync('public/data/branchData.json', 'utf8'));

// Filter branches with IDs 34-40 to verify the changes
const branches34to40 = data.filter(b => b.id >= 34 && b.id <= 40);

console.log('Branches 34-40:');
for (const branch of branches34to40) {
    console.log(`  Branch ${branch.id}: parents [${branch.parents.join(', ')}] (expected: [${2*branch.id}, ${2*branch.id + 1}])`);
}