import { createApp } from "vue";
import './assets/css/main.css';
import AppLink from "./components/AppLink.vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import './assets/css/familytree.css';
import './assets/css/falkman.css';
import $ from 'jquery';

import 'lightbox2/dist/css/lightbox.css';
import lightbox from 'lightbox2';

// Import the migration utilities to show sync buttons
import '@/migrate';

// Import Firebase data loading
import { fetchInfoTableFromFirebase } from '@/utils/migrateToFirebase';

lightbox.option({
  resizeDuration: 200,
  wrapAround: true
});
window.$ = $;
window.jQuery = $;

async function initializeApp() {
  try {
    // Load data from Firebase first
    let infoTableData = [];
    try {
      infoTableData = await fetchInfoTableFromFirebase();
      console.log(`Loaded ${infoTableData.length} records from Firebase`);
    } catch (firebaseError) {
      console.warn('Firebase load failed, falling back to local JSON:', firebaseError.message);
      // Fallback to local data if Firebase fails
      const localInfoTableData = (await import('@/assets/infotable.json')).default;
      infoTableData = localInfoTableData;
      console.log(`Loaded ${infoTableData.length} records from local JSON`);
    }

    // Create the app instance
    const app = createApp(App);

    // Provide the data globally to all components
    app.provide("infoTable", infoTableData);

    // Register components and plugins
    app
      .component("AppLink", AppLink)
      .use(router)
      .mount("#app");
  } catch (error) {
    console.error('Error initializing app:', error);

    // Fallback to basic app without data
    createApp(App)
      .component("AppLink", AppLink)
      .use(router)
      .mount("#app");
  }
}

// Initialize the app
initializeApp();

