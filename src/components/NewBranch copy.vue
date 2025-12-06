<script setup>
import { reactive, ref, watchEffect, inject } from "vue";
import ImageCont from "./ImageCont.vue";
import treeData from "../assets/js/treeData.js";
import InfoPage from "../views/InfoPage.vue";
const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

const { index, branch } = defineProps({
  index: Number,
  branch: Object, // Allow both Object and Number types
});

const infoTable = inject("infoTable");
const branchIds = branch.members;
const top = branch.top;
const left = branch.left;
const group = branch.id;
const fatherId = branch.members[0];
const motherId = branch.members[1];
const fatherData = infoTable.find((item) => item.id === fatherId);
const motherData = infoTable.find((item) => item.id === motherId);

const groupData = branchIds
  .map((id) => infoTable.find((item) => item.id === id))
  .filter(Boolean); // removes null/undefined if no match

const fatherPic = fatherData.pic;
const motherPic = motherData.pic;
console.log("fatherData", fatherData);
console.log("fatherPic", fatherPic);

console.log("group", groupData);
console.log("groupData[0].name", groupData[0].name);
</script>

<template>
  <!-- // topmgroup = Da'Boys -->
  <div v-if="index === 0" class="topmgroup">
    <div
      v-for="(item, index) in groupData"
      :width="100"
      :style="{ top: '50px', left: index * 200 + 'px' }"
      class="imagecontainer"
      :key="item.id"
    >
      <AppLink :to="{ name: 'InfoPage', params: { id: item.id } }">
        <img :src="resolveImageUrl(item.pic)" :alt="item.pic" />
      </AppLink>
      <div
        class="imagecontainer desc upslide"
        style="color: rgba(105, 248, 105, 0.6)"
      >
        {{ item.name }}
        <br /><br />
        {{ item.born_died }}
        <p>
          Origins:<br />
          {{ item.birthplace }}
        </p>
      </div>
    </div>
    <div id="ibtopline"></div>
  </div>
  <div
    v-else class="stline" :style="{position: 'absolute',top: `${top}px`, left: `${left}px`,}" >
    <div class="mgroup" :style="{ top: `80px`, left: `-180px` }">
      <p style="position: relative; top: -12px"> mgroup{{ group }}</p>
      <div v-for="(item, index) in groupData"
      :width="100"
      :style="{ top: '22px', left: index ? '310px' : '-75px' }"
      class="imagecontainer desc"
      :key="item.id">
        <AppLink :to="{ name: 'InfoPage', params: { id: item.id } }">
          <img
            :src="resolveImageUrl(item.pic)"
            :alt="index ? 'mother' : 'father'"
          />
        </AppLink>
        <div
          class="imagecontainer desc"
          :class="['imagecontainer', index === 0 ? 'rightslide' : 'leftslide']"
          style="color: rgba(105, 248, 105, 0.6)"
        >
          {{ item.name }}
          <br /><br />
          {{ item.born_died }}
          <p>
            Origins:<br />
            {{ item.birthplace }}
          </p>
        </div>
      </div>
      <div
        class="leftwig"
        style="top: 86px; left: -319px; width: 319px; height: 162px"
      ></div>
      <div
        class="rightwig"
        style="top: 86px; left: 355px; width: 319px; height: 162px"
      ></div>
    </div>
  </div>
</template>

<style scoped>
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
  top: -40px;
  left: -350px;
  width: 920px;
  height: 170px;
}
#image-container {
  width: 214px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  border-bottom: none;
}
.mgroup {
  /* position: absolute; */
  width: 370px;
  height: 140px;
  border-radius: 12px 24px 24px 24px;
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
