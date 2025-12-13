<!-- prettier-ignore-file -->
<script setup>
import { ref, computed, inject, provide } from "vue";
import NewBranch from "../components/NewBranch.vue";
import Animation from "../components/Animation.vue";
import LoginForm from "./LoginForm.vue";
import Register from "./Register.vue";
import { useDraggableModal } from "@/composables/useDraggableModal";
import { useGroupVisibility } from "@/composables/useGroupVisibility";
import { useDynamicGroups } from "@/composables/useDynamicGroups";
import { getAuth } from "firebase/auth";

useDraggableModal();

// Get the infoTable from global provide
const infoTable = inject("infoTable", []);
const dynamicGroups = ref([]);
const groupVisibilityRef = ref(null);
const loading = ref(false); // No need to load since it's already loaded globally

const openFormHandler = async (memberId, groupId, memberIndex) => {
  // Check if user is authenticated before opening the form
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is authenticated, proceed with opening the form
    window.open(
      `/add-person?id=${memberId}&groupId=${groupId}&memberIndex=${memberIndex}`,
      "_blank"
    );
  } else {
    // User is not authenticated, alert them
    alert("You must be logged in to add or edit family members.");
  }
};

// Generate dynamic groups and create group visibility now that we have the data
if (infoTable && infoTable.length > 0) {
  const { buildCompleteTree } = useDynamicGroups(infoTable);
  dynamicGroups.value = buildCompleteTree([2, 13], 10);
  groupVisibilityRef.value = useGroupVisibility(
    dynamicGroups.value,
    1,
    infoTable
  );
}

// Provide the groupVisibility that other components need
provide("groupVisibility", groupVisibilityRef.value);

// Make the data available to the template as well
const branchData = computed(() => dynamicGroups.value);
</script>

<template>
  <Register>
    <template v-slot:header> Sign Up </template>
  </Register>
  <LoginForm>
    <template v-slot:header> Sign In </template>
    <template v-slot:logout-header> Sign Out </template>
  </LoginForm>
  <div id="family-tree">
    <header>
      <br />

      <div id="hgroup">
        <h1>From Branch to Branch</h1>
        <h2>Genealogical Website for<br />the "Falkman Family"</h2>
      </div>
      <div class="clear"></div>

      <br />

      <div id="headerimage"></div>

      <div
        class="sectionline"
        style="float: right; margin: 0px 15px 0px 0px; width: 50%"
      ></div>
    </header>

    <section
      class="intro"
      style="left: 0px; top: 20px; right: 00px; width: auto"
    >
      <img
        src="../assets/graphics/animation2.gif"
        alt="familygif"
        style="position: absolute; top: 00px; left: 100px; z-index: -1"
      />

      <article class="introarticle">
        <h3>This is the Website of the Falkman Family History</h3>
        <p class="dropcap">
          I started this adventure back in 1978. There were no online services
          at the time. All of the research was done by hand. I spent months and
          months searching through records and micro-fiche files for scraps of
          information. It took my wife and myself almost two (2) years just to
          find my great-grandfather's ship manifest. But that was just the
          start. Then came my great-grandmother's records, and after that,
          aunts, uncles and cousins. I hope you enjoy looking at the records and
          pictures as much as I did while putting this site together.
          <br />
          <br />
          This website was first published in 2010. The canvas didn't change
          much for many years but, now with the help of my family, I am updating
          the website, adding new templates and a lot of new information that
          has been discovered over the years. I want to thank all my family for
          the information and support they have given.
        </p>
        <p style="width: 550px; text-align: right">Tinker Al</p>
      </article>
      <Animation />
      <div class="clear"></div>
      <div class="sectionline"></div>
    </section>

    <div id="treewindow">
      <img
        class="background"
        src="../assets/graphics/treewindow.png"
        alt=""
        height="2000"
        style="left: 0px"
      />

      <div id="draggable-elem">
        <div v-if="loading" class="loading">Loading family tree data...</div>

        <div
          v-else-if="infoTable.length > 0 && groupVisibilityRef"
          id="treepot"
        >
          <NewBranch
            v-for="(group, index) in branchData"
            :key="index"
            :group="group"
            @open-form="openFormHandler"
            :info-table="infoTable"
            :group-visibility="groupVisibilityRef"
          />
        </div>

        <div v-else class="error">Error loading family tree data.</div>
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
