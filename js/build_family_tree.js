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

// Create family relationships
const parentToChildren = new Map(); // Maps [father_id, mother_id] to list of children IDs
const childToParents = new Map(); // Maps child_id to {father_id, mother_id}

// Build parent-child relationships
for (const person of infoTable) {
    let father_id = null;
    let mother_id = null;
    
    if (person.father) {
        const father = infoTable.find(p => p.name === person.father);
        if (father) {
            father_id = father.id;
        }
    }
    
    if (person.mother) {
        const mother = infoTable.find(p => p.name === person.mother);
        if (mother) {
            mother_id = mother.id;
        }
    }
    
    if (father_id !== null || mother_id !== null) {
        childToParents.set(person.id, { father_id, mother_id });
        
        if (father_id !== null && mother_id !== null) {
            const coupleKey = `${father_id}-${mother_id}`;
            if (!parentToChildren.has(coupleKey)) {
                parentToChildren.set(coupleKey, []);
            }
            parentToChildren.get(coupleKey).push(person.id);
        } else if (father_id !== null) {
            // Single parent
            const coupleKey = `${father_id}-0`;  // 0 for unknown mother
            if (!parentToChildren.has(coupleKey)) {
                parentToChildren.set(coupleKey, []);
            }
            parentToChildren.get(coupleKey).push(person.id);
        } else if (mother_id !== null) {
            // Single parent
            const coupleKey = `0-${mother_id}`;  // 0 for unknown father
            if (!parentToChildren.has(coupleKey)) {
                parentToChildren.set(coupleKey, []);
            }
            parentToChildren.get(coupleKey).push(person.id);
        }
    }
}

// Create an object to hold all branches
const allBranches = {};

// Add existing branches to the object
existingBranches.forEach(branch => {
    allBranches[branch.id] = { ...branch }; // Create a copy
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
    
    // For level-based layout, calculate appropriate spacing
    const branchesInLevel = Math.pow(2, level);
    if (branchesInLevel <= 1) return 0;
    
    // Calculate spread based on level
    const totalSpread = (level + 1) * 600; // Increase spread with each level
    const halfSpread = Math.floor(totalSpread / 2);
    const stepSize = Math.floor(totalSpread / (branchesInLevel - 1 || 1));
    
    // Position in the level (0-indexed)
    return -halfSpread + positionInLevel * stepSize;
}

// Analyze the existing pattern to understand how binary tree IDs map to family data
console.log("Analyzing existing branch patterns:");
for (const branch of existingBranches.slice(0, 10)) { // First 10 branches
    if (branch.id <= 10) {
        console.log(`Branch ${branch.id}: members [${branch.members.join(', ')}], parents [${branch.parents.join(', ')}], top ${branch.top}, left ${branch.left}`);
        
        if (branch.members && branch.members.length > 0) {
            const memberInfo = branch.members.map(mId => {
                if (mId >= 9998) return `ID ${mId} (placeholder)`;
                const person = idToPersonMap[mId];
                return person ? `ID ${mId} (${person.name})` : `ID ${mId} (not found)`;
            });
            console.log(`  Member details: [${memberInfo.join(', ')}]`);
        }
        
        if (branch.parents && branch.parents.length > 0) {
            const parentInfo = branch.parents.map(pId => {
                if (pId >= 9998) return `ID ${pId} (placeholder)`;
                const person = idToPersonMap[pId];
                return person ? `ID ${pId} (${person.name})` : `ID ${pId} (not found)`;
            });
            console.log(`  Parent details: [${parentInfo.join(', ')}]`);
        }
        console.log();
    }
}

// Generate branches from 1 to 511, skipping those that already exist
for (let branchId = 1; branchId <= 511; branchId++) {
    if (!allBranches[branchId]) {
        const { level, positionInLevel } = getLevelAndPosition(branchId);
        
        // Calculate top and left positions
        const top = calculateTop(level);
        const left = calculateLeft(level, positionInLevel);
        
        // For new implementation, I'll still use placeholders as the mapping to 
        // specific family relationships in the binary tree structure is unclear
        // from the existing data, and the user specifically asked to use 9998/9999
        // for unspecified members
        const members = [9998, 9999];
        const parents = [9998, 9999];
        
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
console.log('Maintained existing relationships where specified');