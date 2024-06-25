<template>
  <div class="container">
    <div class="profile">
      <h1>Postingan Pengguna</h1>
      <div class="select-container">
        <select id="users" class="select-post" v-model="selectedUserId" @change="loadUserPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="user-posts">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <table class="post-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in userPosts" :key="post.id">
                <td>{{ post.title }}</td>
                <td>{{ post.body }}</td>
                <td width="150">
                  <button @click="editPost(post.id)" class="edit-btn">Edit</button>
                  <button @click="deletePost(post.id)" class="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      userPosts: [],
      loading: false
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    loadUserPosts() {
      if (!this.selectedUserId) return;
      this.loading = true;
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
        .then(response => response.json())
        .then(data => {
          this.userPosts = data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching user posts:', error);
          this.loading = false;
        });
    },
    deletePost(postId) {
      this.userPosts = this.userPosts.filter(post => post.id !== postId);
    },
    editPost(postId) {
      const postToEdit = this.userPosts.find(post => post.id === postId);
      const newTitle = prompt('Edit Title:', postToEdit.title);
      const newBody = prompt('Edit Body:', postToEdit.body);
      
      if (newTitle !== null && newBody !== null) {
        postToEdit.title = newTitle;
        postToEdit.body = newBody;
      }
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.profile {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
}

.profile h1 {
  color: #333;
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.select-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.select-post {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
}

.select-post:focus {
  border-color: #007bff;
}

.user-posts {
  margin-top: 20px;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  color: #333;
}

.post-table th,
.post-table td {
  padding: 12px;
  border: 1px solid #ccc;
}

.post-table th {
  background-color: #007bff;
  color: #fff;
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
