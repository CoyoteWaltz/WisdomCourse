<template>
  <div class="class-list">
    <q-select
      radio
      v-model="currentSemester.value"
      :options="semesterOptions"
      float-label="选择学期"
      @input="switchSemester"
    />
    <slot/>
    <pure-class-table
      :operationBtn="operationBtn"
      :title="pureClassTableOption.title"
      :tableData="currentSemester.tableItems"
      :hide-bottom="pureClassTableOption.hideBottom"
      :visible-columns="pureClassTableOption.visibleColumns"
      @classOperation="operationBtn.btnClick"
    />
      <!-- :visible-columns="['operation', 'state', 'info']" -->
  </div>
</template>

<script>

import PureClassTable from 'components/PureClassTable'

/*
最外层组件最好将其keep-alive
接受参数:
学期列表: semesterOptions: [{id, value, label}]
当前学期 currentSemester
  学期value
  当前学期的课程tableItems
所有学期的课程: allClasses
操作的按钮参数operationBtn
外层绑定当前学期 监听发生改变的操作
  classOperation 定义在methods中 再向外层返回
operationBtn: {
  color: 'red-12',
  icon: '',
  // shape: 'round',
  shape: '',
  label: '退课',
  btnClick: function
}
pureClassTableOption: {
  operationBtn,
  hideBottom,
  visibleColumns
}
学期切换函数 switchSemester 返回给父组件
created阶段
第一次网络请求得到    所有学期的列表 和    当前学期的所选课程
当前学期currentSemester的value为id，tableItems赋值
渲染 学期选项列表 和课表
当用户切换学期的时候捕获新的学期id
查询当前的数据 allClasses数组中是否已经有id存在的
如果有 直接将其赋值给currentSemester
如果没有 发起网络请求 获取对应学期的数据
给currentSemester赋值，并且在数组push
*/
/*
这一个组件封装数据获取
获得所有学期列表 当前学期课程
切换学期的时候获取对应的课程 和 展示切换
触发操作按钮的时候 向外层emit 返回对应课程对象

外层向此配置 操作的按钮信息 table的展示信息
外层不关心数据获取操作
*/

import Utils from 'common/utils'

export default {
  name: 'StudentClassList',
  components: {
    PureClassTable
  },
  data () {
    return {
      // 当前学期对象
      currentSemester: {
        value: -1,
        id: -1,
        tableItems: []
      },
      // 学期列表信息: [{id, value, label}]
      semesterOptions: [
        {
          id: -1,
          value: -1,
          label: '错误信息'
        }
      ],
      // 全部课程: [{value, tableItems}] 元素是一个学期obj
      allClasses: []
    }
  },
  props: {
    // 最内部的table展示对象 hideBottom visibleColumns
    pureClassTableOption: {
      type: Object,
      default () {
        return {
          title: null,
          hideBottom: true,
          visibleColumns: []
        }
      }
    },
    // 课的操作按钮对象
    operationBtn: {
      type: Object,
      default () {
        return {
          color: 'red-12',
          icon: '',
          isRound: false,
          label: '退课',
          btnClick: value => console.log(value)
        }
      }
    }
  },
  methods: {
    switchSemester (value) {
      // 注意这里用 Utils.deepCopy!!!! TODO
      // 如果allClasses里有 直接return 没有的 网络请求
      console.log(this.currentSemester)
      console.log(this.allClasses)
      for (let cls of this.allClasses) {
        if (value === cls.id) {
          console.log(this.allClasses)
          this.currentSemester = Utils.deepCopy(cls)
          return
        }
      }
      // 网络请求
      this.$q.notify('发送网络请求中')
      const temp = {
        id: value,
        value: value,
        tableItems: [{
          id: value + 6666,
          className: '课程',
          classNo: 'value+99900',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: value,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        }]
      }
      this.currentSemester = temp
      this.allClasses.push(Utils.deepCopy(temp))
      console.log(this.allClasses)
    }
  },
  created () {
    console.log('crrree')
    // 发送请求 获取所需数据
    this.semesterOptions = [
      {
        id: 1,
        value: 1,
        label: '2019秋季'
      },
      {
        id: 2,
        value: 2,
        label: '2018秋季'
      },
      {
        id: 3,
        value: 3,
        label: '2017秋季'
      },
      {
        id: 4,
        value: 4,
        label: '2016秋季'
      },
      {
        id: 5,
        value: 5,
        label: '2015秋季'
      }
    ]
    // 一个请求发送两个数据
    this.currentSemester = {
      id: 1,
      value: 1,
      tableItems: [
        {
          id: 1,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 271,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 431,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 3451,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 4531,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 135,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 1768,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 661,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 177,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 16,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 11,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 4,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 2,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课程2',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 2,
          capacity: 50,
          classroom: '教室',
          area: '校区'
        },
        {
          id: 113,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课ds程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 53,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课dds程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 333,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课das程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 43,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课ddds程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 23,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课dggs程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 13,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课dszc程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 31,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课dsxcv程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 33,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课dzxs程',
          classNo: '13231',
          teacherName: '老师name',
          time: '三3-4, 五1-3',
          credit: 5,
          capacity: 50,
          classroom: '教室b123',
          area: '校区'
        },
        {
          id: 4,
          // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
          // 只需要传递对应name的属性就行，q会匹配！爽啊
          className: '课ag2程',
          classNo: '222',
          teacherName: '老师nssame',
          time: '三3-4, 五1-3',
          credit: 1,
          capacity: 10,
          classroom: '教室a111',
          area: '校区1'
        }
      ]
    }
    const temp = Utils.deepCopy(this.currentSemester)
    this.allClasses.push(temp)
  }
}
</script>

<style>

</style>
