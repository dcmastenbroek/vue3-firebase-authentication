<script>
import { RouterLink, RouterView } from "vue-router";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/plugins/firebase";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "App",

  components: {
    RouterLink,
    RouterView,
  },

  setup() {
    const store = useAuthStore();

    function logout() {
      store.logout();
    }

    return { store, logout };
  },

  created() {
    const store = useAuthStore();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.user = user.uid;
        store.isLoggedIn = true;
      } else {
        store.user = null;
        store.isLoggedIn = false;
      }
    });
  },
};
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
          <a v-if="store.isLoggedIn" href="#" @click.prevent="logout">Logout</a>
        </nav>
      </div>
    </header>

    <main class="container px-4">
      <router-view />
    </main>
  </div>
</template>
