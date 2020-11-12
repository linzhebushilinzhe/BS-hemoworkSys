import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: {
            username: '',
            stuID: '',
            identity: '',
            course: [{
                    path: '/Chinese',
                    id: 1,
                    label: '语文'
                },
                {
                    path: '/math',
                    id: 2,
                    label: '数学'
                },
                {
                    path: '/English',
                    id: 4,
                    label: '英语'
                }
            ],
            homeworkList: [],
            stuName: ''
        },
        token: ''
    },
    getters: {
        stuName(state){
            return state.userinfo.stuName
        },
        stuID(state) {
            return state.userinfo.stuID
        },
        username(state) {
            return state.userinfo.username
        },
        identity(state) {
            return state.userinfo.identity
        },
        course(state) {
            return state.userinfo.course
        },
        homeworkList(state) {
            return state.userinfo.homeworkList
        }
    },
    mutations: {
        SET_STUNAME(state,data){
            state.userinfo.stuName = data
        },
        SET_TOKEN(state, data) {
            localStorage.setItem('token', data)
            state.token = data
        },
        SET_IDENTITY(state, data) {
            state.userinfo.identity = data
        },
        SET_COURSE(state, data) {
            state.userinfo.course = data
        },
        SET_HOMEWORKLIST(state, data) {
            state.userinfo.homeworkList = data
        },
        SET_STUID(state, data) {
            state.userinfo.stuID = data
        },
        SET_USERNAME(state, data) {
            state.userinfo.username = data
        }
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
                    commit('SET_STUID', userInfo.account)
                    commit('SET_USERNAME',userInfo.account)
                    commit('SET_TOKEN', data.token)
                    resolve(response)
                }).catch(err =>{
                    reject(err)
                })
            })
          },
        GetInfo({
            commit
        }, username) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: 'api/score',
                    params: {
                        stuid: username
                    }
                }).then((response) => {
                    var data = response.data.data
                    console.log('data--->', data)
                    commit('SET_HOMEWORKLIST', data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})