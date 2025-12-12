<!-- prettier-ignore-file -->
<script setup>
import { ref, computed, inject, provide } from "vue";
import NewBranch from "../components/NewBranch.vue";
import { useDraggableModal } from "@/composables/useDraggableModal";
import { useGroupVisibility } from "@/composables/useGroupVisibility";
import { useDynamicGroups } from "@/composables/useDynamicGroups";

useDraggableModal();

// Get the infoTable from global provide
const infoTable = inject("infoTable", []);
const dynamicGroups = ref([]);
const groupVisibilityRef = ref(null);
const loading = ref(false); // No need to load since it's already loaded globally

const openFormHandler = ( memberId, groupId, memberIndex) => {
  // console.log('Received payload:', payload);
  // const { memberId, groupId, memberIndex } = payload;
  window.open(`/add-person?id=${memberId}&groupId=${groupId}&memberIndex=${memberIndex}`, '_blank');
};

// Generate dynamic groups and create group visibility now that we have the data
if (infoTable && infoTable.length > 0) {
  const { buildCompleteTree } = useDynamicGroups(infoTable);
  dynamicGroups.value = buildCompleteTree([2, 13], 10);
  groupVisibilityRef.value = useGroupVisibility(dynamicGroups.value, 1, infoTable);
}

// Provide the groupVisibility that other components need
provide("groupVisibility", groupVisibilityRef.value);

// Make the data available to the template as well
const branchData = computed(() => dynamicGroups.value);
</script>

<template>
  <div id="treewindow">
    <img
      class="background"
      src="../assets/graphics/treewindow.png"
      alt=""
      height="2000"
      style="left: 0px"
    />

    <div id="draggable-elem">
      <div v-if="loading" class="loading">
        Loading family tree data...
      </div>

      <div v-else-if="infoTable.length > 0 && groupVisibilityRef" id="treepot">
        <NewBranch
          v-for="(group, index) in branchData"
          :key="index"
          :group="group"
          @open-form="openFormHandler"
          :info-table="infoTable"
          :group-visibility="groupVisibilityRef"
        />
      </div>

      <div v-else class="error">
        Error loading family tree data.
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  color: #333;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  color: #ff0000;
}
</style>

<style scoped>
figure.boxzero {
  width: 400px;
  padding: 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  left: -140px;
  top: 380px;
}

figure.boxzero .p2 {
  word-wrap: break-word;
  white-space: normal;
  line-height: 1.6;
}

.tree-wrapper {
  /* left: -1200px; */
  display: flex;
  justify-content: center; /* centers horizontally */
  align-items: start; /* align top, or use center to center vertically */
  width: 8000px;
  height: 3600px;
  overflow: auto; /* adds scrollbars when needed */
  position: relative;
}
/* on right edge, left=3434, on right edge, left=54 */
#draggable-elem {
  position: relative;
  top: 930px;
  left: 600px;
  width: 8000px;
  height: 3700px;
  white-space: nowrap;
  background-color: white;
  /* font-size: 1.6em;
  display: grid;
  place-items: center;
  font-family: "Poppins", sans-serif;
  border-radius: 0.3em;
  cursor: move;
  z-index: 0;
  overflow-x: auto; */
}
/* 👇 drop the absolute positioning & transform */
/* position: absolute; */
/* top/left/transform removed */

/* #draggable-elem {
    position: absolute;
    background-color: white;
    font-size: 1.6em;
    left: 600px;
    height: 3700px;
    width: 8000px;
    top: 930px;
    transform: translate(-50%, -25%);
    display: grid;
    place-items: center;
    font-family: "Poppins", sans-serif;
    border-radius: 0.3em;
    cursor: move;
    z-index: 0;
    overflow-x: auto;
    white-space: nowrap;
  } */

h4 {
  background-color: transparent;
}
/*
.mgroup {
  left: 300px;
  top: 20px;
  position: absolute;
  width: 370px;
  height: 140px;
  border-radius: 12px 24px 24px 24px;
  border-top: thin #006600 solid;
  border-left: thin #006600 solid;
  border-right: thin #006600 solid;
  z-index: 1;
}
*/

#treewindow {
  position: relative;
  margin: auto;
  /*    left: 400px;
        width: 250px;
    height: 250px;
 */
  width: 98%;
  height: 700px;
  display: block;
  background-color: white;
  background-image: url(/graphics/treewindow.png);
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: url(/graphics/openhand.cur), pointer;
  overflow: visible;
  z-index: 99;
}
</style>
