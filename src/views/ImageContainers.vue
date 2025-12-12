<script setup>
  import { reactive, ref, watchEffect } from "vue";
  import ImageContainer from "../components/ImageContainer.vue";
  import Relatives from "../components/Relatives.vue";

  import axios from "axios";

  const props = defineProps({
    hideRelatives: Boolean,
  });
  var showRelatives = true;
  if (props.hideRelatives) showRelatives = false;

  var brothersData = [];
  var infoTable = [];
  const { infoTable } = useInfoTableData();
  for (var i = 0; i < 5; i++) {
    brothersData[i] = infoTable[i + 3];
  }

  // async function getProducts() {
  //   try {
  //     var response = await axios.get("http://localhost:5001/products");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   items = response.data;
  //   infoTable = items;
  //   // copy info from db table for five brothers
  //   for (i = 0; i < 5; i++) {
  //     brothersData[i] = items[i + 3];
  //   }
  // }
  // getProducts();
</script>

<template>
  <div v-for="item in brothersData" :key="item.id">
    <ImageContainer :recordData="item" />
    <Relatives v-if="showRelatives" :recordData="item" :infoTable="infoTable" />
  </div>
  <!-- </div> -->
</template>

<style scoped>
  .image-containers {
    background-image: url(../assets/img/mainimage1.jpg);
  }
/*  
    background-color: rgb(218, 218, 90);
    display: flex;
    height: 900px;
    width: 100%;
    justify-content: center;
  }

  border: solid black 5px;
  background-color: antiquewhite;
  opacity: 0.9;
  border-radius: 30px;
  */

  .container:hover {
    cursor: pointer;
  }
</style>
