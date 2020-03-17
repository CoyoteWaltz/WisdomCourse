import Vue from 'vue'
import VueRouter from 'vue-router'
import VueParticles from 'vue-particles'
import Routes from './routes'
import {createRoutes} from './premission'

// import Utils from 'common/utils'
// import {Notify} from 'quasar'

Vue.use(VueRouter)
Vue.use(VueParticles)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
*/

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: Routes.commonRoutes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    // base: process.env.VUE_ROUTER_BASE_URL
    base: '/wisdom/'
  })
  // 闭包 是否添加过路由
  let addRouteFlag = false
  // 仅需要在添加路由之后改变
  // global.routeItems = Routes.commonRoutes[2].children
  // 添加全局守卫
  Router.beforeEach((to, _, next) => {
    // console.log(to.path)
    const allowPath = ['/login', '/index', '/about']
    if (allowPath.includes(to.path)) {
      return next()
    }
    // 从token获取用户的身份
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      // 检查是否有token
      return next('/login')
    }
    // 如果没有动态生成过路由 就add路由
    if (!addRouteFlag) {
      addRouteFlag = true
      const userId = parseInt(token[0])
      if (isNaN(userId)) {
        // token不符合标准就去登录
        return next('/login')
      }
      // 根据身份过滤一下routes
      let addRoutes = createRoutes(Routes.fullRoutes, userId)
      // 在global存一个路由 wisdom-course unique
      global.routeItems = addRoutes[0].children
      // 为Router对象加入 routes 过滤后的
      Router.addRoutes(addRoutes)
      // 重新去走一次这个路由 会重新进入钩子
      return Router.push({ path: to.path })
    }
    next()
  })

  return Router
}
