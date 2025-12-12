<script setup>
  import { ref, watch, inject } from "vue";
  import { useInfoTableData } from "@/composables/useInfoTableData";
  import BackToTop from "@/components/BackToTop.vue";
  import MiniNav from "@/components/MiniNav.vue";
  import ShowModal from "@/components/ShowModal.vue";

  const ulList = ref([
    { route: "PhotoPages", text: "Family Photos 1" },
    { route: "PhotoPages", text: "Family Photos 2" },
    { route: "PhotoPages", text: "Family Photos 3" },
    { route: "PhotoPages", text: "Family Photos 4" },
    { route: "PhotoPages", text: "Family Photos 5" },
    { route: "PhotoPages", text: "Family Photos 6" },
  ]);
  const llList = ref([
    { route: "Hudiksvall", text: "Hudiksvall, Sweden" },
    { route: "Arbra", text: "Arbrå, Sweden" },
    { route: "DuBois", text: "DuBois, PA. USA" },
    { route: "Chicago", text: "Chicago, IL. USA" },
    { route: "Albany", text: "Albany, N.Y. USA" },
    { route: "Ogdensburg", text: "Ogdensburg, N.J. USA" },
  ]);
  const urList = ref([
    { route: "Romeo", text: "S.S. Romeo" },
    { route: "Britannic", text: "R.M.S. Britannic" },
    { route: "Norden", text: "S.S. Norden" },
    { route: "Trave", text: "S.S. Trave<" },
    { route: "/", text: "Sub Heading u5" },
    { route: "/", text: "Sub Heading u6" },
  ]);
  const lrList = ref([
    { route: "HeadStones", text: "Head Stones" },
    { route: "PassengerTraffic", text: ">Passenger Traffic" },
    { route: "/", text: "Sub Heading l3" },
    { route: "/", text: "Sub Heading l4" },
    { route: "/", text: "Sub Heading l5" },
    { route: "/", text: "Sub Heading l6" },
  ]);

  var photos = [];
  const { infoTable } = useInfoTableData();

  // filter out any records that have identical photos
  infoTable.forEach((record) => {
    var duplicate = false;
    for (var i = 0; i < photos.length; i++) {
      if (record.pic === photos[i].pic) duplicate = true;
    }
    if (!duplicate) photos.push(record);
  });

  const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

</script>

<template>
  <div id="photo-pages">
    <MiniNav />
    <div id="flex-container">
      <div id="leftnav">
        <b>Picture Pages</b>
        <ul class="u-list">
          <li v-for="{ route, text } in ulList" :key="route">
            <AppLink :to="route">{{ text }}</AppLink>
          </li>
        </ul>
        <b>Places</b>
        <ul class="u-list">
          <li v-for="{ route, text } in llList" :key="route">
            <AppLink :to="route">{{ text }}</AppLink>
          </li>
        </ul>
      </div>
      <div id="rightnav">
        <b>Transportation</b>
        <ul class="u-list">
          <li v-for="{ route, text } in urList" :key="route">
            <AppLink :to="route">{{ text }}</AppLink>
          </li>
        </ul>
        <b>Other</b>
        <ul class="u-list">
          <li v-for="{ route, text } in lrList" :key="route">
            <AppLink :to="route">{{ text }}</AppLink>
          </li>
        </ul>
      </div>
      <div id="content">
        <div id="photoGallery">
          <div class="photos" :id="index" v-for="(photo, index) in photos" :key="index">
            <p id="photoName">
              <!-- {{ photo.name }} -->
              <img
                :id="'photo' + index"
                :src="resolveImageUrl(photo.pic)"
                alt="photo"
                
              />
              <ShowModal 
              :recordData="photo"
              :modalTop="Math.floor(index / 5) * 316 + 400"
               />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BackToTop />
</template>

<style scoped>
#photo-pages {
  margin: 10px;
  width: 100%;
}

#flex-container {
  width: 100%;
  overflow: hidden; /* clearfix */
}

#leftnav,
#rightnav {
  color: rgb(0, 128, 100);
  background-color: bisque;
  text-align: left;
  height: fit-content;
  position: relative;
  z-index: 22;
  padding: 10px;
  flex: 0 0 200px; /* fixed width for sidebars */
}

#content {
  flex: 1;
  min-width: 400px;

    margin-right: auto;
    margin-left: auto;
    padding: 5px;
    text-align: center;
    vertical-align: top;
    width: 98%;
}
.u-list {
  width: max-content;
  padding: 10px;
}

#photoName {
  text-align: center;
}

/* #photoGallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}
 */
#photoGallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* or space-between if you prefer */
  gap: 10px;
}

.photos {
  height: fit-content;
  border: solid black 2px;
  margin: 5px;
  width: 200px;
}

img {
  width: 200px;
}

.u-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

#leftnav {
  float: left;
  width: 200px;
  margin: 10px;
}

#rightnav {
  float: right;
  width: 200px;
  margin: 10px;
}

#content {
  /* margin-left: 220px;
  margin-right: 220px; */
  overflow: hidden; /* helps contain floats above */
}

#photo-pages {
  width: 100%;
  overflow: hidden; /* Clearfix for floated children */
  position: relative;
}


/* #leftnav { background-color: lightblue; }
#rightnav { background-color: salmon; }
#content { background-color: lightblue; } */

</style>