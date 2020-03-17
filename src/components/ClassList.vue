<template>
  <div class="class-list">
    <div class="flex justify-start list-header">
      <q-select
        radio
        v-model="selectedSemester.id"
        :options="semesterOptions"
        float-label="选择学期"
        @input="switchSemester"
      />
      <div class="refresh-btn">
        <q-btn icon="refresh" @click="refreshSelected"/>
      </div>
    </div>
    <pure-class-table
      :operationBtn="operationBtn"
      :title="pureClassTableOption.title"
      :tableData="selectedSemester.tableItems"
      :hide-bottom="pureClassTableOption.hideBottom"
      :visible-columns="pureClassTableOption.visibleColumns"
      @classOperation="operationBtn.btnClick"
    />
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
import {IDINDEX} from 'common/const'
import semester from 'network/semester'

export default {
  name: 'StudentClassList',
  components: {
    PureClassTable
  },
  data () {
    return {
      // 必须是一个data的属性 不然不能model绑定
      selectedSemester: {
        id: null,
        tableItems: []
      }
    }
  },
  computed: {
    semesterOptions () {
      if (!this.$store.getters['semester/isGot']) {
        return []
      }
      // 返回历史学期 管理员可以看所有学期
      if (this.$store.state.user.info.identity === IDINDEX.admin.id) {
        return this.$store.getters['semester/getAllOptions']
      }
      return this.$store.getters['semester/getHistoryOptions']
    }
  },
  props: {
    removedClass: {
      // 包含id属性和semesterId即可
      type: Object
    },
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
  watch: {
    removedClass (newValue) {
      console.log(newValue)
      // 完成删除课程的操作
      if (newValue.semesterId === this.selectedSemester.id) {
        // splice响应式
        this.selectedSemester.tableItems.splice(
          this.selectedSemester.tableItems.findIndex(item => item.id === newValue.id),
          1
        )
        // 学期课程提交store更新
        this.$store.commit(
          'semester/addClassList',
          {id: newValue.semesterId, data: this.selectedSemester.tableItems}
        )
      }
    }
  },
  methods: {
    // 封装一下切换当前选择的赋值操作
    assignSemester (id, classList) {
      this.selectedSemester = Utils.deepCopy({
        id: id,
        tableItems: classList
      })
    },
    // 重新获取选定学期的课程list
    refreshSelected () {
      // 发起网络请求
      const targetId = this.selectedSemester.id
      if (!targetId) {
        return
      }
      semester.getClasses(targetId).then(res => {
        // console.log(res)
        this.$store.commit('semester/addClassList', {
          id: targetId,
          data: res.data
        })
        this.assignSemester(targetId, res.data)
      })
    },
    // 切换学期
    switchSemester (value) {
      // 先查store里的对应学期对象有没有 class_list
      for (let item of this.$store.state.semester.semester_list) {
        if (item.id === value) {
          // this.currentSemesterId = value
          this.selectedSemester.id = value
          if (item.class_list !== undefined) {
            // 如果对应的学期对象有课程 直接调用
            this.assignSemester(value, item.class_list)
          } else {
            // 发起网络请求
            this.refreshSelected()
          }
        }
      }
    }
  },
  created () {
    // this.semesterOptions computed from store的getter getOptions
    // 每次切换 直接检查store.state的semester_list
    // 找到对应id的semester 如果他的class_list !== undefined 就mutation deepcopy 并deepcopy到this的current
    // 如果store里面没有 啧网络请求
    if (!this.$store.getters['semester/isGot']) {
      // 发起网络请求
      semester.get().then(res => {
        if (res.code === '0') {
          // console.log(res.msg)
          this.$store.commit('semester/init', res.data)
          // 更新绑定的学期id
          this.assignSemester(
            this.$store.state.semester.current_semester.id,
            this.$store.state.semester.current_semester.class_list
          )
        }
      })
    } else { // 给this的赋值一下
      this.assignSemester(
        this.$store.state.semester.current_semester.id,
        this.$store.state.semester.current_semester.class_list
      )
    }
    console.log(this.selectedSemester)
  }
}
</script>

<style scoped>
  .refresh-btn {
    height: 60%;
    margin: auto 0 0;
    padding-left: 20px;
  }
  .list-header {
    margin: 10px 0;
  }
</style>
