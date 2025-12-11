import { ref, computed } from 'vue';

export function useGroupVisibility(groupData, baseGroupId = 1, infoTable = []) {
  const visibleGroups = ref(new Set([baseGroupId]));

  // Build level map based on the actual group data provided
  const levelMap = buildLevels(groupData, baseGroupId);

  function buildLevels(groups, startId = 1) {
    const map = {};
    const groupMap = new Map();

    // Create a map of group id to group object for quick lookup
    groups.forEach(g => {
      groupMap.set(g.id, g);
    });

    // Use BFS to determine levels
    const queue = [{ id: startId, level: 0 }];
    map[startId] = 0;

    while (queue.length > 0) {
      const { id, level } = queue.shift();
      const group = groupMap.get(id);

      // If the group has parent references, add them to the next level
      if (group && group.parents) {
        group.parents.forEach(parentId => {
          if (!map[parentId]) {
            map[parentId] = level + 1;
            queue.push({ id: parentId, level: level + 1 });
          }
        });
      }
    }

    return map;
  }

  function showGroup(groupId) {
    visibleGroups.value.add(groupId);
  }

  function hideGroup(groupId) {
    if (!visibleGroups.value.has(groupId)) return;
    visibleGroups.value.delete(groupId);

    // Get actual parents from the group data
    const group = groupData.find(g => g.id === groupId);
    const parents = group ? group.parents || [] : [];

    parents.forEach(parentId => {
      // Check if any other visible groups have this parent as their child
      const hasVisibleChildren = groupData.some(
        g =>
          g.parents && g.parents.includes(parentId) &&
          g.id !== groupId &&
          visibleGroups.value.has(g.id)
      );
      if (!hasVisibleChildren) hideGroup(parentId);
    });
  }

  function showGroupAndParents(groupId) {
    showGroup(groupId);

    // Get actual parents from the group data
    const group = groupData.find(g => g.id === groupId);
    const parents = group ? group.parents || [] : [];
    const parentLevel = parents.length > 0 ? levelMap[parents[0]] ?? Infinity : Infinity;

    // Hide other groups at the same level
    groupData.forEach(g => {
      const lvl = levelMap[g.id];
      if (lvl === parentLevel && !parents.includes(g.id) && g.id !== groupId) {
        hideGroup(g.id);
      }
    });

    // Hide deeper levels
    groupData.forEach(g => {
      const lvl = levelMap[g.id];
      if (lvl > parentLevel && g.id !== groupId) {
        hideGroup(g.id);
      }
    });

    // Show direct parents
    parents.forEach(pid => showGroup(pid));
  }

  function showGroupAndSpecificParents(groupId, memberId) {
    showGroup(groupId);

    // Find the parents of the specific member from infoTable to understand if they exist
    const memberInfo = infoTable.find(person => person.id === memberId);
    if (!memberInfo) {
      // If member not found, fall back to default behavior
      const group = groupData.find(g => g.id === groupId);
      const parents = group ? group.parents || [] : [];
      const parentLevel = parents.length > 0 ? levelMap[parents[0]] ?? Infinity : Infinity;

      // Hide other groups at the same level
      groupData.forEach(g => {
        const lvl = levelMap[g.id];
        if (lvl === parentLevel && !parents.includes(g.id) && g.id !== groupId) {
          hideGroup(g.id);
        }
      });

      // Hide deeper levels
      groupData.forEach(g => {
        const lvl = levelMap[g.id];
        if (lvl > parentLevel && g.id !== groupId) {
          hideGroup(g.id);
        }
      });

      // Show direct parents
      parents.forEach(pid => showGroup(pid));
      return;
    }

    // In the binary tree structure, the parent groups for group N are groups 2N and 2N+1
    const leftParentGroup = groupId * 2;   // Left "parent" group (contains parents of member at position 0)
    const rightParentGroup = groupId * 2 + 1;  // Right "parent" group (contains parents of member at position 1)

    // Determine parent level for hiding other groups
    const leftParentLevel = levelMap[leftParentGroup] ?? Infinity;
    const rightParentLevel = levelMap[rightParentGroup] ?? Infinity;
    const parentLevel = Math.min(leftParentLevel, rightParentLevel);

    // Hide other groups at the same level
    groupData.forEach(g => {
      const lvl = levelMap[g.id];
      if (lvl === parentLevel &&
          g.id !== leftParentGroup &&
          g.id !== rightParentGroup &&
          g.id !== groupId) {
        hideGroup(g.id);
      }
    });

    // Hide deeper levels
    groupData.forEach(g => {
      const lvl = levelMap[g.id];
      if (lvl > parentLevel && g.id !== groupId) {
        hideGroup(g.id);
      }
    });

    // Always show both parent groups in binary tree navigation
    showGroup(leftParentGroup);
    showGroup(rightParentGroup);
  }

  function isVisible(groupId) {
    return visibleGroups.value.has(groupId);
  }

  return {
    visibleGroups: computed(() => visibleGroups.value),
    showGroup,
    hideGroup,
    showGroupAndParents,
    showGroupAndSpecificParents,
    isVisible,
    levelMap,
  };
}