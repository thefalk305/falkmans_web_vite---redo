import fs from 'fs';

// Read the infotable.json
const infoTableRaw = fs.readFileSync('infotable.json', 'utf8');
const infoTable = JSON.parse(infoTableRaw);

// Read the existing branchData 
const existingBranchDataRaw = fs.readFileSync('public/data/branchData.json', 'utf8');
const existingBranches = JSON.parse(existingBranchDataRaw);

// Create maps for quick lookup
const idToPersonMap = {};
const nameToIdMap = {};

infoTable.forEach(person => {
    idToPersonMap[person.id] = person;
    nameToIdMap[person.name] = person.id;
});

// Function to get person by name
function getPersonByName(name) {
    for (const person of infoTable) {
        if (person.name === name) {
            return person;
        }
    }
    return null;
}

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

// Create a family tree structure based on the infoTable
const childrenMap = {}; // father_id -> [children_ids...]
const parentMap = {}; // child_id -> {father_id, mother_id}

infoTable.forEach(person => {
    if (person.father) {
        const father = getPersonByName(person.father);
        if (father) {
            if (!childrenMap[father.id]) {
                childrenMap[father.id] = [];
            }
            if (!childrenMap[father.id].includes(person.id)) {
                childrenMap[father.id].push(person.id);
            }
        }
    }
    
    if (person.mother) {
        const mother = getPersonByName(person.mother);
        if (mother) {
            if (!childrenMap[mother.id]) {
                childrenMap[mother.id] = [];
            }
            if (!childrenMap[mother.id].includes(person.id)) {
                childrenMap[mother.id].push(person.id);
            }
        }
    }
    
    // Create parent mapping
    const parentId = { father: null, mother: null };
    if (person.father) {
        const father = getPersonByName(person.father);
        if (father) {
            parentId.father = father.id;
        }
    }
    if (person.mother) {
        const mother = getPersonByName(person.mother);
        if (mother) {
            parentId.mother = mother.id;
        }
    }
    parentMap[person.id] = parentId;
});

// Create an object to hold all branches
const allBranches = {};

// Add existing branches to the object
existingBranches.forEach(branch => {
    allBranches[branch.id] = branch;
});

// Function to try to determine actual members for a branch
function determineMembersForBranch(branchId) {
    // For now, return placeholders as per the instructions
    // In a real implementation, this would calculate based on the family tree
    return [9998, 9999];
}

// Function to try to determine actual parents for a branch
function determineParentsForBranch(branchId) {
    // For now, return placeholders as per the instructions
    // In a real implementation, this would calculate based on the family tree
    // For the base case of the tree, we might have known relationships
    if (branchId === 1) {
        // According to the original data, branch 1 has parents [2, 3]
        return [2, 3];
    }
    
    return [9998, 9999];
}

// Generate branches from 1 to 511, skipping those that already exist
for (let branchId = 1; branchId <= 511; branchId++) {
    if (!allBranches[branchId]) {
        const { level, positionInLevel } = getLevelAndPosition(branchId);
        
        // Calculate top and left positions
        const top = calculateTop(level);
        const left = calculateLeft(level, positionInLevel);
        
        // For the members and parents, we need to establish real relationships
        // This is complex because we need to map the binary tree structure to actual family relationships
        // For now, following the instructions to use placeholders for unspecified members
        const members = determineMembersForBranch(branchId);
        const parents = determineParentsForBranch(branchId);
        
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

console.log(`Updated branchData.json with ${branchArray.length} total branches (IDs 0-511)`);
console.log('All unspecified members and parents set to [9998, 9999] as requested');