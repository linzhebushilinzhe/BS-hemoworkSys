import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.prototype.$axios = axios 
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: {
      username: '',
      identity: '',
    },
    token: ''
  },
  mutations: {
    SET_TOKEN(state, data){
      localStorage.setItem('token', data)
      state.token = data
  },
  },
  actions: {
    Login({commit}, userInfo){
      return new Promise((resolve, reject)=>{
          axios({
              method: 'post',
              url: 'api/login',
              data: {
                  username: userInfo.account,
                  password: userInfo.pwd
              }
          }).then(response => {
              const data = response.data
              //console.log('ssss-->',data)
              
              commit('SET_TOKEN', data.token)
              resolve(response)
          }).catch(err =>{
              reject(err)
          })
      })
    },
  },
  modules: {},
  plugins: [createPersistedState()]
});