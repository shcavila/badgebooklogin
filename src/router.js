import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "@/authentication/home.vue";
import login from "@/authentication/Login.vue";
import FullSignUp from "@/authentication/fullSignUp.vue";
import OrgSignUp from "@/authentication/orgSignUp.vue";
import TypeOfUser from "@/authentication/typeOfUser.vue";
import userpage from "@/views/Userpage.vue";
import orgpage from "@/views/Organizationpage.vue";

Vue.use(Router);
// eslint-disable-next-line
/* eslint-disable */
// export default new Router({
let router = new Router({
  mode: "history",

  routes: [{
      path: "/",
      component: Home
    },

    {
      path: "/login",
      component: login,
      props: (route) => ({
        name: route.query.name
      })
    },

    {
      path: "/signup",
      component: FullSignUp,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: "/organizationsignup",
      component: OrgSignUp,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: "/signUpAs",
      component: TypeOfUser,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: "/user",
      component: userpage,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          store.dispatch("identifyUser").then((data) => {
            console.log(data)
            if (data) {
              next();
            } else {
              next("/login");
            }
          })
        } else {
          next("/login");
        }
      },
    },
    {
      path: "/organization",
      component: orgpage,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          store.dispatch("identifyUser").then((data) => {
            console.log(data);
            if (!data) {
              next();
            } else {
              next("/login");
            }
          })
        } else {
          next("/login");
        }
      }
    },
  ]
})

export default router
