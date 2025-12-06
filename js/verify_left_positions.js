import fs from 'fs';

// Read the branchData.json file
const data = JSON.parse(fs.readFileSync('public/data/branchData.json', 'utf8'));

// Check the first few branches (0 to 10) for left positions
console.log('Checking left positions for first few branches (0-10):');
for (let id = 0; id <= 10; id++) {
    const branch = data.find(b => b.id === id);
    if (branch) {
        console.log(`  Branch ${id}: left = ${branch.left}`);
    }
}

// Specifically check the example mentioned: branch 10, 20, 21
console.log('\nChecking specific branches mentioned:');
const specificBranches = [10, 20, 21];
for (const id of specificBranches) {
    const branch = data.find(b => b.id === id);
    if (branch) {
        console.log(`  Branch ${id}: left = ${branch.left}`);
    }
}