<template>
  <div>
    <pure-class-table
      :operationBtn="operationBtn"
      :hide-bottom="false"
      :visible-columns="columns"
      :tableData="tableItems"
      @classOperation="addSelection"
    >
    </pure-class-table>
  </div>
</template>

<script>
import PureClassTable from '../PureClassTable'
import {IDINDEX} from 'common/const'

export default {
  name: 'AddSelection',
  components: {
    PureClassTable
  },
  computed: {
    columns () {
      // 只有学生身份才可以加入待选！
      if (this.$store.state.user.info.identity === IDINDEX.student.value) {
        return ['operation']
      }
      return []
    }
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
      console.log('TODO 加入待选')
      console.log(clsObj)
    }
  },
  created () {
  }
}
</script>

<style>

</style>
