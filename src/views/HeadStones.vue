<script setup>
import { ref, computed } from "vue";
// import BackToTop from "@/components/BackToTop.vue";
// import MiniNav from "@/components/MiniNav.vue";
import Stone from "@/components/Stone.vue";

const images = ref([]); // ✅ reactive array for game flow
const totScore = ref(0);

const headstoneModules = import.meta.glob("@/assets/img/headstones/*.{jpg,jpeg,png,gif,svg}", { eager: true });

const headstones = Object.entries(headstoneModules).map(([path, mod]) => {
  const filename = path.split("/").pop();
  return { path: mod.default, filename };
});

const keys = headstones.keys();

headstones.forEach(({ filename }) => {
  if (filename.search("stone") < 0) {
    images.value.push(filename);
  }
});

  function deblurAll(e) {
    var pics = [];
    pics = $("img");
    for (var i = 0; i < pics.length; i++) {
      pics[i].style.filter = "";
    }
  }


function updateScore(delta) {
  totScore.value += delta;
}

function refreshScore() {
  totScore.value = 0;
  images.value = headstones
    .filter(({ filename }) => !filename.includes("stone"))
    .map(({ filename }) => filename);
}

function removeImage(stone) {
  images.value = images.value.filter(img => img !== stone);
}
</script>

<template>
  <div id="headstones">
    <h1 align="center">Head Stones & Grave Markers</h1>
    <p align="center">(Can you identify them?)</p>
    <p class="headstoneGame">
      Below you will find several pictures of head stones, or grave markers if you prefer.
      Each one a little bit out of focus. Your task is to pick the right name with the
      right head stone... Five misses and you'll have to start over... Good Luck.. OR you
      can <button @click="deblurAll">Deblur All</button>
    </p>

    <p>Total Score = {{ totScore }}</p>
    <button @click="refreshScore">Refresh Score</button>

    <div class="grid-container">
      <div class="stones" v-for="(stone, index) in images" :key="index">
        <Stone
          :updateScore="updateScore"
          :removeImage="removeImage"
          :id="'items#' + index"
          :stone="stone"
          :headstones="images"
          :totalScore="totScore"
        />
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<style scoped>
.headstoneGame {
  width: 90%;
  margin: auto;
}
.grid-container {
  display: grid;
  justify-items: center;
  grid-template-columns: auto auto auto;
  gap: 10px;
  background-color: beige;
  padding: 10px;
}
</style>