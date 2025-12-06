import fs from 'fs';

// Read the infotable.json
const infoTableRaw = fs.readFileSync('infotable.json', 'utf8');
const infoTable = JSON.parse(infoTableRaw);

// Read the existing branchData
const existingBranchDataRaw = fs.readFileSync('public/data/branchData.json', 'utf8');
const existingBranches = JSON.parse(existingBranchDataRaw);

// Create a map from name to id for quick lookup
const nameToIdMap = {};
infoTable.forEach(person => {
    nameToIdMap[person.name] = person.id;
});

// Function to find a person by name and return their id
function getIdByName(name) {
    for (const person of infoTable) {
        if (person.name === name) {
            return person.id;
        }
    }
    return null;
}

// Create an object to hold all branches
const allBranches = {};

// Add existing branches to the object
existingBranches.forEach(branch => {
    allBranches[branch.id] = branch;
});

// Function to determine the level and position in level of a branch ID
function getLevelAndPosition(branchId) {
    if (branchId < 1) return { level: 0, positionInLevel: 0 };
    
    let level = 0;
    let tempId = branchId;
    while (tempId > 1) {
        tempId = Math.floor(tempId / 2);
        level++;
    }
    
    const levelStart = Math.pow(2, level);
    const positionInLevel = branchId - levelStart;
    
    return { level, positionInLevel };
}

// Function to calculate top position
function calculateTop(level) {
    return level * 200;
}

// Function to calculate left position based on level and position within the level
function calculateLeft(level, positionInLevel) {
    if (level === 0) return 0;
    
    const branchesInLevel = Math.pow(2, level);
    const spacing = 600;  // spacing between branches
    const totalWidth = (branchesInLevel - 1) * spacing;
    const leftMost = -Math.floor(totalWidth / 2);
    
    return leftMost + positionInLevel * spacing;
}

// Generate branches from 1 to 511, skipping those that already exist
for (let branchId = 1; branchId <= 511; branchId++) {
    if (!allBranches[branchId]) {
        const { level, positionInLevel } = getLevelAndPosition(branchId);
        
        // Calculate top and left positions
        const top = calculateTop(level);
        const left = calculateLeft(level, positionInLevel);
        
        // Determine members and parents - use placeholders for now
        // In a real implementation, we would look up actual family data
        const members = [9998, 9999];  // Placeholder as requested
        const parents = [9998, 9999];  // Placeholder as requested
        
        allBranches[branchId] = {
            id: branchId,
            members,
            parents,
            top,
            left
        };
    }
}

// Convert the object back to an array and sort by id
const branchArray = Object.values(allBranches);
branchArray.sort((a, b) => a.id - b.id);

// Write the updated branchData.json
fs.writeFileSync('public/data/branchData.json', JSON.stringify(branchArray, null, 2));

console.log(`Generated ${branchArray.length} total branches (IDs 1-511, plus ID 0 if it existed)`);