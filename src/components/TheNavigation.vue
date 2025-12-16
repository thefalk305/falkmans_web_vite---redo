<!-- prettier-ignore-file -->
<script setup>
  // import InfoTable from "../views/InfoTable.vue";
  // import FamilyTree from "../views/FamilyTree.vue";
  // import FamilyHistory from "../views/FamilyHistory.vue";
  // import About from "../views/About.vue";
  // import DaBoys from "../views/DaBoys.vue";
  import { ref, watch } from "vue";
  const clocktext = ref("");

  var tday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var tmonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function GetClock() {
    var d = new Date();
    var nday = d.getDay(),
      nmonth = d.getMonth(),
      ndate = d.getDate();
    var nhour = d.getHours(),
      nmin = d.getMinutes(),
      nsec = d.getSeconds();
    if (nmin <= 9) nmin = "0" + nmin;
    if (nsec <= 9) nsec = "0" + nsec;

    clocktext.value =
      "" +
      tday[nday] +
      ", " +
      tmonth[nmonth] +
      " " +
      ndate +
      " " +
      nhour +
      ":" +
      nmin +
      ":" +
      nsec +
      "";
  }

  // GetClock();
  var myInterval = setInterval(GetClock, 1000);
</script>

<template>
  <div id="nav" class="falkmans-web">
    <AppLink to="/">FamilyHistory</AppLink> |
    <AppLink to="/FamilyTree">FamilyTree</AppLink> | 
    <AppLink to="/NewTree">NewTree</AppLink> | 
    <AppLink to="/DaBoys">DaBoys</AppLink> |
    <AppLink to="/PhotoPages">PhotoPages</AppLink> |
    <AppLink to="/InfoTable">InfoTable</AppLink> | 
    <AppLink to="/AboutView">About</AppLink> |
    <AppLink to="/FigureSlide">FigureSlide</AppLink>
    <AppLink to="../../search.html">Search</AppLink>
    
    <div id="clock">
    <div class="date">{{ clocktext }}</div>
    </div>
  </div>
</template>

<style scoped>

Applink {
    color: #ffffff;
  }

  #nav.falkmans-web {
    color: #00ff80;
    border-bottom: 2px solid #00ff80;
  }
  .date {
    color: #000;
    font-weight: bold;
  }
</style>
