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
      >
      </q-btn>
    </div>
  </div>
</template>

<script>
import Utils from 'common/utils'
import SemesterCard from '../SemesterCard'

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
      console.log(value)
      console.log(this.allSemesters)
      for (let semester of this.allSemesters) {
        if (value === semester.id) {
          this.selectedSemester = Utils.deepCopy(semester)
          return
        }
      }
    },
    set () {
      // 发起网络请求
      this.currentSemester = Utils.deepCopy(this.selectedSemester)
    },
    deleteSemester () {
      this.$q.notify({
        message: '记得提示',
        color: 'negative'
      })
      console.log('删除当前所选的学期')
      console.log(this.selectedSemester)
      // 发送网络请求
      // 改变数据
      this.allSemesters.splice(
        this.allSemesters.findIndex(value => value.id === this.selectedSemester.id), 1
      )
      this.selectedSemester = Utils.deepCopy(this.currentSemester)
      console.log(this.currentSemester)
    }
  },
  created () {
    // 网络请求获取
    const data = {
      allSemesters: [
        {
          name: '2020-2021秋季学期',
          id: 1,
          selectionStart: '2019/2/2',
          selectionEnd: '2019/2/22',
          registerStart: '2019/6/2',
          registerEnd: '2019/7/2',
          creditCeiling: 35
        },
        {
          name: '2022-2023秋季学期',
          id: 444,
          selectionStart: '2019/2/2',
          selectionEnd: '2019/2/22',
          registerStart: '2019/6/2',
          registerEnd: '2019/7/2',
          creditCeiling: 35
        },
        {
          name: '2023-2024秋季学期',
          id: 23,
          selectionStart: '2019/2/2',
          selectionEnd: '2019/2/22',
          registerStart: '2019/6/2',
          registerEnd: '2019/7/2',
          creditCeiling: 35
        }
      ],
      currentSemester: {
        name: '2020-2021秋季学期',
        id: 1,
        selectionStart: '2019/2/12',
        selectionEnd: '2019/2/22',
        registerStart: '2019/6/12',
        registerEnd: '2019/7/2',
        creditCeiling: 35
      }
    }
    this.allSemesters = data.allSemesters
    this.allSemesters.forEach((value, number) => {
      value.value = value.id
      value.label = value.name
    })
    this.currentSemester = data.currentSemester
    this.currentSemester.value = this.currentSemester.id
    this.currentSemester.label = this.currentSemester.name
    this.selectedSemester = Utils.deepCopy(this.currentSemester)
  }
}
</script>

<style>

</style>
