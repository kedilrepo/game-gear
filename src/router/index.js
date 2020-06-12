import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/tastaturen",
    name: "Tastaturen"
  },
  {
    path: "/404",
    alias: "**",
    name: "NotFound",
    component: () =>
      import(/*webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
  }
];

const router = new VueRouter({
  linkExactActiveClass: "vue-active-class",
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const exists = routes.find(route => route.name === to.name);
  if (exists) {
    next();
  } else {
    next({ name: "NotFound" });
  }
});

export default router;
