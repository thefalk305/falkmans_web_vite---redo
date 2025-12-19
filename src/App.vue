<!-- prettier-ignore-file -->
<script setup>
  import TheNavigation from "./components/TheNavigation.vue";
  import Footer from "./components/Footer.vue";
  import GoBack from "./components/GoBack.vue";
  import BackToTop from "@/components/BackToTop.vue";
  import { onMounted } from 'vue'

</script>

<template>
  <div id="vue-app">
    <img id="banner" src="./assets/img/Banner.gif" alt="banner" />
    <TheNavigation />
    <router-view />
    <BackToTop />
    <GoBack />
    <Footer />
  </div>
</template>

<style scoped>



  /* prettier-ignore */
/* @import "./assets/css/familytree.css"; */
  @import "./assets/css/main.css";
  @import "./assets/css/falkman.css";

  #vue-app {
   background: #dddfdf;
   
  }
  .main-view {
    margin: 0%;
    margin: auto;
    justify-content: space-evenly;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.6s;
  }
  .fade-enter,
  .fade-leave {
    opacity: 0;
  }
  .left-sidebar {
    width: 200px;
  }

  .container {
    max-width: 100%;
    width: 100%;
    height: 2800px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 10px;
  }

  nav a {
    font-weight: bold;
    color: #dde5eece;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
