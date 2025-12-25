<!-- prettier-ignore-file -->
<!-- prettier-ignore-file -->
<script setup>
  import Modal from "./Modal.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const resolveImageUrl = (filename) =>
    new URL(`../assets/img/${filename}`, import.meta.url).href;


  const props = defineProps({
    recordData: Object,
    fromDaBoys: Boolean,
    modalTop: Number
  });

  const navigateToInfoPage = () => {
    router.push({ name: 'InfoPage', params: { id: props.recordData.id } });
  };

  $(document).ready(function () {
    var images = [];
    images = $("img");
    var i = 1;
  });
</script>

<template>
  <div id="showInfoPage" @click="navigateToInfoPage()">
    <!-- <img :src="'/src/assets/img/' + recordData.pic" alt="photo" /> -->
    <img :src="resolveImageUrl(recordData.pic)" alt="photo" />
    <p v-if="!fromDaBoys" style="font-size: 16px; position: relative; left: -30px">
      {{ recordData.name }}
    </p>
  </div>
</template>

<style scoped>
  .modal-button:hover {
    scale: 1.1;
    background-color: rgba(167, 253, 167, 0.9);
    border-radius: 10px;
  }
</style>
