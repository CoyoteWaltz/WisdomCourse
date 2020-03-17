<template>
  <div style="background-color:#fbfbfb">
    <blockquote style="margin-top:15px;margin-bottom:15px;color:#7b7b7b">
      已添加的课程如下，最多能添加6门课程
    </blockquote>
    <pure-class-table
      :tableData="selectedClasses"
      :visibleColumns="['operation', 'state', 'info']"
      :isLoading="isLoading"
      :operationBtn="operationBtn"
      @classOperation="removeClass"
    />

  <div id="xk_content">
    <div class="flex justify-center">
      <q-btn @click="$router.replace('/query') " label="继续添加" style="margin-right:10%" color="secondary"/>
      <q-btn :disabled="isLoading" @click="sendSelection" label="开始选课" color="primary"/>
    </div>
  </div>
  </div>
</template>

<script>
import PureClassTable from 'components/PureClassTable.vue'
import user from 'network/user'

export default{
  components: {
    PureClassTable
  },
  name: 'SearchClasses',
  data () {
    return {
      title: null,
      isLoading: false,
      operationBtn: {
        icon: 'remove',
        color: 'negative',
        isRound: true
      }
    }
  },
  computed: {
    selectedClasses () {
      return this.$store.getters['user/getSelectedClasses']
    }
  },
  methods: {
    removeClass (clsObj) {
      this.$store.commit('user/removeSelection', clsObj.id)
    },
    sendSelection () {
      const classArr = this.$store.getters['user/getSelectedClasses']
      if (classArr.length === 0) {
        this.$q.notify({
          message: '你害妹选课呢',
          icon: 'child_care'
        })
        return
      }
      this.isLoading = true
      // 发起网络请求
      user.selectClasses(classArr).then(res => {
        if (res.code === '0') {
          // 提示选课成功 写入选课成功日志 ??
          setTimeout(() => {
            this.$q.dialog({
              title: '选课提示',
              message: '成功选课：' + res.data.success.length + '门 | 失败：' + (res.data.failed.length) + '门'
            })
          }, 1000)
          // 对成功选课的删除待选
          // TODO 对对应学期的课程添加！
          for (let i of res.data.success) {
            this.$store.commit('user/removeSelection', i)
          }
          this.$store.commit('user/updateSelectionStatus', res.data.failed)
        }
        this.isLoading = false
      })
    }
  },
  created () {
  }
}
</script>

<style media="screen">
#xk_content{
  border-color: #fafafa;
  border-style: solid;
  box-shadow: 0px 0px 10px #cdcdcd;
  margin-top: 20px;
  padding: 15px;
}
</style>
