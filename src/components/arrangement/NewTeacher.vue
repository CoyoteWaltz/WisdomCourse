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
        性别：
        <q-radio style="margin-left:30px" icon="person" v-model="newInfo.sex" val="0" label="男" />
        <q-radio style="margin-left:30px" icon="person" v-model="newInfo.sex" val="1" label="女" />
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
        <q-btn push color="primary" label="新建教师" @click="create"/>
      </q-item>
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  name: 'NewTeacher',
  data () {
    return {
      newInfo: {
        name: '',
        collegeId: null,
        sex: 0
      },
      collegeOptions: []
    }
  },
  methods: {
    create () {
      console.log('新建教师')
      this.$q.notify('提示 用户名和密码相同 都是工号')
      // 通知外面要加一个教师 创建成功返回的data
      this.$emit('addTeacher', this.newInfo)
    }
  },
  created () {
    // TODO 可以封装一下获得这些数据的函数 存到store
    this.collegeOptions = [
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
#radio {
  margin-left: 30px;
}
</style>
