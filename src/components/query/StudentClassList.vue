<template>
  <div class="class-list">
    <class-list
      :pureClassTableOption="pureClassTableOption"
      :operationBtn="operationBtn"
    >
    </class-list>
  </div>
</template>

<script>
import ClassList from '../ClassList'
export default {
  name: 'StudentClassList',
  components: {
    ClassList
  },
  data () {
    return {
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
    cancelClassBtn (clsId) {
      console.log('father')
      console.log(clsId)
      // console.log(this.$q.dialog)
      // 弹出对话框提示
      this.$q.dialog({
        title: '退课提示',
        message: '确定要退这门课吗？',
        // ok: 'Yes',
        // cancel: 'No'
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
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('请求结束')
            if (parseInt((Math.random() * 100)) % 2 === 0) {
              resolve()
            } else {
              reject(Error('失败了'))
            }
          }, 1200)
        }).then(res => {
          // 将这门课取消显示 从classlist中splice掉 得到成功的class id即可
          this.$q.notify('退课成功某某课程')
        }).catch(err => {
          this.$q.notify({
            message: err.message + '某某课程',
            color: 'negative'
          })
        })
      }).catch(() => {
        // this.$q.notify('Disagreed...')
      })
    },
    switchSemester (value) {
      // TODO
      console.log('SS: ' + value)
      this.currentSemester.value = this.allClasses[0].value
      this.currentSemester.tableItems = this.allClasses[0].tableItems
    }
  }
}
</script>

<style>

</style>
