import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.prototype.$axios = axios 
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userinfo:{
          username: '',
          tchName: '',
          tchID: '',
          courseID: '',
          courseName: '',
          identity: '',
      },
      token:''
  },
  getters: {
    tchID(state){
        return state.userinfo.tchID
    },
    tchName(state){
      return state.userinfo.tchName
    },
    username(state) {
        return state.userinfo.username
    },
    identity(state) {
        return state.userinfo.identity  
    },
    courseID(state) {
      return state.userinfo.courseID  
    },
    courseName(state) {
      return state.userinfo.courseName  
    },
  },
  mutations: {
      SET_USERNAME(state,data){
        state.userinfo.username = data
      },
      SET_TOKEN(state, data){
          localStorage.setItem('token', data)
          state.token = data
      },
      SET_IDENTITY(state, data){
          state.userinfo.identity = data
      },
      SET_TCHID(state, data) {
          state.userinfo.tchID = data
      },
      SET_COURSEID(state, data) {
        state.userinfo.courseID = data
      },
      SET_COURSENAME(state, data) {
        state.userinfo.courseName = data
      },
      SET_TCHNAME(state, data) {
        state.userinfo.tchName = data
      },
  },
  actions: {
      Login({commit}, userInfo){
        return new Promise((resolve, reject)=>{
            axios({
                method: 'post',
                url: 'api/user/login',
                data: {
                    username: userInfo.account,
                    password: userInfo.pwd
                }
            }).then(response => {
                const data = response.data
                //console.log('ssss-->',data)
                commit('SET_USERNAME',userInfo.account)
                commit('SET_TOKEN', data.token)
                resolve(response)
            }).catch(err =>{
                reject(err)
            })
        })
      },
      GetInfo({commit}, username){
        return new Promise((resolve,reject)=>{
           axios({
               method: 'get',
               url: 'api/teacher',
               params: {
                   tchNum: username
               }
           }).then((response) => {
               console.log(response)
               var data = response.data.data[0]
               commit('SET_TCHID',data.id)
               commit('SET_COURSENAME',data.courseName)
               commit('SET_COURSEID',data.courseId)
               commit('SET_TCHNAME',data.tchName)
               console.log('homework-->',data)
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
