<template>
  <div id="open-course">
    <div id="selected-course" style="margin-top:10px">
      选择课程：
      <span v-show="!isSelected"><b style="color:red">请在下方先选择课程</b></span>
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
      <q-search clearable icon="reorder" float-label="教室" placeholder="教室" v-model.lazy="openInfo.classroom" />
      <q-search clearable icon="group" float-label="容量" placeholder="容量" v-model.lazy.number="openInfo.capacity" />
      <q-select
        icon="school"
        v-model="openInfo.semesterId"
        float-label="学期(确保要有未来学期)"
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
      <q-search
        clearable
        icon="reorder"
        float-label="分数比例 0-1之间的一位小数：平时分的占比(例：0.4表示平时分40%，考试分60%)"
        placeholder="0-1之间的一位小数：平时分的占比(例：0.4表示平时分40%，考试分60%)"
        v-model.lazy.number="openInfo.ratio"
      />
      <q-select
        icon="school"
        v-model="openInfo.area"
        float-label="校区"
        radio
        :options="areaSelectOptions"
      />
      <div class="flex justify-center" style="margin-top:15px;">
        <q-btn label="清空" style="margin-right:25%"  @click="reset" color="primary"/>
        <q-btn label="开" @click="openCourse" color="secondary" :disabled="!isSelected || (openInfo.teacherId === null)" />
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
import openClass from 'network/openClass'
import {AREAINDEX} from 'common/const'

export default {
  name: 'OpenCourse',
  data () {
    return {
      areaSelectOptions: [
        AREAINDEX.baoshan,
        AREAINDEX.yanchang,
        AREAINDEX.jiading
      ],
      isSelected: false,
      openInfo: {
        semesterId: null,
        teacherId: null,
        classroom: '',
        time: '',
        area: '',
        ratio: 0.5,
        capacity: null,
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
      console.log(this.$store.state.college)
    }
  },
  computed: {
    // 记得处理得到的data
    semesterOptions () {
      if (!this.$store.getters['semester/isGot']) {
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
        teacherId: null,
        classroom: '',
        time: '',
        capacity: null,
        ratio: 0.5,
        courseObj: null
      }
    },
    check_form () {
      for (let i in this.openInfo) {
        if (!this.openInfo[i]) {
          this.$q.notify({
            message: '请完善信息',
            color: 'red-12'
          })
          return false
        }
      }
      return true
    },
    openCourse () {
      if (!this.openInfo.area) {
        this.$q.notify({
          message: '信息未完善',
          color: 'negative'
        })
        return
      }
      const area = this.areaSelectOptions.filter((value, index) => {
        return this.openInfo.area === value.id
      })
      // 网络请求 done
      openClass.newOpen({
        course_id: this.openInfo.courseObj.id,
        time: this.openInfo.time,
        teacher_id: this.openInfo.teacherId,
        semester_id: this.openInfo.semesterId,
        classroom: this.openInfo.classroom,
        area: area[0].label,
        score_ratio: this.openInfo.ratio,
        capacity: this.openInfo.capacity
      }).then(res => {
        if (res.code === '0') {
          console.log(res.data)
          this.openInfo.teacherId = null
          this.openInfo.classroom = null
          this.openInfo.time = null
        } else {
          console.log(res.msg)
        }
      })
      console.log('开课 清空老师')
      console.log(this.openInfo)
    }
  },
  created () {
    // 获取所有教师list 做处理
    if (!this.$store.getters['teacher/isGot']) {
      // 发起网络请求
      console.log('get teacher')
      teacher.get().then(res => {
        console.log(res)
        if (res.code === '0') {
          this.$store.commit('teacher/init', res.data)
          this.teacherOptions = res.data
        }
      })
    } else {
      this.teacherOptions = this.$store.state.teacher.teacher_list
    }
  }
}
</script>

<style>

</style>
