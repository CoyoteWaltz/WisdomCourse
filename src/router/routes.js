import {IDINDEX} from 'common/const'
// common pages
const Login = () => import('pages/common/Login.vue')
const Index = () => import('pages/common/Index.vue')
const QueryClass = () => import('pages/common/QueryClass.vue')
const About = () => import('pages/common/About.vue')
const Bulletin = () => import('pages/common/Bulletin.vue')

// student
const AutoXk = () => import('pages/student/AutoXk.vue')
const Recommend = () => import('pages/student/Recommend.vue')
// teacher

// admin
const Course = () => import('pages/admin/Course.vue')
const Arrangement = () => import('pages/admin/Arrangement.vue')

const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'index',
        path: 'index',
        component: Index,
        meta: {
          icon: 'home',
          label: '首页',
          to: '/index',
          sublabel: '网站首页'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: About,
        meta: {
          icon: 'star',
          label: '关于我们',
          to: '/about',
          sublabel: '关于网站开发和我们'
        }
      }
    ]
  }
]
// 完整的路由 等待动态加载过滤
const fullRoutes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true,
      allowed: [IDINDEX.student.id, IDINDEX.teacher.id, IDINDEX.admin.id, IDINDEX.guest.id]
    },
    children: [
      // {
      //   name: 'index',
      //   path: 'index',
      //   component: Index,
      //   meta: {
      //     requiresAuth: false,
      //     icon: 'home',
      //     label: '首页',
      //     to: '/index',
      //     sublabel: '网站首页'
      //   }
      // },
      {
        path: 'query',
        name: 'query',
        component: QueryClass,
        meta: {
          requiresAuth: true,
          allowed: [IDINDEX.student.id, IDINDEX.teacher.id, IDINDEX.admin.id],
          icon: 'book',
          label: '课程查询',
          to: '/query',
          sublabel: '快捷查询各类课程'
        }
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: Recommend,
        meta: {
          requiresAuth: true,
          allowed: [IDINDEX.student.id],
          icon: 'web',
          label: '推荐选课',
          to: 'recommend',
          sublabel: '大数据定制化课程推荐'
        }
      },
      {
        path: 'autoxk',
        name: 'autoxk',
        component: AutoXk,
        meta: {
          requiresAuth: true,
          allowed: [IDINDEX.student.id],
          icon: 'computer',
          label: '自动选课',
          to: '/autoxk',
          sublabel: '一键定制化自动选课'
        }
      },
      {
        path: 'course',
        name: 'course',
        component: Course,
        meta: {
          requiresAuth: true,
          allowed: [IDINDEX.admin.id],
          icon: 'attach_file',
          label: '课程设置',
          to: '/course',
          sublabel: '创建、开设课程'
        }
      },
      {
        path: 'arrangement',
        name: 'arrangement',
        component: Arrangement,
        meta: {
          requiresAuth: true,
          allowed: [IDINDEX.admin.id],
          icon: 'date_range',
          label: '教学安排',
          to: '/arrangement',
          sublabel: '设置教学计划，安排老师'
        }
      },
      {
        path: 'bulletin',
        name: 'bulletin',
        component: Bulletin,
        meta: {
          requiresAuth: true,
          allowed: [IDINDEX.admin.id, IDINDEX.teacher.id],
          icon: 'assignment',
          label: '公告发布',
          to: '/bulletin',
          sublabel: '公告通知管理'
        }
      }
      // {
      //   path: 'about',
      //   name: 'about',
      //   component: About,
      //   meta: {
      //     requiresAuth: false,
      //     icon: 'star',
      //     label: '关于我们',
      //     to: '/about',
      //     sublabel: '关于网站开发和我们'
      //   }
      // }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  commonRoutes.push({
    path: '*',
    component: () =>
    import('pages/Error404.vue')
  })
}

export default {
  commonRoutes,
  fullRoutes
}
