import Vue from 'vue'
import VueRouter from 'vue-router'

//
import Login from 'views/Login'
import Home from 'views/Home'
import Homework from 'views/Homework'
Vue.use(VueRouter)

const routes = [
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
            component: Homework
        },
        {
            path: '/chinese',
            name: 'chinese',
            component: Homework
        },
        {
            path: '/english',
            name: 'english',
            component: Homework
        },
    ]
  },
  
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
