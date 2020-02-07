// TODO新增 管理员 学生 老师的路由
// common pages
const Login = () => import('pages/common/Login.vue')
const Index = () => import('pages/common/Index.vue')
const QueryClass = () => import('pages/common/QueryClass.vue')
const About = () => import('pages/common/About.vue')
// student
const AutoXk = () => import('pages/student/AutoXk.vue')
const Recommend = () => import('pages/student/Recommend.vue')
// teacher

// admin

const routes = [
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
        component: Index
      },
      {
        path: 'query',
        name: 'query',
        component: QueryClass,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'autoxk',
        name: 'autoxk',
        component: AutoXk,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: Recommend,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () =>
            import('pages/Error404.vue')
  })
}

export default routes
