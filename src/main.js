import { createApp } from "vue";
import './assets/css/main.css';
import AppLink from "./components/AppLink.vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import infoTableData from '@/assets/infotable.json';  
import './assets/css/familytree.css';
import './assets/css/falkman.css';
import $ from 'jquery';


import 'lightbox2/dist/css/lightbox.css';
import lightbox from 'lightbox2';

lightbox.option({
  resizeDuration: 200,
  wrapAround: true
});
window.$ = $;
window.jQuery = $;

// console.log(infoTableData, "infotable from .json");

var usejson = true
// var infoTableData = []

function createAp() {
  createApp(App)
    .provide("infoTable", infoTableData)
    .component("AppLink", AppLink)
    .use(router)
    .mount("#app");
  }

async function getProducts() {
  try {
    var response = await axios.get("http://localhost:5001/products");
  } catch (err) {
    console.log(err);
  }
  infoTableData = response.data;

createAp()
  // .provide('infoTable', infoTableData)
  // .provide('usejson', usejson)
  // .component('AppLink', AppLink)
  // .component('GoBack', GoBack)
  // .use(router)
  // .mount('#app')
}

if (usejson) {
  createAp()
  // .provide('infoTable', infoTableData)
  // .provide('usejson', usejson)
  // .component('AppLink', AppLink)
  // .use(router)
  // .mount('#app')
} else {
  getProducts();
console.log(infoTableData, "infotable from database");
}




// import infoTableData from "./assets/infotable.json";

// console.log(infoTableData, "infotable from json");

