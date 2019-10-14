import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
// import 'vue-material/dist/theme/default.css'
// Vue.use(VueMaterial)


Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
   render: h => h(App) 
})




