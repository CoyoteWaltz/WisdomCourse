<template>
  <div>
    <q-slide-transition>
      <div style="margin:1vh 0;" class="flex justify-around selection-prompt" v-if="$store.state.user.selectedClasses.length > 0">
        <div class="selection-prompt-word col-4">
          <div id="outer-word">
            已选：{{$store.state.user.selectedClasses.length}} 门
            <div id="inner-word">
              每次最多选6门课~
            </div>
          </div>
        </div>
        <div class="selection-prompt-action col-5">
            <q-btn
              text-color="blue-grey-10"
              icon="done_all"
              color="info"
              label="去选课"
              @click="$router.push('/autoxk')"
            />
        </div>
        <div class="selection-prompt-action col-3">
            <q-btn
              icon="replay"
              color="red-12"
              label="清空"
              @click="$store.commit('user/removeAllSelection')"
            />
        </div>
      </div>
    </q-slide-transition>
    <pure-class-table
      :operationBtn="operationBtn"
      :hide-bottom="false"
      :visible-columns="columns"
      :tableData="tableItems"
      @classOperation="addSelection"
    />

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
    },
    operationBtn () {
      if (this.$store.getters['semester/canSelect']) {
        return {
          label: '加入待选',
          color: 'secondary',
          isDisabled: false
        }
      } else {
        return {
          label: '未到选课时间',
          color: 'grey-9',
          isDisabled: true
        }
      }
    }
  },
  data () {
    return {

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
      this.$store.commit('user/addSelection', clsObj)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  #inner-word {
    color: #c58d44;
    font-size: 13px;
  }
  #outer-word {
    padding-right: 2px;
  }
  #selection-prompt-word {
    height:100%;
    margin:auto 0;
  }
  #selection-prompt-action {
    margin-left:5px;
    margin-right:5px;
  }

</style>
