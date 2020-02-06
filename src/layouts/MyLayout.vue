<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
      >
        <q-btn
          flat
          dense
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <div style="text-align: center;">
            上大智课
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        inset-delimiter
      >
      <!-- TODO分离头部吗 -->
        <q-list-header>
          <div class="userInfo row">
          <img src="https://cn.vuejs.org/images/logo.png" style="width: 50px;height:50px" class="col-1">
          <div class="col-5 column">
            <div class="col">{{user.userName}}</div>
            <div class="col">{{user.stuNo}}</div>
          </div>
          <div class="col" style="margin: auto">
            <q-btn :label="user.identity >=0 ? '注销' : '登录'" @click="btnClick"/>

            <!-- <q-btn v-if="user.identity >=0" label="注销"/>
            <q-btn v-else label="登录" @click="$router.replace('/login')"/> -->
            <!-- 判断游客的时候为登录按钮 -->
          </div>
          </div>
          <div class="flex justify-center">
            <div id="jifen">
              <q-icon name="card_giftcard" style="margin-right:3px"/>
                积分：{{user.intergal}}
            </div>
          </div>
        </q-list-header>
        <!-- 这个list居然还有头部这种东西 -->

        <q-item v-for="item in items" :key="item.index" :to="item.to" style="padding: 13px">
          <q-item-side :icon="item.icon" />
          <q-item-main :label="item.label" :sublabel="item.sublabel"/>
        </q-item>
      </q-list>
      <div class="flex justify-center">
        <div class="notice">
          <div id="title">
            <q-icon name="notifications" style="margin-right:3px;font-weight:bold;font-size:14px"/>
              公告
          </div>
          <div id="content">
            Testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
          </div>
        </div>
      </div>
    </q-layout-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  props: {
    user: {
      type: Object,
      default () {
        return {
          userName: '游客',
          stuNo: '',
          identity: -1, // 身份
          intergral: 0
        }
      }
    }
  },
  methods: {
    btnClick () {
      if (this.user.identity >= 0) {
        // TODO注销
        // console.log('注销')
        // 下面的else必须在两个括号的中间
      } else {
        // 跳转到登录页面
        this.$router.replace('/login')
      }
    }
  },
  data () {
    return {
      // 用user对象代替
      // avatarUrl: 'https://cn.vuejs.org/images/logo.png',
      userName: '薛傲如',
      stuNo: '17122510',
      // TODO 用户对象改为 login页面传递来的props
      leftDrawerOpen: this.$q.platform.is.desktop,
      items: [
        // TODO计算属性，判断用户身份传递不同的数据
        // TODO抽成组件！！
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
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
.userInfo{
    text-align: center;
    padding: 15px;
    border-radius: 5px;
}
.userInfo:hover{
  background-color: $secondary;
  color:white
}
#jifen{
  font-weight: bold;
  font-size: 13px;
  border-radius: 5px;
  text-align: center;
  padding: 5px 0px 5px 0px;
  width: 50%;
  margin-top:5px;
  box-shadow: 0px 0px 15px #cdcdcd;
}
.notice{
  border-radius: 5px;
  text-align: center;
  padding: 5px 0px 5px 0px;
  width: 80%;
  box-shadow: 0px 0px 15px #cdcdcd;
  margin-top:3px;
}
.notice #title{
  background-color:$light;
  border-radius: 3px;
}
.notice #content{
  font-size: 12px;
  margin: 7px;
  text-align: left;
  color: #7b7b7b;
  word-wrap: break-word;
}
</style>
