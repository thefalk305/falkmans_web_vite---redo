import { computed } from 'vue';

// Generic function to find a person by any property in the infoTable
const findPersonByProperty = (infoTable, property, value) => {
  return infoTable.find(person => person[property] === value);
};

// Function to find a person by name in the infoTable
const findPersonByName = (infoTable, name) => findPersonByProperty(infoTable, 'name', name);

// Function to find a person by ID in the infoTable
const findPersonById = (infoTable, id) => findPersonByProperty(infoTable, 'id', id);

// Function to calculate the full group data dynamically from infoTable with horizontal layout
export function useHorizontalGroups(infoTable) {
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

  // Helper function to process parent with specified logic
  const processParent = (person, parentField, placeholderId, placeholderName, missingAsPlaceholder = false) => {
    const parentName = person[parentField];
    const parentExists = parentName && parentName.trim() !== "";

    if (!parentExists && !missingAsPlaceholder) {
      // Don't return anything for missing parent if not treating as placeholder
      return null;
    } else if (parentExists) {
      const parent = findPersonByName(infoTable, parentName);
      if (parent) {
        return {
          id: parent.id,
          type: 'existent',
          person: parent
        };
      } else {
        console.warn(`${parentField.charAt(0).toUpperCase() + parentField.slice(1)} "${parentName}" not found in infoTable`);
        // Return placeholder for parent not found in the data
        return {
          id: placeholderId,
          type: 'placeholder'
        };
      }
    } else {
      // parent doesn't exist, but missingAsPlaceholder is true
      return {
        id: placeholderId,
        type: 'placeholder'
      };
    }
  };

  // Function to get parents of a person by ID (without placeholders)
  const getParentsById = (personId) => {
    const person = findPersonById(infoTable, personId);
    if (!person) return [];

    const parents = [];

    const fatherResult = processParent(person, 'father', 9998, 'Add Father');
    if (fatherResult && fatherResult.type === 'existent') {
      parents.push(fatherResult.id);
    }

    const motherResult = processParent(person, 'mother', 9999, 'Add Mother');
    if (motherResult && motherResult.type === 'existent') {
      parents.push(motherResult.id);
    }

    return parents;
  };

  // Function to get parents with placeholders for missing parents
  const getParentsWithPlaceholders = (personId) => {
    const person = findPersonById(infoTable, personId);
    if (!person) return [];

    const parents = [];

    const fatherResult = processParent(person, 'father', 9998, 'Add Father', true);
    if (fatherResult) {
      parents.push(fatherResult.id);
    }

    const motherResult = processParent(person, 'mother', 9999, 'Add Mother', true);
    if (motherResult) {
      parents.push(motherResult.id);
    }

    return parents;
  };

  // Function to get parent objects with placeholders for missing parents
  const getParentObjectsWithPlaceholders = (personId) => {
    const person = findPersonById(infoTable, personId);
    if (!person) return [];

    const parentObjects = [];

    const fatherResult = processParent(person, 'father', 9998, 'Add Father', true);
    if (fatherResult) {
      if (fatherResult.type === 'existent' && fatherResult.person) {
        parentObjects.push(fatherResult.person);
      } else {
        // Always add the placeholder if it's missing (either field is empty or person not found)
        parentObjects.push({
          id: 9998,
          pic: 'Add Father.svg',
          name: 'Add Father',
          born_died: '',
          birthplace: ''
        });
      }
    }

    const motherResult = processParent(person, 'mother', 9999, 'Add Mother', true);
    if (motherResult) {
      if (motherResult.type === 'existent' && motherResult.person) {
        parentObjects.push(motherResult.person);
      } else {
        // Always add the placeholder if it's missing (either field is empty or person not found)
        parentObjects.push({
          id: 9999,
          pic: 'Add Mother.svg',
          name: 'Add Mother',
          born_died: '',
          birthplace: ''
        });
      }
    }

    return parentObjects;
  };

  // Function to get children of a person by ID
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

  // Function to calculate group positions based on level and position - HORIZONTAL LAYOUT
  // Each generation is 350px further to the right, with parents displayed at ±150px top/bottom
  const calculateHorizontalGroupPosition = (groupId) => {
    if (groupId === 0) {
      // Group 0 (group of people above the root)
      return { top: 0, left: 0 };  // Positioned 350px to the left of group 1
    }

    if (groupId === 1) {
      // Group 1 (root group)
      return { top: 0, left: 0 };
    }

    // Calculate level based on binary tree position
    const level = Math.floor(Math.log2(groupId));
    const left = level * 350; // Each generation is 350px further to the right

    // Calculate position by tracing path from node to root, accumulating position changes
    let currentId = groupId;
    let top = 0;

    // Walk up the tree from the target node to the root, accumulating position changes
    while (currentId > 1) {
      const parentId = Math.floor(currentId / 2);
      const isLeftChild = (currentId === parentId * 2);

      if (isLeftChild) {
        top -= 150;  // Left child is 150px above parent
      } else {
        top += 150;  // Right child is 150px below parent
      }

      currentId = parentId;
    }

    return { top, left };
  };

  // Generate the full tree structure with horizontal layout (keeping this function to maintain compatibility)
  const generateGroups = (baseMembers = [2, 13], maxGroups = 100) => {
    const groups = [];

    // Group 0 (special group with fixed members)
    groups[0] = {
      id: 0,
      // members: [4, 5, 6, 7, 8],
      members: [4, 25, 5, 53, 6, 123, 7, 124, 8, 52],
      // members: [[4, 25], [5, 53], [6, 123], [7, 124], [8, 52]],
      parents: [0, 1], // placeholder parents
      ...calculateHorizontalGroupPosition(0)
    };

    // Group 1 (root group)
    groups[1] = {
      id: 1,
      members: [...baseMembers],
      parents: [],
      ...calculateHorizontalGroupPosition(1)
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

          // Create left navigation parent group (2*g) - contains actual parents of members in group g
          if (g * 2 < maxGroups) {
            const leftParents = parentArray.filter((_, idx) => idx % 2 === 0);
            if (leftParents.length > 0) {
              groups[g * 2] = {
                id: g * 2,
                members: leftParents,
                parents: [],
                ...calculateHorizontalGroupPosition(g * 2)
              };
            }
          }

          // Create right navigation parent group (2*g + 1) - contains actual parents of members in group g
          if (g * 2 + 1 < maxGroups) {
            const rightParents = parentArray.filter((_, idx) => idx % 2 === 1);
            if (rightParents.length > 0) {
              groups[g * 2 + 1] = {
                id: g * 2 + 1,
                members: rightParents,
                parents: [],
                ...calculateHorizontalGroupPosition(g * 2 + 1)
              };
            }
          }
        }
      }
    }

    return groups.filter(Boolean);
  };

  // More accurate method that builds the tree properly with placeholders - HORIZONTAL LAYOUT
  const buildCompleteTree = (baseMembers = [2, 13], maxDepth = 8) => {
    const groups = [];

    // Group 0 (special group - always visible)
    groups[0] = {
      id: 0,
      // members: [4, 5, 6, 7, 8],
      members: [4, 25, 5, 53, 6, 123, 7, 124, 8, 52],
      parents: [0, 1], // Following original pattern
      top: 0,
      left: -350  // Positioned 350px to the left of group 1
    };

    // Group 1 (root) - contains base members
    groups[1] = {
      id: 1,
      members: [...baseMembers],
      parents: [], // Will be filled in later
      ...calculateHorizontalGroupPosition(1)
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

        // Skip groups 0 and 1 since they're already initialized
        if (groupId <= 1) continue;

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
          // Left navigation parent (2*treeParentId) gets parents of first member in parent group
          memberToProcess = parentMembers[0];
        } else if (isRightChild && parentMembers[1] !== undefined) {
          // Right navigation parent (2*treeParentId+1) gets parents of second member in parent group
          memberToProcess = parentMembers[1];
        } else if (isLeftChild && parentMembers.length > 0) {
          // If only one member in parent group, left navigation parent gets that member's parents
          memberToProcess = parentMembers[0];
        }

        if (memberToProcess !== null) {
          // Get parents for the specific member being processed
          const memberParents = getParentObjectsWithPlaceholders(memberToProcess);
          const memberParentIds = memberParents.map(p => p.id);

          // Create the group even if it only has placeholders (important for navigation)
          groups[groupId] = {
            id: groupId,
            members: memberParentIds,
            parents: [], // Will be set according to navigation structure later
            ...calculateHorizontalGroupPosition(groupId)
          };
        } else {
          // Still create the group even if no member to process, to maintain tree structure
          groups[groupId] = {
            id: groupId,
            members: [],
            parents: [],
            ...calculateHorizontalGroupPosition(groupId)
          };
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
        const navigationParent1Id = i * 2;    // First "parent" group in navigation (contains actual parents of group i members)
        const navigationParent2Id = i * 2 + 1; // Second "parent" group in navigation (contains actual parents of group i members)

        const potentialNavigationParents = [navigationParent1Id, navigationParent2Id];

        // Only include navigation parents that actually exist in our groups array
        const actualNavigationParents = potentialNavigationParents.filter(parentId =>
          groups[parentId] !== undefined
        );

        groups[i].parents = actualNavigationParents;
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
    calculateHorizontalGroupPosition
  };
}