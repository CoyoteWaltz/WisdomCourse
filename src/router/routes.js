// TODO新增 管理员 学生 老师的路由
const Login = () => import('pages/Login.vue')
const routes = [{
  path: '/login',
  component: Login
},
{
  path: '/',
  redirect: '/index'
},
{
  path: '/',
  component: () =>
            import('layouts/MyLayout.vue'),
  children: [{
    name: 'index',
    path: 'index',
    component: () =>
                    import('pages/Index.vue')
  },
  {
    path: 'query',
    component: () =>
                    import('pages/QueryClass.vue')
  },
  {
    path: 'autoxk',
    component: () =>
                    import('pages/student/AutoXk.vue')
  },
  {
    path: 'about',
    component: () =>
                    import('pages/About.vue')
  },
  {
    path: 'recommend',
    component: () =>
                    import('pages/Recommend.vue')
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
