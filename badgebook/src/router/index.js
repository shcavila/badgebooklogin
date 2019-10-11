import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import login from '../components/Login'
import FullSignUp from '../components/fullSignUp'
import OrgSignUp from '../components/orgSignUp'
import TypeOfUser from '../components/typeOfUser'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    { 
      path: '/', 
      component: Home
    },

    {
      path: '/login',
      component: login,
      props: (route) => ({ name: route.query.name })
    },

    {
      path: '/signup',
      component: FullSignUp,
      props: (route) => ({ name: route.query.name })
    },
    {
      path: '/organizationsignup',
      component: OrgSignUp,
      props: (route) => ({ name: route.query.name })
    },
    {
      path: '/signUpAs',
      component: TypeOfUser,
      props: (route) => ({ name: route.query.name })
    }
  ]
})
