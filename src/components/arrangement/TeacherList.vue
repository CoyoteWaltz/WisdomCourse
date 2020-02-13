<template>
  <div>
    <pure-user-table
      title="All teachers"
      :hide-bottom="false"
      :tableData="teacherList"
    ></pure-user-table>
  </div>
</template>

<script>
// 获取已有老师的list
import PureUserTable from '../PureUserTable'
import Utils from 'common/utils'

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
    addTeacher: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    addTeacher (newValue) {
      console.log('新建')
      console.log(newValue)
      newValue.username = newValue.name
      newValue.index = this.teacherList.length
      newValue.id = parseInt(Math.random() * 1000)
      newValue.userNo = 'usdfdsf' + newValue.id
      this.teacherList.push(Utils.deepCopy(newValue))
    }
  },
  created () {
    this.teacherList = [
      {
        id: 1,
        username: '王老师',
        userNo: '214dsfa',
        collegeId: 3,
        sex: '男',
        collegeName: '计算机学院'
      },
      {
        id: 23,
        username: '打老师',
        userNo: '242a',
        collegeId: 3,
        sex: '男',
        collegeName: '计算机学院'
      },
      {
        id: 441,
        username: '是老师',
        userNo: '2123fa',
        collegeId: 2,
        sex: '男',
        collegeName: '几个号学院'
      },
      {
        id: 121,
        username: '让他老师',
        userNo: '21sdds13',
        collegeId: 4,
        sex: '女',
        collegeName: '小数点学院'
      },
      {
        id: 21,
        username: '哈佛老师',
        userNo: '214dsfa',
        collegeId: 4,
        sex: '男',
        collegeName: '小数点学院'
      },
      {
        id: 31,
        username: '啊哈老师',
        userNo: '21214sfa',
        collegeId: 4,
        sex: '女',
        collegeName: '小数点学院'
      }
    ]
    this.teacherList.forEach((value, index) => {
      value.index = index + 1
    })
  }
}
</script>

<style>

</style>
