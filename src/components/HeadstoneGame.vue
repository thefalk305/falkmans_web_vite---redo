<script setup>
import { ref } from "vue";

const props = defineProps({
  show: Boolean,
  stone: String,
  headstones: Array,
  totalScore: Number,
  updateScore: Function,
  id: String
});

const resolveImageUrl = (filename) =>
  new URL(`../assets/img/headstones/${filename}`, import.meta.url).href;

const emit = defineEmits(["close"]);

const headstoneNames = ref([]);
const selected = ref("");
const showResults = ref(false);
const points = ref(5);
const correct = ref(false);
const image = ref(null);
const myScore = ref(props.totalScore);
const result = ref({ correct: false, stone: props.stone }) // Set default early


const closeModal = () => {
  console.log("📦 Emitting close from method with result:", result.value)
  emit("close", result.value)
}


// Populate headstone name list on mount
headstoneNames.value = Array.from(
  new Set(
    props.headstones.map((stone) => stone.split(".")[0])
  )
);

const blur = (e) => {
  image.value = document.getElementById("headstone");
  const regex = /\d+/g;
  let blurValue = 1;
  const blurString = image.value.style.filter;
  if (blurString !== "none") {
    blurValue = parseInt(blurString.match(regex)?.[0] || "1");
  }
  e.target.innerHTML === "blur" ? blurValue++ : blurValue--;
  image.value.style.filter = `blur(${Math.max(blurValue, 0)}px) sepia(1)`;
};

const checkAnswer = () => {
  image.value = document.getElementById("headstone");
  const blurString = image.value.style.filter;
  const regex = /\d+/g;

  if (!selected.value) {
    alert("Please select a headstone name.");
    return;
  }

  showResults.value = true;

  if (selected.value === props.stone.split(".")[0]) {
    if (!correct.value) {
      props.updateScore(points.value);
      correct.value = true;
      myScore.value += points.value;
      selected.value = "";
      image.value.style.filter = "sepia(1)";
      headstoneNames.value = [];
      result.value = { correct: true, stone: props.stone };
    }
  } else {
    document.querySelectorAll(".radioBtn").forEach((btn) => (btn.checked = false));
    headstoneNames.value = headstoneNames.value.filter((name) => name !== selected.value);
    selected.value = "";
    points.value = Math.max(0, points.value - 1);

    let blurValue = parseInt(blurString.match(regex)?.[0] || "1");
    image.value.style.filter = `blur(${Math.max(--blurValue, 0)}px) sepia(1)`;
  }
};

const clearShowResults = () => {
  showResults.value = false;
};

window.onbeforeunload = () => {
  window.parent?.functonToCallBeforeThisWindowCloses?.();
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <h2>Match the headstone with the name. Five tries. Points count down with each try!</h2>

        <div class="modal-body">
          <img
            id="headstone"
            ref="image"
            :src="resolveImageUrl(stone)"
            alt="photo"
            style="filter: blur(8px) sepia(1)"
          />
          <button @click="blur">blur</button>
          <button @click="blur">deblur</button>
        </div>

        <div class="modal-header">
          <div v-for="(headstone, index) in headstoneNames" :key="index">
            <input
              class="radioBtn"
              type="radio"
              name="hstone"
              v-model="selected"
              :value="headstone"
              :id="'item#' + index"
            />
            <label :for="'item#' + index">{{ headstone }}</label>
          </div>
          <span id="selected">You chose {{ selected }}</span>

          <div v-show="showResults">
            <button @click="clearShowResults">Clear Results</button>
            <p>
              Your selection was
              {{
                correct
                  ? "correct! Please try the next headstone."
                  : "incorrect. Please try again."
              }}
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="checkAnswer">Check Selection</button>
          <button disabled>Points: {{ points }}</button>
          <button disabled>Total Score: {{ props.totalScore }}</button>
          <button @click="closeModal">Close</button> 
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-footer {
  position: absolute;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
}
#selected {
  color: red;
}
img {
  width: 100%;
  max-height: 300px;
}

.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 370px;
  left: 100px;
  width: 750px;
  height: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 1.5s ease;
}
.modal-container {
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 20px 30px;
  background-color: antiquewhite;
  opacity: 1;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(255, 0, 0, 0.83);
  transition: all 0.3s ease;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
#checkAnswer {
  margin: 20px;
}
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>