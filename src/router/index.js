import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getCurrentUser } from "@/plugins/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/secret",
      name: "secret",
      component: () => import("../views/SecretView.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: { redirectIfAuthenticated: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { redirectIfAuthenticated: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStatus = await getCurrentUser();
  const requireAuth = to.matched.some((route) => route.meta.requireAuth);

  if (requireAuth && !authStatus) {
    next({ name: "login" });
  } else if (to.meta.redirectIfAuthenticated && authStatus) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
