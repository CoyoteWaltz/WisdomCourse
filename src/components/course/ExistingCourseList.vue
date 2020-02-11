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
      bordered
      :data="currentCollege.courseItems"
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
        <q-td key="courseName" :props="props">{{ props.row.courseName }}</q-td>
        <q-td key="courseNo" :props="props">{{ props.row.courseNo }}</q-td>
        <q-td key="collegeName" :props="props">{{ props.row.collegeName }}</q-td>
        <q-td key="credit" :props="props">{{ props.row.credit }}</q-td>
        <q-td key="hour" :props="props">{{ props.row.hour }}</q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import Utils from 'common/utils'

export default {
  name: 'ExistingCourseList',
  components: {
  },
  data () {
    return {
      paginationControl: {rowsPerPage: 0},
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
        if (newValue.collegeId === college.id) {
          console.log('插入' + college.collegeName)
          newValue.index = college.courseItems.length + 1
          // 同时要考虑是不是currentCollege
          if (newValue.collegeId === this.currentCollege.value) {
            this.currentCollege.courseItems.push(newValue)
          }
          college.courseItems.push(newValue)
          return
        }
      }
    }
  },
  created () {
    // 获取所有课程的list {college, courses:[]}
    // 将collegeOptions 生成
    const a = Utils.deepCopy(1)
    console.log(a)
    this.allCourseItems = [
      {
        id: 1,
        value: 1,
        collegeName: '计算机学院',
        courseItems: [
          {
            id: 123,
            courseName: '课程大赛的发生',
            courseNo: '1241233',
            collegeName: '计算机学院',
            credit: 12,
            hour: 12
          },
          {
            id: 1223,
            courseName: '课程s大赛的发生',
            courseNo: '1241233',
            collegeName: '计算机学院',
            credit: 12,
            hour: 12
          },
          {
            id: 12333,
            courseName: '课程大赛的发生',
            courseNo: '1241233',
            collegeName: '计算机学院',
            credit: 12,
            hour: 12
          },
          {
            id: 11523,
            courseName: '课程大赛的发生',
            courseNo: '1241233',
            collegeName: '计算机学院',
            credit: 12,
            hour: 12
          },
          {
            id: 115623,
            courseName: '课程大赛的发生',
            courseNo: '1241233',
            collegeName: '计算机学院',
            credit: 12,
            hour: 12
          },
          {
            id: 14643,
            courseName: '课a地方撒发生',
            courseNo: '12gg233',
            collegeName: '计算机学院',
            credit: 2,
            hour: 12
          },
          {
            id: 15445,
            courseName: '课a地方撒发生',
            courseNo: '12gg233',
            collegeName: '计算机学院',
            credit: 2,
            hour: 12
          },
          {
            id: 173,
            courseName: '课a地方撒发生',
            courseNo: '12gg233',
            collegeName: '计算机学院',
            credit: 2,
            hour: 12
          },
          {
            id: 183,
            courseName: '课a地方撒发生',
            courseNo: '12gg233',
            collegeName: '计算机学院',
            credit: 2,
            hour: 12
          },
          {
            id: 343,
            courseName: '课a地方撒发生',
            courseNo: '12gg233',
            collegeName: '计算机学院',
            credit: 2,
            hour: 12
          },
          {
            id: 13,
            courseName: '课程大啊打发',
            courseNo: '12ag233',
            collegeName: '计算机学院',
            credit: 4,
            hour: 4
          },
          {
            id: 12,
            courseName: '课程大赛的发生',
            courseNo: '12gs233',
            collegeName: '计算机学院',
            credit: 2,
            hour: 2
          }
        ]
      },
      {
        id: 2,
        value: 2,
        collegeName: '理学院',
        courseItems: [
          {
            id: 123,
            courseName: '按时打发第三方',
            courseNo: '1342',
            collegeName: '理学院',
            credit: 12,
            hour: 12
          },
          {
            id: 121,
            courseName: 'sdf阿道夫',
            courseNo: 'aahd2542',
            collegeName: '理学院',
            credit: 2,
            hour: 12
          },
          {
            id: 133,
            courseName: '发广告法',
            courseNo: 'qrf23',
            collegeName: '理学院',
            credit: 4,
            hour: 44
          },
          {
            id: 122,
            courseName: '五十度飞',
            courseNo: '23efdf',
            collegeName: '理学院',
            credit: 4,
            hour: 12
          }
        ]
      }
    ]
    this.allCourseItems.forEach((item, _) => {
      item.courseItems.forEach((value, index) => {
        value.index = index + 1
      })
    })
    this.currentCollege = Utils.deepCopy(this.allCourseItems[0])
    this.collegeOptions = this.allCourseItems.map((value, index) => {
      return {
        id: value.id,
        value: value.id,
        label: value.collegeName
      }
    })
  },
  methods: {
    btnClick (courseObj) {
      // 直接调给父组件
      this.$emit('newSuccess', courseObj)
    },
    switchCollege (value) {
      for (let college of this.allCourseItems) {
        if (value === college.id) {
          this.currentCollege = Utils.deepCopy(college)
          console.log(this.currentCollege)
          return
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
