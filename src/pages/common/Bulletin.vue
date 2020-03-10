<template>
  <div>
    公告管理，开发中...
    <!-- <input type="button" value="学期获得测试" @click="getSemesters"> -->
  </div>
</template>

<script>
// import {request} from '@/network/request'
// import semester from '@/network/semester'

export default {
  name: 'Bulletin',
  methods: {
    getSemesters () {
    //   if (this.$store.state.semester.semester_list === null) {
    //     console.log('noo')
    //     const res = this.$store.dispatch('semester/get')
    //     if (res !== true) {
    //       console.log(res)
    //     }
    //   } else {
    //     console.log(this.$store.state.semester)
    //   }
      // semester.get(res => {
      //   if (res.code === '0') {
      //     console.log('yes')
      //     console.log(res)
      //   } else {
      //     console.log('no')
      //   }
      // }, err => {
      //   console.log(err)
      // })
    //   if (!this.$store.getters['semester/isGot']) {
    //     // 发起网络请求
    //     console.log('发起网络请求')
    //     semester.get(res => {
    //       if (res.code === '0') {
    //         console.log(res.msg)
    //         this.$store.commit('semester/update', res.data)
    //       } else {
    //         console.log('后台错误 提示')
    //         this.$q.notify(res.msg)
    //         console.log(res.msg)
    //       }
    //     }, err => {
    //       this.$q.notify('网络错误' + err.message)
    //     })
    //   } else {
    //     console.log(this.$store.state.semester)
    //   }
    // }
      // if (!this.$store.getters['semester/isGot']) {
      //   // 发起网络请求
      //   console.log('发起网络请求')
      //   semester.getClasses(123, res => {
      //     if (res.code === '0') {
      //       console.log(res)
      //     } else {
      //       console.log('后台错误 提示')
      //       this.$q.notify(res.msg)
      //       console.log(res.msg)
      //     }
      //   }, err => {
      //     this.$q.notify('网络错误' + err.message)
      //   })
      // } else {
      //   console.log(this.$store.state.semester)
      // }
      // const a = {ab: 1}
      // console.log(a.bb === undefined)
    }
  }
}
</script>

<style>

</style>
