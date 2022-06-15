<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/plugins/firebase";
import { useAuthStore } from "@/stores/auth";

// Load the pinia store
const store = useAuthStore();

// Keep track of user changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.user = user;
    store.isLoggedIn = true;
  } else {
    store.user = null;
    store.isLoggedIn = false;
  }
});
</script>

<template>
  <div>
    <header class="p-4">
      <div class="container">
        <nav class="flex space-x-4 w-full">
          <router-link to="/">Home</router-link>
          <router-link v-if="store.isLoggedIn" to="/about">About</router-link>
          <router-link v-if="store.isLoggedIn" to="/secret">Secret</router-link>
          <router-link v-if="!store.isLoggedIn" to="/login">Login</router-link>
          <router-link v-if="!store.isLoggedIn" to="/register"
            >Register</router-link
          >
          <a v-if="store.isLoggedIn" href="#" @click.prevent="store.logout"
            >Logout</a
          >
        </nav>
      </div>
    </header>

    <main class="container px-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>
