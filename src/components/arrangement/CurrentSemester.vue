<template>
  <div>
    <!-- 学期信息 两个卡片 默认展示第一个卡片当前学期
    当选择了新的学期 展示第二个卡片 更新其为当前学期之后
    更新 -->
    <div class="flex justify-around">
      <semester-card :semesterObj="currentSemester"/>
      <semester-card
        v-if="isSelected"
        :semesterObj="selectedSemester"
        cardColor="blue-grey-6"
        title="选择学期"
        iconColor="blue-grey-1"
        style="margin-left:25px"
      >
        <template>
          <q-item-main>
            <q-card-actions>
              <q-btn @click="deleteSemester" color="negative" label="删除"/>
            </q-card-actions>
          </q-item-main>
        </template>
      </semester-card>
    </div>
    <div class="flex justify-around" style="margin-top: 10px">
      <q-select
        radio
        v-model="selectedSemester.value"
        :options="allSemesters"
        float-label="当前学期"
        @input="switchSemester"
      />
      <q-btn
        :push="isSelected"
        style="height:30px; top:13px"
        color="primary"
        label="设定"
        :disabled="!isSelected"
        @click="set"
      />
    </div>
  </div>
</template>

<script>
import Utils from 'common/utils'
import SemesterCard from '../SemesterCard'
import semester from 'network/semester'

export default {
  name: 'CurrentSemester',
  components: {
    SemesterCard
  },
  data () {
    return {
      currentSemester: {},
      selectedSemester: {},
      // created的时候获取所有的学期 信息 以及 当前学期
      allSemesters: []
    }
  },
  computed: {
    // 选择了新的学期 并且 新的学期和当前学期不一样
    isSelected () {
      return this.selectedSemester.id && (this.selectedSemester.id !== this.currentSemester.id)
    }
  },
  props: {
    addSemester: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    addSemester (newValue) {
      this.allSemesters.push(newValue)
    }
  },
  methods: {
    switchSemester (value) {
      for (let semester of this.allSemesters) {
        if (value === semester.id) {
          this.selectedSemester = Utils.deepCopy(semester)
          return
        }
      }
    },
    set () {
      // 发起网络请求 成功之后赋值
      semester.setCurrent(this.selectedSemester.value).then(res => {
        if (res.code === '0') {
          this.currentSemester = Utils.deepCopy(this.selectedSemester)
          this.$store.commit('semester/switchCurrent', this.currentSemester)
        }
      })
    },
    deleteSemester () {
      this.$q.notify({
        message: '记得提示',
        color: 'negative'
      })
      // 发送网络请求
      // 改变数据
      semester.deleteSemester(this.selectedSemester.id).then(res => {
        if (res.code === '0') {
          this.allSemesters.splice(
            this.allSemesters.findIndex(value => value.id === res.data), 1
          )
          this.$store.commit('semester/deleteOneSemester')
          this.selectedSemester = Utils.deepCopy(this.currentSemester)
        }
      })
    },
    assignSemester () {
      // 这我写的啥几把玩意 啊
      this.currentSemester = Utils.deepCopy(this.$store.state.semester.current_semester)
      this.allSemesters = Utils.deepCopy(this.$store.state.semester.semester_list)
      this.selectedSemester = Utils.deepCopy(this.currentSemester)
    }
  },
  created () {
    // 网络请求获取 或者 store
    if (!this.$store.getters['semester/isGot']) {
      // 发起网络请求
      semester.get().then(res => {
        if (res.code === '0') {
          this.$store.commit('semester/init', res.data)
          // 更新绑定的学期id
          this.assignSemester()
        }
      })
    } else { // 给this的赋值一下
      this.assignSemester()
    }
  }
}
</script>

<style>

</style>
