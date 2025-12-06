<script setup>
import { inject } from "vue";
import AppLink from "@/components/AppLink.vue";

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

const props = defineProps({
  group: Object,
});

const emit = defineEmits(['open-form']);

const infoTable = inject("infoTable");
const groupVisibility = inject("groupVisibility");

const memberIds = props.group.members;
const top = props.group.top;
const left = props.group.left;
const groupId = props.group.id;

const branchData = memberIds
  .map((id) => {
    const foundInfotableEntry = infoTable.find((entry) => entry.id === id);
    if (foundInfotableEntry) {
      return foundInfotableEntry;
    }
    if (id === 9998) {
      return { id: id, pic: 'Add Father.svg' };
    }
    if (id === 9999) {
      return { id: id, pic: 'Add Mother.svg'};
    }
    return null;
  })
  .filter(Boolean);

function handleImageClick(groupId) {
  // Show the clicked group and all its parents
  groupVisibility.showGroupAndParents(groupId);
}

function openForm(memberId, memberIndex) {
  emit('open-form', memberId, groupId, memberIndex);
}
</script>

<template>
  <!-- // topmgroup = Da'Boys -->
  <div v-if="groupId === 0" class="topmgroup">
    <div
      v-for="(item, index) in branchData"
      :width="100"
      :style="{ top: '50px', left: index * 200 + 'px' }"
      class="imagecontainer"
      :key="item.id"
    >
      <img :src="resolveImageUrl(item.pic)" :alt="item.pic" />
      <AppLink :to="{ name: 'InfoPage', params: { id: item.id } }">
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
      </AppLink>
    </div>
    <div id="ibtopline"></div>
  </div>
  <!-- not topgroup -->
  <div
    v-else
    class="stline"
    :class="`group${groupId}`" 
    :style="{
      top: `${top}px`,
      left: `${left}px`,
      visibility: groupVisibility.isVisible(groupId) ? 'visible' : 'hidden',
    }"
  >
    <div v-if="groupId != 1">
      <div :class="[groupId % 2 ? 'rightTwig' : 'leftTwig']"></div>
    </div>
    <div class="mgroup">
      <p>mgroup{{ groupId }}</p>
      <div
        v-for="(item, index) in branchData"
        :style="{
          left: index ? '310px' : '-64px',
        }"
        class="imagecontainer desc"
        :key="item.id"
      >
        <!-- <AppLink :to="{ name: 'InfoPage', params: { id: item.id } }"> -->
        <div class="memberGroup">
          <p>member = {{ item.id }}</p>
        </div>
        <div v-if="item.id === 9998 || item.id === 9999">
          <!-- <div v-if="false"> -->
          <img
            @click="openForm(item.id, index)"
            :src="resolveImageUrl(item.pic)"
            :alt="index ? 'wife' : 'husband'"
          />
        </div>
        <div v-else>
          <img
            @click="handleImageClick(groupId)"
            :src="resolveImageUrl(item.pic)"
            :alt="index ? 'wife' : 'husband'"
          />
        </div>
        <!-- display name -->
        <p style="font-size: 16px; position: relative; left: -30px">
          {{ item.name }}
        </p>
        <!-- </AppLink> -->
        <AppLink :to="{ name: 'InfoPage', params: { id: item.id } }">
          <div
            class="imagecontainer desc"
            :class="[
              'imagecontainer',
              index === 0 ? 'rightslide' : 'leftslide',
            ]"
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
        </AppLink>
      </div>
    </div>
  </div>
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
