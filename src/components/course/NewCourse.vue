<template>
  <div>
    <div id="config_content">
      <q-search icon="pages" float-label="课程名" placeholder="课程名" v-model.lazy="newInfo.courseName" style="margin-bottom:10px" />
      <q-search icon="reorder" float-label="学分" placeholder="学分" v-model.lazy.number="newInfo.credit" />
      <q-search icon="timer" float-label="学时" placeholder="学时" v-model.lazy.number="newInfo.hour" />
      <q-select
        icon="school"
        v-model="newInfo.collegeId"
        float-label="学院"
        radio
        :options="collegeSelectOptions"
      />
      <div class="flex justify-center" style="margin-top:15px;">
        <q-btn label="清空" style="margin-right:25%"  @click="reset" color="primary"/>
        <q-btn label="创建" @click="create" color="secondary"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewCourse',
  data () {
    return {
      newInfo: {
        courseName: '',
        credit: null,
        collegeId: null,
        hour: null
      }
    }
  },
  computed: {
    collegeSelectOptions () {
      return this.$store.getters['college/selectOptions']
    }
  },
  methods: {
    reset () {
      this.newInfo = {
        courseName: '',
        credit: null,
        collegeId: null,
        hour: null
      }
    },
    create () {
      // 发起网络请求之前 先检查是否有空缺
      // 创建成功之后 通知外部组件 更新已有课程list
      console.log(this.newInfo)
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('请求结束')
          if (parseInt((Math.random() * 100)) % 2 === 0) {
            resolve({id: parseInt((Math.random() * 10000))})
          } else {
            reject(Error('失败了'))
          }
        }, 1200)
      }).then(v => {
        // 需不需要deepCopy一个？？
        this.$q.notify({
          message: '成功 ' + this.newInfo.courseName,
          color: 'primary'
        })
        this.newInfo.id = v.id
        this.$emit('newSuccess', this.newInfo)
      }).catch(err => {
        this.$q.notify({
          message: err.message,
          color: 'negative'
        })
      })
    }
  },
  created () {
    // 网络请求获取 从 store 获取
    // if (this.$store.getters['college/isGot']) {
    //   // 有了直接就从store拿
    //   this.collegeSelectOptions = this.$store.state.college.college_list
    // } else {
    //   course.get().then(res => {
    //     this.$store.commit('college/init', res.data)
    //     this.collegeSelectOptions = this.$store.state.college.college_list
    //   }).then(err => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style>

</style>
