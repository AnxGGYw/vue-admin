import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/UserLayout'),
    children: [
      {
        path: 'user',
        redirect: '/user/login'
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/UserRegister')
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/UserLogin')
      }
    ]
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout'),
    children: [
      {
        path: '/',
        redirect: '/dashboard/workplace'
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Workplace')
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Analysis')
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
