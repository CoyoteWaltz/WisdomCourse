<template>
  <!-- 教师  查看课程   -->
  <div class="teacher-classes">
    <div v-show="!isManage" class="class-list" key="classList">
      <class-list
        :operationBtn="operationBtn"
        :pureClassTableOption="pureClassTableOption"
      >
      </class-list>
    </div>
    <!-- 居然要用两个v-show来处理这样的开关 保证组件不销毁。。。 -->
    <div v-show="isManage" key="management">
      <manage-class :classObj.sync="operatedCls" @closeManage="closeManage">
        <template slot="btn1">
          <q-btn icon-right="save" @click="commit" label="提交" color="green-4" style="margin-left:25%" push ></q-btn>
        </template>
      </manage-class>
    </div>
  </div>
</template>

<script>
import ClassList from '../ClassList'
import ManageClass from '../ManageClass'

export default {
  name: 'TeacherClassList',
  components: {
    ClassList,
    ManageClass
  },
  data () {
    return {
      operatedCls: Object(),
      isManage: false,
      pureClassTableOption: {
        title: '我上的课',
        hideBottom: true,
        visibleColumns: ['operation']
      },
      operationBtn: {
        color: 'secondary',
        icon: '',
        isRound: false,
        label: '管理',
        btnClick: value => this.manage(value)
      }
    }
  },
  methods: {
    manage (clsObj) {
      this.isManage = true
      console.log(clsObj)
      this.operatedCls = clsObj
    },
    closeManage () {
      this.isManage = false
    },
    commit () {
      // 提交课程信息到后台
      console.log(this.operatedCls)
    }
  }
}
</script>

<style>

</style>
