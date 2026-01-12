<!-- prettier-ignore-file -->
<script setup>
import { ref, computed, inject, provide, defineAsyncComponent } from "vue";
// Use dynamic imports to avoid duplicate module loading
const Couples = defineAsyncComponent(() => import('../components/Couples.vue'));
const LoginForm = defineAsyncComponent(() => import('./LoginForm.vue'));
const Register = defineAsyncComponent(() => import('./Register.vue'));
import Animation from "../components/Animation.vue";
import { useDraggableModal } from "@/composables/useDraggableModal";
import { useHorizontalGroupVisibility } from '@/composables/useHorizontalGroupVisibility';

// const { levelMap } = useGroupVisibility(groupData, 1, infoTable);
import { useHorizontalGroups } from "@/composables/useHorizontalGroups";
import { getAuth } from "firebase/auth";
useDraggableModal();


// console.log('levelMap',levelMap);
// Get the infoTable from global provide
const infoTable = inject("infoTable", []);
const dynamicGroups = ref([]);
const groupVisibilityRef = ref(null);
const loading = ref(false); // No need to load since it's already loaded globally

const openFormHandler = async (memberId) => {
  // Check if user is authenticated before opening the form
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is authenticated, proceed with opening the form
    window.open(
      `/add-person?id=${memberId}`,
      "_blank"
    );
  } else {
    // User is not authenticated, alert them
    alert("You must be logged in to add or edit family members.");
  }
};

// Generate dynamic groups and create group visibility now that we have the data
// const levelMapRef = ref(null);
const levelMapRef = ref();
if (infoTable && infoTable.length > 0) {
  const { buildCompleteTree } = useHorizontalGroups(infoTable);
  // dynamicGroups.value = buildCompleteTree([2, 13], 10);
  dynamicGroups.value = buildCompleteTree([2, 13], 8);

  const gv = useHorizontalGroupVisibility(dynamicGroups.value, 1, infoTable);

  groupVisibilityRef.value = gv;
  levelMapRef.value = gv.levelMap;   // store it separately
}
// console.log("levelMapRef", levelMapRef.value);
// Provide the groupVisibility that other components need
// provide("groupVisibility", groupVisibilityRef.value);

// Make the data available to the template as well
const branchData = computed(() => dynamicGroups.value);
console.log("branchData", branchData.value);  
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
    <!-- <header>
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
 -->
    <!-- <section
      class="intro"
      style="left: 0px; top: 10px; right: 00px; width: auto"
    >
      <img
        src="../assets/graphics/animation2.gif"
        alt="familygif"
        style="position: absolute; top: -20px; left: 100px; z-index: -1"
      />

          <article class="introarticle">
      <p style="text-align: justify">
        <b>Greetings,</b> my name is Al Falkman. I started this adventure back
        in 1978. There were no online services at the time. All of the research
        was done by hand. I spent months and months searching through records
        and micro-fiche files for scraps of information. It took my wife and
        myself almost two (2) years just to find my great-grandfather's ship
        manifest. But that was just the start. Then came my great-grandmother's
        records, and after that, aunts, uncles and cousins.
      </p>
          <br />
      <p style="text-align: justify">
        I hope you enjoy looking at the records and pictures as much as I did
        while putting this site together. This website was first published in
        2010. The canvas didn't change much for many years but, now with the
        help of my family, I am updating the website, adding new templates and a
        lot of new information that has been discovered over the years. I want
        to thank all my family for the information and support they have given.
      </p>
      <p style="text-align: right">TinkerAlF</p>

      &nbsp;
      <p style="text-align: center">&nbsp;</p>
    </article>

      <Animation />
      <div class="clear"></div>
      <div class="sectionline"></div>
    </section> -->

    <div id="treewindow">
      <!-- <img
        class="background"
        src="../assets/graphics/treewindow.png"
        alt=""
        height="2000"
        style="left: 0px"
      /> -->

      <div id="draggable-elem">
        <div v-if="loading" class="loading">Loading family tree data...</div>
        <div
          v-else-if="infoTable.length > 0 && groupVisibilityRef"
          id="treepot"
        >
          <Couples
            v-for="(group, index) in branchData"
            :key="index"
            :group="group"
            @open-form="openFormHandler"
            :group-visibility="groupVisibilityRef"
          />
        </div>

        <div v-else class="error">Error loading family tree data.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  header{
  margin-bottom: 0;
}

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
#treepot {/*the treepot positions the tree in the center of the window. All mgroup inline positioning is based on the treepot position*/
	position:absolute;
	margin:0px auto;
	top:420px;
	padding:10px;
	height:200px;
	width:200px;
	z-index:100;
  left: 2000px; /* Adjusted for horizontal layout */
}

/* #draggable-elem {
  position: absolute;
  background-color: #ffffff;
  font-size: 1.6em;
	left:-3400px;
	height:3700px;
	width:8000px;
  top: 1000px;
  transform: translate(-50%, -25%);
  display: grid;
  place-items: center;
  font-family: "Poppins", sans-serif;
  border-radius: 0.3em;
  cursor: move;
	z-index:0;
} */

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
  left: 2000px;
  width: 8000px;
  height: 3700px;
  white-space: nowrap;
  background-color: transparent;
  overflow: auto; 
}

#treewindow {
  position: relative;
  margin: auto;
  width: 98%;
  height: 4400px;
  display: block;
  /* background-color: white;
  background-image: url(/graphics/treewindow.png);
  background-size: 100%;
  background-repeat: no-repeat; */
  cursor: url(/graphics/openhand.cur), pointer;
  overflow: hidden;
  /* z-index: 99; */
}
  h2 {
    font-size: 1.525em;
    float: right;
  }
  #hgroup {
    position: relative;
    width: 750px;
    left: 230px;
    float: none;
  }

  #family-tree {
    height: 4400px;
    /*
  position: absolute;
  width: 100%;*/
  }

  h1 {
    position: relative;
    width: 850px;
    margin: 0px 0px 0px 0px;
    font-family: Carolingia;
    font-size: 5em;
    color: #00b200;
    text-shadow: 2px 2px 10px rgba(0, 102, 0, 0.8);
    letter-spacing: 1px;
    line-height: 100%;
    background-color: inherit;
  }
</style>
