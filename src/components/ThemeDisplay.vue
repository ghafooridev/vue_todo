<script setup>
import { inject } from 'vue'

const theme = inject('theme')
const toggleTheme = inject('toggleTheme')
</script>
<template>
  <div class="content">
    <button @click="toggleTheme" class="icon material-icons">
      {{ theme === 'light' ? 'nightlight' : 'sunny' }}
    </button>
  </div>
</template>

<style>
.content {
  display: flex;
  .icon {
    color: #fff;
  }
}
</style>
