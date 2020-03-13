import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为 this.$axios,绑定到原型上

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
