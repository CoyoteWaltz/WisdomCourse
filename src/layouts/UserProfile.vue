<template>
  <q-list-header id='user-profile'>
    <div class="userInfo row">
    <img src="https://cn.vuejs.org/images/logo.png" style="width: 50px;height:50px" class="col-1">
    <div class="col-6 column">
      <div class="col">{{userInfo.username}}</div>
      <div class="col">{{userInfo.userNo}}</div>
      <div class="col">
        <q-chip outline color="info" text-color="white" style="margin-bottom:10px">
          {{userIdentity}}
        </q-chip>
      </div>
    </div>
    <div class="col" style="margin: auto">
      <q-btn class="loginBtn" :label="userInfo.identity >=0 ? '注销' : '登录'" @click="btnClick"/>
    </div>
    </div>
    <div class="flex justify-center">
      <div id="intergal">
        <q-icon name="card_giftcard" style="margin-right:3px"/>
          积分：{{userInfo.intergal}}
      </div>
    </div>
  </q-list-header>
</template>

<script>
import {IDINDEX} from 'common/const.js'

export default {
  name: 'UserProfile',
  computed: {
    userInfo () {
      // 只能用计算属性 data是不响应式的
      return this.$store.state.user.info
    },
    userIdentity () {
      let target = this.userInfo.identity
      for (let i in IDINDEX) {
        if (IDINDEX[i].value === target) {
          return IDINDEX[i].label
        }
      }
      return '游客'
      // return IDINDEX.filter(v => {
      //   return this.userInfo.identity === v.value
      // }).label
    }
  },
  methods: {
    btnClick () {
      if (this.userInfo.identity >= 0) {
        // TODO注销
        // console.log('注销')
        // 下面的else必须在两个括号的中间'
        // 清空token in sessionStorage
        // window.sessionStorage.clear()
        window.localStorage.clear()
        this.$store.commit('user/logout')
        console.log(this.$store.state.user.info)
        console.log(this.userInfo)
      // } else {
      //   // 跳转到登录页面
      }
      this.$router.replace('/login')
    }
  }
}
</script>

<style  lang="stylus">
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
.loginBtn:hover{
  background-color: $info;
  color:white
}
#intergal{
  font-weight: bold;
  font-size: 11px;
  border-radius: 5px;
  text-align: center;
  padding: 5px 0px 5px 0px;
  width: 50%;
  margin-top:8px;
  box-shadow: 0px 0px 15px #cdcdcd;
}
// .col{
//   height: 1
// }
</style>
