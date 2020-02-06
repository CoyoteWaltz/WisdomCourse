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
                <q-input color="blue" v-model="userName" stack-label="一卡通账号" :before="[{icon: 'cloud', handler () {}}]"/>
                <q-input color="blue" v-model="passWord" type="password" stack-label="一卡通密码" :before="[{icon: 'lock', handler () {}}]" style="margin-top:20px"/>
                <q-select filled v-model="identity" :options="idOptions" float-label="选择身份" icon="person" />
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
<style>
.lizi{
  background-color: #5FCEC0;
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
<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      userName: '',
      passWord: '',
      identity: 0,
      idOptions: [
        {
          value: 0,
          label: '学生'
        },
        {
          value: 1,
          label: '老师'
        },
        {
          value: 2,
          label: '管理员'
        }
      ]
    }
  },
  methods: {
    login: function () {
      // todo
      console.log('login')
      this.$router.push('/index')
    }
  }
}

</script>
