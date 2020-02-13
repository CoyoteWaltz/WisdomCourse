<template>
  <div>
    <teacher-list :addTeacher.sync="newTeacherObj"></teacher-list>
    <div class="row justify-center">
      <new-teacher @addTeacher="addToTeacherList"></new-teacher>
    </div>
  </div>
</template>

<script>
import TeacherList from './TeacherList'
import NewTeacher from './NewTeacher'
import Utils from 'common/utils'

export default {
  name: 'TeacherManage',
  components: {
    TeacherList,
    NewTeacher
  },
  data () {
    return {
      newTeacherObj: []
    }
  },
  methods: {
    addToTeacherList (teacherObj) {
      this.newTeacherObj = Utils.deepCopy(teacherObj)
    }
  }
}
</script>

<style>

</style>
