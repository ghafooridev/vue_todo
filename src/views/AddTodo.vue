<script setup>
import { reactive, computed } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { useRouter } from 'vue-router'

import Wrapper from '../components/Wrapper.vue'

const router = useRouter()
const todoStore = useTodoStore()

const todo = reactive({
  title: '',
  body: ''
})

const isFormInvalid = computed(() => {
  return todo.title === '' || todo.body === ''
})

const submit = () => {
  todoStore.addTodo(todo)
  router.push({ name: 'home' })
}
</script>

<template>
  <Wrapper>
    <form @submit.prevent="submit">
      <h3>Create a new todo</h3>
      <div>
        <label>Todo Title</label>
        <input type="text" v-model="todo.title" />
      </div>
      <div>
        <label>Todo Body</label>
        <textarea rows="7" v-model="todo.body"></textarea>
      </div>
      <div>
        <button :disabled="isFormInvalid">Add</button>
      </div>
    </form>
  </Wrapper>
</template>

<style lang="scss" scoped>
form {
  padding: 2rem;
}
h3 {
  margin-bottom: 2rem;
}
div {
  margin-bottom: 1rem;
  label {
    font-weight: 300;
  }
  input,
  textarea {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    border: 1px solid #333;
    padding: 5px;
    border-radius: 5px;
    &:focus {
      outline: 2px solid #3b82f6;
      border: none;
    }
  }
  button {
    background: #3b82f6;
    color: #fff;
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    &:hover {
      background: #2563eb;
    }
    &:disabled {
      background: #eee;
      cursor: not-allowed;
    }
  }
}
</style>
