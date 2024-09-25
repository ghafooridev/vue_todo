import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo-store', {
  // Data
  state() {
    return {
      todo: [],
      loading: true,
      errMsg: ''
    }
  },
  // computed
  getters: {
    sorted() {
      return this.todo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    done: (state) =>
      state.todo.filter((p) => p.done).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },
  // methods
  actions: {
    getTodo() {
      fetch('http://localhost:3000/todo')
        .then((res) => res.json())
        .then((data) => {
          this.todo = data
          this.loading = false
        })
        .catch((err) => {
          this.errMsg = 'Something went wrong'
          this.loading = false
          console.log(err)
        })
    },
    addTodo(todo) {
      const newTodo = {
        id: (+new Date()).toString(),
        title: todo.title,
        priority: todo.priority,
        createdAt: new Date().toLocaleDateString(),
        done: false
      }

      this.todo.push(newTodo)

      fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newTodo)
      }).catch((err) => console.log(err))
    },
    deleteTodo(id) {
      this.todo = this.todo.filter((p) => p.id !== id)

      fetch(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE'
      }).catch((err) => console.log(err))
    },
    updateTodo(id) {
      const todo = this.todo.find((p) => p.id === id)
      todo.done = !todo.done

      fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ done: todo.done })
      }).catch((err) => console.log(err))
    }
  }
})
