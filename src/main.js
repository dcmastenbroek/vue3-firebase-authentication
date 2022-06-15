import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { onAuthStateChanged } from "@firebase/auth";

import App from "./App.vue";
import router from "./router";

import "@/assets/tailwind.css";

import "@/plugins/vee-validate";
import { auth } from "@/plugins/firebase";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(pinia);
    app.use(router);

    app.mount("#app");
  }
});
