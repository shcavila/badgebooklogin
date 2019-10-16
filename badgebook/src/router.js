import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './components/home'
import login from './components/Login'
import FullSignUp from './components/fullSignUp'
import OrgSignUp from './components/orgSignUp'
import TypeOfUser from './components/typeOfUser'
import LandingPage from './components/userLandingPage'

Vue.use(Router)

// export default new Router({
let router = new Router({
  mode: 'history',

  routes: [{
      path: '/',
      component: Home
    },

    {
      path: '/login',
      component: login,
      props: (route) => ({
        name: route.query.name
      })
    },

    {
      path: '/signup',
      component: FullSignUp,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: '/organizationsignup',
      component: OrgSignUp,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: '/signUpAs',
      component: TypeOfUser,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
    path: '/landingpage',
    component: LandingPage,
    meta: {
      requiresAuth: true
    },
    props: (route) => ({
      name: route.query.name
    })
  },
  ]
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
