<script setup>
import AppLink from "@/components/AppLink.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

const props = defineProps({
  group: Object,
  infoTable: Array,
  groupVisibility: Object,
});

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

const memberIds = props.group.members;
const top = props.group.top;
const left = props.group.left;
const groupId = props.group.id;

const branchData = memberIds
  .map((id) => {
    const foundInfotableEntry = props.infoTable.find(
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

  return hasRealMembers; // Only show if there are real members (not just placeholders)
};

function handleImageClick(groupId, clickedMemberId) {
  // Show the clicked group and parents specific to this person
  props.groupVisibility.showGroupAndSpecificParents(groupId, clickedMemberId);
}

console.log("groupId", groupId);

function openForm(memberId, memberIndex) {
  emit("open-form", memberId, groupId, memberIndex);
}
</script>

<template>
  <!-- // topmgroup = Da'Boys -->
  <div v-if="groupId === 0" class="topmgroup">
    <div
      v-for="(person, index) in branchData"
      :style="{
        top: '50px',
        left: index * 200 + 'px',
        width: '100px',
        height: '100px',
      }"
      class="imagecontainer"
      :key="person.id"
    >
      <img :src="resolveImageUrl(person.pic)" :alt="person.pic" />
      <p style="font-size: 16px; position: relative; left: -30px; top: 10px">
        {{ person.name }}
      </p>
      <AppLink
        :to="{ name: 'InfoPage', params: { id: person.id } }"
        target="_blank"
      >
        <div
          class="imagecontainer desc upslide"
          style="color: rgba(105, 248, 105, 0.6)"
        >
          {{ person.name }}
          <br /><br />
          {{ person.born_died }}
          <p>
            Origins:<br />
            {{ person.birthplace }}
          </p>
        </div>
      </AppLink>
    </div>
    <div id="ibtopline"></div>
  </div>
  <!-- not topgroup -->
  <div
    v-else
    v-if="shouldDisplayGroup()"
    class="stline"
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
      v-if="groupId != 1"
      :class="[groupId % 2 ? 'rightTwig' : 'leftTwig']"
    ></div>
    <div class="mgroup">
      <p>mgroup{{ groupId }}</p>
      <div
        v-for="(person, index) in branchData"
        :style="{
          left: index ? '310px' : '-64px',
        }"
        class="imagecontainer desc"
        :key="person.id"
      >
        <p class="memberGroup">member = {{ person.id }}</p>
        <div v-if="person.id === 9998 || person.id === 9999">
          <!-- <div v-if="false"> -->
          <img
            @click="openForm(person.id, index)"
            :src="resolveImageUrl(person.pic)"
            :alt="index ? 'wife' : 'husband'"
          />
        </div>
        <div v-else>
          <img
            @click="handleImageClick(groupId, person.id)"
            :src="resolveImageUrl(person.pic)"
            :alt="index ? 'wife' : 'husband'"
          />
        </div>
        <!-- display name -->
        <p style="font-size: 16px; position: relative; left: -30px; top: 10px">
          {{ person.name }}
        </p>
        <!-- </AppLink> -->
        <AppLink
          v-if="person.id < 9998"
          :to="{ name: 'InfoPage', params: { id: person.id } }"
          target="_blank"
        >
          <div
            class="imagecontainer desc"
            :class="[
              'imagecontainer',
              index === 0 ? 'rightslide' : 'leftslide',
            ]"
            style="color: rgba(105, 248, 105, 0.6)"
          >
            {{ person.name }}
            <br /><br />
            {{ person.born_died }}
            <p>
              Origins:<br />
              {{ person.birthplace }}
            </p>
          </div>
        </AppLink>
      </div>
    </div>
  </div>
  <!-- Show nothing if the group shouldn't be displayed -->
</template>

<style scoped>
.memberGroup {
  top: -40px;
  position: absolute;
}

.leftTwig {
  position: absolute;
  top: -30px;
  left: 0px;
  height: 30px;
  width: 100px;
  border-radius: 20px 0px 0px 0px;
  border-left: thin #006600 solid;
  border-top: thin #006600 solid;
}
.rightTwig {
  position: absolute;
  top: -30px;
  left: -100px;
  height: 30px;
  width: 100px;
  border-radius: 0px 20px 0px 0px;
  border-right: thin #006600 solid;
  border-top: thin #006600 solid;
}

.stline {
  position: absolute;
  top: -80px;
  left: 185px;
  height: 65px;
  width: 1px;
  background-color: #006600;
  box-shadow: 2px 2px 7px rgba(0, 102, 0, 0.6);
}

#ibtopline {
  position: absolute;
  top: 110px;
  left: 60px;
  height: 2px;
  width: 800px;
  background-color: #006600;
  box-shadow: 2px 2px 7px rgba(0, 102, 0, 0.6);
  z-index: 0;
}

.topmgroup {
  position: absolute;
  top: -150px;
  left: -455px;
  width: 920px;
  height: 170px;
}
/* #imagecontainer {
  width: 214px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  border-bottom: none;
} */

.mgroup {
  /* position: absolute; */
  top: 65px;
  left: -180px;
  width: 360px;
  height: 140px;
  border-radius: 24px;
  border-top: thin #006600 solid;
  border-left: thin #006600 solid;
  border-right: thin #006600 solid;
  border-bottom: none;
  z-index: 1;
}

.male {
  left: -50px;
  bottom: 0px;
}
.female {
  right: -50px;
  bottom: 0px;
}
</style>
