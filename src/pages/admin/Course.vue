<template>
  <div>
    <q-page class="content">
      <q-tabs v-model="selectedTab" color="secondary" text-color="white">
        <!-- 选项卡 - 注意slot="title" -->
        <q-tab default slot="title" label="创建课程" two-lines name="newCourse" icon="edit" />
        <q-tab slot="title" label="开课" two-lines name="openCourse" icon="notifications" />
        <!-- 目标 -->
        <q-tab-pane name="newCourse" keep-alive>
          <!-- 一定要keep-alive -->
          <new-course @newSuccess="addToExistingCourse"/>
        </q-tab-pane>
        <q-tab-pane name="openCourse" keep-alive>
          <open-course
            :selectedCourse.sync="selectedCourse"
          />
        </q-tab-pane>
      </q-tabs>
      <div id="existing-course">
        <!-- <p>已有课程 如果此时的tab是newCourse 传入的操作是删除课程 如果是openCourse 传入操作是选择课程</p> -->
        <existing-course-list
          :operationBtn="courseOperatonBtn"
          :newCourse.sync="newCourse"
          :removedCourseId.sync="removedCourseId"
        />
      </div>
    </q-page>
  </div>
</template>

<script>
import NewCourse from 'components/course/NewCourse'
import OpenCourse from 'components/course/OpenCourse'
import ExistingCourseList from 'components/course/ExistingCourseList'
import Utils from 'common/utils'
import course from 'network/course'

export default {
  name: 'Course',
  components: {
    NewCourse,
    OpenCourse,
    ExistingCourseList
  },
  data () {
    return {
      selectedTab: 'newCourse',
      newCourse: {},
      removedCourseId: null,
      selectedCourse: {}
    }
  },
  computed: {
    courseOperatonBtn () {
      // 切换tab控制下面的已有课程的操作
      if (this.selectedTab === 'newCourse') {
        return {
          icon: 'remove',
          color: 'negative',
          btnClick: courseObj => {
            this.removeCourse(courseObj)
          }
        }
      } else if (this.selectedTab === 'openCourse') {
        return {
          icon: 'add',
          color: 'secondary',
          btnClick: courseObj => {
            console.log('添加课程')
            this.addToOpen(courseObj)
          }
        }
      }
    }
  },
  methods: {
    addToExistingCourse (courseObj) {
      this.newCourse = Utils.deepCopy(courseObj)
      console.log(this.newCourse)
    },
    addToOpen (courseObj) {
      this.selectedCourse = Utils.deepCopy(courseObj)
    },
    removeCourse (courseObj) {
      // todo pop掉，网络请求
      this.$q.dialog({
        title: '删课提示',
        message: '确定要删除这门课吗？',
        ok: {
          push: true,
          label: 'Yes'
        },
        cancel: {
          push: true,
          color: 'negative',
          label: 'No'
        }
      }).then(() => {
        // 发送网络请求，结果返回提示
        course.removeCourse(courseObj.id).then(res => {
          if (res.code === '0') {
            // 从数组里面删去对应id的课程
            const targetId = res.data
            this.removedCourseId = parseInt(targetId)
            this.$q.notify(courseObj.name + ' 删除成功!')
          }
        })
      }).catch(() => {
        this.$q.notify('Nothing...')
      })
    }
  }
}
</script>

<style scoped>
.content{
  padding: 20px 20px 0px 20px;
  background-color: #fafafa;
}
#existing-course {
  margin-bottom: 8vh;
}
</style>
