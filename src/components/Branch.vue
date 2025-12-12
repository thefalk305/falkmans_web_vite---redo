<script setup>
  import { reactive, ref, watchEffect } from "vue";
  import { useInfoTableData } from "@/composables/useInfoTableData";
  import ImageCont from "./ImageCont.vue";
  import treeData from "../assets/js/treeData.js";

  const props = defineProps({
    index: Number,
    branchData: Array,
    branchLoc: Array,
    modalTop: Number,
  });

  const { infoTable } = useInfoTableData();


  var coupleData = [];
  var branchIds = [];
  var branchGroup = 0;
  var posX = "";
  var posY = "";
  var wide = "";

  var sty1 = "";
  var sty2 = "";
  var sty3 = "";
  var class1 = "";
  var class2 = "";
  var class3 = "";

  // These are now handled in the watchEffect due to async nature of infoTable
  // branchIds = props.branchData[1];
  // branchGroup = props.branchData[0];
  branchGroup = props.branchData[0];

  watchEffect(() => {
    if (infoTable.value && props.branchData) {
      branchIds = props.branchData[1];
      branchIds.forEach((item, index) => {
        // console.log(item);
        if (infoTable.value && infoTable.value[item - 1]) {
          coupleData[index] = infoTable.value[item - 1];
        }
        // coupleData[index] = props.infoTable[item - 1];
      });
    }
  });

  // coupleData.value[0] = props.infoTable[branchIds.value[0] - 1];
  // coupleData.value[1] = props.infoTable[branchIds.value[1] - 1];
  posY = props.branchLoc[0] + "px";
  posX = props.branchLoc[1] + "px";
  wide = props.branchLoc[2] + "px";

  class1 = treeData.twigData[props.index][0][0];
  class2 = treeData.twigData[props.index][1][0];
  class3 = treeData.twigData[props.index][2][0];
  sty1 = treeData.twigData[props.index][0][1];
  sty2 = treeData.twigData[props.index][1][1];
  sty3 = treeData.twigData[props.index][2][1];
</script>

<template>
  <div v-if="index === 0" class="topmgroup">
    <div
      v-for="(item, id) in coupleData"
      :key="item.id"
      :style="{ top: '50px', left: id * 200 + 'px', position: 'absolute' }"
    >
      <ImageCont 
        :recordData="item" 
        :id="id + 2" 
        :modalTop="modalTop"
      />
    </div>
    <div id="ibtopline"></div>
  </div>
  <div
    v-else
    :id="'mgroup' + index"
    class="mgroup"
    :style="{ top: posY, left: posX, width: wide }"
  >
    <!-- display the group id on the branch -->
    <p style="position: relative; top: -12px">mgroup{{ index }}</p>
    <div v-for="(item, id) in coupleData" :key="item.id">
      <!-- id === 0 -> class = 'female'; determines position on branch -->
      <ImageCont
        v-if="id < 2"
        :class="id ? 'female' : 'male'"
        :recordData="item"
        :id="id"
        :modalTop="modalTop"
      />
      <ImageCont v-else class="male-female" style="top: 174px"
        :recordData="item"
        :modalTop="modalTop" />
    </div>
    <!-- class/style for twigs -->
    <div :class="[class1]" :style="[sty1]"></div>
    <div :class="[class2]" :style="[sty2]"></div>
    <div :class="[class3]" :style="[sty3]"></div>
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
    position: absolute;
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
