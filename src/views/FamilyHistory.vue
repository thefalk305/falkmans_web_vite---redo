<script setup>
import { ref } from "vue";
import GoBack from "@/components/GoBack.vue";
import RouteLists from "@/components/RouteLists.vue";

import BackToTop from "@/components/BackToTop.vue";

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;

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
  // { route: "DuBois", text: "DuBois, PA. USA" },
  { route: "Chicago", text: "Chicago, IL. USA" },
  { route: "Albany", text: "Albany, N.Y. USA" },
  { route: "Ogdensburg", text: "Ogdensburg, N.J. USA" },
]);
const urList = ref([
  { route: "Romeo", text: "S.S. Romeo" },
  { route: "Britannic", text: "R.M.S. Britannic" },
  { route: "Norden", text: "S.S. Norden" },
  { route: "Trave", text: "S.S. Trave" },
  { route: "Carmania", text: "R.M.S. Carmania" },
  { route: "Samaria", text: "S.S. Samaria" },
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
  <div id="family_history">
    <!-- <MiniNav /> -->
    <!-- <RouteLists /> -->
    <div id="leftnav">
      <b>Travel Notes</b>
      <ul v-if="ulList">
        <li v-for="{ route, text } in ulList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <b>Places</b>
      <ul v-if="llList">
        <li v-for="{ route, text } in llList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
    </div>
    <div id="rightnav">
      <b>Transportation</b>
      <ul v-if="urList">
        <li v-for="{ route, text } in urList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
      <b>Other</b>
      <ul v-if="lrList">
        <li v-for="{ route, text } in lrList" :key="route">
          <AppLink :to="route">{{ text }}</AppLink>
        </li>
      </ul>
    </div>

    <div id="content">
      <p style="text-align: justify">
        <b>Greetings,</b> my name is Al Falkman. I started this adventure back
        in 1978. There were no online services at the time. All of the research
        was done by hand. I spent months and months searching through records
        and micro-fiche files for scraps of information. It took my wife and
        myself almost two (2) years just to find my great-grandfather's ship
        manifest. But that was just the start. Then came my great-grandmother's
        records, and after that, aunts, uncles and cousins.
      </p>
      <p style="text-align: justify">
        I hope you enjoy looking at the records and pictures as much as I did
        while putting this site together. This website was first published in
        2010. The canvas didn't change much for many years but, now with the
        help of my family, I am updating the website, adding new templates and a
        lot of new information that has been discovered over the years. I want
        to thank all my family for the information and support they have given.
      </p>
      <p style="text-align: right">TinkerAlF</p>

      &nbsp;
      <p style="text-align: center">&nbsp;</p>
    </div>
    <h1 style="width: 56%; margin: 10px 10px; align-content: center">
      Nils Pitt Falkman Emigrates from Sweden to the U. S.
    </h1>
    <p>
      <img
        alt="Photograph of Peter Nels Falkman."
        class="imglft"
        height="229"
        :src="resolveImageUrl('Peter.jpg')"
        width="187"
      />
    </p>
    <p class="dropcap" style="text-align: justify; text-indent: 0em">
      Nils's story starts back in the mid 1800's. Records indicate that he was
      born on Thursday, April 30<sup>th</sup> 1863. He was born in Svenshult.
      This would be the farm that his family lived on. Which is located in the
      parish of Hinneryd. Hinneryd lies in the county of Kronoberg. And
      Kronoberg is one of three counties in the province of Småland. In the
      southern part of Sweden. His parents were Johan Nilsson and Karna
      Persdotter. They were 'Sharecroppers'. Working the land for a wealthy land
      owner. And in return, given a cottage and a parcel of land to work for
      themselves. When Nils turned 18 or 19 he was more than likely conscripted
      into the military. Back in the 1800's it was mandatory. Much like our
      'draft' we had in the United States. After his time in the military he
      returned home and he lived with his parents on the farm. Until he took up
      an apprenticeship in Hudiksvall. After his apprenticeship he emigration to
      the United States.
    </p>
    <p class="dropcap" style="text-align: justify; text-indent: 0em">
      &nbsp;&nbsp;&nbsp; I have discovered that Nils did had siblings, five to
      be exact. Three brothers and two sisters. One of the girls died at an
      early age (6 months). This would have been before Peter was born. Family
      planning was not heard of in the 1800's. And the more children you could
      raise, meant more help on the farm or the bigger your business could grow.
      Not to mention just propagating the family name. It's only in recent times
      do we limit out families to one or two children. As for Nils's profession.
      The census records have him listed as a shoemaker. And it would appear
      that this is the apprenticeship trade that he took up in Hudiksvall. At
      this time in history the patronymic naming system was in use. The male
      children would take on the father's first name. And add son to the
      beginnings or the end of the name. The females would take the father's
      first name and add 'dotter' to the end of the name. Nils Pitt's name was
      originally Nils Pitt Johansson. Taking on the father's first name (Johan)
      and adding 'son' to it.Prior to leaving for America Nils would change his
      name to Falkman. This was a common practice in the military. There would
      be so many Johanssons or Nilssons in a company or regiment, that they
      would have changed some names. Nils Johansson became Nils Falkman. And his
      brother who was Johan Johansson, became Johan Lofgren. The records show
      that Nils and Karin Noren would both travel to Hudiksvall (at different
      times). And that this time would be overlapping. It appears that there, in
      Hudiksvall, is where Nils received his formal training as a shoemaker. And
      Karin would learn a seamstress trade. I think, this is where Nils would
      eventually meet Karin. Maybe they lived at the same boarding house. Or ate
      at the same restaurant. Or maybe they met in church. Anyway their
      relationship grew. And as time went by Nils would see more and more of
      Karin. It would appear that they had fallen in love and had made a pack
      together. This pack would be that Nils would travel to America and Karin
      would follow as soon as possible. (less that a year later).
    </p>

    <p>&nbsp;</p>
    <h2 style="font-size: 1.5em">The Journey</h2>
    <p class="info">
      Now back in the 1800's, travel wasn't as easy as it is today. No planes,
      and the railroads were just coming into existence. And also traveling a
      great distance wasn't to be taken on lightly. Many emigrants died on their
      migration trip to America, Canada or Australia. And also it was rather
      expensive. I'm sure that Nils and Corine both had to save up for their
      pending trip. Maybe taking a year or more. Or even borrowing some of the
      money from family members. With the promise to repay the loan when they
      reached America. (Which we all know, had streets paved with gold... Ha
      Ha). I can almost feel Nils's excitement when he finally had enough money
      to purchase his ticket. He would have gone off to see the 'ticket agent'
      from whom he would have purchased a <u>one-way</u> ticket to America. The
      ticket agent would have arranged all of the travel plans. Much like our
      'travel agents' of today. There would have been coach or train
      transportation to the boat. The boat fare itself and any lodging expenses
      that would have been incurred. And so it was that on Tuesday, the 6<sup
        >th</sup
      >
      of October 1891, Nils shook his father's hand and gave his mother one last
      hug. Then he said 'Good-Bye' to the rest of the family members present.
      And off he would go to start his journey. He left from Svenshult (<span
        style="background-color: #ffff00"
        >See the link under <u>Places</u></span
      >) on the eastern coast of Sweden. It would have been a cool, crisp
      morning and Nils would have been anxious to start. For this would be a
      long journey. A journey of a life-time. He wouldn't have a chance to see
      Karin. As she lived over 40 miles away and had to attend to her family
      chores. Nils would have either traveled by train or stage coach. Had he
      traveled by train it would have been an all day excursion. Arriving in
      Göteborg later that evening (<span style="background-color: #ffff00"
        >See <a href="Göteborg"> Göteborg</a> under </span
      ><u><span style="background-color: #ffff00">Travel Notes</span></u
      >). Or even the next day, had Nils traveled by coach, because it would
      have been even a slower journey. Not arriving until the 8th of October.
      However he traveled, Nils did arrive in time and boarded the ship on the
      8th of October. And set sail for Kingston upon Hull on the 9th. Nils
      traveled on the S.S. Romeo. A steamship built and owned by the Wilson
      Steamship Line.(<span style="background-color: #ffff00">More under </span
      ><u> <span style="background-color: #ffff00">Transportation</span>)</u>.
    </p>
    <p class="info">
      Upon arriving in <a href="/Hull"> Kingston upon Hull</a>, Nils would have
      more than likely stayed on board the ship until transportation was
      available for the trip to Liverpool (<span
        style="background-color: #ffff00"
        >See Kingston on Hull, under </span
      ><u><span style="background-color: #ffff00">Travel Notes</span></u
      >) Once transportation was available, Nils would have boarded a train.
      Along with the other passengers headed to Liverpool. And the second leg of
      his journey would begin. Upon arrival in Liverpool, he would have headed
      down to the docks. And boarded the R.M.S. Britannic. Which would take him
      across the Atlantic and into New York City. His ship would have docked at
      Castle Garden. This is where all of the immigrants came through prior to
      Ellis Island. From there he would have boarded a train at Grand Central
      Depot. And headed to DuBois Pennsylvania. Where his brother would be
      waiting.
    </p>
    <p>&nbsp;</p>
    <h2 style="font-size: 1.5em">Karin Noren</h2>
    <p class="imglft">
      <img
        alt="Photograph of Karen Falkman."
        height="275"
        :src="resolveImageUrl('Karen.jpg')"
        width="215"
      />
    </p>
    <p class="info">
      Corine Noren (as it was spelled on some of her immigration papers).
      'Katherine', as she was call in America. Lived in as small centrally
      located eastern town named Arbrä. It is located about 42 miles from
      Hudiksvall, the same town where Nils was doing his apprenticeship.
    </p>
    <p class="info">
      Katherine Noren immigrated to America in May of 1892. She left her home in
      Arbrå and traveled to Göteborg the same as Nils. From there, she traveled
      on the SS Norden. Which took her to Hamburg, Germany. From Hamburg she
      traveled overland to Bremen. And it was from Bremen that she boarded the
      SS Trave. Which took her to America. Upon her arrival in New York she took
      a train directly to DuBois, Pennsilyania. This leads me to believe that
      they must have known one another while still in Sweden. There on the 25th
      of May 1892, she was married, to Nils.&nbsp; Her first child was born in
      September of 1893 (Herman). Shortly after Herman's birth the family
      decided to move to Chicago, Illinois.
    </p>
    <p class="info">
      Katherine's Father was a 'self ordained minister' (in Sweden). And he,
      along with several other ministers formed a new church. It was called the
      Swedish Covenant Church. He was also educated as a professional&nbsp;
      cabinet maker. Katherine was also employed, as a maid, at the time. It is
      not an uncommon practice for a daughter to accompany her father on his
      missionary circuit. I think this is what Katherine did. Taking in laundry
      to earn a few cents and also taking care of her fathers needs (cooking and
      washing), as he traveled on his circuit. This may also explain how she
      came to meet Nils Peter. He may have seen her at one of the church
      functions. They started talking and Peter told her of his forth coming
      trip to America. He may have even asked her to accompany him on his trip.
      I don't know how long the two had know each other before making the
      decision to go to America.
    </p>
    <p class="info">
      I think Katherine had a stepmother... This information was confirmed by my
      cousin, Karin, who lived with Katherine, (her grand-mother), when she was
      a small child.
    </p>
    <p class="info">
      After moving to Chicago. Her husband, Nils Peter, opened up a small shoe
      shop. Making and selling shoes and also repairing them. His first shop was
      located in 'downtown' Chicago. And then later on he moved and opened up
      another shop&nbsp; farther west, on Lake Street. Several years later. Nils
      closed the shop. And started working for the Chicago and Oak Park&nbsp;
      Rail Road. Today called the 'CTA' or Rapid Transit. Where he was
      eventually killed in a work related accident. With the insurance money
      Katherine purchased a home in the Austin area of Chicago. This is were the
      children were raised and went to school. Katherine lived the rest of her
      life in the home.
    </p>
    <p class="info">
      Unfortunately my earliest memories of Katherine are when she was sick and
      confined to bed. Her two daughters Lillian and Ester remained in the home.
      Never marrying. Ester would take care of her mother and Lillian would be
      the one that was out working. &nbsp;
    </p>
    <p class="info" style="text-align: center">&nbsp;</p>
  </div>
  <!-- </div> -->
  <!-- <BackToTop /> -->
</template>

<style scoped>
a:visited {
  color: rgba(26, 26, 4, 0.144);
}

li {
  color: #4b1e1e3b;
}
a:hover {
  background-color: rgb(185, 248, 234);
  border-radius: 5px;
}
#family_history {
  background-color: linen;
}

#content {
  margin-right: auto;
  margin-left: auto;
  padding: 5px;
  text-align: center;
  vertical-align: top;
  width: 98%;
}
.info {
  text-indent: 24px;
  text-align: justify;
  margin-top: 0em;
  margin-bottom: 1em;
}
#leftnav,
#rightnav {
  color: rgb(0, 128, 100);
  background-color: bisque;
  text-align: left;
  z-index: 22;
  position: relative;
}
h1 {
  z-index: 0;
  text-align: center;
}

a {
  color: #000;
}

AppLink.text {
  color: #000;
}
</style>
