<template>
  <div id="left-navigation">
    <q-item v-for="item in items" :key="item.to" :to="item.to" style="padding: 13px">
      <q-item-side :icon="item.icon" />
      <q-item-main :label="item.label" :sublabel="item.sublabel"/>
    </q-item>
  </div>
</template>

<script>
import {IDINDEX} from 'common/const'

export default {
  name: 'LeftNavigation',
  data () {
    return {
      // allRouteItems: [
      allRouteItems: [
        {
          for: IDINDEX.guest.value,
          items: [
            {
              icon: 'home',
              label: '首页',
              to: '/index',
              sublabel: '网站首页'
            },
            {
              icon: 'star',
              label: '关于我们',
              to: '/about',
              sublabel: '关于网站开发和我们'
            }
          ]
        },
        {
          for: IDINDEX.student.value,
          items: [
            {
              icon: 'home',
              label: '首页',
              to: '/index',
              sublabel: '网站首页'
            },
            {
              icon: 'book',
              label: '课程查询',
              to: '/query',
              sublabel: '快捷查询各类课程'
            },
            {
              icon: 'web',
              label: '推荐选课',
              to: 'recommend',
              sublabel: '大数据定制化课程推荐'
            },
            {
              icon: 'computer',
              label: '自动抢课',
              to: '/autoxk',
              sublabel: '一键定制化自动抢课'
            },
            {
              icon: 'star',
              label: '关于我们',
              to: '/about',
              sublabel: '关于网站开发和我们'
            }
          ]
        },
        {
          for: IDINDEX.teacher.value,
          items: [
            {
              icon: 'home',
              label: '首页',
              to: '/index',
              sublabel: '网站首页'
            },
            {
              icon: 'book',
              label: '课程查询',
              to: '/query',
              sublabel: '快捷查询各类课程'
            },
            {
              icon: 'assignment',
              label: '公告发布',
              to: '/bulletin',
              sublabel: '公告通知管理'
            },
            {
              icon: 'star',
              label: '关于我们',
              to: '/about',
              sublabel: '关于网站开发和我们'
            }
          ]
        },
        {
          for: IDINDEX.admin.value,
          items: [
            {
              icon: 'home',
              label: '首页',
              to: '/index',
              sublabel: '网站首页'
            },
            {
              icon: 'book',
              label: '课程查询',
              to: '/query',
              sublabel: '快捷查询各类课程'
            },
            {
              icon: 'attach_file',
              label: '课程设置',
              to: '/course',
              sublabel: '创建、开设课程'
            },
            {
              icon: 'date_range',
              label: '教学安排',
              to: '/arrangement',
              sublabel: '设置教学计划，安排老师'
            },
            {
              icon: 'assignment',
              label: '公告发布',
              to: '/bulletin',
              sublabel: '公告通知管理'
            },
            {
              icon: 'star',
              label: '关于我们',
              to: '/about',
              sublabel: '关于网站开发和我们'
            }
          ]
        }
      ]
    }
  },
  computed: {
    items () {
      let id = this.$store.state.user.info.identity
      console.log(id)
      for (let i of this.allRouteItems) {
        if (id === i.for) {
          return i.items
        }
      }
      return []
    }
  }
}
</script>

<style>

</style>
