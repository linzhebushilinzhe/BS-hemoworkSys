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
            className: '',
            classId: '',
            course: [{
                    path: '/Chinese',
                    id: 1,
                    label: '语文'
                },
                {
                    path: '/Math',
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
        token: '',
        ws: '',
        msgList1: [],
    },
    getters: {
        stuName(state){
            return state.userinfo.stuName
        },
        className(state){
            return state.userinfo.className
        },
        classId(state){
            return state.userinfo.classId
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
        },
        msgList(state) {
            return state.msgList1
        },
        ws(state){
            return state.ws
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
        },
        SET_CLASSNAME(state, data) {
            state.userinfo.className = data
        },
        SET_CLASSID(state, data) {
            state.userinfo.classId = data
        },
        ADD_MSGLIST(state, data) {
            console.log('state.msgList--->', typeof state.msgList1)
            state.msgList1.push(data)
        },
        SET_WS(state,data){
            state.ws = data
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
                    commit('SET_STUID', data.data[0].stuOrtchNum)
                    commit('SET_STUNAME', data.data[0].stuOrtchName)
                    commit('SET_CLASSNAME', data.data[0].className)                
                    commit('SET_CLASSID', data.data[0].classgradeId)                
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
        }, classgradeId) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: 'api/homework',
                    params: {
                        classgradeId: classgradeId
                    }
                }).then((response) => {
                    var data = response.data.data
                    var result = {
                        Chinese:[],
                        math:[],
                        English:[],
                    }
                    data.forEach(item=>{
                        if(item.courseName == '语文'){
                            result.Chinese.push(item)
                        } else if(item.courseName == '数学'){
                            result.math.push(item)
                        } else if(item.courseName == '英语'){
                            result.English.push(item)
                        }
                    })
                    console.log('result--->',result)
                    commit('SET_HOMEWORKLIST', result)
                    resolve()
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        AddMsglist({
            commit
        }, {
            data,
            name
        }) {
            // data = JSON.parse(data.data);
            if (data.username != name) {
                const value = {
                    username: data.username,
                    mssage: data.mssage,
                    identity: data.identity,
                }
                commit('ADD_MSGLIST', value)
            }
        },
        SendMsg({
            commit
        }, {
            data,
            ws
        }) {
            let msgInfo = data
            // console.log('wssssssssss----->',ws)
            // console.log('msgInfo--->',msgInfo)
            if (ws.readyState != 3) {
                ws.send(JSON.stringify(msgInfo));
                commit('ADD_MSGLIST', msgInfo)
            }
        },
    },
    modules: {},
    plugins: [createPersistedState()]
})