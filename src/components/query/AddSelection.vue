<template>
  <div>
    <pure-class-table
      :operationBtn="operationBtn"
      :hide-bottom="false"
      :visible-columns="['operation']"
      :tableData="tableItems"
      @classOperation="addSelection"
    >
    </pure-class-table>
  </div>
</template>

<script>
import PureClassTable from '../PureClassTable'
export default {
  name: 'AddSelection',
  components: {
    PureClassTable
  },
  data () {
    return {
      operationBtn: {
        label: '加入待选',
        color: 'secondary'
      }
    }
  },
  props: {
    // 传递来的课程list
    tableItems: {
      type: Array,
      defalut () {
        return []
      }
    }
  },
  methods: {
    addSelection (clsObj) {
      // 保存到store.state.user.selectedClasses
      console.log(clsObj)
    }
  }
}
</script>

<style>

</style>
