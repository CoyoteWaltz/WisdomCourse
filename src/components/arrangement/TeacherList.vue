<template>
  <div>
    <pure-user-table
      title="All teachers"
      :hide-bottom="true"
      :tableData="teacherList"
    ></pure-user-table>
  </div>
</template>

<script>
// 获取已有老师的list
import PureUserTable from '../PureUserTable'
import Utils from 'common/utils'
import teacher from 'network/teacher'

export default {
  name: 'TeacherList',
  components: {
    PureUserTable
  },
  data () {
    return {
      teacherList: []
    }
  },
  props: {
    addedTeacher: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    addedTeacher (newValue) {
      // 发送网络请求 成功后通知store mutation this的数据也要改变
      newValue.index = this.teacherList.length + 1
      this.teacherList.push(Utils.deepCopy(newValue))
    }
  },
  created () {
    // store or network获取教师列表
    if (this.$store.getters['teacher/isGot']) {
      this.teacherList = Utils.deepCopy(this.$store.state.teacher.teacher_list)
    } else {
      teacher.get().then(res => {
        if (res.code === '0') {
          this.$store.commit('teacher/init', res.data)
          this.teacherList = Utils.deepCopy(this.$store.state.teacher.teacher_list)
        }
      })
    }
  }
}
</script>

<style>

</style>
