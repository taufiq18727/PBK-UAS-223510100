<template>
  <div class="todo-app">
    <h1>Todays Activities</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add Something!" />
      <button type="submit" class="primary">Add</button>
    </form>
    <div class="filter-section">
      <button @click="filterTodos('all')" class="filter-btn">All</button>
      <button @click="filterTodos('active')" class="filter-btn">Not Completed</button>
      <button @click="filterTodos('completed')" class="filter-btn">Completed</button>
    </div>
    <table class="todo-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in filteredTodos" :key="index">
          <td>
            <input type="checkbox" v-model="todo.done" />
          </td>
          <td>
            <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
          </td>
          <td>
            <button @click="removeTodo(index)" class="danger">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <footer>
      <p>PROJECT UAS TAUFIQURRAHMAN</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        text: this.newTodo,
        done: false,
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos(filterType) {
      this.filter = filterType;
    },
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
};
</script>

<style>
.todo-app {
  width: 800px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #eaf8f7;
  color: #333;
  margin: 50px auto;
}

.todo-app h1 {
  text-align: center;
  color: #3b5998;
  font-size: 32px;
  margin-bottom: 20px;
}

.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type=text] {
  flex: 1;
  padding: 12px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.todo-app input[type=text]:focus {
  border-color: #3b5998;
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 12px 20px;
  font-size: 1.2rem;
  background-color: #3b5998;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-app button[type=submit]:hover {
  background-color: #2d4373;
}

.filter-section {
  text-align: center;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  background-color: #3b5998;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-btn:hover {
  background-color: #2d4373;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.todo-table th,
.todo-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.todo-table th {
  background-color: #3b5998;
  color: #fff;
}

.todo-table td input[type="checkbox"] {
  margin-right: 10px;
}

.todo-table td .done {
  text-decoration: line-through;
  color: #999;
}

.todo-table td .danger {
  padding: 8px 12px;
  font-size: 0.8rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-table td .danger:hover {
  background-color: #c82333;
}

footer {
  text-align: center;
  margin-top: 20px;
}
</style>
