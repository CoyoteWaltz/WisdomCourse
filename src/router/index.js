import Vue from 'vue'
import VueRouter from 'vue-router'
import VueParticles from 'vue-particles'
import routes from './routes'

import {Notify} from 'quasar'

Vue.use(VueRouter)
Vue.use(VueParticles)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
*/
export default function (/* { store, ssrContext } */) {
  window.console.log(process.env)
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    // base: process.env.VUE_ROUTER_BASE_URL
    base: '/wisdom/'
  })
  // 添加全局守卫
  Router.beforeEach((to, _, next) => {
    if (!to.meta.requiresAuth) {
      // 这些页面不拦截
      return next()
    }
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      // 检查是否有token
      return next('/login')
    }
    // 检查to的route是否满足当前身份
    const userId = parseInt(token[0])
    if (to.meta.allowed.includes(userId)) {
      next()
    } else {
      Notify.create({
        message: 'No privilege to enter',
        color: 'red-12'
      })
      next('/index')
    }
  })

  return Router
}
