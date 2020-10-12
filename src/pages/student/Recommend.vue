<template>
  <q-page id="recommendation">
    <div class="container">
      <h2>为您推荐的课程</h2>
      <pure-class-table
        :tableStyle="'width: 100%; margin-top: 12vh; max-height: 75vh;'"
        :tableData="tableData"
        :visible-columns="visibleColumns"
        :operationBtn="operationBtn"
        @classOperation="addSelection"
      />
    </div>
  </q-page>
</template>
<style>

</style>
<script>
import PureClassTable from 'components/PureClassTable'

export default {
  name: 'Recommend',
  components: {
    PureClassTable
  },
  data () {
    return {
      // 0600RH31 创新创业与知识产权
      // 3100RH60 中国经典音乐
      // 0300JH01 跨文化沟通
      // 0400JH01 生活中的经济学
      // 0400JH02 金融与社会
      // 2400JH01 管理思维与方法
      // 0100LH01 物理学与技术进步
      // 0700LH02 创新思维与方法
      // 1200LH01 生命的奥秘
      // 1400RH01 经典华语电影
      visibleColumns: ['operation']
    }
  },
  computed: {
    tableData () {
      return [
        {
          id: '-1',
          name: '创新创业与知识产权',
          course_no: '0600RH31',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-2',
          name: '中国经典音乐',
          course_no: '3100RH60',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-3',
          name: '跨文化沟通',
          course_no: '0300JH01',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-4',
          name: '生活中的经济学',
          course_no: '0400JH01',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-5',
          name: '金融与社会',
          course_no: '0400JH02',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-6',
          name: '管理思维与方法',
          course_no: '2400JH01',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-7',
          name: '物理学与技术进步',
          course_no: '0700LH02',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-8',
          name: '创新思维与方法',
          course_no: '0700LH02',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-9',
          name: '生命的奥秘',
          course_no: '1200LH01',
          credit: 4,
          area: '宝山'
        },
        {
          id: '-10',
          name: '经典华语电影',
          course_no: '1400RH01',
          credit: 4,
          area: '宝山'
        }
      ]
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
  methods: {
    addSelection (clsObj) {
      // 保存到store.state.user.selectedClasses
      this.$store.commit('user/addSelection', clsObj)
    }
  }
}
</script>

<style scoped>

.container {
  width: 100%;
  position: relative;
  overflow: scroll;
}

.container h2 {
  color: #1c857bc2;
  font-size: 24px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
