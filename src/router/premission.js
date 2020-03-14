export function createRoutes (routes, identity) {
  let results = routes.filter((route, _) => {
    if (route.meta.requiresAuth === false && !route.children) {
      return true
    }
    if (route.meta.requiresAuth && route.meta.allowed.includes(identity)) {
      if (route.children && route.children.length) {
        // 如果有子路由 递归去过滤
        route.children = createRoutes(route.children, identity)
      }
      return true
    }
    return false
  })
  return results
}
