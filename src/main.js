import Vue from "vue";
import "../node_modules/bulma/css/bulma.css";
import axios from "axios";

import router from "./router";
import store from "./store/store";
import App from "./App.vue";

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/"
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
