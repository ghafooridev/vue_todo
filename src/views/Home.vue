<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/TodoItem.vue'
import Wrapper from '@/components/Wrapper.vue'

const todoStore = useTodoStore()
const todoFilter = ref('all')

const setTodoFilter = () => {
  todoFilter.value = todoFilter.value === 'all' ? 'done' : 'all'
}
</script>

<template>
  <div class="header">
    <div>
      <h3>{{ todoFilter === 'all' ? 'All todo' : 'Done todo' }}</h3>
      <span v-show="todoStore.loading" class="material-icons">cached</span>
    </div>
    <button @click="setTodoFilter">
      {{ todoFilter === 'all' ? 'Show done todo' : 'Show all todo' }}
    </button>
  </div>

  <div v-if="todoStore.errMsg" class="error">
    {{ todoStore.errMsg }}
  </div>

  <div v-if="todoFilter === 'all'">
    <div v-for="todo in todoStore.sorted" :key="todo.id">
      <Wrapper>
        <TodoItem :todo="todo" />
      </Wrapper>
    </div>
  </div>

  <div v-if="todoFilter === 'done'">
    <div v-for="todo in todoStore.done" :key="todo.id">
      <Wrapper>
        <TodoItem :todo="todo" />
      </Wrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      animation: spin 1s linear infinite;
    }
  }
  button {
    color: #fff;
    background: #1e40af;
    padding: 4px 15px;
    border-radius: 5px;
    &:hover {
      background: #0ea5e9;
    }
  }
}

.error {
  margin: 2rem;
  background: #f87171;
  color: #fff;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
