import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify.js";
// import 'vuetify/src/stylus/app.styl';
import store from "./store";

Vue.config.productionTip = false;
//Vue.config.devtools = true;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
