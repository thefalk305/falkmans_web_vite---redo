<!-- prettier-ignore-file -->
<script setup>
  import Modal from "./Modal.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const props = defineProps({
    recordData: Object,
    id: Number,
    fromDaBoys: Boolean,
    modalTop: Number

  });

  const navigateToFamilyPage = () => {
    router.push({ name: 'FamilyPage', params: { id: props.recordData.id } });
  };

  $(document).ready(function () {
    var images = [];
    images = $("img");
    var i = 1;
  });
</script>

<template>
  <div @click="navigateToFamilyPage()">
    <div
      class="desc imagecontainer"
      :class="id === 0 ? 'rightslide' : id === 1 ? 'leftslide' : 'upslide'"
      style="color: rgba(105, 248, 105, 0.6)"
    >
      {{ recordData.name }}
      <br /><br />
      {{ recordData.born_died }}
      <p>
        Origins:<br />
        {{ recordData.birthplace }}
      </p>
      <!-- </a> -->
    </div>
  </div>
</template>

<style scoped>
  .desc:hover {
    color: aquamarine;
  }
  .modal-button:hover {
    scale: 1.1;
    background-color: rgba(167, 253, 167, 0.9);
    border-radius: 10px;
  }
</style>
