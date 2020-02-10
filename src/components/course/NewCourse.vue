<template>
  <div>
    <p>课程填空</p>
    <div id="config_content">
      <q-search icon="pages" float-label="课程名" placeholder="课程名" v-model.lazy="createInfo.courseName" style="margin-bottom:10px" />
      <q-search icon="reorder" float-label="学分" placeholder="学分" v-model.lazy.number="createInfo.credit" />
      <q-search icon="timer" float-label="学时" placeholder="学时" v-model.lazy.number="createInfo.hour" />
      <q-select
        icon="school"
        v-model="createInfo.collegeId"
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
      createInfo: {
        courseName: '',
        credit: null,
        collegeId: null,
        hour: null
      },
      collegeSelectOptions: []
    }
  },
  methods: {
    reset () {
      this.createInfo = {
        courseName: '',
        credit: null,
        collegeId: null,
        hour: null
      }
    },
    create () {
      // 发起网络请求之前 先检查是否有空缺
      // 创建成功之后 通知外部组件 更新已有课程list
      console.log(this.createInfo)
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
          message: '成功 ' + this.createInfo.courseName,
          color: 'primary'
        })
        this.createInfo.id = v.id
        this.$emit('newSuccess', this.createInfo)
      }).catch(err => {
        this.$q.notify({
          message: err.message,
          color: 'negative'
        })
      })
    }
  },
  created () {
    // 网络请求获取
    this.collegeSelectOptions = [
      {
        value: 1,
        id: 1,
        label: '计算机学院'
      },
      {
        value: 2,
        id: 2,
        label: '计成都市学院'
      },
      {
        value: 3,
        id: 3,
        label: '大师傅学院'
      },
      {
        value: 4,
        id: 4,
        label: '清任务学院'
      },
      {
        value: 5,
        id: 5,
        label: '计非的故事学院'
      },
      {
        value: 6,
        id: 6,
        label: '单方事故的法规学院'
      },
      {
        value: 7,
        id: 7,
        label: '大商股份算机学院'
      }
    ]
  }
}
</script>

<style>

</style>
