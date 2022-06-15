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
    getCurrentUser: () => auth.currentUser,
  },

  actions: {
    register(data) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredentials) => {
            this.user = userCredentials.user;
            this.router.push("/");
            resolve(userCredentials);
          })
          .catch((error) => {
            console.log("An error happened.", error);
            reject(error);
          });
      });
    },

    login(data) {
      return signInWithEmailAndPassword(auth, data.email, data.password);
    },

    logout() {
      signOut(auth)
        .then(() => {
          this.router.push("/login");
        })
        .catch((error) => {
          console.log("An error happened.", error);
        });
    },

    initializeAuthentication() {
      const user = this.getCurrentUser;

      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.user = null;
        this.isLoggedIn = false;
      }
    },
  },
});
