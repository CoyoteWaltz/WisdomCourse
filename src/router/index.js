import Vue from 'vue'
import VueRouter from 'vue-router'
import VueParticles from 'vue-particles'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueParticles)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
*/
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // mode: process.env.VUE_ROUTER_MODE,
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE
  })
  // 添加全局守卫
  Router.beforeEach((to, _, next) => {
    const allowPath = [
      '/login',
      '/index',
      '/about'
    ]
    if (allowPath.includes(to.path)) {
      // 这些页面不拦截
      return next()
    }
    // const token = window.sessionStorage.getItem('token')
    const token = window.localStorage.getItem('token')
    if (!token) {
      // 检查是否有token
      return next('/login')
    }
    next()
  })

  return Router
}
