<script setup>
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="header">
      <span>Written by {{ todo.author }} on {{ todo.created_at }}</span>
      <div>
        <button @click="todoStore.deleteTodo(todo.id)" class="del material-icons">delete</button>
        <button @click="todoStore.saveTodo(todo.id)" class="save material-icons">
          {{ todo.is_saved ? 'bookmark' : 'bookmark_border' }}
        </button>
      </div>
    </div>
    <h1>{{ todo.title }}</h1>
    <p>{{ todo.body }}</p>
  </div>
</template>

<style lang="scss" scoped>
.header {
  font-size: 12px;
  background: #0284c7;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: 300;
  button {
    border-radius: 30px;
  }
  div .del {
    font-size: 20px;
    padding: 3px;
    background: #fff;
    color: #ef4444;
  }
  div .save {
    font-size: 20px;
    padding: 3px;
    background: #fff;
    color: #22c55e;
    margin-left: 10px;
  }
}
h1 {
  padding: 1rem;
}
p {
  padding: 0 1rem 1rem;
  font-weight: 300;
}
</style>
