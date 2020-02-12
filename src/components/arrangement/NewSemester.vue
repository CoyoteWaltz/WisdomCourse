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
        float-label="选课开始日期"
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
        float-label="登分开始日期"
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
    {{newInfo}}
  </div>
</template>

<script>
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
    create () {
      console.log('新建学期')
      this.$emit('newSemester', this.newInfo)
    }
  }
}
</script>

<style scoped>
</style>
