<template>
  <div id="left-navigation">
    <q-item v-for="item in items" :key="item.path" :to="item.meta.to" style="padding: 13px">
      <q-item-side :icon="item.meta.icon" />
      <q-item-main :label="item.meta.label" :sublabel="item.meta.sublabel"/>
    </q-item>
  </div>
</template>

<script>

export default {
  name: 'LeftNavigation',
  data () {
    return {
      baseItems: [
        {
          name: 'index',
          path: 'index',
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
          meta: {
            icon: 'star',
            label: '关于我们',
            to: '/about',
            sublabel: '关于网站开发和我们'
          }
        }
      ]
    }
  },
  computed: {
    items () {
      if (global.routeItems) {
        // 登录之后会加入新的路由 此时将其放在上面两个item的中间
        let temp = this.baseItems
        temp.splice(1, 0, ...global.routeItems)
        return temp
      }
      return this.baseItems
      // 通过身份动态路由
      // const id = this.$store.state.user.info.identity
      // for (let i of this.allRouteItems) {
      //   if (id === i.for) {
      //     return i.items
      //   }
      // }
      // return []
    }
  }
}
</script>

<style>

</style>
