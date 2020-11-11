import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import HomeworkCorrect from '../views/HomeworkCorrect.vue'
import HomeworkList from '../views/HomeworkList.vue'
import SamplePage from '../components/SimplePage.vue'
import SimpleTable from '../components/SimpleTable.vue'
import HomeworkComplet from '../views/HomeworkComplet.vue'
import Communicat from '../views/Communicat.vue'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( /* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [{
        path: '/assignsHomework',
        name: 'assignsHomework',
        component: SamplePage,
      },
      {
        path: '/homeworkList',
        name: 'homeworkList',
        component: HomeworkList,
        children: [
          {
            path: '/Class/:id',
            name: '',
            component: SimpleTable
          },
          {
            path: '/homework/:id',
            name: '',
            component: HomeworkComplet
          }
        ]
      },
      {
        path: '/homeworkCorrect',
        name: 'homeworkCorrect',
        component: HomeworkCorrect,
      },
      {
        path: '/communicat',
        name: 'communicat',
        component: Communicat
      }
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }


})
export default router;