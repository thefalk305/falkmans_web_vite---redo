<!-- prettier-ignore-file -->
<!-- prettier-ignore-file -->
<script setup>
  import Modal from "./Modal.vue";
  import { ref } from "vue";
  import InfoPage from "../views/InfoPage.vue";
const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;


  const props = defineProps({
    recordData: Object,
    fromDaBoys: Boolean,
    modalTop: Number
  });

  const showInfoPage = ref(false);

  $(document).ready(function () {
    var images = [];
    images = $("img");
    var i = 1;
  });
</script>

<template>
  <div id="showInfoPage"  @click="showInfoPage = true">
    <!-- <img :src="'/src/assets/img/' + recordData.pic" alt="photo" /> -->
    <img :src="resolveImageUrl(recordData.pic)" alt="photo" />
    <p v-if="!fromDaBoys" style="font-size: 16px; position: relative; left: -30px">
      {{ recordData.name }}
    </p>
  </div>

  <Teleport to="body" :disabled="false"  id="showInfoPage2" v-if="showInfoPage">
    <!-- use the modal component, pass in the prop -->
    <InfoPage
      :show="showInfoPage"
      @close="showInfoPage = false"
      :id="recordData.id"
      :fromDaBoys="fromDaBoys"
      :modalTop="modalTop"
    >
    </InfoPage>
  </Teleport>
</template>

<style scoped>
  .modal-button:hover {
    scale: 1.1;
    background-color: rgba(167, 253, 167, 0.9);
    border-radius: 10px;
  }
</style>
