<template>
  <div id="bg">
    <div id="loginbg">
      <div id="shadow">
          <div id="box">
            <div id="bar">
              <div id="title">
                上大智课 Ver 1.0
              </div>
              <div id="input">
                <q-input color="blue" v-model="userInfo.username" stack-label="一卡通账号" :before="[{icon: 'cloud', handler () {}}]"/>
                <q-input color="blue" v-model="userInfo.password" type="password" stack-label="一卡通密码" :before="[{icon: 'lock', handler () {}}]" style="margin-top:20px"/>
                <q-select :before="[{icon: 'person', handler () {}}]" radio filled v-model="userInfo.identity" :options="idOptions" float-label="选择身份"/>
                  <!-- <template v-slot:selected>
                    第三方
                  </template>
                </q-select> -->
                <q-btn label="登录" outline style="margin-top:30px;width:80%" color="secondary" @click="login"/>
              </div>
              <div id="bottom">
                上海大学 test
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

import {IDINDEX} from 'common/const'
import user from 'network/user'

export default {
  name: 'PageLogin',
  data () {
    return {
      userInfo: {
        username: 'admin111',
        password: 'admin111',
        identity: IDINDEX.student.value
      },
      idOptions: [
        IDINDEX.student,
        IDINDEX.teacher,
        IDINDEX.admin
      ]
    }
  },
  methods: {
    login () {
      // let obj = {
      //   // 用户信息 临时
      //   username: '我是上大人',
      //   identity: this.userInfo.identity,
      //   userNo: '123241',
      //   lastTime: '2019-02-11', // 上次登陆时间
      //   intergal: 11 // 积分
      // }
      if (this.checkLoginInfo()) {
        // 登录 发送网络请求
        // request()
        user.login({
          username: this.userInfo.username,
          password: this.userInfo.password
        }).then(res => {
          if (res.code === '0') {
            console.log(res.data)
            // 处理store
            this.$store.commit('user/login', res.data.user_info)
            this.$store.commit('semester/init', {
              semester_list: res.data.semester_info,
              current_semester: res.data.current_semester
            })
            this.$store.commit('bulletin/replaceMsg', res.data.bulletin_info)
            // 处理token存入localStorage 最后一个放身份
            const token = res.data.token + res.data.user_info.privilege
            console.log(token)
            window.localStorage.setItem('token', token)

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
        }).catch(err => {
          console.log(err)
        })
      }
    },
    checkLoginInfo () {
      if (
        !this.userInfo.username ||
        !this.userInfo.password ||
        this.idOptions.includes(this.userInfo.identity)
      ) {
        this.$q.notify({
          message: '有内容没填哦~',
          icon: 'zoom_in',
          color: 'red-5'
        })
        return false
      }
      return true
    }
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
</style>
