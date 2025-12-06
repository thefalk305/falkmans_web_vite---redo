import { ref, computed } from 'vue';

export function useGroupVisibility(groupData, baseGroupId = 1) {
  const visibleGroups = ref(new Set([baseGroupId]));
  const levelMap = buildLevels( baseGroupId);

  // Build a level map using BFS
  // function buildLevels(groups, startId) {
  //   const map = {};
  //   const q = [{ id: startId, level: 0 }];
  //   map[startId] = 0;
  //   const maxId = Math.max(...groups.map(g => g.id));

  //   while (q.length) {
  //     const { id, level } = q.shift();
  //     const parents = [id * 2, id * 2 + 1];
  //     parents.forEach(p => {
  //       if (p <= maxId && (map[p] === undefined || map[p] > level + 1)) {
  //         map[p] = level + 1;
  //         q.push({ id: p, level: level + 1 });
  //       }
  //     });
  //   }
  //   return map;
  // }
// function buildLevels(groups, startId) {
//   const map = {};
//   groups.forEach(g => {
//     map[g.id] = Math.floor(Math.log2(g.id)) - Math.floor(Math.log2(startId)) + 0;
//   });
//   return map;
// }

function buildLevels(startId = 1) {
  const map = {};
  const maxId = 511;
  const baseLevel = Math.floor(Math.log2(startId));
  for (let id = startId; id <= maxId; id++) {
    map[id] = Math.floor(Math.log2(id)) - baseLevel;
  }
  return map;
}

  function showGroup(groupId) {
    visibleGroups.value.add(groupId);
  }

  function hideGroup(groupId) {
    if (!visibleGroups.value.has(groupId)) return;
    visibleGroups.value.delete(groupId);

    const parents = [groupId * 2, groupId * 2 + 1];
    parents.forEach(parentId => {
      const hasVisibleChildren = groupData.some(
        g =>
          [g.id * 2, g.id * 2 + 1].includes(parentId) &&
          g.id !== groupId &&
          visibleGroups.value.has(g.id)
      );
      if (!hasVisibleChildren) hideGroup(parentId);
    });
  }

  function showGroupAndParents(groupId) {
    showGroup(groupId);
    const parents = [groupId * 2, groupId * 2 + 1];
    const parentLevel = levelMap[parents[0]] ?? Infinity;

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