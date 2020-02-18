import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'
import NProgress from 'nprogress'
import { findLast } from 'utils/commonUtil'
import { checkAuthority, isLogined } from 'utils/authUtil'

import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    meta: { authority: ['admin', 'user'] },
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/UserLayout'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/user/UserRegister')
      },
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/user/UserLogin')
      }
    ]
  },
  {
    path: '/',
    meta: { authority: ['admin', 'user'] },
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout'),
    children: [
      {
        path: '/',
        redirect: '/dashboard/welcome'
      },
      {
        path: '/dashboard',
        meta: { icon: 'dashboard', title: '仪表盘' },
        name: 'dashboard',
        component: {
          render: h => h('router-view')
        },
        children: [
          {
            path: '/dashboard/welcome',
            name: 'welcome',
            meta: { title: '欢迎页' },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../views/dashboard/Welcome'
              )
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            meta: { title: '工作台' },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../views/dashboard/Workplace'
              )
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页' },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../views/dashboard/Analysis'
              )
          }
        ]
      },
      {
        path: '/form',
        meta: { authority: ['admin'], icon: 'form', title: '表单' },
        name: 'form',
        component: {
          render: h => h('router-view')
        },
        children: [
          {
            path: '/form',
            redirect: '/form/form-basic'
          },
          {
            path: '/form/form-basic',
            name: 'formBasic',
            meta: { title: '基础表单' },
            component: () =>
              import(/* webpackChunkName: "form" */ '../views/form/FormBasic')
          },
          {
            path: '/form/form-high',
            name: 'formHigh',
            meta: { title: '高级表单' },
            component: () =>
              import(/* webpackChunkName: "form" */ '../views/form/FormHigh')
          }
        ]
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: {
      render: h => h('div', {}, 403)
    }
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/not-found/404')
  },
  {
    path: '/home',
    name: 'home',
    hideInMenu: true,
    meta: { authority: ['admin'] },
    component: Home
  },
  {
    path: '/about',
    hideInMenu: true,
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, item => item.meta.authority)
  if (!checkAuthority(record?.meta.authority)) {
    if (!isLogined && to.path !== '/user/login') {
      next('/user/login')
    } else if (to.path !== '/403') {
      next('/403')
    }
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
