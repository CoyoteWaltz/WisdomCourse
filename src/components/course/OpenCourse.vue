<template>
  <div id="open-course">
    <div id="selected-course" style="margin-top:10px">
      选择课程：
      <div v-show="isSelected">
        <!-- 后期美化吧这里 -->
        <q-chip outline color="light-green-3" text-color="#666" style="font-size: 2vh">
          {{selectedCourse.courseNo}} {{selectedCourse.courseName}} {{selectedCourse.collegeName}}
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
    semesterOptions () {
      return [
        {
          id: 1,
          value: 1,
          label: '2019秋季'
        },
        {
          id: 2,
          value: 2,
          label: '2018秋季'
        },
        {
          id: 3,
          value: 3,
          label: '2017秋季'
        },
        {
          id: 4,
          value: 4,
          label: '2016秋季'
        },
        {
          id: 5,
          value: 5,
          label: '2015秋季'
        }
      ]
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
    }
  },
  created () {
    // 获取所有教师list 做处理
    this.teacherOptions = [
      {
        id: 1,
        userNo: '13233',
        username: '王老师',
        collegeName: '计算机学院',
        collegeId: 1
      },
      {
        id: 2,
        userNo: '133',
        username: 'sd老师',
        collegeName: '计算机学院',
        collegeId: 3
      },
      {
        id: 3,
        userNo: '13213',
        username: 'gs老师',
        collegeName: '文学院',
        collegeId: 3
      }
    ]
    this.teacherOptions.forEach((value, index) => {
      value.label = value.username + ' ' + value.userNo + ' (' + value.collegeName + ')'
      value.value = value.id // 必须写
    })
  }
}
</script>

<style>

</style>
