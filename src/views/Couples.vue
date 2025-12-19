<script setup>
import AppLink from "@/components/AppLink.vue";
import { ref, onMounted, computed, inject, provide } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useGroupVisibility } from "@/composables/useGroupVisibility";
import Chevron from "@/components/Chevron.vue";
import Person from "@/components/Person.vue";

// const props = defineProps({
//   group: Object,
//   infoTable: Array,
//   groupVisibility: Object,
// });

// simulated first group
const group = {
  id: 1,
  members: [2, 13],
  parents: [2, 3],
  top: 0,
  left: 0,
};
const infoTable = inject("infoTable", []);

const emit = defineEmits(["open-form"]);

// Authentication state
const isAuthenticated = ref(false);

// Check authentication state on component mount

const isOpen = ref(false);
const isExpanded = ref(false);
const memberIds = group.members;
const top = group.top;
const left = group.left;
const groupId = group.id;

const branchData = memberIds
  .map((id) => {
    const foundInfotableEntry = infoTable.find((entry) => entry.id === id);
    if (foundInfotableEntry) {
      const range = foundInfotableEntry.born_died;
      const match = range?.match(/\b\d{4}\b/g);
      const years = match ? `${match[0]} – ${match[1]}` : null;
      const children = Array.from(
        { length: 6 },
        (_, i) => foundInfotableEntry[`child${i + 1}`]
      ).filter(Boolean);
      return {
        ...foundInfotableEntry,
        years,
        children, // ✅ add extracted years here
      };
    }

    if (id === 9998) {
      return { id, pic: "Add Father.svg" };
    }

    if (id === 9999) {
      return { id, pic: "Add Mother.svg" };
    }

    return null;
  })
  .filter(Boolean);

function showInfoPage(childName) {
  console.log("Name: ", childName);

  const child = infoTable.find((entry) => entry.name === childName);
  if (child) {
    window.open(`/InfoPage/${child.id}`, "_blank");
  } else {
    alert("Child information not found.");
  }
}

const couple = {
  name: "Al Falkman",
};

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

console.log("couple", couple);
</script>

<template>
  <div class="wideCouples">
    <div class="couplesInfo" style="position: relative">
      <div
        class="coupleNodeCss"
        v-for="(person, index) in branchData"
        :key="person.id"
        :class="index ? 'female' : 'male'"
      >
        <Person :person="person" :infoTable="infoTable" />
      </div>
      <p class="marriage">
        Marriage: 18 November 1943 Camp Kilmer, Middlesex, New Jersey, United
        States
      </p>
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
        <Person :person="person" :infoTable="infoTable" />
      </div>
    </div>
    <button class="expandButtom"  @click="isExpanded = !isExpanded">
      <Chevron  class="expandButtom" :class="isExpanded ? '' : 'expanded'" 
      style="width: 20px; height: 20px; top: 0; left: 0;"/>
    </button>
  </div>
</template>

<style scoped>
:root {
  --avatar-size: 40px;
  --presence-size: 16px;
  --presence-border-size: 2px;
}

.expandButtom {
  width: 40px;
  height: 34px;
  border-radius: 50%;
  background-color: bisque;
  position: relative;
  left: 10px;
  top: 38px;
}

.wideCouples {
  display: flex;
  top: 20px;
  left: 100px;
  width: 333px;
}

.couplesInfo {
  width: 300px;
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
  display: flex;
  width: 296px;
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
  font-size: x-small;
  position: absolute;
  top: 30px;
  width: 300px;
  height: 30px;
  /* background-color: #c6c6f0; */
  align-self: center;
  margin-top: 10px;
  padding-left: 50px;
}

button {
}

.coupleNodeCss {
  width: 300px;
  height: 54px;
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
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
