import fs from 'fs';

// Read the branchData.json file
const data = JSON.parse(fs.readFileSync('public/data/branchData.json', 'utf8'));

// Create a mapping of branch id to branch data
const branchMap = {};
data.forEach(branch => {
    branchMap[branch.id] = { ...branch }; // Copy the branch data for reference
});

// Calculate the correct left positions based on binary tree structure
// Root (branch 1) starts at left 0
// For any node n:
//   - Left child (2n) has position = parent_position - 300
//   - Right child (2n+1) has position = parent_position + 300

function calculateLeftPositions() {
    const positions = {};
    
    // Root node (branch 1) is at position 0
    positions[1] = 0;
    
    // Calculate recursively for all nodes up to 511
    for (let id = 1; id <= 255; id++) {  // Only go up to 255 since 2*255+1 = 511
        if (positions[id] !== undefined) {
            const parentPos = positions[id];
            
            // Left child (2n)
            const leftChild = 2 * id;
            if (leftChild <= 511) {
                positions[leftChild] = parentPos - 300;
            }
            
            // Right child (2n+1) 
            const rightChild = 2 * id + 1;
            if (rightChild <= 511) {
                positions[rightChild] = parentPos + 300;
            }
        }
    }
    
    return positions;
}

// Calculate the correct left positions
const leftPositions = calculateLeftPositions();

// Update the branch data with corrected left positions
data.forEach(branch => {
    if (leftPositions[branch.id] !== undefined) {
        branch.left = leftPositions[branch.id];
    }
    // If branch.id is not in our calculation (e.g., branch 0), keep existing value
});

// Write the updated data back to the file with single-line array formatting
function customStringify(obj) {
    let result = JSON.stringify(obj, null, 2);
    
    // Replace multi-line members arrays with single-line versions
    result = result.replace(/("members":\s*\[\s*\n\s*(\d+,\s*\n\s*)*(\d+)\s*\])/g, 
        function(match) {
            const arrayMatch = match.match(/"members":\s*\[(.*)\]/s);
            if (arrayMatch) {
                const innerContent = arrayMatch[1]
                    .replace(/\s+/g, ' ')
                    .replace(/^\s+|\s+$/g, '');
                return `"members": [${innerContent}]`;
            }
            return match;
        });
    
    // Do the same for parents
    result = result.replace(/("parents":\s*\[\s*\n\s*(\d+,\s*\n\s*)*(\d+)\s*\])/g, 
        function(match) {
            const arrayMatch = match.match(/"parents":\s*\[(.*)\]/s);
            if (arrayMatch) {
                const innerContent = arrayMatch[1]
                    .replace(/\s+/g, ' ')
                    .replace(/^\s+|\s+$/g, '');
                return `"parents": [${innerContent}]`;
            }
            return match;
        });
    
    return result;
}

fs.writeFileSync('public/data/branchData.json', customStringify(data));

console.log('Updated branchData.json: corrected left positions for all branches with constant 300 spacing');