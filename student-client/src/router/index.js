import Vue from 'vue'
import VueRouter from 'vue-router'

//
import Login from 'views/Login'
import Home from 'views/Home'
import HomeworkList from 'views/HomeworkList'
import HomeworkInfo from 'views/HomeworkInfo'
import Communicat from 'views/Communicat'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
            component: HomeworkList,
        },
        {
            path: '/Chinese',
            name: 'Chinese',
            component: HomeworkList
        },
        {
            path: '/English',
            name: 'English',
            component: HomeworkList
        },
        {
          path: '/communication',
          name: 'communication',
          component: Communicat
        }
    ]
  },
  {
    path: '/math/:id',
    component: HomeworkInfo,
  },
  {
    path: '/chinese/:id',
    component: HomeworkInfo
  },
  {
    path: '/English/:id',
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
       if(!localStorage.getItem('token')){
           next({path: '/login'})
       } else {
           next()
       }
   } else {
       next()
   }

   
})
export default router
