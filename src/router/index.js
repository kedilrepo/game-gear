import Vue from "vue";
import VueRouter from "vue-router";
const { routes } = require("./routes.js");

import Nprogress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const router = new VueRouter({
  linkExactActiveClass: "vue-active-class",
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    Nprogress.start();
  }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
