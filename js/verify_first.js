import fs from 'fs';

// Read the branchData.json file
const data = JSON.parse(fs.readFileSync('public/data/branchData.json', 'utf8'));

// Check the first few branches (0 to 10)
console.log('Checking first few branches (0-10):');
for (let id = 0; id <= 10; id++) {
    const branch = data.find(b => b.id === id);
    if (branch) {
        const expected = [2*id, 2*id + 1];
        const status = (branch.parents[0] === expected[0] && branch.parents[1] === expected[1]) ? "✓" : "✗";
        console.log(`  Branch ${id}: parents [${branch.parents.join(', ')}] (expected: [${expected.join(', ')}]) ${status}`);
    }
}