<template>
  <div>
    <!-- <div id="class-info">
      <q-field :label="classObj.className" stack-label>
      </q-field>
    </div> -->
    <pure-user-table
      :tableData.sync="studentItems"
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
import Utils from 'common/utils'
import PureUserTable from './PureUserTable'
// import openClass from 'network/openClass'

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
      return this.classObj.name + '  ' + this.classObj.course_no + '  ' + this.classObj.time
    }
  },
  props: {
    // 外部传入的课程信息
    classObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    classObj (newValue) {
      console.log(newValue)
      if (!newValue.students) {
        // 因为这个组件是不会销毁的 只在更新classObj的时候发起请求获取
        // 学生数据 并且是判断这个课程obj是没有学生数据的时候发起请求
        // openClass.getStuInfo(newValue.id).then(res => {
        //   console.log(res)
        //   if (res.code === '0') {
        //     let temp = res.data
        //     temp.forEach((row, index) => {
        //       row.index = this.classObj.id
        //     })
        //     newValue.students = Utils.deepCopy(temp)
        //     this.studentItems = newValue.students
        //   } else {
        //     // 提示信息
        //   }
        // })
        console.log('没')
        let temp = [
          {
            id: 1,
            name: '小明',
            college_name: '计算机学院',
            user_no: '134123',
            sex: '男',
            scoreUsual: 66,
            scoreExam: 86,
            scoreFinal: 66
          },
          {
            id: 2,
            name: '小x明',
            college_name: '计算adfadf机学院',
            user_no: '134123',
            sex: '男',
            scoreUsual: 66,
            scoreExam: 86,
            scoreFinal: 66
          },
          {
            id: 3,
            name: '小sf明',
            college_name: '计算xcv学院',
            user_no: '134123',
            sex: '男',
            scoreUsual: 66,
            scoreExam: 86,
            scoreFinal: 623
          },
          {
            id: 4,
            name: '小assd明',
            college_name: '计zcv学院',
            user_no: '134123',
            sex: '男',
            scoreUsual: 66,
            scoreExam: 85,
            scoreFinal: 66
          },
          {
            id: 5,
            username: '小明adf',
            college_name: 'cxvads学院',
            user_no: '134123',
            sex: '男',
            scoreUsual: 66,
            scoreExam: 46,
            scoreFinal: 66
          },
          {
            id: 6,
            name: 'sdfa小明',
            college_name: 'dssd学院',
            user_no: '134123',
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
        temp.forEach((row, index) => {
          row.index = this.classObj.id
        })
        newValue.students = Utils.deepCopy(temp)
        this.studentItems = newValue.students
      } else {
        this.studentItems = Utils.deepCopy(newValue.students)
        this.studentItems = newValue.students
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
.btnGroup {
  left: 100px;
}
</style>
