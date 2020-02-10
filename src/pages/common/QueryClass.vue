<template>
  <q-page class="content">
    <q-tabs v-model="selectedTab" color="secondary" text-color="white">
      <!-- 选项卡 - 注意slot="title" -->
      <q-tab default slot="title" label="我的课程" two-lines name="myClasses" icon="date_range" />
      <q-tab slot="title" label="搜索课程" two-lines name="queryClasses" icon="search" />

      <!-- 目标 -->
      <q-tab-pane name="myClasses" keep-alive>
        <!-- 一定要keep-alive -->
        <my-classes-table v-if="userId === studentId || userId === teacherId"/>
        <!-- 课程list -->
        <student-class-list  v-if="userId === studentId"/>
        <teacher-class-list v-if="userId === teacherId"/>
        <admin-class-list v-if="userId === adminId"/>
      </q-tab-pane>
      <q-tab-pane name="queryClasses" keep-alive>
        <searchClasses />
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<style scoped>
.content{
  padding: 20px 20px 0px 20px;
  background-color: #fafafa;
}
</style>
<script>
import MyClassesTable from 'components/query/MyClassesTable.vue'
import StudentClassList from 'components/query/StudentClassList.vue'
import SearchClasses from 'components/query/SearchClasses.vue'
import TeacherClassList from 'components/query/TeacherClassList.vue'
import AdminClassList from 'components/query/AdminClassList.vue'

import {IDINDEX} from 'common/const'

export default {
  name: 'QueryClass',
  components: {
    MyClassesTable,
    StudentClassList,
    SearchClasses,
    TeacherClassList,
    AdminClassList
  },
  data () {
    return {
      selectedTab: 'myClasses',
      studentId: IDINDEX.student.value,
      teacherId: IDINDEX.teacher.value,
      adminId: IDINDEX.admin.value
    }
  },
  computed: {
    userId () {
      return this.$store.state.user.info.identity
    }
  }
}
</script>
