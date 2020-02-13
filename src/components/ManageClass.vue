<template>
  <div>
    <!-- <div id="class-info">
      <q-field :label="classObj.className" stack-label>
      </q-field>
    </div> -->
    <pure-user-table
      :tableData="studentItems"
      :visible-columns="['scoreUsual', 'scoreExam', 'scoreFinal']"
      :title="tableTitle"
    >
    </pure-user-table>
    <div id="btnGroup">
        <!-- <q-btn label="清空" style="margin-right:25%"  @click="reset" color="primary"/>
        <q-btn label="搜索" @click="search" color="secondary"/>
      <q-btn-group outline> -->
      <div class="flex justify-center" style="margin-top:15px;">
        <q-btn icon="keyboard_arrow_left" label="返回" color="secondary" push @click="$emit('closeManage')"></q-btn>
        <!-- <q-btn icon-right="save" label="提交" color="green-4" style="margin-left:25%" push @click="commitClick"></q-btn> -->
        <!-- 这里的其余按钮改为slot 注意是vue < 2.5的语法 -->
        <slot name="btn1"></slot>
        <slot name="btn2"></slot>
        <slot name="btn3"></slot>
      </div>
      <!-- </q-btn-group> -->
    </div>
  </div>
</template>

<script>
/*
管理班级学生组件
从外部接受 课程的id 发起网络请求
*/

import PureUserTable from './PureUserTable'
export default {
  name: 'ManageClass',
  components: {
    PureUserTable
  },
  methods: {
    commitClick () {
      // 提示是否确定保存
    }
  },
  data () {
    return {
      studentItems: []
    }
  },
  computed: {
    tableTitle () {
      return this.classObj.className + '  ' + this.classObj.classNo + '  ' + this.classObj.time
    }
  },
  props: {
    // 外部传入的课程信息
    classObj: {
      type: Object,
      required: true
    }
  },
  created () {
    // 网络请求发起 获取课程学生信息list 一定要记得给index
    this.studentItems = [
      {
        id: 1,
        username: '小明',
        collegeName: '计算机学院',
        userNo: '134123',
        sex: '男',
        scoreUsual: 66,
        scoreExam: 86,
        scoreFinal: 66
      },
      {
        id: 2,
        username: '小x明',
        collegeName: '计算adfadf机学院',
        userNo: '134123',
        sex: '男',
        scoreUsual: 66,
        scoreExam: 86,
        scoreFinal: 66
      },
      {
        id: 3,
        username: '小sf明',
        collegeName: '计算xcv学院',
        userNo: '134123',
        sex: '男',
        scoreUsual: 66,
        scoreExam: 86,
        scoreFinal: 623
      },
      {
        id: 4,
        username: '小assd明',
        collegeName: '计zcv学院',
        userNo: '134123',
        sex: '男',
        scoreUsual: 66,
        scoreExam: 85,
        scoreFinal: 66
      },
      {
        id: 5,
        username: '小明adf',
        collegeName: 'cxvads学院',
        userNo: '134123',
        sex: '男',
        scoreUsual: 66,
        scoreExam: 46,
        scoreFinal: 66
      },
      {
        id: 6,
        username: 'sdfa小明',
        collegeName: 'dssd学院',
        userNo: '134123',
        sex: '女',
        scoreUsual: 56,
        scoreExam: 36,
        scoreFinal: 66
      },
      {
        id: 7,
        username: '小明',
        collegeName: '计算机学院',
        userNo: '134123',
        sex: '女',
        scoreUsual: null,
        scoreExam: null,
        scoreFinal: null
      }
    ]
    this.studentItems.forEach((row, index) => {
      row.index = index + 1
    })
  }
}
</script>

<style scoped>
.btnGroup {
  left: 100px;
}
</style>
