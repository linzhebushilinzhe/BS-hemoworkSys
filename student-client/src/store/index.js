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
            homeworkList: []
        },
        token: ''
    },
    getters: {
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
        Login({
            commit
        }, userInfo) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: 'api/login',
                    data: {
                        username: userInfo.account,
                        password: userInfo.pwd
                    }
                }).then(response => {
                    const data = response.data
                    if(data.success){
                        commit('SET_STUID', userInfo.account)
                        commit('SET_TOKEN', data.token)
                        commit('SET_USERNAME', userInfo.account)
                    }
                    
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetInfo({
            commit
        }, username) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: 'api/stuHomework',
                    data: {
                        username: username
                    }
                }).then((response) => {
                    var data = response.data.data
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