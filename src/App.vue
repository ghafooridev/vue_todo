<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useTodoStore } from '@/stores/todo'
import ThemeProvider from './providers/theme.vue'
import ThemeDisplay from './components/ThemeDisplay.vue'

const todoStore = useTodoStore()
todoStore.getTodo()
</script>

<template>
  <ThemeProvider>
    <header>
      <nav>
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/add" class="nav-link">New Todo</RouterLink>
      </nav>

      <ThemeDisplay />
    </header>
    <RouterView />
  </ThemeProvider>
</template>

<style lang="scss" scoped>
header {
  padding: 1rem 2rem;
  background: #1e40af;
  border-bottom: 1px solid #60a5fa;
  display: flex;
  justify-content: space-between;
}
nav {
  .nav-link {
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    margin-right: 1rem;
    &:hover {
      background: #60a5fa;
    }
  }
}
</style>
