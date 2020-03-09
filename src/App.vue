<template>
  <div id="q-app">
    <!-- <keep-alive> 不要keep alive-->
    <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(this.$router)
    // 获取sessionStorage 更新state
    const token = window.sessionStorage.getItem('token')
    // 检查是否有token 如果没有就不做
    if (token) {
      const userState = window.sessionStorage.getItem('userState')
      const semesterState = window.sessionStorage.getItem('semesterState')
      const teacherState = window.sessionStorage.getItem('teacherState')
      const collegeState = window.sessionStorage.getItem('collegeState')
      // 随即只保留一个token
      window.sessionStorage.removeItem('userState')
      window.sessionStorage.removeItem('semesterState')
      window.sessionStorage.removeItem('teacherState')
      window.sessionStorage.removeItem('collegeState')
      if (userState) {
        this.$store.commit('user/loadFromWindow', JSON.parse(userState))
      }
      if (semesterState) {
        this.$store.commit('semester/loadFromWindow', JSON.parse(semesterState))
      }
      if (teacherState) {
        this.$store.commit('teacher/loadFromWindow', JSON.parse(teacherState))
      }
      if (collegeState) {
        this.$store.commit('college/loadFromWindow', JSON.parse(collegeState))
      }
    }
    // 添加beforeunload监听器
    window.addEventListener('beforeunload', () => {
      if (window.sessionStorage.getItem('token')) {
        // 有token的时候存
        const userStr = JSON.stringify(this.$store.state.user)
        const semesterStr = JSON.stringify(this.$store.state.semester)
        const teacherStr = JSON.stringify(this.$store.state.teacher)
        const collegeStr = JSON.stringify(this.$store.state.college)
        window.sessionStorage.setItem('userState', userStr)
        window.sessionStorage.setItem('semesterState', semesterStr)
        window.sessionStorage.setItem('teacherState', teacherStr)
        window.sessionStorage.setItem('collegeState', collegeStr)
      }
    })
  },
  beforeDestroy () {
  }
}
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, "Hiragino Sans GB", "Heiti SC", Arial, "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
</style>
