<script setup>
import AppLink from "@/components/AppLink.vue";
import { ref, onMounted, computed, inject, provide  } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useGroupVisibility } from "@/composables/useGroupVisibility";

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

// const props = defineProps({
//   group: Object,
//   infoTable: Array,
//   groupVisibility: Object,
// });


const group = {
    "id": 1,
    "members": [
        2,
        13
    ],
    "parents": [
        2,
        3
    ],
    "top": 0,
    "left": 0
}
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

const memberIds = group.members;
const top = group.top;
const left = group.left;
const groupId = group.id;

const branchData = memberIds
  .map((id) => {
    const foundInfotableEntry = infoTable.find(
      (entry) => entry.id === id
    );
    if (foundInfotableEntry) {
      return foundInfotableEntry;
    }
    if (id === 9998) {
      return { id: id, pic: "Add Father.svg" };
    }
    if (id === 9999) {
      return { id: id, pic: "Add Mother.svg" };
    }
    return null;
  })
  .filter(Boolean);

  const couple = {
    name: "Al Falkman"
  }

// Function to check if the group should be displayed
// If not authenticated and the group only contains placeholders (9998, 9999), hide it
// const shouldDisplayGroup = () => {
//   if (isAuthenticated.value) {
//     return true; // Always show if authenticated
//   }

//   // If not authenticated, check if the group has any non-placeholder members
//   const hasRealMembers = branchData.some(
//     (person) => person.id !== 9998 && person.id !== 9999
//   );

//   return hasRealMembers; // Only show if there are real members (not just placeholders)
// };

// function handleImageClick(groupId, clickedMemberId) {
//   // Show the clicked group and parents specific to this person
//   groupVisibility.showGroupAndSpecificParents(groupId, clickedMemberId);
// }

// function openForm(memberId, memberIndex) {
//   emit("open-form", memberId, groupId, memberIndex);
// }
</script>


<template>

  <div class="coupleNodeCss">


  </div>
  <div class="couple">
    <div class="top">
      <h3>{{ couple.name }}</h3>
    </div>
    <div class="bottom"></div>
    <button
      data-testid="children-list-button"
      type="button"
      class="buttonWrapCss"
      aria-label="Children of Allen Bernard Falkman Sr. and Helen Alexander"
    >
      <span>Children</span
      ><span
        class="shapeCss"
        icon-size="sm"
        style="background: transparent"
        ><svg
          icon-direction="down"
          class="directionCss svgCss"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          role="presentation"
          style="color: currentcolor"
        ></svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
@import "./../assets/css/Couple.css";
@import "./../assets/css/Bleed.css";
@import "./../assets/css/ChildList.css";
@import "./../assets/css/globalStyles.css";
@import "./../assets/css/Ellipsis.css";
@import "./../assets/css/BaseIcon.css";
@import "./../assets/css/Avatar.css";
</style>
