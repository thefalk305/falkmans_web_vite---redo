<script setup>
import { ref, onMounted, watch } from 'vue'

// const images = []
const imageFiles = import.meta.glob('../assets/treepics/*.{jpg,jpeg,png,gif,svg}', { eager: true });

const images = Object.entries(imageFiles).map(([path, module]) => {
  const name = path.split('/').pop().split('.')[0];
  return { src: module.default, name };
});

const index = ref(0)
const currentImage = ref(images[0])
const animateKey = ref(0)
const paused = ref(false)
let intervalId = null

const startSlideshow = () => {
  if (intervalId) return
  intervalId = setInterval(() => {
    if (!paused.value) {
      index.value = (index.value + 1) % images.length
      currentImage.value = images[index.value]
      animateKey.value++
    }
  }, 6000)
}

const togglePause = () => {
  paused.value = !paused.value
}

onMounted(() => {
  startSlideshow()
})
</script>

<template>
  <div class="cross-fade-wrapper">
    <div id="cross-fade" class="shadow">
      <img
        class="fade-cycle"
        :key="animateKey"
        :src="currentImage.src"
        alt=""
      />
      <h5 class="top fade-caption" :key="animateKey">
        {{ currentImage.name }}
      </h5>
    </div>
    <button @click="togglePause" class="toggle-button" :style="{ backgroundColor: paused ? '#00cc00' : '#0066cc' }">
      {{ paused ? 'Play ▶' : 'Pause ⏸' }}
    </button>
  </div>
</template>

<style scoped>

.cross-fade-wrapper {
  top: -20px;
  left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  position: relative;
  transform: translate(40px, 40px); /* shifts right and down */
}

#cross-fade {
  position: relative;
  width: 200px;
  height: 250px;
  margin: 0 auto;
}

.fade-cycle {
  position: absolute;
  height: 250px;
  width: 200px;
  border-radius: 10%;
  filter: sepia(60%);
  animation: FadeInOut 6s ease-in-out;
}

h5 {
  position: absolute;
  font-family: Decker;
  font-size: 1.525em;
  color: #006600;
  text-shadow: 1px 1px 7px rgba(0, 178, 0, 0.8);
  letter-spacing: 2px;
  width: 280px;
  text-align: center;
  left: -36px;
  top: 224px; /* moves the caption a little higher */
}

.toggle-button {
  padding: 6px 14px;
  font-size: 1rem;
  color: #fff;
  background-color: #00aa00;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* space between caption and button */
  /* position: relative;
  top: 0;
  left: 0; */
}

.fade-caption {
  animation: FadeInOut 6s ease-in-out;
}

.toggle-button:hover {
  background-color: #004d00;
}

@keyframes FadeInOut {
  0%   { opacity: 0.1; }
  35%  { opacity: 0.5; }
  90%  { opacity: 0.5; }
  100% { opacity: 0.1; }
}
</style>