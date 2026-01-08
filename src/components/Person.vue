<script setup>
import AppLink from "@/components/AppLink.vue";
import { ref, inject } from "vue";

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/${filename}`, import.meta.url).href;
const snackbar = ref(false);
const timeout = 1500;

const props = defineProps({
  person: {
    type: [String, Object],
  },
  memberIndex: Number,
  groupId: Number,
  personId: Number,
  isOpen: Boolean,
});

// const emit = defineEmits(["open-form"]);
// Get the infoTable from global provide
const infoTable = inject("infoTable", []);


// person could either be a string or an object.
// It will be an object when rendering a full person from infoTable
// It will be a string (child's name =) if it's a child.
const personName = typeof props.person === "string" ? props.person : props.person?.name;

const memberInfo = infoTable.find((entry) => entry.name === personName);

const isPerson = typeof props.person === "string" ? true : false;

const isFound = memberInfo ? true : false;

// console.log("props.person", props.person);

// console.log("personName", personName, "memberInfo", memberInfo )

if (memberInfo?.born_died) {
  const years = memberInfo.born_died.match(/\b\d{4}\b/g) || [];
  memberInfo.years =
    years.length === 2 ? `${years[0]} - ${years[1]}` :
    years.length === 1 ? `${years[0]} - ?` :
    "";
}

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

// function openForm(memberId, memberIndex) {
//   emit("open-form", memberId, props.groupId, props.memberIndex);
// }

</script>

<template >
  <div  v-if="memberInfo"
  class="avatarCircleCss  " 
  :class="isPerson ? 'child' : ''">
    <img
      class="imageCss"
      :src="resolveImageUrl(memberInfo?.pic)"
      :alt="'face2.png'"
    />
  </div>
  <div class="coupleInfo" 
    v-if="memberInfo">
    <AppLink
      v-if="memberInfo?.id < 9998"
      :to="{ name: 'InfoPage', params: { id: memberInfo.id } }"
      target="_blank"
    >
      <h3>{{ memberInfo.name }}</h3>
    </AppLink>
    <!-- <button v-else @click="openForm(memberInfo.id)">
      {{ memberInfo.name }}
      </button>   -->
    <div class="personInfo" style="font-size: smaller">
      <p style="font-size: small">{{ memberInfo.years }}</p>
      <!-- <p style="font-size: smaller">{{ memberInfo.id }}</p> -->
      <p>&nbsp;&nbsp;</p>
      <button
        @click="familySearch(memberInfo.famSrchLink)"
        style="font-size: smaller"
      >
        {{ memberInfo.famSrchLink }}
      </button>
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
</div>
</template>

<style scoped>
:root {
  --avatar-size: 40px;
  --presence-size: 16px;
  --presence-border-size: 2px;
}
.groups {
  position: relative;
}

.groups.group1 {
  position: relative;

  left: 350px;
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

/* .child.male {
  background-color: #888;

} */



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
  font-size: small;
}

.personInfo {
  font-family: "HeritageBody:Sans", HanaMinBFont, ui-sans-serif, system-ui,
    sans-serif, Tofu;
  font-size: smaller;
  display: flex;
  flex-direction: row;
  font-size: small;
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
