<template>
  <div>
    <!-- <h3>教学安排</h3>
    <h3>新建学期信息</h3>
    <ul>
      <li>名称</li>
      <li>选课时间start</li>
      <li>选课时间end</li>
      <li>登分时间start</li>
      <li>登分时间很多</li>
    </ul>
    <h3>设置学期</h3> -->
    <h3>新建老师信息</h3>
    <q-page class="content">
      <q-tabs v-model="selectedTab" color="secondary" text-color="white">
        <!-- 选项卡 - 注意slot="title" -->
        <q-tab default slot="title" label="学期设置" two-lines name="semesterSetting" icon="edit" />
        <q-tab slot="title" label="教师管理" two-lines name="teacherManage" icon="notifications" />
        <!-- 目标 -->
        <q-tab-pane name="semesterSetting" keep-alive>
          <!-- 一定要keep-alive -->
          <semester-setting></semester-setting>
        </q-tab-pane>
        <q-tab-pane name="teacherManage" keep-alive>
          <teacher-manage></teacher-manage>
        </q-tab-pane>
      </q-tabs>
    </q-page>
  </div>
</template>

<script>
import SemesterSetting from 'components/arrangement/SemesterSetting'
import TeacherManage from 'components/arrangement/TeacherManage'

export default {
  name: 'Arrangement',
  components: {
    SemesterSetting,
    TeacherManage
  },
  data () {
    return {
      selectedTab: 'semesterSetting'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
