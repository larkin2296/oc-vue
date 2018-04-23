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
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/camilo',
    name: 'Order',
    meta: { title: '订购', icon: 'example', role: ['1'] },
    children: [
      {
        path: 'camilo',
        name: 'Camilo',
        component: () => import('@/views/purchasing/recharge/camilo'),
        meta: { role: ['1'], title: '卡密订购', icon: 'table' }
      },
      {
        path: 'direct',
        name: 'Direct',
        component: () => import('@/views/purchasing/recharge/direct'),
        meta: { role: ['1'], title: '直充订购', icon: 'tree' }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    redirect: '/recharge/camilo',
    name: 'Recharge',
    meta: { title: '供货', icon: 'example', role: ['2'] },
    children: [
      {
        path: 'camilo',
        name: 'Camilo',
        component: () => import('@/views/supplier/recharge/camilo'),
        meta: { title: '卡密供货', icon: 'table', role: ['2'] }
      },
      {
        path: 'direct',
        name: 'Direct',
        component: () => import('@/views/supplier/recharge/direct'),
        meta: { title: '直充供货', icon: 'tree', role: ['2'] }
      }
    ]
  },
  {
    path: '/search',
    component: Layout,
    redirect: '/search/camilo',
    name: 'Search',
    meta: { title: '查询', icon: 'form', role: ['1', '2'] },
    children: [
      {
        path: 'camilo',
        name: 'pc_search',
        component: () => import('@/views/purchasing/search/camilo'),
        meta: { role: ['1'], title: '卡密订单查询', icon: 'form' }
      },
      {
        path: 'directly_short',
        name: 'pds_search',
        component: () => import('@/views/purchasing/search/directlyshort'),
        meta: { role: ['1'], title: '直充短充查询', icon: 'form' }
      },
      {
        path: 'directly_long',
        name: 'pdl_search',
        component: () => import('@/views/purchasing/search/directlylong'),
        meta: { role: ['1'], title: '直充长充查询', icon: 'form' }
      },
      {
        path: 's_camilo',
        name: 's_search',
        component: () => import('@/views/supplier/search/camilo'),
        meta: { role: ['2'], title: '卡密供货查询', icon: 'form' }
      },
      {
        path: 's_directly',
        name: 's_search',
        component: () => import('@/views/supplier/search/directly'),
        meta: { role: ['2'], title: '直充供货查询', icon: 'form' }
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
        component: () => import('@/views/message/msgmodify'),
        meta: { title: '信息修改', icon: 'table' }
      },
      {
        path: 'ushow',
        name: 'Ushow',
        component: () => import('@/views/message/showmsg'),
        meta: { title: '信息查看', icon: 'table' }
      },
      {
        path: 'binding',
        name: 'Binding',
        component: () => import('@/views/purchasing/oilbinding'),
        meta: { title: '油卡管理', icon: 'tree', role: ['1'] }
      }
    ]
  },
  {
    path: '/recmanage',
    component: Layout,
    redirect: '/recmanage/reconcil',
    name: 'Recmanage',
    meta: { title: '账务管理', icon: 'example', role: ['1'] },
    children: [
      {
        path: 'initialize',
        name: 'Initialize',
        component: () => import('@/views/purchasing/initialize'),
        meta: { title: '圈存', icon: 'table', role: ['1'] }
      },
      {
        path: 'reconcil',
        name: 'Reconcil',
        component: () => import('@/views/purchasing/reconciliation'),
        meta: { title: '对账', icon: 'table', role: ['1'] }
      }
    ]
  },
  {
    path: '/deposit',
    component: Layout,
    redirect: '/deposit/index',
    name: 'Deposit',
    meta: { title: '提现', icon: 'example', role: ['2'] },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/supplier/deposit'),
        meta: { title: '提现', icon: 'table', role: ['2'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
