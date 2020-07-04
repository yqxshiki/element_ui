import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import elbutton from './components/Elbutton.vue'
import icon from './components/icon.vue'

import calendar from './components/calendar_yu.vue'
// Vue.component("el-button", elbutton)
// Vue.component("i", icon)
Vue.component('calendar', calendar)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
