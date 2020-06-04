import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.prototype.$axios = axios 
Vue.config.productionTip = false;
Vue.use(ElementUI)

axios.interceptors.request.use(function (config) {

  if(config.url.indexOf('login') == -1){
    if (localStorage.getItem('token')) {
      config.headers.common['token'] = localStorage.getItem('token')
    } 
  }
  return config;
  
}, function (error) {
 
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  console.log('axios 拦截器--> response',response)
  if (response.data.status == 403) {
    ElementUI.Message({
      message: '登录已过期，请重新登录'
    })
    router.push({
      path: '/login'
    });
    
  
}
  return response;
}, function (error) {
  return Promise.reject(error);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
