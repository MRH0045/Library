import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: '/user/index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '个人信息', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/post',
  //   component: Layout,
  //   redirect: '/post/index',
  //   meta: { title: '帖子管理', icon: 'form', roles: ['LibManage'] },
  //   children: [{
  //     path: '/post/examine',
  //     name: 'NeedExamine',
  //     component: () => import('@/views/post/AuditPost'),
  //     meta: { title: '待审核帖子', icon: 'form' }
  //   },
  //   {
  //     path: 'index',
  //     name: 'Post',
  //     component: () => import('@/views/post/index'),
  //     meta: { title: '所有帖子', icon: 'form' }
  //   }
  //   ]
  // },
  { path: '/Books',
    component: Layout,
    redirect: '/Books/index',
    meta: { title: '图书', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'AllBooks',
        component: () => import('@/views/Books/index'),
        meta: { title: '所有图书', icon: 'item' }
      },
      {
        path: 'OutstandingBooks',
        name: 'Books',
        component: () => import('@/views/Books/OutstandingBooks'),
        meta: { title: '未还图书', icon: 'item' }
      },
      {
        path: 'AddBooks',
        name: 'AddBooks',
        component: () => import('@/views/Books/AddBooks'),
        meta: { title: '添加图书', icon: 'item', roles: ['LibManage', 'sysManager'] }
      }
    ]
  }, {
    path: '/UserManagement',
    component: Layout,
    redirect: '/user/UserManagement',
    children: [
      {
        path: '/user/UserManagement',
        name: 'UserManagement',
        component: () => import('@/views/user/UserManagement'),
        meta: { title: '用户管理', icon: 'user', roles: ['LibManage', 'sysManager'] }
      }
    ]
  },
  {
    path: '/borrowLog',
    component: Layout,
    redirect: '/borrowLog/index',
    children: [
      {
        path: '/borrowLog/index',
        name: 'borrowLog',
        component: () => import('@/views/borrowLog/index'),
        meta: { title: '借书记录', icon: 'user' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
