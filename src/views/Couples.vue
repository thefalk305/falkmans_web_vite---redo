<script setup>
import AppLink from "@/components/AppLink.vue";
import { ref, onMounted, computed, inject, provide, watch } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Chevron from "@/components/Chevron.vue";
import Person from "@/components/Person.vue";
import { useHorizontalGroups } from "@/composables/useHorizontalGroups";
import { useHorizontalGroupVisibility } from "@/composables/useHorizontalGroupVisibility";
const groupVisibilityRef = ref(null);
const props = defineProps({
  group: Object,
  groupVisibility: Object,
});
const dynamicGroups = ref([]);
// Get the infoTable from global provide
const infoTable = inject("infoTable", []);

const emit = defineEmits(["open-form"]);

// Authentication state
const isAuthenticated = ref(false);

// Check authentication state on component mount
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
  });
});

const isOpen = ref(false);
const isExpanded = ref(false);
const memberIds = props.group.members;
const top = props.group.top;
const left = props.group.left;
const groupId = props.group.id;
// if(groupId === 1) {
//   top = 325
// }

const branchData = memberIds
  .map((id) => {
    const foundInfotableEntry = infoTable.find((entry) => entry.id === id);
    if (foundInfotableEntry) {
      // only get years from born_died field
      const range = foundInfotableEntry.born_died;
      const match = range?.match(/\b\d{4}\b/g);
      const years = match ? `${match[0]} – ${match[1]}` : null;
      const children = Array.from(
        // build array of children
        { length: 6 },
        (_, i) => foundInfotableEntry[`child${i + 1}`]
      ).filter(Boolean);
      return {
        ...foundInfotableEntry,
        years, // add born_died years and
        children, // children to branchData
      };
    }
    if (id === 9998) {
      return {
        id,
        pic: "Add Father.svg",
        name: "Add Father",
        marriage: { data: "", place: "" },
      };
    }
    if (id === 9999) {
      return {
        id,
        pic: "Add Mother.svg",
        name: "Add Mother",
        marriage: { data: "", place: "" },
      };
    }
    return null;
  })
  .filter(Boolean);

// Function to check if the group should be displayed
// If not authenticated and the group only contains placeholders (9998, 9999), hide it
const shouldDisplayGroup = () => {
  if (isAuthenticated.value) {
    return true; // Always show if authenticated
  }
  // If not authenticated, check if the group has any non-placeholder members
  const hasRealMembers = branchData.some(
    (person) => person.id !== 9998 && person.id !== 9999
  );
  return hasRealMembers; // Only show if there are real members (not just placeholders)};
};

function handleImageClick(groupId, clickedMemberId) {
  // Toggle the expanded state
  isExpanded.value = !isExpanded.value;

  if (isExpanded.value) {
    // Show the clicked group and its parents
    props.groupVisibility.showGroupAndSpecificParents(groupId, clickedMemberId);
  } else {
    // Hide the parent groups when collapsing
    const topParentGroup = groupId * 2;
    const bottomParentGroup = groupId * 2 + 1;

    props.groupVisibility.hideGroup(topParentGroup);
    props.groupVisibility.hideGroup(bottomParentGroup);
  }
}

// Watch for visibility changes and sync isExpanded state accordingly
watch(
  () => props.groupVisibility?.isVisible(groupId),
  (isVisible) => {
    // If the group is no longer visible, set isExpanded to false
    if (!isVisible) {
      isExpanded.value = false;
    }
  },
  { immediate: true }
);

// Watch for changes to child groups and update isExpanded accordingly
watch(
  () => {
    // Check if either child group (2*groupId or 2*groupId+1) is visible
    const leftChildId = groupId * 2;
    const rightChildId = groupId * 2 + 1;

    const leftChildVisible = props.groupVisibility?.isVisible(leftChildId);
    const rightChildVisible = props.groupVisibility?.isVisible(rightChildId);

    // Group is expanded if it's visible and at least one of its children is visible
    return {
      groupVisible: props.groupVisibility?.isVisible(groupId),
      leftChildVisible,
      rightChildVisible,
    };
  },
  ({ groupVisible, leftChildVisible, rightChildVisible }) => {
    // If the group is visible but none of its children are visible,
    // it means it's not expanded anymore
    if (groupVisible && !leftChildVisible && !rightChildVisible) {
      isExpanded.value = false;
    }
    // If the group is visible and at least one child is visible,
    // it means it's expanded
    else if (groupVisible && (leftChildVisible || rightChildVisible)) {
      isExpanded.value = true;
    }
  },
  { immediate: true }
);

// The groupVisibility is passed from the parent component, so we don't need to recreate it here
// const levelMapRef = ref(null);
if (infoTable && infoTable.length > 0) {
  // Use the groupVisibility from props instead of creating new one
  groupVisibilityRef.value = props.groupVisibility;
  // levelMapRef.value = props.groupVisibility.levelMap; // store it separately
}
// const level = ref(0)
//  level.value = levelMapRef.value[groupId + 1];

const level = computed(() => props.groupVisibility.levelMap[groupId] ?? 0);

// if(groupId === 1) {
console.log("groupId", groupId, "branchData", branchData);
// }

function openForm(memberId, memberIndex) {
  emit("open-form", memberId, groupId, memberIndex);
}
</script>

<template>
  <div class="wideCouples" v-if="groupId < 1023">
    <div class="marriage" v-if="branchData[0].marriage.date">
      <p>Marriage: {{ branchData[0].marriage.date }},</p>
      <p>
        {{ branchData[0].marriage.place }}
      </p>
    </div>

    <!-- // topmgroup = Da'Boys -->
    <div v-if="groupId === 0" class="topmgroup">
      <div
        style="position: relative"
        :style="{
          left: `${0}px`,
        }"
        class="coupleNodeCss couplesInfo"
        v-for="(person, index) in branchData"
        :key="person.id"
      >
        <Person :person="person" />
      </div>
    </div>
    <!-- not topgroup -->
    <!-- set x - y position -->
    <div
      v-else
      v-if="shouldDisplayGroup()"
      class="groups"
      :class="`group${groupId}`"
      :style="{
        top: `${top}px`,
        left: `${left}px`,
        visibility: props.groupVisibility?.isVisible(groupId)
          ? 'visible'
          : 'hidden',
      }"
    >
      <div
        v-if="groupId > 1"
        :class="[groupId % 2 ? 'bottomTwig' : 'topTwig']"
      ></div>
      <div class="couplesInfo">
        <!-- <p>mgroup{{ groupId }}</p> -->
        <div
          v-for="(person, index) in branchData"
          :style="{
            top: -108 + index * 54 + 'px',
          }"
          class="coupleNodeCss"
          :class="index % 2 ? 'female' : 'male'"
          :key="person.id"
        >
          <Person :person="person" />
          <!-- <div class="marriage" v-if="!index && branchData[0].marriage.date">
            <p>Marriage: {{ branchData[0].marriage.date }},</p>
            <p>
              {{ branchData[0].marriage.place }}
            </p>
          </div> -->
        </div>
        <button class="children" @click="isOpen = !isOpen">
          Children
          <Chevron :class="isOpen ? '' : 'open'" />
        </button>
        <div
          v-show="isOpen"
          class="showChildren children"
          v-for="person in branchData[0].children"
          :key="person"
        >
          <Person :person="person" />
        </div>
        <!-- </div> -->
        <button
          class="expandButton"
          @click="handleImageClick(groupId, branchData[0].id)"
          style="top: -87; left: 305"
        >
          <Chevron
            class="expandButton"
            :class="isExpanded ? 'expanded' : ''"
            style="width: 20px; height: 20px; left: 9px; top: 7px"
          />
        </button>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
:root {
  --avatar-size: 40px;
  --presence-size: 16px;
  --presence-border-size: 2px;
}

.topTwig {
  position: absolute;
  top: -55px;
  left: -200px;
  height: 97px;
  width: 300px;
  border-radius: 10px 0px 0px 0px;
  border-left: thin #006600 solid;
  border-top: thin #006600 solid;
  z-index: -1;
}
.bottomTwig {
  position: absolute;
  top: -150px;
  left: -200px;
  height: 97px;
  width: 200px;
  border-radius: 0px 0px 0px 10px;
  border-bottom: thin #006600 solid;
  border-left: thin #006600 solid;
  z-index: -1;
}

.groups {
  position: absolute;
}

.topmgroup {
  position: relative;
  top: 75px;
  left: -350px;
  width: 300px;
  height: 270px;
}
.expandButton {
  width: 36px;
  height: 34px;
  border-radius: 50%;
  background-color: bisque;
  background-color: white;
  position: absolute;
  left: 260px;
  top: -70px;
}

.wideCouples {
  position: relative;
  display: flex;
  top: 20px;
  left: 100px;
  width: 333px;
}

.coupleNodeCss {
  position: absolute;
  width: 250px;
  height: 54px;
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
  background-color: bisque;
  background-color: white;
}
.couplesInfo {
  width: 250px;
  background-color: beige;
  background-color: white;
  border-radius: 6px;
}

.showChildren {
  border-left: 4px solid #dddfdf;
}
a:hover {
  background-color: #888;
  border-radius: 5px;
}
.child {
  margin-left: 20px;
  padding: 1px;
  font-size: smaller;
}

.children {
  position: relative;
  display: flex;
  width: 246px;
  text-align: left;
  font-size: x-small;
  border-top: 1px solid #ccc;
  padding: 0 2px;
  /* margin-left: 4px; */
  border-left: 4px solid #dddfdf;
  border-radius: 4px;
}

h3 {
  margin: 5px 0 0 0;
}

.marriage {
  position: absolute;
  top: -65px;
  /* width: 250px;
  height: 30px;
  align-self: center;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; */
  left:64px;
  z-index: 99;
}

.marriage p{
font-size: x-small;
  height: 10px;
}

button {
}

.female {
  align-items: flex-end;
  border-left: 4px solid #ff5500;
}

.male {
  align-items: flex-start;
  border-left: 4px solid #0eebcb;
}

@import "./../assets/css/Couple.css";
@import "./../assets/css/Bleed.css";
@import "./../assets/css/ChildList.css";
@import "./../assets/css/globalStyles.css";
@import "./../assets/css/Ellipsis.css";
@import "./../assets/css/BaseIcon.css";
@import "./../assets/css/Avatar.css";
@import "./../assets/css/Row.css";
@import "./../assets/css/iconStyles.css";
</style>
