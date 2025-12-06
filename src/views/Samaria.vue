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
    const pageTitle = "S.S. Samaria"

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

  <h3>This is the ship that Ingred Lofgren traveled on to America</h3>


  <div class="img-magnifier-container" >
    <img class="magImage" 
    :src="resolveImageUrl('SSSamaria.jpg')" alt="S.S. Samaria"
    style="width: 800px;" />
  </div>


    <div id="content">

  <p>Ingred Lofgren is the wife of Johan Lofgren. Johan, or John as we will call him, is the brother of Nis P. Falkman. And Nils is the father of Herman Falkman. And Herman Falkman is the father of Allen B. Falkman. Whois my Dad.</P>

  <p>Anyway Ingred is traveling with her two daughters, Clara and Emma Lofgren. On their way to America. To meet up with her husband, John, who had traveled to America a few years earlier. I still have to re-search how Ingred traveled to Liverpool England. Probably leaving from Göteborg Sweden to Hull England. Over land, by train to Liverpool.</p>

  <p>(A little information of the S.S. Samaria: Built in 1868. In Cessnoch Band, Govan, Scotland. Govan is about 45 miles east of Edinburgh. The Ships dimensions are, 320 ft. long, 40 ft. wide (at the widest part), and sat 27 ft. in the water.)</p>

  <p>The family's journey would have taken them from Liverpool, across the Irish Sea. to Queenstown. In county Cork, Ireland. And then the 10 day trip to America.</p>

  <p>Queenstown is now known as Cobh, a seaport town located on the south coast of County Cork, Ireland. It's situated on the south side of Great Island in Cork Harbour. Cobh was formerly named Queenstown in honor of Queen Victoria's visit in 1849. Once described as the saddest place in Ireland, the Port of Cobh was the embarkation point for the millions that left the country throughout the 19th Century. Today the compelling Queenstown Story exhibition in the town, tells their sad tale. If your ancestors were Irish, the chances are that they left Ireland from the port of Cobh , or Queenstown as it was called before it reverted back to its original Irish name. Cobh was Ireland's most important port of emigration and from 1815 to 1970 over 3 million people boarded here, heading for new lives in North America.</p>
  
   
  <div id="lnkcont" style="position: relative;">
    <AppLink 
      to="/SamList"
      style="position: absolute; left:2%; top: 77.5%; width: 46%; height: 1.8%; background-color: rgba(255, 0, 0, 0.5);">
    </AppLink>
    <div class="img-magnifier-container" >
      <img class="magImage img-magnifier-container" 
      :src="resolveImageUrl('SamariaList.jpg')" alt="Samaria List" style="width: 100%;"  />
    </div>
  </div>
</div>

      <p style="text-align: center;">Ship's schedule from 1868 (built) to 1902 (scrapped).</p>
    </div>
  <!-- </div> -->
</template>