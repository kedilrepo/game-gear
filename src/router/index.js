import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import api from "../api";
import store from "@/store";
const firebase = require("@/firebaseConfig.js");

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/tastaturen",
        name: "Tastaturen",
    },
    {
        path: "/dashboard/login",
        name: "Login",
        component: () =>
            import ("../views/Login.vue"),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
            import ("../views/Dashboard.vue"),

        children: [{
            path: "editPages",
            name: "EditPage",
            component: () =>
                import ("@/views/dashboard/EditPages.vue"),
        }, ],

        beforeEnter: async(to, from, next) => {
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
                console.log("Trying to use store");

                if ((store.getters.user != null) | (store.getters.user != undefined)) {
                    console.log("Trying to check loggedIn");

                    console.log(store.getters.user.loggedIn);

                    if (store.getters.user.loggedIn) {
                        console.log("Logged in via store");

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
        },
    },
    {
        path: "/404",
        alias: "**",
        name: "NotFound",
        component: () =>
            import ( /*webpackChunkName: "NotFound" */ "@/views/NotFound.vue"),
    },
];

const router = new VueRouter({
    linkExactActiveClass: "vue-active-class",
    mode: "history",
    routes,
});

export default router;