<!-- prettier-ignore-file -->

<script setup>
import { ref, inject, computed, watchEffect } from "vue";
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import ShowModal from "../components/ShowModal.vue";
import bldRels from "../assets/js/buildRelatives.js";
import GoBack from "../components/GoBack.vue";

const props = defineProps({
  show: { type: Boolean, default: true },
  id: { type: Number, default: 4 },
  fromDaBoys: { type: Boolean, default: true },
  modalTop: { type: Number, default: 100 },
});

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

const infoTable = inject("infoTable");

const record = computed(() => (infoTable && infoTable[props.id - 1]) || {});

const pics = ref([]);
const tblArray = ref([]);
const bio = ref("");

const familySrchLink = computed(() =>
  record.value && record.value.famSrchLink
    ? `https://www.familysearch.org/en/tree/person/details/${record.value.famSrchLink}`
    : `https://www.familysearch.org/tree/pedigree/landscape/LL4N-B4F`
);

watchEffect(() => {
  const rec = record.value || {};
  pics.value = [rec.pic2, rec.pic3, rec.pic4, rec.pic5, rec.pic6].filter(Boolean);
  const tblKeys = rec ? Object.keys(rec) : [];
  tblArray.value = bldRels(tblKeys, infoTable, rec);

  const fname = rec.bio;
  if (fname) {
    readText("./bios/" + fname);
  } else {
    bio.value = rec.name ? `The bio for ${rec.name} should be updated soon.` : "";
  }
});

function readText(fname) {
  axios
    .get(fname, { responseType: "text" })
    .then((response) => {
      bio.value = response.data;
    })
    .catch((error) => {
      console.error("Error loading bio:", error);
    });
}

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" :style="{ top: fromDaBoys ? '400px' : modalTop + 'px' }">      

      <section class="modal-container infopic">
        <!-- <section class="infocontainer modal-container infopic"> -->
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
          <p class="p1 infotxt" style="left: 0px; top: -20px; height: 171px">
            {{ bio }}
            <!-- The lighbox is featured here, but JS pop-ups would be simple to add.<br />
        <br />
        The lightbox scales images based on a max-width defined in the lightbox.css file.
        Increasing the max-width will force a scrollbar in the window. -->
          </p>
        </article>
        <!--insert relative's names into aside-->
        <aside id="infoaside">
          <div id="Infopage2" v-for="item in tblArray" v-bind:key="item.id">
            <!-- test whether heading or relative -->
            <div v-if="item.id == 0">
              <h2>{{ item.name }}</h2>
            </div>
            <div v-else>
              <h2 style="border: none">
                <ShowModal 
                :recordData="item" 
                :modalTop="modalTop"   
                />
              </h2>
            </div>
          </div>
        </aside>
        <!--close 'aside'-->
        <!-- <div id="imgcontainers"> -->
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
            <!-- { dncurve_l: index === 0, dncurve_r: index != 0 } -->
            <!-- [ !index === 0 ? dncurve_l : dncurve_r ] -->
            <div id="Infopage2" 
              :class="{ dncurve_l: index === 0, dncurve_r: index != 0 }"
              :style="{ left: index === 0 ? -10 + 'px' : -118 + 'px', top: -31 + 'px' }"
            ></div>
          </div>
        </div>
        <div id="iline" style="height: 350px; top: 135px"></div>
        <div id="iupcurve" style="top: 456px; width: 40px"></div>
        <div id="familysearch" style="right: 150px; bottom: 5px">
          <a target="_blank" class="green" title="Family Search" :href="familySrchLink">Family Search</a>
        </div>
        <button class="modal-default-button" @click="$emit('close')">Close</button>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
  /*  @import "/src/assets/css/familytree.css";*/

  .modal-default-button {
    position: absolute;
    float: right;
    bottom: 50px;
    right: 50px;
  }
  .modal-default-button:hover {
    scale: 1.1;
    background-color: yellow;
  }

  .modal-mask {
    position: absolute;
    z-index: 9998;
    top: 600px;
    left: 350px;
    height: 800px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 1.5s ease;
  }
  .modal-container {
    height: 95%;
    width: 600px;
    margin: auto;
    padding: 20px 30px;
    background-color: antiquewhite;
    opacity: 1;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(255, 0, 0, 0.83);
    transition: all 0.3s ease;
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
    width: 202px;
    right: 26px;
    bottom: 300px;
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
