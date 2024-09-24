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
      return this.todo.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    },
    saved: (state) =>
      state.todo
        .filter((p) => p.is_saved)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
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
        id: this.todo.length + 1,
        title: todo.title,
        body: todo.body,
        author: 'Andy Tim',
        created_at: new Date().toLocaleDateString(),
        is_saved: false
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
    saveTodo(id) {
      const todo = this.todo.find((p) => p.id === id)
      todo.is_saved = !todo.is_saved

      fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ is_saved: todo.is_saved })
      }).catch((err) => console.log(err))
    }
  }
})
