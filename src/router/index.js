import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/register', component: () => import('@/views/register/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/search',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'search',
        component: () => import('@/views/purchasing/search'),
        meta: { title: '查询', icon: 'form' }
      }
    ]
  },
  {
    path: '/msg',
    component: Layout,
    redirect: '/msg/users',
    name: 'Msg',
    meta: { title: '信息管理', icon: 'example' },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/purchasing/message'),
        meta: { title: '个人信息', icon: 'table' }
      },
      {
        path: 'binding',
        name: 'Binding',
        component: () => import('@/views/purchasing/oilbinding'),
        meta: { title: '油卡绑定', icon: 'tree' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/camilo',
    name: 'Order',
    meta: { title: '订购', icon: 'example' },
    children: [
      {
        path: 'camilo',
        name: 'Camilo',
        component: () => import('@/views/purchasing/recharge/camilo'),
        meta: { title: '卡密订购', icon: 'table' }
      },
      {
        path: 'direct',
        name: 'Direct',
        component: () => import('@/views/purchasing/recharge/direct'),
        meta: { title: '直充订购', icon: 'tree' }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    redirect: '/recharge/camilo',
    name: 'Recharge',
    meta: { title: '供货', icon: 'example' },
    children: [
      {
        path: 'camilo',
        name: 'Camilo',
        component: () => import('@/views/supplier/recharge/camilo'),
        meta: { title: '卡密供货', icon: 'table' }
      },
      {
        path: 'direct',
        name: 'Direct',
        component: () => import('@/views/supplier/recharge/direct'),
        meta: { title: '直充供货', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

