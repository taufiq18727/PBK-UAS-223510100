<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-toolbar>
        <div class="heading-container">
          <h2 class="heading-title">My Application</h2>
          <q-btn-group flat class="rout-nav">
            <router-link to="/">
              <q-btn flat :outline="!isActive('/')"
                     :class="{ active: isActive('/') }"
                     label="Todos" />
            </router-link>
            <router-link to="/post">
              <q-btn flat :outline="!isActive('/post')"
                     :class="{ active: isActive('/post') }"
                     label="Post" />
            </router-link>
            <router-link to="/albums">
              <q-btn flat :outline="!isActive('/album')"
                     :class="{ active: isActive('/album') }"
                     label="Album" />
            </router-link>
          </q-btn-group>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;
    return {
      isActive
    };
  }
};
</script>

<style scoped>
.header {
  background-color: #f5f5f5;
  color: #00bfff !important;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-image: url(/src/assets/image/top.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dotted #82e6d5;
}

.heading-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 25%;
}

.heading-title {
  font-size: 1.5rem;
  color: #ff69b4;
  margin-bottom: 10px;
}

.rout-nav {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.rout-nav a {
  text-decoration: none;
  margin-right: 30px;
}

.rout-nav .q-btn {
  color: #00bfff;
  font-size: 16px;
  transition: color 0.3s, background-color 0.3s, border-color 0.3s;
}

.rout-nav .q-btn:hover {
  background-color: transparent;
  color: #ff69b4;
}

.rout-nav .q-btn[flat][outline] {
  border-color: #ffc0cb;
  color: #ffc0cb;
}

.active {
  color: #ff69b4;
  border-bottom: 2px solid #ff69b4; /* Efek kotak dengan border bawah */
}
</style>
