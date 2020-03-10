<template>
  <div class="class-list">
    <class-list
      :pureClassTableOption="pureClassTableOption"
      :operationBtn="operationBtn"
      :removedClass.sync="removedClass"
    >
    </class-list>
  </div>
</template>

<script>
import ClassList from '../ClassList'
import openClass from 'network/openClass'
import Utils from 'common/utils'

export default {
  name: 'StudentClassList',
  components: {
    ClassList
  },
  data () {
    return {
      removedClass: {},
      pureClassTableOption: {
        title: '我的选课',
        hideBottom: true,
        visibleColumns: ['operation', 'grade']
      },
      operationBtn: {
        color: 'red-12',
        icon: '',
        shape: '',
        label: '退课',
        btnClick: value => this.cancelClassBtn(value)
      }
    }
  },
  methods: {
    cancelClassBtn (clsObj) {
      if (!this.$store.getters['semester/canSelect']) {
        this.$q.notify({
          message: '不在选课期间呢',
          color: 'red-12',
          icon: 'alarm_off'
        })
        return
      }
      // 弹出对话框提示
      this.$q.dialog({
        title: '退课提示',
        message: '确定要退这门课吗？',
        ok: {
          push: true,
          label: 'Yes'
        },
        cancel: {
          push: true,
          color: 'negative',
          label: 'No'
        }
      }).then(() => {
        // 发送网络请求，结果返回提示
        openClass.cancelClass(clsObj.id).then(res => {
          if (res.code === '0') {
            this.$q.notify('退课成功' + clsObj.name)
            // 在selected学期里面删除 交个子组件去处理
            this.removedClass = Utils.deepCopy({semesterId: clsObj.semester_id, id: clsObj.id})
          } else {
            this.$q.notify({
              message: '失败退课',
              color: 'negative'
            })
          }
        })
      }).catch(_ => {
        console.log('cancel')
      })
    }
  }
}
</script>

<style>

</style>
