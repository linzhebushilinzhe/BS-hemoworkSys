import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.prototype.$axios = axios 
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userinfo:{
          username: 'linzhe',
          identity: '',
          course: [],
          homeworkList: []
      },
      token:''
  },
  getters: {
    username(state) {
        return state.userinfo.username
    },
    identity(state) {
        return state.userinfo.identity  
    },
    course(state) {
        return state.userinfo.course
    },
    homeworkList(state){
        return state.userinfo.homeworkList
    }
  },
  mutations: {
      SET_TOKEN(state, data){
          localStorage.setItem('TOKEN', data)
      },
      SET_IDENTITY(state, data){
          state.userinfo.identity = data
      },
      SET_COURSE(state, data){
          state.userinfo.course = data
      },
      SET_HOMEWORKLIST(state,data){
          state.userinfo.homeworkList = data
      }
  },
  actions: {
      Login({commit}, userInfo){
        return new Promise((resolve, reject)=>{
            axios({
                method: 'post',
                url: 'http://localhost:5000/login',
                data: {
                    username: userInfo.account,
                    password: userInfo.pwd
                }
            }).then(response => {
                const data = response.data.data
                commit('SET_TOKEN', data.token)
                resolve()
            }).catch((err)=>{
                reject(err)
            })
        })
      },
      GetInfo({commit}){
         return new Promise((resolve,reject)=>{
            axios({
                method: 'get',
                url: 'http://localhost:5000/userInfo'
            }).then((response) => {
                const data = response.data.data
                commit('SET_IDENTITY',data.roles)
                commit('SET_COURSE',data.course)
                commit('SET_HOMEWORKLIST',data.homeworkList)
                resolve()
            }).catch((err)=>{
                reject(err)
            })
         })
      }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
