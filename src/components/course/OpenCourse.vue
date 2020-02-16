<template>
  <div id="open-course">
    <div id="selected-course" style="margin-top:10px">
      选择课程：
      <span v-show="!isSelected"><b>请在下方先选择课程</b></span>
      <div v-show="isSelected">
        <!-- 后期美化吧这里 -->
        <q-chip outline color="light-green-3" text-color="#666" style="font-size: 2vh">
          {{selectedCourse.course_no}} {{selectedCourse.name}} {{selectedCourse.college_name}}
        </q-chip>
        <q-btn @click="deselect" size="sm" color="negative" style="margin-left:20px" round icon="remove"></q-btn>
      </div>
    </div>
   <div id="config_content">
      <q-search clearable icon="pages" float-label="时间" placeholder="例如:一1-2,三6-9" v-model.lazy="openInfo.time" style="margin-bottom:10px" />
      <q-search clearable icon="reorder" float-label="教室" placeholder="教室" v-model.lazy.number="openInfo.classroom" />
      <q-select
        icon="school"
        v-model="openInfo.semesterId"
        float-label="学期"
        radio
        :options="semesterOptions"
      />
      <q-select
        float-label="授课教师"
        clearable
        filter
        v-model="openInfo.teacherId"
        :options="teacherOptions"
      />
      <div class="flex justify-center" style="margin-top:15px;">
        <q-btn label="清空" style="margin-right:25%"  @click="reset" color="primary"/>
        <q-btn label="开" @click="openCourse" color="secondary" :disabled="!isSelected || (openInfo.teacherId === null)" />
        <!-- <q-btn label="开" @click="openCourse" color="secondary" :disabled="!(isSelected && (openInfo.teacherId !== null))" /> -->
      </div>
    </div>
  </div>
</template>

<script>
/*
开课 填信息:
选择学期
选择教师(多选)
上课时间
教室
*/
import teacher from 'network/teacher'

export default {
  name: 'OpenCourse',
  data () {
    return {
      isSelected: false,
      openInfo: {
        semesterId: null,
        teacherId: null,
        classroom: '',
        time: '',
        courseObj: null
      },
      teacherOptions: []
    }
  },
  props: {
    // existingCourseList传递来的courseObj
    selectedCourse: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    selectedCourse (newValue) {
      this.isSelected = true
      this.openInfo.courseObj = newValue
      console.log('更新！')
    }
  },
  computed: {
    // 记得处理得到的data
    semesterOptions () {
      if (!this.$store.getters['semester/isGot']) {
        this.$store.dispatch('semester/get')
        return []
      }
      return this.$store.getters['semester/getFutureOptions']
    }
  },
  methods: {
    deselect () {
      this.isSelected = false
      this.openInfo.courseObj = {}
    },
    reset () {
      this.deselect()
      this.openInfo = {
        semesterId: null,
        teacherObj: null,
        classroom: '',
        time: '',
        courseObj: null
      }
    },
    openCourse () {
      console.log('开课 清空老师')
      console.log(this.openInfo)
      this.openInfo.teacherId = null
    },
    formatData () {
      this.teacherOptions.forEach((value, index) => {
        value.label = value.name + ' ' + value.user_no + ' (' + value.college_name + ')'
        value.value = value.id // 必须写
      })
    }
  },
  created () {
    // 获取所有教师list 做处理
    if (!this.$store.getters['teacher/isGot']) {
      // 发起网络请求
      teacher.get().then(res => {
        if (res.code === '0') {
          this.$store.commit('teacher/init', res.data)
          this.teacherOptions = res.data
          this.formatData()
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.teacherOptions = this.$store.state.teacher.teacher_list
      this.formatData()
    }
    // this.teacherOptions = [
    //   {
    //     id: 1,
    //     userNo: '13233',
    //     username: '王老师',
    //     collegeName: '计算机学院',
    //     collegeId: 1
    //   },
    //   {
    //     id: 2,
    //     userNo: '133',
    //     username: 'sd老师',
    //     collegeName: '计算机学院',
    //     collegeId: 3
    //   },
    //   {
    //     id: 3,
    //     userNo: '13213',
    //     username: 'gs老师',
    //     collegeName: '文学院',
    //     collegeId: 3
    //   }
    // ]
  }
}
</script>

<style>

</style>
