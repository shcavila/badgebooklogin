import Vue from "vue";
import Axios from "axios";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(Vuelidate);

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
 // eslint-disable-next-line
 /* eslint-disable */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");


// import "@babel/polyfill"
// import "mutationobserver-shim"
// import Vue from "vue"
// import "./plugins/bootstrap-vue"
// import App from "./App.vue"
// import "bootstrap/dist/css/bootstrap.min.css"

// import VueRouter from "vue-router";
// Vue.use(VueRouter);

// import VueAxios from "vue-axios";
// import axios from "axios";

// Vue.use(VueAxios, axios);

// Vue.config.productionTip = false;

// import Userpage from "./views/Userpage.vue";
// import Homepage from "./views/Homepage.vue";
// import Orgpage from "./views/Organizationpage.vue";

// const routes = [{
//         name: "home",
//         path: "/",
//         component: Homepage
//     },
//     {
//         name: "userpage",
//         path: "/user/regular",
//         component: Userpage
//     },
//     {
//         name: "orgpage",
//         path: "/user/org",
//         component: Orgpage
//     }
// ];

// const router = new VueRouter({ mode: "history", routes: routes });

// new Vue(Vue.util.extend({ router }, App)).$mount("#app");