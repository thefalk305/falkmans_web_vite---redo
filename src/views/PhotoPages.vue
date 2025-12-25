<script setup>
  import { ref, watch, inject } from "vue";
  import { useInfoTableData } from "@/composables/useInfoTableData";
  import MiniNav from "@/components/MiniNav.vue";
  import ShowModal from "@/components/ShowModal.vue";
const infoTable = inject("infoTable", []);

  const ulList = ref([
    { route: "PhotoPages", text: "Family Photos 1" },
    { route: "PhotoPages2", text: "Family Photos 2" },
    { route: "PhotoPages", text: "Family Photos 3" },
    { route: "PhotoPages", text: "Family Photos 4" },
    { route: "PhotoPages", text: "Family Photos 5" },
    { route: "PhotoPages", text: "Family Photos 6" },
  ]);
  const llList = ref([
    { route: "PhotoPages", text: "Family Photos 1" },
    { route: "PhotoPages2", text: "Family Photos 2" },
    { route: "PhotoPages", text: "Family Photos 3" },
    { route: "PhotoPages", text: "Family Photos 4" },
    { route: "PhotoPages", text: "Family Photos 5" },
    { route: "PhotoPages", text: "Family Photos 6" },
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
    { route: "PassengerTraffic", text: "Passenger Traffic" },
    { route: "/", text: "Sub Heading l3" },
    { route: "/", text: "Sub Heading l4" },
    { route: "/", text: "Sub Heading l5" },
    { route: "/", text: "Sub Heading l6" },
  ]);

  // const photos = [
  //   "Frank T Alexander",
  //   "Ida (Aldolfina) Chytra",
  //   "Violet Alexander",
  //   "Helen K Alexander",
  //   "Frank J Alexander",
  // ];

  const photos = []
  const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;


  var recordData = [];
  // const { infoTable } = useInfoTableData();
  // for (var i = 0; i < photos.length; i++) {
  //   for (var j = 0; j < infoTable.length; j++) {
  //     if (photos[i] === infoTable[j].name) {
  //       recordData.push(infoTable[j]);
  //       break;
  //     }
  //   }
  // }


  // infoTable.forEach((record) => {
  //   var duplicate = false;
  //   for (var i = 0; i < recordData.length; i++) {
  //     if (record.pic === recordData[i].pic) duplicate = true;
  //   }
  //   if (!duplicate) recordData.push(infoTable[i]);
  //   // if (!duplicate) photos.push(record);
  // });

  infoTable.forEach((record) => {
    var duplicate = false;
    for (var i = 0; i < photos.length; i++) {
      if (record.pic === photos[i].pic) duplicate = true;
    }
    if (!duplicate) photos.push(record);
  });





</script>

<template>
  <div id="photo-pages">
    <MiniNav />
    <!-- display left and right navigation -->
    <div id="leftnav">
      <b>Picture Pages</b>
      <ul>
        <li v-for="{ route, text } in ulList" :key="route">
          <AppLink :to="route">{{ text }} </AppLink>
        </li>
      </ul>
      <b>Places</b>
      <ul>
        <li v-for="{ route, text } in llList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
    </div>
    <div id="rightnav">
      <b>Transportation</b>
      <ul>
        <li v-for="{ route, text } in urList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <b>Other</b>
      <ul>
        <li v-for="{ route, text } in lrList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
    </div>
    <div id="photoGallery">
      <div class="info-card" :id="index"  v-for="(photo, index) in photos" :key="index">
        <div class="figure-card">
          <img :src="resolveImageUrl(photo.pic)" :alt="photo.name" />
          <!-- <figcaption> -->
            <div id="card-back">
            <h2>{{ photo.name }}</h2>
            <h3>Born {{ photo.born }}</h3>
            <p>This bio for {{ photo.name }} will be updated soon.</p>
          <!-- </figcaption> -->
          </div>
        </div>
        <ShowModal :recordData="photo" :modalTop="Math.floor(index / 2) * 416 + 0" />
      </div>
    </div>
  </div>
</template>

<style scoped>

.info-card {
  border-bottom: 1px solid #666;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px rgba(0, 102, 0, 0.8);
  margin: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

  #photo-pages {
    margin: 10px;
    width: 100%;
  }

  #photoGallery {
    justify-content: center;
    align-items: start;
    align-content: flex-start;
    display: flex;
    width: 600px;
    flex-wrap: wrap;
    margin: auto;
  }
  h1 {
    z-index: -1;
    text-align: center;
  }
  #Photo {
    height: 350px;
    border: solid black 2px;
    margin: 5px;
    width: 200px;
  }
  img {
    width: 200px;
  }

  #leftnav,
  #rightnav {
    color: rgb(0, 128, 100);
    background-color: bisque;
    text-align: left;
    z-index: 22;
    position: relative;
  }

.figure-title {
  width: 250px;
  margin: auto;
  padding: 10px;
  font-size: 22px;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid #666;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px rgba(0, 102, 0, 0.8);

}

.figure-card {
  display: flex;
  align-items: center;
  position: relative;
  width: 250px;
  height: 350px;
  /* margin: 20px auto; */
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #000;
  color: white;
  font-family: sans-serif;
}

/* Image styling with slide-out */
.figure-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* Caption initially off-screen to the left */
.figure-card figcaption {
  position: absolute;
  top: 0;
  left: -100%;
  width: 90%;
  height: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.85);
  transition: left 0.6s ease;
  z-index: 2;
}

/* On hover: image slides out, caption slides in */
.figure-card:hover img {
  transform: translateX(-100%);
}

.figure-card:hover figcaption {
  left: 0;
}

.figure-card h2 {
  margin: 10% 0;
  font-size: 24px;
    color: #888;

}

.figure-card h3 {
  margin: 10% 0;
  font-size: 16px;
  color: #aaa;
}

.figure-card p {
  margin-top: 20%;
  font-size: 14px;
  line-height: 1.4;
  color: #fff;
}

#card-back {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>