<template>
  <div id="bg">
    <div id="loginbg">
      <div id="shadow">
          <div id="box">
            <div id="bar">
              <div id="title" @mouseover="show(true)" @mouseleave="show(false)">
                上大智课 Ver 1.0
              </div>
              <transition class="slide-fade">
                <div v-if="showHidden" id="hiden" ref="hiden">
                  <span id="hidden-title">
                    测试账号:
                  </span>
                  <p>
                    管理员账号: admin111, 密码: admin111
                  </p>
                  <p>
                    学生账号: stu111, 密码: stu111
                  </p>
                  <p>
                    学生账号: stu112, 密码: stu112
                  </p>
                  <p>
                    教师账号: 可通过管理员创建
                  </p>
                </div>
              </transition>
              <div id="input">
                <q-input color="blue" v-model="userInfo.username" stack-label="一卡通账号" :before="[{icon: 'cloud', handler () {}}]"/>
                <q-input @keyup.enter="login" color="blue" v-model="userInfo.password" type="password" stack-label="一卡通密码" :before="[{icon: 'lock', handler () {}}]" style="margin-top:20px"/>
                <q-btn label="登录" outline style="margin-top:30px;width:80%" color="secondary" @click="login"/>
              </div>
              <div id="bottom">
                SHU一卡通账号密码也可以登录哦，本平台不保存账号密码
                <br>
                {{timeShow}}
              </div>
            </div>
          </div>
      </div>
    </div>
      <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        linesColor="#ffffff"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="5"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
</vue-particles>
  </div>
</template>

<script>
/*
登录发送数据:
  username
  password
  身份不用发了
token + identity + username + userNo存localstorage
登录之后得到数据:
用户信息userInfo:
  username: '游客',
  identity: -1,
  userNo: '',
  lastTime: '', // 上次登陆时间
  intergal: null // 积分
公告栏信息bulletinInfo:
  字符串
  存store
学期信息semesterInfo
以及当前学期的课程
  获取完都存到store mutations存得到的数据 getter返回处理之后的options
  如果页面刷新 store没数据了 getter重新发起请求actions 然后返回
*/

// import {IDINDEX} from 'common/const'
import user from 'network/user'

export default {
  name: 'PageLogin',
  data () {
    return {
      timeShow: null,
      showHidden: false,
      userInfo: {
        username: 'admin111',
        password: '111111',
        identity: null
      },
      timeInterval: null
    }
  },
  methods: {
    login () {
      if (this.checkLoginInfo()) {
        // 登录 发送网络请求
        user.login({
          username: this.userInfo.username,
          password: this.userInfo.password
        }).then(res => {
          if (res.code === '0') {
            // 处理store
            this.$store.commit('user/login', res.data.user_info)
            this.$store.commit('semester/init', {
              semester_list: res.data.semester_info,
              current_semester: res.data.current_semester
            })
            this.$store.commit('bulletin/replaceMsg', res.data.bulletin_info)
            // 处理token存入sessionStorage 第一个放身份
            const token = res.data.user_info.privilege + res.data.token
            window.sessionStorage.setItem('token', token)

            this.$q.notify({
              message: '登录成功~欢迎',
              icon: 'done'
            })
            this.$router.push('/query')
          } else {
            this.$q.notify({
              message: '登录失败: 用户名或者密码错误',
              color: 'red-5',
              icon: 'warning'
            })
          }
        })
      }
    },
    checkLoginInfo () {
      if (
        !this.userInfo.username ||
        !this.userInfo.password
      ) {
        this.$q.notify({
          message: '有内容没填哦~',
          icon: 'zoom_in',
          color: 'red-5'
        })
        return false
      }
      return true
    },
    show (isShow) {
      console.log('hover')
      this.showHidden = isShow
      console.log(this.showHidden)
    }
  },
  created () {
    // 展示时间
    this.timeInterval = setInterval(() => {
      const now = new Date()
      this.timeShow = now.toLocaleString()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
    this.timeInterval = null
  }
}

</script>

<style>
.lizi{
  background-color: #5FCEC0;
  /* background-color: #26c7b1; */
  height: 100vh;
}
#input{
  padding: 20px;
  margin: auto;
  width: 80%;
}
#bottom{
  font-weight: bold;
  color: white;
  text-shadow: #5FCECF 0px 2px 0px;
  font-size: 0.8rem;
}
#title{
  font-weight: bold;
  font-size: 2rem;
  color: white;
  text-shadow: #5FCECF 0px 2px 0px;
}
#loginbg{
  position: absolute;
  left: calc((100% - 451px)/2);
  top:calc((100% - 380px)/2);
}
#shadow {
  width: 451px;
  height: 380px;
  border-radius: 20px;
  margin: auto;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
#box {
  width: 451px;
  height: 380px;
  position: relative;
}
#bar {
  width: 451px;
  height: 380px;
  float: left;
  top: 0px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  text-align: center;
  padding: 50px;
}
#bg{
  overflow: hidden;
}
#hidden {
  transition: color 1s, transform 1s;
  transform: rotate(180deg);
  color: #1122f1;
}
p:hover {
  color: #44fe2f;
}
#hidden-title {
  font-size: 16px;
  font-weight: 600;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>
