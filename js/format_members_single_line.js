import fs from 'fs';

// Read the branchData.json file
let content = fs.readFileSync('public/data/branchData.json', 'utf8');
let data = JSON.parse(content);

// Custom stringifier that keeps members and parents arrays on one line
function customStringify(obj) {
    // Stringify normally first
    let result = JSON.stringify(obj, null, 2);
    
    // Replace multi-line members and parents arrays with single-line versions
    result = result.replace(/("members":\s*\[\s*\n\s*(\d+,\s*\n\s*)*(\d+)\s*\])/g, 
        function(match) {
            // Extract the array content and put it on one line
            const arrayMatch = match.match(/"members":\s*\[(.*)\]/s);
            if (arrayMatch) {
                // Get the inner content, remove all newlines and extra spaces, then reconstruct
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

// Write the reformatted content back
fs.writeFileSync('public/data/branchData.json', customStringify(data));

console.log('branchData.json has been reformatted with members and parents arrays on single lines');