<script setup>
import { ref, onMounted, watch } from 'vue'

const images = []
const imageFiles = require.context('../assets/treepics', true, /\.(jpe?g|png|gif|svg)$/i)
imageFiles.keys().forEach((key) => {
  const name = key.split('/').pop().split('.')[0]
  images.push({ src: imageFiles(key), name })
})

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
    <button @click="togglePause" class="toggle-button"  :style="{ backgroundColor: paused ? '#00cc00' : '#0066cc' }">>
      {{ paused ? 'Play ▶' : 'Pause ⏸' }}
    </button>
  </div>
</template>

<style scoped>

.cross-fade-wrapper {
  max-width: 250px;
  position: relative;
  top: 51px;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* space between fade area and button */
  margin-top: 64px;
}

#cross-fade {
  position: relative;
  height: 250px;
  width: 200px;
}

.fade-cycle {
  position: absolute;
  height: 250px;
  width: 200px;
  border-radius: 10%;
  filter: sepia(100%);
  animation: FadeInOut 6s ease-in-out;
}

h5 {
  position: absolute;
  font-family: Decker;
  font-size: 1.525em;
  color: #006600;
  text-shadow: 1px 1px 7px rgba(0, 178, 0, 0.8);
  letter-spacing: 2px;
  width: 250px;
  text-align: center;
  top: 260px;
  left: -25px;
}

.fade-caption {
  animation: FadeInOut 6s ease-in-out;
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


/* .cross-fade-wrapper {
  position: relative;
  width: 200px;
  margin: 0px auto;
  top: 64px;
}

.toggle-button {
  position: relative;
  top:  20px;
  left: 100px;
  display: block;
  margin: 20px auto 0;
  padding: 6px 14px;
  font-size: 1rem;
  color: #fff;
  background-color: #00aa00;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #004d00;
}
.fade-caption {
  animation: FadeInOut 6s ease-in-out;
}
#cross-fade {
  position: relative;
  left: 150px;
  height: 250px;
  width: 200px;
  margin: 0 auto;
}
@keyframes FadeInOut {
  0% {
    opacity: .1;
  }
  35% {
    opacity: .5;
  }
  90% {
    opacity: .5;
  }
  100% {
    opacity: .1;
  }
}
  .fade-cycle {
    position: absolute;
    height: 250px;
    width: 200px;
    border-radius: 10%;
    filter: sepia(100%);
    animation: FadeInOut 6s ease-in-out;
  }

 h5 {
    position: absolute;
    font-family: Decker;
    font-size: 1.525em;
    color: #006600;
    text-shadow: 1px 1px 7px rgba(0, 178, 0, 0.8);
    letter-spacing: 2px;
    margin: 2px;
    left: -20px;
    top: 260px;
    width: 250px;
    text-align: center;
  } */
</style>