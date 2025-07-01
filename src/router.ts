import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

import { getAuth } from "firebase/auth";
import firebaseClient from "@/firebaseClient";

const firebaseAuth = getAuth(firebaseClient);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "*",
      redirect: "/login",
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebaseAuth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("login");
  } else if (!requiresAuth && currentUser) {
    next("home");
  } else {
    next();
  }
});

export default router;
