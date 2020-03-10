<template>
  <!-- 课程表组件封装 -->
  <q-table
    bordered
    row-key="id"
    :title="title"
    :data="tableData"
    :columns="columns"
    :loading="isLoading"
    :visible-columns="visibleColumns"
    :color="color"
    :hide-bottom="hideBottom"
    :pagination.sync="paginationControl"
    table-style="max-height: 45vh"
  >
    <q-tr slot="body" slot-scope="props" :props="props" id="table">
      <q-td key="operation" :props="props">
        <q-btn
          push
          size="sm"
          :icon="operationBtn.icon"
          :color="operationBtn.color"
          :label="operationBtn.label"
          :round="operationBtn.shape"
          @click="btnClick(props.row)"
        />
      </q-td>
      <q-td key="index" :props="props">{{ props.row.index}}</q-td>
      <q-td key="username" :props="props">{{ props.row.name}}</q-td>
      <q-td key="userNo" :props="props">{{ props.row.user_no }}</q-td>
      <q-td key="sex" :props="props">{{ props.row.sex }}</q-td>
      <q-td key="college" :props="props">{{ props.row.college_name }}</q-td>
      <q-td key="scoreUsual" :props="props">
        <q-field
          style="width: 40px"
        >
          <q-input v-model.number="props.row.usual_score" />
        </q-field>
      </q-td>
      <q-td key="scoreExam" :props="props">
        <q-field
          style="width: 40px"
        >
          <q-input v-model.number="props.row.exam_score" />
        </q-field>
      </q-td>
      <q-td key="scoreFinal" :props="props">
        <q-field
          style="width: 40px"
        >
          {{ props.row.final_score }}
          <!-- <q-input disabled="true" v-model.number="props.row.final_score" /> -->
        </q-field>
      </q-td>
      <q-td key="info" :props="props">{{ props.row.info }}</q-td>
    </q-tr>
  </q-table>
</template>

<script>
export default {
  name: 'PureUserTable',
  mounted () {
  },
  computed: {
  },
  methods: {
    btnClick (userObj) {
      // 直接调给父组件
      this.$emit('userOperation', userObj)
    }
  },
  data () {
    return {
      // selected: [],
      paginationControl: { rowsPerPage: 0, page: 1 }, // 这里给0就会展示所有
      columns: [
        {
          name: 'operation',
          label: '操作',
          align: 'center',
          field: 'operation'
        },
        {
          name: 'index',
          label: '序号',
          align: 'center',
          field: 'index',
          required: true
        },
        {
          name: 'username',
          label: '姓名',
          align: 'left',
          field: 'username',
          required: true
        },
        {
          label: '学/工号',
          name: 'userNo',
          align: 'center',
          field: 'userNo',
          sortable: true,
          required: true
        },
        {
          label: '性别',
          name: 'sex',
          align: 'center',
          field: 'sex',
          required: true
        },
        {
          name: 'college',
          label: '学院',
          align: 'center',
          field: 'college',
          sortable: true,
          required: true
        },
        {
          name: 'scoreUsual',
          label: '平时成绩',
          align: 'left',
          sortable: true,
          field: 'info'
        },
        {
          name: 'scoreExam',
          label: '考试成绩',
          align: 'left',
          sortable: true,
          field: 'info'
        },
        {
          name: 'scoreFinal',
          label: '总评成绩',
          align: 'left',
          sortable: true,
          field: 'info'
        },
        {
          name: 'info',
          label: '备注信息',
          align: 'left',
          field: 'info'
        }
      ]
    }
  },
  props: {
    // 传递属性和值
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    hideBottom: {
      type: Boolean,
      default () {
        return true
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    },
    visibleColumns: {
      type: Array,
      default () {
        return []
      }
    },
    isLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    color: {
      type: String,
      default () {
        return 'secondary'
      }
    },
    operationBtn: {
      type: Object,
      default () {
        return {
          color: 'negative',
          icon: 'remove',
          shape: true,
          label: ''
        }
      }
    }
  }
}
</script>

<style>

</style>
