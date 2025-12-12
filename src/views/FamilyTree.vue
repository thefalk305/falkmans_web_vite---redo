<script setup>
  import { reactive, ref, watchEffect, inject, computed } from "vue";
  import { useInfoTableData } from "@/composables/useInfoTableData";
  import BackToTop from "../components/BackToTop.vue";
  import Animation from "../components/Animation.vue";
  import Tree from "../components/Tree.vue";
  import ShowFamilyPage from "../components/ShowFamilyPage.vue";
// import { useMouse } from '@/assets/js/mouseTracker.js'

  const { infoTable } = useInfoTableData();
  const recordData = computed(() => infoTable.value && infoTable.value[3] ? infoTable.value[3] : null);
</script>

<template>
  <!-- <div v-if="familyTree.length > 2"> -->
  <div id="family-tree">
    <header>
      <!--page title, tagline and main graphic-->

      <br /><!--spacer-->

      <div id="hgroup">
        <!--main title group-->
        <h1>From Branch to Branch</h1>
        <h2>Genealogical Website for<br />the "Falkman Family"</h2>
      </div>
      <!--end main title group-->

      <!--DO NOT REMOVE!-->
      <div class="clear"></div>

      <br /><!--spacer-->

      <div id="headerimage"></div>
      <!--main page graphic or logo-->

      <div
        class="sectionline"
        style="float: right; margin: 0px 15px 0px 0px; width: 50%"
      ></div>
      <!--section divider-->
    </header>
    <!--end page header-->

    <section class="intro" style="left: 0px; top: 20px; right: 00px; width: auto">
      <!--intro section-->
      <img
        src="../assets/graphics/animation2.gif"
        alt="familygif"
        style="position: absolute; top: 00px; left: 100px; z-index: -1"
      />

      <article class="introarticle">
        <h3>This is the Website of the Falkman Family History</h3>
        <p class="dropcap">
          I started this adventure back in 1978. There were no online services at the
          time. All of the research was done by hand. I spent months and months searching
          through records and micro-fiche files for scraps of information. It took my wife
          and myself almost two (2) years just to find my great-grandfather's ship
          manifest. But that was just the start. Then came my great-grandmother's records,
          and after that, aunts, uncles and cousins. I hope you enjoy looking at the
          records and pictures as much as I did while putting this site together.
          <br />
          <br />
          This website was first published in 2010. The canvas didn't change much for many
          years but, now with the help of my family, I am updating the website, adding new
          templates and a lot of new information that has been discovered over the years.
          I want to thank all my family for the information and support they have given.
        </p>
        <p style="width: 550px; text-align: right">Tinker Al</p>
      </article>
      <Animation />
      <!-- <aside class="panel">
        <h4 style="top: 0px">Page Links Here</h4>
        <div class="panelleft">
          <p class="p2" style="line-height: 200%" v-for="n in 5" :key="n">

            <ShowFamilyPage 
            :recordData="recordData" 
            :id="n" 
            :fromDaBoys="fromDaBoys"
            :modalTop="modalTop" />


            <AppLink :to="{ path: '/FamilyPage', query: { id: n } }">
            FamilyPage {{ n }}
          </AppLink>          
        </p>
        </div>
      </aside> -->

      <div class="clear"></div>
      <div class="sectionline"></div>
    </section>
    <div id="InFamilyTree" v-if="infoTable[3]">
      <Tree />
    </div>
  </div>
  <BackToTop />
</template>

<style scoped>
  @import "@/assets/css/familytree.css";

  #family-tree-header {
    left: 230px;
    width: 100%;
  }
  .go-back {
    left: 50px;
    width: 100px;
  }

  h4 {
    background-color: transparent;
  }

  aside.panel {
    top: 90px;
    right: 10px;
    height: 180px;
    width: 165px;
    text-align: center;
  }
  h2 {
    font-size: 1.525em;
    float: right;
  }
  #hgroup {
    position: relative;
    width: 750px;
    left: 230px;
    float: none;
  }
  .p2 {
    margin: 0px;
  }
  .panelleft {
    left: 30px;
    position: absolute;
    top: 60px;
  }
  .panelright {
    right: 0px;
  }

  #family-tree {
    height: 4400px;
    /*
  position: absolute;
  width: 100%;*/
  }

  h1 {
    position: relative;
    width: 850px;
    margin: 0px 0px 0px 0px;
    font-family: Carolingia;
    font-size: 5em;
    color: #00b200;
    text-shadow: 2px 2px 10px rgba(0, 102, 0, 0.8);
    letter-spacing: 1px;
    line-height: 100%;
    background-color: inherit;
  }
</style>
