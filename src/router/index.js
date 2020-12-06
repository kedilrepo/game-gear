import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import api from "../api";
import store from "@/store";

const firebase = require("@/firebaseConfig.js");

import Nprogress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import(/* webpackChunkName: "Blog" */ "@/views/Blog.vue")
  },
  {
    path: "/blog/:url",
    name: "SingleBloc",
    component: () =>
      import(/* webpackChunkName: "SingleBloc" */ "@/views/SingleBlog.vue")
  },
  {
    path: "/dashboard/login",
    name: "Login",
    component: () => import(/*webpackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/*webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue"),

    children: [
      {
        path: "editPages",
        name: "EditPage",
        component: () =>
          import(
            /*webpackChunkName: "PageEditor" */
            "@/views/dashboard/EditPages.vue"
          )
      },
      {
        path: "editBlogs",
        name: "EditBlogs",
        component: () =>
          import(
            /*webpackChunkName: "BlogsEditor" */
            "@/views/dashboard/EditBlogs.vue"
          )
      },
      {
        path: "editBlogs/:blog",
        name: "EditBlog",
        component: () =>
          import(
            /*webpackChunkName: "BlogEditor" */
            "@/views/dashboard/EditBlog.vue"
          )
      },

      {
        path: "users",
        name: "Users",
        component: () =>
          import(/*webpackChunkName: "Users" */ "@/views/dashboard/Users.vue")
      },

      {
        path: "home",
        name: "Dashboard-Home",
        component: () =>
          import(
            /*webpackChunkName: "Dashboard-Home" */
            "@/views/dashboard/Home.vue"
          )
      }
    ],

    beforeEnter: async (to, from, next) => {
      /// Try to use store
      console.log(firebase);

      if ((await firebase.auth.currentUser) != null) {
        console.log("Trying to use firebase currentUser");

        if (await api.checkUser()) {
          next();
          return;
        } else {
          next("/dashboard/login");
          return;
        }
      }
      if (store != null) {
        if (store.getters.user != null || store.getters.user !== undefined) {
          if (store.getters.user.loggedIn) {
            if (await api.checkUser()) {
              next();
              return;
            } else {
              next("/dashboard/login");
              return;
            }
          }
        }
      }

      next("/dashboard/login");
    }
  },
  {
    path: "/404",
    name: "NotFound",
    component: () =>
      import(/*webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
  },
  {
    path: "*",
    name: "Base",
    component: () => import(/*webpackChunkName: "Base" */ "@/views/Base.vue")
  }
];

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

router.beforeResolve((to, from, next) => {
  if (to.name) {
    Nprogress.start();
  }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
