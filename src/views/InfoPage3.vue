<!-- prettier-ignore-file -->

<script setup>
  import { reactive, ref, inject } from "vue";
  import axios from "axios";
  import NavBar from "../components/NavBar.vue";
  import ShowModal from "../components/ShowModal.vue";
  import BaseModal from "../components/common/BaseModal.vue";
  import bldRels from "../assets/js/buildRelatives.js";
  import GoBack from "../components/GoBack.vue";

  const props = defineProps({
    show: Boolean,
    id: Number,
    fromDaBoys: Boolean,
    modalTop: Number
  });

  const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;


  var record = {};
  // var id = ref(3);
  var pics = [];
  var tblArray = [];
  var infoTable = [];
  infoTable = inject("infoTable");

  record = infoTable[props.id - 1];
  var tblKeys = Object.keys(record);
  var tblValues = record.valueOf();
  tblArray = bldRels(tblKeys, infoTable, record);

  const familySrchLink = `https://www.familysearch.org/tree/pedigree/landscape/LL4N-B4F`;
  // const familypageURL = `http://localhost/new_falkmansweb/infopages/familypage.php?id=${record.id}`;
const bio = ref(''); // Declare at component level

  pics.push(record.pic2);
  pics.push(record.pic3);
  pics.push(record.pic4);
  pics.push(record.pic5);
  pics.push(record.pic6);
  // console.log(pics, record.name);
  // var fname = "./bios/" + record.bio;
  var fname = record.bio;
  // readText("./bios/" +  record.bio);


  if (fname) {
    readText("./bios/" + fname);
  } else {
    bio.value = "The bio for " + record.name + " should be updated soon.";
  }

function readText(fname) {
  axios
    .get(fname, { responseType: 'text' })
    .then((response) => {
      bio.value = response.data; // Use `.value` for refs
    })
    .catch((error) => {
      console.error('Error loading bio:', error);
    });
}

</script>

<template>
  <BaseModal :show="show" :fromDaBoys=true :modalTop="modalTop" :recordData="record ":showNav="false">

    <template #body>
      <figure class="hdshot" style="top: -16px">
        <a :href="resolveImageUrl(record.pic)" data-lightbox="pics000" :title="record.pic">
          <img :src="resolveImageUrl(record.pic)" alt="photo" />
        </a>
      </figure>
      <NavBar :recordData="record" />
      <article class="infoarticle fpage" style="left: -55px; top: 0px; height: 363px">
        <h3>&nbsp;</h3>
        <h2>{{ record.name }}</h2>
        <h4 class="info black">{{ record.born_died }}</h4>
        <h4 class="info black">{{ record.birthplace }}</h4>
        <p class="p1 infotxt" style="left: 0px; top: -20px; ">
          {{ bio }}
        </p>
      </article>
      <aside id="infoaside">
        <div id="Infopage2" v-for="item in tblArray" v-bind:key="item.id">
          <div v-if="item.id == 0">
            <h2>{{ item.name }}</h2>
          </div>
          <div v-else>
            <h2 style="border: none">
              <ShowModal :recordData="item" :modalTop="modalTop" />
            </h2>
          </div>
        </div>
      </aside>
      <div id="infopics" v-for="(pic, index) in pics" :key="index">
        <div
          v-if="pic != ''"
          class="imagecontainer infopic"
          :style="{
            left: index * 110 + 80 + 'px',
            top: '604px',
          }"
        >
          <a :href="resolveImageUrl(pic)" data-lightbox="pics000" :title="pic">
            <img :src="resolveImageUrl(pic)" alt="photo" />
          </a>
          <div
            id="Infopage2"
            :class="{ dncurve_l: index === 0, dncurve_r: index != 0 }"
            :style="{ left: index === 0 ? -10 + 'px' : -118 + 'px', top: -31 + 'px' }"
          ></div>
        </div>
      </div>
      <div id="iline" style="height: 350px; top: 120px"></div>
      <div id="iupcurve" style="top: 456px; width: 40px"></div>
      <div id="familysearch" style="right: 150px; bottom: 5px">
        <a class="green" title="Family Search" :href="familySrchLink" target="_blank" rel="noopener noreferre">Family Search</a>
      </div>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="$emit('close')">Close</button>
    </template>
  </BaseModal>
</template>

<style scoped>
  /*  @import "/src/assets/css/familytree.css";*/

  .modal-default-button {
    position: absolute;
    float: right;
    bottom: 10px;
    right: 50px;
  }
  .modal-default-button:hover {
    scale: 1.1;
    background-color: yellow;
  }

  /* modal positioning handled by BaseModal */

  /* View-specific modal sizing and layout */
  .modal-container {
    height: 780px; /* between 750 and 800px as requested */
    width: 600px;
  }

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .goBack {
    bottom: 2px;
    z-index: 111;
  }
  #infoaside {
    position: absolute;
    width: 202px;
    left: 400px;
    /* transform: translateX(-50%); */
    top: 178px;
    border-radius: 10px;
  }
  h2 {
    margin: 0px;

    text-align: center;
  }
  .infocontainer {
    position: absolute;
    left: 100px;
    top: 20px;
  }
  #imgcontainers {
    position: relative;
    bottom: 440px;
  }
  #familysearch {
    bottom: 10px;
    padding: 5px;
  }
  .imagecontainer.infopic {
    height: 75px;
    width: 75px;
    top: 448px;
    border: medium #006600 solid;
  }
  .imagecontainer.infopic:hover {
    background-color: rgba(0, 178, 0, 0.8);
    border: medium #00b200 solid;
    box-shadow: 2px 2px 7px rgba(0, 230, 0, 0.7);
  }
  .imagecontainer.infopic img {
    width: 75px;
    height: 75px;
  }
</style>
