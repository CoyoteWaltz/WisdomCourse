<template>
  <div>
    <div>
      <h3>创建课程</h3>
      <p>设置学院 课程名 学分 学时</p>
      <p>创建</p>
      <h3>查看课程</h3>
      <p>查看已有课程list</p>
      <h3>开课</h3>
      <p>根据课程列表 老师列表 创建开课信息</p>
      <p>教师号 上课时间 教师 学期</p>
      <hr>
      <p>综上，需要数据:</p>
      <ul>
        <li>学院</li>
        <li>已有课程: index 课程名 课程号 学院 学分 学时</li>
        <li>已有老师</li>
      </ul>
      <p>向数据库新增数据:</p>
      <ul>
        <li>新建课程</li>
        <li>新建开课</li>
      </ul>
    </div>
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
          <!-- sth -->
        </q-tab-pane>
      </q-tabs>
      <div id="existing-course">
        <p>已有课程 如果此时的tab是newCourse 传入的操作是删除课程 如果是openCourse 传入操作是选择课程</p>
        <existing-course-list :operationBtn="courseOperatonBtn" :newCourse.sync="newCourse"/>
      </div>
    </q-page>
  </div>
</template>

<script>
import NewCourse from 'components/course/NewCourse'
import ExistingCourseList from 'components/course/ExistingCourseList'
import Utils from 'common/utils'

export default {
  name: 'Course',
  components: {
    NewCourse,
    ExistingCourseList
  },
  data () {
    return {
      selectedTab: 'newCourse',
      newCourse: {}
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
    // TODO 向组件ExistingCourseList添加新建的课程
    addToExistingCourse (courseObj) {
      console.log('addToExisting')
      this.newCourse = Utils.deepCopy(courseObj)
      console.log(this.newCourse)
    },
    addToOpen (courseObj) {
      console.log(courseObj)
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
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('请求结束')
            if (parseInt((Math.random() * 100)) % 2 === 0) {
              resolve()
            } else {
              reject(Error('失败了'))
            }
          }, 1200)
        }).then(res => {
          // 将这门课取消显示
          this.$q.notify(courseObj.courseName + '删除成功')
        }).catch(err => {
          this.$q.notify({
            message: err.message + courseObj.courseName,
            color: 'negative'
          })
        })
      }).catch(() => {
        // this.$q.notify('Disagreed...')
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
