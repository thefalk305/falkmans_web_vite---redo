import { ref, computed } from 'vue';

export function useGroupVisibility(groupData, baseGroupId = 1) {
  // Initialize with the base group always visible
  const visibleGroups = ref(new Set([baseGroupId]));

  // Build a level map: distance from the base group (baseGroupId)
  const levelMap = buildLevels(groupData, baseGroupId);

  function buildLevels(groups, startId) {
    const map = {};
    // BFS upward following parents
    const q = [{ id: startId, level: 0 }];
    map[startId] = 0;
    while (q.length) {
      const { id, level } = q.shift();
      // find the group's parents
      const g = groups.find(x => x.id === id);
      if (!g || !g.parents) continue;
      g.parents.forEach(p => {
          // console.log('Mapping group', p);
        if (map[p] === undefined || map[p] > level + 1) {
          map[p] = level + 1;
          q.push({ id: p, level: level + 1 });
        }
      });
    }
    return map;
  }

  function showGroup(groupId) {
    visibleGroups.value.add(groupId);
  }

  function hideGroup(groupId) {
    visibleGroups.value.delete(groupId);
    // When hiding a group, also hide its parents if they have no other visible children
    const group = groupData.find(g => g.id === groupId);
    if (group && group.parents && group.parents.length > 0) {
      group.parents.forEach(parentId => {
        // Check if this parent has any other visible children
        const hasVisibleChildren = groupData.some(g => 
          g.parents && 
          g.parents.includes(parentId) && 
          g.id !== groupId && 
          visibleGroups.value.has(g.id)
        );
        // If no visible children, hide the parent too
        if (!hasVisibleChildren) {
          hideGroup(parentId);
        }
      });
    }
  }

  // When a group is clicked: show its direct parents and ensure only one parent-pair
  // is visible per level. Keep lower (closer to base) levels visible.
  function showGroupAndParents(groupId) {
    const group = groupData.find(g => g.id === groupId);
    if (!group) return;

    // Show the clicked group
    showGroup(groupId);

    // Handle groups with no parents (just show the group, no parents to show)
    if (!group.parents || group.parents.length === 0) {
      // Do nothing else — just ensure the clicked group is visible
      return;
    }

    // Filter out duplicate parents and create a unique parent set
    const uniqueParents = [...new Set(group.parents)];
    const parentIds = uniqueParents.filter(p => p !== undefined && p !== null);
    
    if (parentIds.length === 0) return;

    // Determine parent level (assume parents share the same level)
    const parentLevel = levelMap[parentIds[0]] ?? Infinity;

    // Hide any groups at the parent level that are not part of the new parent set
    // Also hide leaf groups (no parents) that are not in the parent set
    groupData.forEach(g => {
      const lvl = levelMap[g.id];
      if (lvl === parentLevel && !parentIds.includes(g.id) && g.id !== groupId) {
        hideGroup(g.id);
      }
      // Also hide leaf groups at this level that aren't the clicked group
      if (
        (!g.parents || g.parents.length === 0) &&
        !parentIds.includes(g.id) &&
        g.id !== groupId &&
        lvl === parentLevel
      ) {
        hideGroup(g.id);
      }
    });

    // Also hide any groups at levels deeper than parentLevel (to remove previously
    // shown deeper parent sets), but keep groups with no parents visible
    groupData.forEach(g => {
      const lvl = levelMap[g.id];
      if (
        lvl > parentLevel &&
        g.id !== groupId &&
        g.parents &&
        g.parents.length > 0
      ) {
        hideGroup(g.id);
      }
    });

    // Show the direct parents (with duplicates removed)
    parentIds.forEach(pid => showGroup(pid));
  }

  function isVisible(groupId) {
    return visibleGroups.value.has(groupId);
  }

  return {
    visibleGroups: computed(() => visibleGroups.value),
    showGroup,
    hideGroup,
    showGroupAndParents,
    isVisible,
    levelMap,
  };
}
