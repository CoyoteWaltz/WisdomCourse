<template>
  <div>
    <q-search icon="flag" float-label="学期名称" placeholder="例:2019-2020年秋季学期" v-model.lazy="newInfo.name" style="margin-bottom:10px" />
    <q-field
      icon="event_available"
    >
      <q-datetime
        type="date"
        format-model="string"
        v-model="newInfo.selectionStart"
        :error="selectionError"
        float-label="选课开始日期(小于登分开始时间！)"
        clearable
      />
    </q-field>
    <q-field
      icon="block"
    >
      <q-datetime
        type="date"
        format-model="string"
        v-model="newInfo.selectionEnd"
        :error="selectionError"
        float-label="选课结束日期"
        clearable
      />
    </q-field>
    <q-search icon="disc_full" float-label="学分上限" placeholder="学分上限" v-model.lazy.number="newInfo.creditCeiling" />
    <q-field
      icon="laptop"
    >
      <q-datetime
        type="date"
        format-model="string"
        v-model="newInfo.registerStart"
        :error="registerError"
        float-label="登分开始日期(大于选课开始时间！)"
        clearable
      />
    </q-field>
    <q-field
      icon="block"
    >
        <!-- format="YYYY-MM-DD" -->
      <q-datetime
        type="date"
        format-model="string"
        v-model="newInfo.registerEnd"
        :error="registerError"
        float-label="登分结束日期"
        clearable
      />
    </q-field>
    <div class="flex justify-center" style="margin-top:15px;">
      <q-btn color="indigo-6" label="新建学期" push @click="create"/>
    </div>
  </div>
</template>

<script>
import semester from 'network/semester'
export default {
  name: 'NewSemester',
  computed: {
    selectionError () {
      return this.newInfo.selectionStart > this.newInfo.selectionEnd
    },
    registerError () {
      return this.newInfo.registerStart > this.newInfo.registerEnd
    }
  },
  data () {
    return {
      newInfo: {
        name: '',
        creditCeiling: 35,
        selectionStart: '',
        selectionEnd: '',
        registerStart: '',
        registerEnd: ''
      }
    }
  },
  methods: {
    check_form () {
      for (let i in this.newInfo) {
        if (!this.newInfo[i]) {
          this.$q.notify({
            message: '信息未完善',
            color: 'red-12'
          })
          return false
        }
      }
      if (!(this.newInfo.selectionStart < this.newInfo.selectionEnd &&
          this.newInfo.registerStart < this.newInfo.registerEnd &&
          this.newInfo.selectionStart < this.newInfo.registerStart)) {
        this.$q.notify({
          message: '时间信息不正确',
          color: 'red-12',
          icon: 'clock'
        })
        return false
      }
      return true
    },
    create () {
      console.log('新建学期')
      // 网络请求
      if (!this.check_form()) {
        return
      }
      semester.newSemester({
        name: this.newInfo.name,
        selection_start: this.newInfo.selectionStart,
        selection_end: this.newInfo.selectionEnd,
        register_start: this.newInfo.registerStart,
        register_end: this.newInfo.registerEnd,
        credit_ceiling: this.newInfo.creditCeiling
      }).then(res => {
        if (res.code === '0') {
          this.$store.commit('semester/addSemester', res.data)
          this.$emit('newSemester', res.data)
          this.$q.notify({
            message: '新建学期成功！'
          })
          this.newInfo = {
            name: '',
            creditCeiling: 35,
            selectionStart: '',
            selectionEnd: '',
            registerStart: '',
            registerEnd: ''
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
