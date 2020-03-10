<template>
  <div>
    <q-page class="content">
      <q-tabs v-model="selectedTab" color="secondary" text-color="white">
        <!-- 选项卡 - 注意slot="title" -->
        <q-tab default slot="title" label="学期设置" two-lines name="semesterSetting" icon="edit" />
        <q-tab slot="title" label="教师管理" two-lines name="teacherManage" icon="notifications" />
        <!-- 目标 -->
        <q-tab-pane name="semesterSetting" keep-alive>
          <!-- 一定要keep-alive -->
          <semester-setting/>
        </q-tab-pane>
        <q-tab-pane name="teacherManage" keep-alive>
          <teacher-manage/>
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
