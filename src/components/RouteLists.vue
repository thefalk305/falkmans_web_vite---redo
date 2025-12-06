
<script setup>
import { ref } from 'vue'
  const ulList = ref([
    { route: "Göteborg", text: "Göteborg, Sweden" },
    { route: "Hull", text: "Kingston upon Hull, England" },
    { route: "Hamburg", text: "Hamburg, Germany" },
    { route: "Liverpool", text: "Liverpool, England" },
    { route: "Bremen", text: "Bremen, Germany" },
    { route: "NewYorkCity", text: "New York, N.Y. USA" },
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
    { route: "Trave", text: "S.S. Trave" },
    { route: "/", text: "Sub Heading u5" },
    { route: "/", text: "Sub Heading u6" },
  ]);
  const lrList = ref([
    { route: "HeadStones", text: "Head Stones" },
    { route: "PassengerTraffic", text: "Passenger Traffic" },
    // { route: "/", text: "Sub Heading l3" },
    // { route: "/", text: "Sub Heading l4" },
    // { route: "/", text: "Sub Heading l5" },
    // { route: "/", text: "Sub Heading l6" },
  ]);
</script>
<template>
      <div id="leftnav">
      <!-- <ul>
        <li> -->
      <b>Travel Notes</b>
      <ul v-if="ulList">
        <li v-for="{ route, text } in ulList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <!-- </li>
        <li> -->
      <b>Places</b>
      <ul v-if="llList">
        <li v-for="{ route, text } in llList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <!-- </li>
      </ul> -->
    </div>
    <div id="rightnav">
      <!-- <ul>
        <li> -->
      <b>Transportation</b>
      <ul v-if="urList">
        <li v-for="{ route, text } in urList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <!-- </li>
        <li> -->
      <b>Other</b>
      <ul v-if="lrList">
        <li v-for="{ route, text } in lrList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <!-- </li>
      </ul> -->
    </div>
</template>