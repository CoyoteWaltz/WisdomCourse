<template>
  <!-- 管理员  查看课程   -->
  <div class="admin-classes">
    <div v-show="!isManage" class="class-list" key="classList">
      <class-list
        :operationBtn="operationBtn"
        :pureClassTableOption="pureClassTableOption"
      >
      </class-list>
    </div>
    <!-- 居然要用两个v-show来处理这样的开关 保证组件不销毁。。。 -->
    <div v-show="isManage" key="management">
      <manage-class :classObj="operatedCls" @closeManage="closeManage">
        <!-- TODO可以写删除课程的接口 -->
        <!-- <template slot="btn1"> -->
          <!-- <q-btn icon-right="save" @click="commit" label="提交" color="green-4" style="margin-left:25%" push ></q-btn> -->
        <!-- </template> -->
      </manage-class>
    </div>
  </div>
</template>

<script>

import ClassList from '../ClassList'
import ManageClass from '../ManageClass'

export default {
  name: 'AdminClassList',
  components: {
    ClassList,
    ManageClass
  },
  data () {
    return {
      operatedCls: Object(),
      isManage: false,
      pureClassTableOption: {
        title: '所有课程',
        hideBottom: false,
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
      this.operatedCls = clsObj
    },
    closeManage () {
      this.isManage = false
    }
  }
}
</script>

<style>

</style>
