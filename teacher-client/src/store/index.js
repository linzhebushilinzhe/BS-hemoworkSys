import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.prototype.$axios = axios
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: {
            username: '',
            tchName: '',
            tchID: '',
            tchNum: '',
            courseID: '',
            courseName: '',
            identity: '',
        },
        token: '',
        msgList: [],
    },
    getters: {
        tchID(state) {
            return state.userinfo.tchID
        },
        tchNum(state) {
            return state.userinfo.tchNum
        },
        tchName(state) {
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
        msgList(state) {
            return state.courseName
        },
    },
    mutations: {
        SET_USERNAME(state, data) {
            state.userinfo.username = data
        },
        SET_TOKEN(state, data) {
            localStorage.setItem('token', data)
            state.token = data
        },
        SET_IDENTITY(state, data) {
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
        SET_TCHNUM(state, data) {
            state.userinfo.tchNum = data
        },
        ADD_MSGLIST(state, data) {
            state.msgList.push(data)
        }
    },
    actions: {
        Login({
            commit
        }, userInfo) {
            return new Promise((resolve, reject) => {
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
                    commit('SET_USERNAME', userInfo.account)
                    commit('SET_TOKEN', data.token)
                    resolve(response)
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
                    method: 'get',
                    url: 'api/teacher',
                    params: {
                        tchNum: username
                    }
                }).then((response) => {
                    console.log('response--->', response)
                    var data = response.data.data[0]
                    commit('SET_TCHID', data.id)
                    commit('SET_COURSENAME', data.courseName)
                    commit('SET_COURSEID', data.courseId)
                    commit('SET_TCHNAME', data.tchName)
                    commit('SET_TCHNUM', data.tchNum)
                    console.log('homework-->', data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AddMsglist({commit},{data,name}){
            data = JSON.parse(data.data);
            if (data.username != name) {
                const value = {
                    username: data.username,
                    mssage: data.mssage,
                    identity: data.identity,
                }
                commit('ADD_MSGLIST',value)
            }
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})