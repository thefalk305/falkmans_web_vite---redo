<script setup>
import AppLink from "@/components/AppLink.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;
const snackbar = ref(false);

const props = defineProps({
  person: {
    type: [String, Object],
  },
  infoTable: Array,
  isOpen: Boolean,
});

function familySearch(link) {
  navigator.clipboard
    .writeText(link)
    .then(() => {
      snackbar.value = true;
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}



const personName = typeof props.person === "string" ? props.person : props.person?.name;

const isPerson = typeof props.person === "string" ? true : false;

const memberInfo = props.infoTable.find((entry) => entry.name === personName);

console.log("memberInfo", memberInfo, "isPerson", isPerson);
</script>

<template>
  <div class="avatarCircleCss  " 
  :class="isPerson ? 'child' : ''">
    <img
      class="imageCss"
      :src="resolveImageUrl(memberInfo.pic)"
      :alt="memberInfo.pic"
    />
  </div>
  <div class="coupleInfo">
    <AppLink
      v-if="memberInfo.id < 9998"
      :to="{ name: 'InfoPage', params: { id: memberInfo.id } }"
      target="_blank"
    >
      <h3>{{ memberInfo.name }}</h3>
    </AppLink>
    <div class="personInfo" style="font-size: smaller">
      <p style="font-size: smaller">{{ memberInfo.years }}</p>
      <button
        @click="familySearch(memberInfo.famSrchLink)"
        style="font-size: smaller"
      >
        {{ memberInfo.famSrchLink }}
      </button>
    </div>
  </div>

    <!-- snackbar -->
  <div class="text-center">
    <v-snackbar :timeout="timeout" v-model="snackbar" multi-line color="success"
      >ID Copied to Clipboard!
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<style scoped>
:root {
  --avatar-size: 40px;
  --presence-size: 16px;
  --presence-border-size: 2px;
}

a:hover {
  background-color: #888;
  border-radius: 5px;
}

.child {
  margin-left: 20px;
  padding: 1px;
  font-size: smaller;
}

h3 {
  margin: 5px 0 0 0;
  font-family: "HeritageBody:Sans", HanaMinBFont, ui-sans-serif, system-ui,
    sans-serif, Tofu;
  font-size: smaller;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
      letter-spacing: 0.2em;
    color: black;}


.coupleInfo {
  margin: 0 0 0 10px;
}

button {
}
.personInfo {
  font-family: "HeritageBody:Sans", HanaMinBFont, ui-sans-serif, system-ui,
    sans-serif, Tofu;
  font-size: smaller;
  display: flex;
  flex-direction: row;
}

.avatarCircleCss img {
  width: 40px;
  --avatar-size: 40px;
  --presence-size: 16px;
  --presence-border-size: 2px;
  border-radius: 50%;
  height: 40px;
  margin: 5px;
}

.avatarCircleCss.child img {
  width: 20px;
  --avatar-size: 24px;
  --presence-size: 12px;
  --presence-border-size: 2px;
  border-radius: 50%;
  height: 20px;
  margin: 2px;
}

@import "./../assets/css/Couple.css";
@import "./../assets/css/Bleed.css";
@import "./../assets/css/ChildList.css";
@import "./../assets/css/globalStyles.css";
@import "./../assets/css/Ellipsis.css";
@import "./../assets/css/BaseIcon.css";
@import "./../assets/css/Avatar.css";
@import "./../assets/css/Row.css";
@import "./../assets/css/iconStyles.css";
@import "./../assets/css/typographyStyles.css";
</style>
