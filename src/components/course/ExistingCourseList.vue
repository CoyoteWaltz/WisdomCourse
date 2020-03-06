<template>
  <div id="existing-course">
    <q-select
      radio
      v-model="currentCollege.value"
      :options="collegeOptions"
      float-label="选择学院"
      @input="switchCollege"
    />
    <q-table
      title="已创建课程"
      bordered
      :data="currentCollege.course_list"
      :columns="columns"
      row-key="id"
      :hide-bottom="true"
      :pagination.sync="paginationControl"
      table-style="max-height: 50vh"
    >
      <q-tr slot="body" slot-scope="props" :props="props" id="table">
        <q-td key="operation" :props="props">
          <q-btn
            :icon="operationBtn.icon"
            :color="operationBtn.color"
            round
            size="sm"
            @click="operationBtn.btnClick(props.row)"
          />
        </q-td>
        <q-td key="index" :props="props">{{ props.row.index }}</q-td>
        <q-td key="courseName" :props="props">{{ props.row.name }}</q-td>
        <q-td key="courseNo" :props="props">{{ props.row.course_no }}</q-td>
        <q-td key="collegeName" :props="props">{{currentCollege.college_name}}</q-td>
        <q-td key="credit" :props="props">{{ props.row.credit }}</q-td>
        <q-td key="hour" :props="props">{{ props.row.hour }}</q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import Utils from 'common/utils'
import course from 'network/course'

export default {
  name: 'ExistingCourseList',
  components: {
  },
  data () {
    return {
      paginationControl: {rowsPerPage: 0},
      // 获取数据之后给第一个
      currentCollege: {
        value: null,
        courseItems: []
      },
      allCourseItems: [],
      columns: [
        {
          name: 'operation',
          label: '操作',
          align: 'center',
          field: 'operation'
        },
        {
          name: 'index',
          label: '序号',
          align: 'center',
          field: 'index'
        },
        {
          name: 'courseName',
          label: '课程',
          align: 'center',
          field: 'courseName'
        },
        {
          name: 'courseNo',
          label: '课程号',
          align: 'center',
          field: 'courseNo'
        },
        {
          name: 'collegeName',
          label: '学院',
          align: 'left',
          field: 'collegeName'
        },
        {
          name: 'credit',
          label: '学分',
          align: 'center',
          field: 'credit'
        },
        {
          name: 'hour',
          label: '学时',
          align: 'center',
          field: 'hour'
        }
      ],
      collegeOptions: []
    }
  },
  props: {
    // 接受外部的operationBtn {icon, color, btnClick: courseObj => {}}
    operationBtn: {
      type: Object,
      required: true
    },
    // 外部传递来的新的课程
    newCourse: {
      type: Object,
      required: true
    },
    // 外部传递来的需要删去的课程
    removedCourseId: {
      type: Number
    }
  },
  watch: {
    newCourse (newValue) {
      // 根据学院id加入allCourses里面
      // 创建成功得到的后端返回 对象 要包含展示的所有信息 index在下面的代码里面处理
      console.log('发生变化')
      console.log(newValue)
      console.log(this.allCourseItems)
      for (let college of this.allCourseItems) {
        console.log(college)
        if (newValue.college_id === college.id) {
          console.log('插入' + college.college_name)
          newValue.index = college.course_list.length + 1
          // 同时要考虑是不是currentCollege
          if (newValue.college_id === this.currentCollege.value) {
            this.currentCollege.course_list.push(newValue)
          }
          college.course_list.push(newValue)
          return
        }
      }
      // this.allCourseItems = Utils.deepCopy(this.$store.state.college.course_list)
    },
    removedCourseId (newValue) {
      // 直接遍历currentCollege其实更好吧
      console.log('删除')
      console.log(this.currentCollege)
      this.currentCollege.course_list.splice(
        this.currentCollege.course_list.findIndex(item => item.id === newValue),
        1
      )
      this.currentCollege.course_list.forEach((value, index) => {
        value.index = index + 1
      })
      for (let college of this.allCourseItems) {
        if (college.id === newValue.collegeId) {
          college.course_list = Utils.deepCopy(this.currentCollege.course_list)
        }
      }
    }
  },
  created () {
    // store or 网络 获取所有课程的list {college, courses:[]}
    // 将collegeOptions 生成
    if (this.$store.getters['college/isGot']) {
      this.allCourseItems = this.$store.getters['college/copy']
      this.allCourseItems = Utils.deepCopy(this.$store.state.college.college_list)
    } else {
      // 发起网络请求
      course.get().then(res => {
        if (res.code !== '0') {
          console.log(res.msg)
        } else {
          console.log('yesss')
          console.log(res)
          this.$store.commit('college/init', res.data)
          this.allCourseItems = Utils.deepCopy(this.$store.state.college.college_list)
          this.formatData()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    btnClick (courseObj) {
      // 直接调给父组件
      this.$emit('newSuccess', courseObj)
    },
    switchCollege (value) {
      // console.log(this.allCourseItems)
      // console.log(this.collegeOptions)
      console.log(this.currentCollege)
      for (let college of this.allCourseItems) {
        if (value === college.id) {
          this.currentCollege = Utils.deepCopy(college)
          console.log(this.currentCollege)
          return
        }
      }
    },
    formatData () {
      this.allCourseItems.forEach(item => {
        item.value = item.id
        item.course_list.forEach((value, index) => {
          value.index = index + 1
        })
      })
      this.currentCollege = Utils.deepCopy(this.allCourseItems[0])
      this.collegeOptions = this.allCourseItems.map((value, index) => {
        return {
          id: value.id,
          value: value.id,
          label: value.college_name
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
