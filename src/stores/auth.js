import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/plugins/firebase";

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    user: null,
    isLoggedIn: false,
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    register(data) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          this.router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    login(data) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          this.router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    logout() {
      signOut(auth).then(() => {
        this.router.push("/login");
      });
    },
  },
});
