import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.use(ElementUI)
Vue.prototype.$axios = axios //全局注册，使用方法为 this.$axios,绑定到原型上
Vue.config.productionTip = false;

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //若token存在，则在每次请求头中加入token
  //console.log(config.url.indexOf('login'))
  console.log('config-->',config)
  if(config.url.indexOf('login') == -1){
    if (localStorage.getItem('token')) {
      config.headers.common['token'] = localStorage.getItem('token')
    } 
  }
  return config;
  
}, function (error) {
  // 对请求错误做些什么
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
    
    // return ;
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
