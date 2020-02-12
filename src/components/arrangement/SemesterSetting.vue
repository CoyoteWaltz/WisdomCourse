<template>
  <div class="row justify-around">
    <current-semester :addSemester.sync="addSemester"></current-semester>
    <new-semester @newSemester="newSemester"></new-semester>
  </div>
</template>

<script>
import NewSemester from './NewSemester'
import CurrentSemester from './CurrentSemester'
import Utils from 'common/utils'
export default {
  name: 'SemesterSetting',
  components: {
    NewSemester,
    CurrentSemester
  },
  data () {
    return {
      addSemester: {}
    }
  },
  methods: {
    // 注意这里一定要给 value 和 label！
    newSemester (semesterObj) {
      console.log('xxxxx')
      console.log(semesterObj)
      this.addSemester = Utils.deepCopy(semesterObj)
      // 网络请求得到的返回数据应该是含有id的 这里就替代一下
      this.addSemester.id = parseInt(Math.random() * 1000)
      this.addSemester.label = this.addSemester.name
      this.addSemester.value = this.addSemester.id
    }
  },
  created () {
    // 网络请求获取
  }
}
</script>

<style>

</style>
