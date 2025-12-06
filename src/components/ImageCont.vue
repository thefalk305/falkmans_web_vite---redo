<!-- prettier-ignore-file -->
<script setup>
  import { reactive, ref } from "vue";
  import { RouterLink } from "vue-router";
  import ShowInfoPage from "../components/ShowInfoPage.vue";
  import ShowFamilyPage from "../components/ShowFamilyPage.vue";

  const props = defineProps({
    recordData: Object,
    id: Number,
    fromDaBoys: Boolean,
    modalTop: Number
  });

  var showTest = false;
  const infopageURL = `http://localhost/new_falkmansweb/infopages/infopage.php?id=${props.recordData.id}`;
  const familypageURL = `http://localhost/new_falkmansweb/infopages/familypage.php?id=${props.recordData.id}`;
</script>

<template>
  <div  class="imagecontainer">
    <div id="ImaceCont2" >
      <ShowInfoPage 
      :recordData="recordData" 
      :fromDaBoys="fromDaBoys"
      :modalTop="modalTop" />
    </div>
    <div  id="ImaceCont3" >
      <ShowFamilyPage 
      :recordData="recordData" 
      :id="id" 
      :fromDaBoys="fromDaBoys"
      :modalTop="modalTop" />
    </div>
  </div>
</template>

<style>
  .male-female {
    top: 174px;
    left: 150px;
  }
</style>
