<script setup>
import { reactive, computed, watch } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { useRouter } from 'vue-router'

import Wrapper from '../components/Wrapper.vue'

const router = useRouter()
const todoStore = useTodoStore()

const todo = reactive({
  title: '',
  priority: ''
})

const isFormInvalid = computed(() => {
  return todo.title === '' || todo.priority === ''
})

const submit = () => {
  todoStore.addTodo(todo)
  // router.push({ name: 'home' })
}


watch(
  () => todoStore.todo, // Watch the todos in the store
  () => {
  
      router.push({ name: 'home' })
    
  },
  { deep: true }  // Ensure deep watching of the todos array
)

</script>

<template>
  <Wrapper>
    <form @submit.prevent="submit">
      <h3>Create a new todo</h3>
      <div>
        <label for="title">Todo Title</label>
        <input id="title" type="text" v-model="todo.title" />
      </div>
      <div>
        <label for="priority">Todo Priority</label>
        <select v-model="todo.priority" id="priority">
          <option value="High">High</option>
          <option value="Mid">Mid</option>
          <option value="Low">Low</option>
        </select>
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
  border: 1px solid #3b82f6;
  border-radius: 10px;
  height: 100%;
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
  select {
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
      background: #aaa;
      cursor: not-allowed;
    }
  }
}
</style>
