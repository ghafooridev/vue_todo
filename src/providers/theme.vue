<template>
  <div :class="theme">
    <slot />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>

<style>
.light {
  background-color: white;
  color: black;
  height: 100%;
}

.dark {
  background-color: black;
  color: white;
  height: 100%;
}
</style>
