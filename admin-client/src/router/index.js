import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue'
import AccountMan from '../views/AccountMan.vue'
import StudentMan from '../views/StudentMan.vue'
import TeacherMan from '../views/TeacherMan.vue'
Vue.use(VueRouter);

// eslint-disable-next-line no-sparse-arrays
const routes = [{
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue")
    component: Login
  },,
  {
    path: "/home",
    name: "Home",
    component: Home,
    children:[
      {
        path: '/accountMan',
        name: 'accountMan',
        component: AccountMan,
      },
      {
        path: '/studentMan',
        name: 'studentMan',
        component: StudentMan,
      },
      {
        path: '/teacherMan',
        name: 'teacherMan',
        component: TeacherMan,
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
