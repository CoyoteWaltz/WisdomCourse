<template>
  <q-card color="deep-orange-1" text-color="black" style="margin-top:50px;width: 300px">
    <q-card-title>
      New a teacher
    </q-card-title>
    <q-card-separator/>
    <q-card-main>
      <q-item>
        <q-input color="blue" v-model="newInfo.name" stack-label="姓名" :before="[{icon: 'person', handler () {}}]"/>
      </q-item>
      <q-item>
        <q-input color="blue" v-model="newInfo.user_no" stack-label="工号" :before="[{icon: 'room', handler () {}}]"/>
      </q-item>
      <q-item>
        性别：
        <q-radio style="margin-left:30px" v-model="newInfo.sex" val="1" label="男" />
        <q-radio style="margin-left:30px" icon="person" v-model="newInfo.sex" val="2" label="女" />
      </q-item>
      <q-item>
        <q-select
          :before="[{icon: 'location_city', handler () {}}]"
          radio filled v-model="newInfo.collegeId"
          :options="collegeOptions"
          float-label="选择学院"
        />
      </q-item>
      <q-item class="row justify-center">
        <q-btn push color="primary" label="新建教师" @click="create" :disabled="sending"/>
      </q-item>
    </q-card-main>
  </q-card>
</template>

<script>
import teacher from 'network/teacher'
import course from 'network/course'

export default {
  name: 'NewTeacher',
  data () {
    return {
      sending: false,
      newInfo: {
        name: '',
        user_no: '',
        collegeId: null,
        sex: 1
      }
    }
  },
  methods: {
    create () {
      this.sending = true
      console.log('新建教师')
      console.log(this.newInfo)
      const data = {
        name: this.newInfo.name,
        sex: this.newInfo.sex,
        college_id: this.newInfo.collegeId,
        user_no: this.newInfo.user_no
      }
      console.log(data)
      teacher.create(data).then(res => {
        console.log(res)
        if (res.code === '0') {
          // 创建成功
          this.$store.commit('teacher/addOne', res.data)
          this.$emit('addTeacher', res.data)
          this.newInfo.name = ''
          this.newInfo.user_no = ''
        } else {
          this.$q.notify({
            message: res.msg,
            color: 'negative'
          })
        }
        this.sending = false
      }).catch(err => {
        console.log(err)
        this.sending = false
      })
      // this.$q.notify('提示 用户名和密码相同 都是工号')
      // // 通知外面要加一个教师 创建成功返回的data
      // this.$emit('addTeacher', this.newInfo)
    }
  },
  computed: {
    collegeOptions () {
      return this.$store.getters['college/selectOptions']
    }
  },
  created () {
    // 获取学院信息 直接copy了 TODO如何封装?
    if (!this.$store.getters['college/isGot']) {
      // 发起网络请求
      course.get().then(res => {
        if (res.code !== '0') {
          console.log(res.msg)
        } else {
          console.log(res)
          this.$store.commit('college/init', res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#radio {
  margin-left: 30px;
}
</style>
