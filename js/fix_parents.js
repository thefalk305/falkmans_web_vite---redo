import fs from 'fs';

// Read the branchData.json file
const data = JSON.parse(fs.readFileSync('public/data/branchData.json', 'utf8'));

// Update the parents arrays for branches starting from ID 34
// According to the pattern, branch n should have parents [2*n, 2*n+1]
for (let i = 0; i < data.length; i++) {
    const branch = data[i];
    if (branch.id >= 34) {
        // For branch with id n, parents should be [2*n, 2*n+1]
        branch.parents = [2 * branch.id, 2 * branch.id + 1];
    }
}

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

console.log('Updated branchData.json: branches with ID >= 34 now have correct parents arrays following the pattern [2*n, 2*n+1]');