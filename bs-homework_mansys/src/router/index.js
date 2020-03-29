import Vue from 'vue'
import VueRouter from 'vue-router'

//
import Login from 'views/Login'
import Home from 'views/Home'
import HomeworkList from 'views/HomeworkList'
import HomeworkInfo from 'views/HomeworkInfo'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
        {
            path: '/math',
            name: 'math',
            component: HomeworkList
        },
        {
            path: '/chinese',
            name: 'chinese',
            component: HomeworkList
        },
        {
            path: '/english',
            name: 'english',
            component: HomeworkList
        },
    ]
  },
  {
    path: '/math/1',
    component: HomeworkInfo
  }
  /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  } */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//to 进来的路由，from 离开的路由，next 放行
router.beforeEach((to,from,next)=>{
   if(to.path != '/login'){
       if(!localStorage.getItem('TOKEN')){
           next({path: '/login'})
       } else {
           next()
       }
   } else {
       next()
   }

   
})
export default router
