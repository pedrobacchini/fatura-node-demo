// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import money from 'v-money'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(money, {precision: 4})
Vue.prototype.$usuarios = [
  {
    value: '5b6ba74f34eb403efff33dd6',
    text: 'Paulo Henrique'
  },
  {
    value: '5b6ba76434eb403efff33dd7',
    text: 'Joana Eduarda'
  },
  {
    value: '5b6ba89434eb403efff33dd9',
    text: 'Eliana Maria'
  }
]

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
