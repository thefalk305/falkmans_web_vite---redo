<template>
  <svg
    class="chevron"
    :class="{ open }"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

svg {

  background-color: transparent;
}

.chevron {
  transition: transform 0.4s ease;
  transform: rotate(0deg); /* ▼ down */
  right: 10px;
  position: absolute;
}

.chevron.open {
  transform: rotate(-180deg); /* ▲ up */
}

.chevron.expandButtom {
  width: 34px;
  height: 34px;
  transform: rotate(-90deg); /* ► right */
}

.chevron.expandButtom.expanded {
  width: 34px;
  height: 34px;
  transform: rotate(90deg); /* ► left */
}

</style>