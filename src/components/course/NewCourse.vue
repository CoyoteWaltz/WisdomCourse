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
import course from 'network/course'

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
      // 检查参数是否都完全
      // 发起网络请求之前 先检查是否有空缺
      // 创建成功之后 通知外部组件 更新已有课程list
      console.log(this.newInfo)
      course.newCourse({
        course_name: this.newInfo.courseName,
        hour: this.newInfo.hour,
        credit: this.newInfo.credit,
        college_id: this.newInfo.collegeId
      }).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.$store.commit('college/addOne', res.data)
          this.$emit('newSuccess', res.data)
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
