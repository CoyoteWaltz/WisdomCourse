<template>
  <q-page class="content">
    <q-tabs v-model="selectedTab" color="secondary" text-color="white">
      <!-- 选项卡 - 注意slot="title" -->
      <q-tab default slot="title" label="当前课表" two-lines name="myClasses" icon="date_range" />
      <q-tab slot="title" label="搜索课程" two-lines name="queryClasses" icon="search" />

      <!-- 目标 -->
      <q-tab-pane name="myClasses">
        <myClasses />
      </q-tab-pane>
      <q-tab-pane name="queryClasses">
        <searchClasses />
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<style>
.content{
  padding: 20px 20px 0px 20px;
  background-color: #fafafa;
}
</style>
<script>
import myClasses from 'components/myClasses.vue'
import searchClasses from 'components/searchClasses.vue'
export default {
  name: 'PageQueryClass',
  components: {
    myClasses,
    searchClasses
  },
  data () {
    return {
      selectedTab: 'myClasses'
    }
  }
}
</script>
