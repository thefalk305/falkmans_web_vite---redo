<script setup>
  import { ref, watch } from 'vue';
  import {
    toggleMagnifier,
    defaultMagConfig
  } from '@/assets/js/magnifier.js';

  const resolveImageUrl = (filename) =>
    new URL(`../assets/img/${filename}`, import.meta.url).href;

  const magEnabled = ref(false);

  watch(magEnabled, (enabled) => {
    toggleMagnifier(enabled, defaultMagConfig);
  });
    const pageTitle = "Carmania Passenger List"

</script>

<template>
  <!-- Inserts the common header -->
  <div id="heading">

    <div class="heading-row">
      <h1>{{pageTitle}}</h1>

      <label class="heading-checkbox">
        <input
          type="checkbox"
          id="mag-checkbox"
          class="myCheckbox"
          v-model="magEnabled"
        />
        Enable Mag
      </label>

      <input
        type="text"
        id="mag"
        class="myMag"
        placeholder="Mag Value (2)"
        v-show="magEnabled"
      />
    </div>
    <p>Mouse over the image — See 'Adolfina Chytra' on line 6</p>

    <div class="img-magnifier-container" >
      <img class="magImage" 
      :src="resolveImageUrl('ChytraPassList.png')"
      width="902"
      height="1378"/>
    </div>

    <p style="color: blue">
      Feel free to change the strength of the magnifier glass when initiating the magnify function.
    </p>
    </div>
  <!-- Inserts the common footer -->
  <div id="footer"></div>
</template>
