import { ref, computed } from 'vue';

// Function to find a person by name in the infoTable
const findPersonByName = (infoTable, name) => {
  return infoTable.find(person => person.name === name);
};

// Function to find a person by ID in the infoTable
const findPersonById = (infoTable, id) => {
  return infoTable.find(person => person.id === id);
};

// Function to calculate the full group data dynamically from infoTable
export function useDynamicGroups(infoTable) {
  // Create a map of person name to ID for easier lookup
  const nameToIdMap = computed(() => {
    const map = new Map();
    infoTable.forEach(person => {
      map.set(person.name, person.id);
      // Also map spouse names if they exist
      if (person.spouse) {
        map.set(person.spouse, person.id);
      }
    });
    return map;
  });

  // Function to get parents of a person by name
  const getParentsById = (personId) => {
    const person = findPersonById(infoTable, personId);
    if (!person) return [];

    const parents = [];

    // Check if father field exists and is not empty
    if (person.father && person.father.trim() !== "") {
      const father = findPersonByName(infoTable, person.father);
      if (father) {
        parents.push(father.id);
      } else {
        // Father exists in name but not found in table - might be an issue with data
        console.warn(`Father "${person.father}" not found in infoTable for person ID ${personId}`);
      }
    } else {
      // Father is missing - we'll add a placeholder later when building the display
    }

    // Check if mother field exists and is not empty
    if (person.mother && person.mother.trim() !== "") {
      const mother = findPersonByName(infoTable, person.mother);
      if (mother) {
        parents.push(mother.id);
      } else {
        // Mother exists in name but not found in table - might be an issue with data
        console.warn(`Mother "${person.mother}" not found in infoTable for person ID ${personId}`);
      }
    } else {
      // Mother is missing - we'll add a placeholder later when building the display
    }

    return parents;
  };

  // Function to check if a person has missing parents and returns placeholders
  const getParentsWithPlaceholders = (personId) => {
    const person = findPersonById(infoTable, personId);
    if (!person) return [];

    const parents = [];
    const placeholders = [];

    // Check if father field exists and is not empty
    if (person.father && person.father.trim() !== "") {
      const father = findPersonByName(infoTable, person.father);
      if (father) {
        parents.push(father.id);
      } else {
        console.warn(`Father "${person.father}" not found in infoTable for person ID ${personId}`);
      }
    } else {
      // Add father placeholder
      placeholders.push(9998);
    }

    // Check if mother field exists and is not empty
    if (person.mother && person.mother.trim() !== "") {
      const mother = findPersonByName(infoTable, person.mother);
      if (mother) {
        parents.push(mother.id);
      } else {
        console.warn(`Mother "${person.mother}" not found in infoTable for person ID ${personId}`);
      }
    } else {
      // Add mother placeholder
      placeholders.push(9999);
    }

    return [...parents, ...placeholders];
  };

  // Function to get parent objects with placeholders for missing parents
  const getParentObjectsWithPlaceholders = (personId) => {
    const person = findPersonById(infoTable, personId);
    if (!person) return [];

    const parentObjects = [];

    // Check if father field exists and is not empty
    if (person.father && person.father.trim() !== "") {
      const father = findPersonByName(infoTable, person.father);
      if (father) {
        parentObjects.push(father);
      } else {
        console.warn(`Father "${person.father}" not found in infoTable for person ID ${personId}`);
        // Add father placeholder since we expected to find the father but didn't
        parentObjects.push({
          id: 9998,
          pic: 'Add Father.svg',
          name: 'Add Father',
          born_died: '',
          birthplace: ''
        });
      }
    } else {
      // Add father placeholder object when field is empty
      parentObjects.push({
        id: 9998,
        pic: 'Add Father.svg',
        name: 'Add Father',
        born_died: '',
        birthplace: ''
      });
    }

    // Check if mother field exists and is not empty
    if (person.mother && person.mother.trim() !== "") {
      const mother = findPersonByName(infoTable, person.mother);
      if (mother) {
        parentObjects.push(mother);
      } else {
        console.warn(`Mother "${person.mother}" not found in infoTable for person ID ${personId}`);
        // Add mother placeholder since we expected to find the mother but didn't
        parentObjects.push({
          id: 9999,
          pic: 'Add Mother.svg',
          name: 'Add Mother',
          born_died: '',
          birthplace: ''
        });
      }
    } else {
      // Add mother placeholder object when field is empty
      parentObjects.push({
        id: 9999,
        pic: 'Add Mother.svg',
        name: 'Add Mother',
        born_died: '',
        birthplace: ''
      });
    }

    return parentObjects;
  };

  // Function to get children of a person by name
  const getChildrenById = (personId) => {
    const children = [];
    infoTable.forEach(person => {
      // Check if this person is a child of the given person
      for (let i = 1; i <= 8; i++) {
        const childKey = `child${i}`;
        if (person[childKey] && findPersonByName(infoTable, person[childKey])?.id === personId) {
          children.push(person.id);
          break;
        }
      }
    });
    return children;
  };

  // Recursive function to build the group structure starting from a base group
  const buildGroupStructure = (baseMembers = [2, 13], maxGroups = 100) => {
    const groups = [];
    
    // Group 0 (always visible) - contains members [4, 5, 6, 7, 8]
    groups.push({
      id: 0,
      members: [4, 5, 6, 7, 8],
      parents: [2, 3], // placeholder parents
      top: 100,
      left: 0
    });
    
    // Group 1 (root) - contains the base members
    groups.push({
      id: 1,
      members: [...baseMembers],
      parents: [],
      top: 0,
      left: 0
    });

    // Build subsequent groups based on parents of previous group members
    for (let groupId = 1; groupId < maxGroups; groupId++) {
      if (!groups[groupId]) break; // Skip if group doesn't exist
      
      const currentGroup = groups[groupId];
      const parentIds = new Set();
      
      // Collect all parents of current group members
      currentGroup.members.forEach(memberId => {
        const parents = getParentsById(memberId);
        parents.forEach(parentId => parentIds.add(parentId));
      });
      
      if (parentIds.size > 0) {
        // Create next level groups (left and right parent groups)
        const leftGroupId = groupId * 2;
        const rightGroupId = groupId * 2 + 1;
        
        // Calculate positions based on level
        const level = Math.floor(Math.log2(groupId + 1)); // Level of current group
        const nextLevel = Math.floor(Math.log2(leftGroupId + 1)); // Level of parent groups
        const top = nextLevel * 200; // 200px per level
        
        // Calculate left position based on group position in the level
        const levelStart = Math.pow(2, nextLevel) - 1;
        const positionInLevel = leftGroupId - levelStart;
        const leftLeft = (positionInLevel - Math.pow(2, nextLevel - 1)) * 300; // -300 per position from center
        
        // Add left parent group
        groups[leftGroupId] = {
          id: leftGroupId,
          members: Array.from(parentIds).filter((_, idx) => idx % 2 === 0), // Alternate assignment
          parents: [], // Will be calculated in next iteration
          top: top,
          left: leftLeft
        };
        
        // Add right parent group
        groups[rightGroupId] = {
          id: rightGroupId,
          members: Array.from(parentIds).filter((_, idx) => idx % 2 === 1), // Alternate assignment
          parents: [], // Will be calculated in next iteration
          top: top,
          left: leftLeft + 300 // 300px to the right
        };
      }
    }
    
    return groups.filter(Boolean); // Remove undefined entries
  };

  // Function to calculate group positions based on level and position
  const calculateGroupPosition = (groupId) => {
    if (groupId === 0) {
      return { top: 100, left: 0 };
    }

    if (groupId === 1) {
      return { top: 0, left: 0 };
    }

    // Calculate level based on binary tree position
    const level = Math.floor(Math.log2(groupId));
    const top = level * 200;

    // Calculate position by tracing path from node to root
    let currentId = groupId;
    let left = 0;

    // Walk up the tree from the target node to the root, accumulating position changes
    while (currentId > 1) {
      const parentId = Math.floor(currentId / 2);
      const isLeftChild = (currentId === parentId * 2);

      if (isLeftChild) {
        left -= 300;  // Left child is 300px to the left of parent
      } else {
        left += 300;  // Right child is 300px to the right of parent
      }

      currentId = parentId;
    }

    return { top, left };
  };

  // Generate the full tree structure
  const generateGroups = (baseMembers = [2, 13], maxGroups = 100) => {
    const groups = [];
    
    // Group 0 (special group with fixed members)
    groups[0] = {
      id: 0,
      members: [4, 5, 6, 7, 8],
      parents: [0, 1], // placeholder parents
      ...calculateGroupPosition(0)
    };
    
    // Group 1 (root group)
    groups[1] = {
      id: 1,
      members: [...baseMembers],
      parents: [],
      ...calculateGroupPosition(1)
    };

    // Build parent relationships for subsequent groups
    for (let groupId = 1; groupId < maxGroups; groupId *= 2) {
      // Process each group at this level
      for (let g = groupId; g < Math.min(groupId * 2, maxGroups); g++) {
        if (!groups[g]) continue;
        
        // Collect parents of all members in this group
        const allParentIds = new Set();
        groups[g].members.forEach(memberId => {
          const parents = getParentsById(memberId);
          parents.forEach(parentId => allParentIds.add(parentId));
        });
        
        if (allParentIds.size > 0) {
          const parentArray = Array.from(allParentIds);
          
          // Create left parent group (2*g)
          if (g * 2 < maxGroups) {
            const leftParents = parentArray.filter((_, idx) => idx % 2 === 0);
            if (leftParents.length > 0) {
              groups[g * 2] = {
                id: g * 2,
                members: leftParents,
                parents: [],
                ...calculateGroupPosition(g * 2)
              };
            }
          }
          
          // Create right parent group (2*g + 1)
          if (g * 2 + 1 < maxGroups) {
            const rightParents = parentArray.filter((_, idx) => idx % 2 === 1);
            if (rightParents.length > 0) {
              groups[g * 2 + 1] = {
                id: g * 2 + 1,
                members: rightParents,
                parents: [],
                ...calculateGroupPosition(g * 2 + 1)
              };
            }
          }
        }
      }
    }
    
    return groups.filter(Boolean);
  };

  // More accurate method that builds the tree properly
  const buildCompleteTree = (baseMembers = [2, 13], maxDepth = 8) => {
    const groups = [];

    // Group 0 (special group - always visible)
    groups[0] = {
      id: 0,
      members: [4, 5, 6, 7, 8],
      parents: [0, 1], // Following original pattern
      top: 100,
      left: 0
    };

    // Group 1 (root) - contains base members
    groups[1] = {
      id: 1,
      members: [...baseMembers],
      parents: [], // Will be filled in later
      ...calculateGroupPosition(1)
    };

    // Build the tree level by level, following the binary tree pattern
    // In binary tree: for parent node N, children are at 2N and 2N+1
    // So group 1 has children groups 2 and 3
    // Group 2 contains parents of first member from group 1
    // Group 3 contains parents of second member from group 1
    for (let depth = 1; depth <= maxDepth; depth++) {
      // For each position in this binary tree level
      for (let posInLevel = 0; posInLevel < Math.pow(2, depth-1); posInLevel++) {
        const groupId = Math.pow(2, depth-1) + posInLevel;  // This gives 2^(d-1) to 2^d - 1
        const treeParentId = Math.floor(groupId / 2);

        // Skip if no parent exists
        if (!groups[treeParentId]) continue;

        // Get members of the parent group
        const parentMembers = groups[treeParentId].members || [];

        // Find which specific member this group (groupId) should represent parents for
        // In binary tree, left child (2*parent) represents first member, right child (2*parent+1) represents second member
        const isLeftChild = (groupId === treeParentId * 2);
        const isRightChild = (groupId === treeParentId * 2 + 1);

        let memberToProcess = null;
        if (isLeftChild && parentMembers[0] !== undefined) {
          // Left child (2*treeParentId) gets parents of first member in parent group
          memberToProcess = parentMembers[0];
        } else if (isRightChild && parentMembers[1] !== undefined) {
          // Right child (2*treeParentId+1) gets parents of second member in parent group
          memberToProcess = parentMembers[1];
        } else if (isLeftChild && parentMembers.length > 0) {
          // If only one member in parent group, left child gets that member's parents
          memberToProcess = parentMembers[0];
        }

        if (memberToProcess !== null) {
          // Get parents for the specific member being processed
          const memberParents = getParentObjectsWithPlaceholders(memberToProcess);
          const memberParentIds = memberParents.map(p => p.id);

          if (memberParentIds.length > 0) {
            groups[groupId] = {
              id: groupId,
              members: memberParentIds,
              parents: [], // Will be set according to navigation structure later
              ...calculateGroupPosition(groupId)
            };
          }
        }
      }
    }

    // Now set up the navigation "parents" for each group
    // In the binary tree navigation system: clicking group N shows N and its "parents"
    // Based on the original branchData structure, group N's "parents" are the groups that contain its members' actual parents
    // If we follow the original pattern: group 1 has parents [2, 3] - meaning when 1 is clicked, show 1, 2, and 3
    // Group 2 has parents [4, 5] - showing 2, 4, 5 when 2 is clicked
    // This means group N's "parents" are the next level in the tree (N's children in binary tree terms)
    for (let i = 1; i < 100; i++) { // Process all possible groups up to 100
      if (groups[i]) {
        // In the navigation system, a group's "parents" are its children in the binary tree structure
        // This is backwards from normal terminology but that's the existing system
        const child1Id = i * 2;    // Left child in binary tree (next level)
        const child2Id = i * 2 + 1; // Right child in binary tree (next level)

        const potentialChildren = [child1Id, child2Id];

        // Only include children that actually exist in our groups array
        const actualChildren = potentialChildren.filter(childId =>
          groups[childId] !== undefined
        );

        groups[i].parents = actualChildren;
      }
    }

    return groups.filter(Boolean);
  };

  return {
    buildCompleteTree,
    generateGroups,
    getParentsById,
    getParentsWithPlaceholders,
    getParentObjectsWithPlaceholders,
    getChildrenById,
    calculateGroupPosition
  };
}