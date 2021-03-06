<template>
    <!-- 课程表组件封装 -->
    <div>
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
        :table-style="tableStyle"
        rows-per-page-label="每页显示行数"

      >
        <!-- <template slot="top" slot-scope="props"> -->
          <!-- 这个项目的quasar 0.8..只支持vue < 2.5的slot语法 -->
        <!-- </template> -->
        <q-tr slot="body" slot-scope="props" :props="props" id="table">
          <q-td key="operation" :props="props">
            <q-btn
              push
              size="sm"
              :icon="operationBtn.icon"
              :color="operationBtn.color"
              :label="operationBtn.label"
              :round="operationBtn.isRound"
              :disabled="operationBtn.isDisabled"
              @click="btnClick(props.row)"
            />
          </q-td>
          <q-td key="state" :props="props" v-if="props.row.select_status === true">
            <q-btn label="成功" color="secondary" size="sm" disable />
          </q-td>
          <q-td key="state" v-else-if="props.row.select_status === false" :props="props">
            <q-btn label="失败" color="negative" size="sm" disable />
          </q-td>
          <q-td key="state" v-else :props="props">
            <q-btn label="等待选课" color="grey" size="sm" disable />
          </q-td>
          <!-- 下面的顺序也必须和 column 的顺序一样 -->
          <q-td key="info" :props="props">{{ props.row.info ? props.row.info: '暂无选课信息' }}</q-td>
          <q-td key="className" :props="props">{{ props.row.name}}</q-td>
          <q-td key="classNo" :props="props">{{ props.row.course_no }}</q-td>
          <q-td key="credit" :props="props">{{ props.row.credit }}</q-td>
          <q-td key="area" :props="props">{{ props.row.area }}</q-td>
          <q-td key="teacherName" :props="props">{{ props.row.teacher_name }}</q-td>
          <q-td key="teacherNo" :props="props">{{ props.row.teacher_no }}</q-td>
          <q-td key="time" :props="props">{{ props.row.time }}</q-td>
          <q-td key="capacity" :props="props">{{ props.row.selected_num }} /{{ props.row.capacity }}</q-td>
          <q-td key="selectedNum" :props="props">{{ props.row.selected_num }}</q-td>
          <q-td key="classroom" :props="props">{{ props.row.classroom }}</q-td>
          <q-td key="college" :props="props">{{ props.row.college_name }}</q-td>
          <q-td key="grade" :props="props" v-if="props.row.grade"></q-td>
        </q-tr>
      </q-table>
    </div>
</template>

<script>
export default {
  name: 'PureClassTable',
  mounted () {
  },
  methods: {
    btnClick (clsObj) {
      // 直接调给父组件
      this.$emit('classOperation', clsObj)
      // clsObj: {
      //   name,
      //   course_no,
      //   teacher_name,
      //   teacher_no,
      //   collegeName,
      //   selectedNum,
      //   capacity,
      //   area,
      //   hour,
      //   classroom,
      //   time,
      //   credit,
      //   selectStatus
      // }
    }
  },
  data () {
    return {
      // selected: [],
      paginationControl: { rowsPerPage: 0, page: 1 }, // 这里给0就会展示所有
      // columns 的顺序决定了在 table 中 th 的顺序
      columns: [
        {
          name: 'operation',
          label: '操作',
          align: 'center',
          field: 'operation'
        },
        {
          name: 'state',
          label: '选课状态',
          align: 'left',
          field: 'state',
          sortable: true
        },
        {
          name: 'info',
          label: '备注信息',
          align: 'left',
          field: 'info'
        },
        {
          name: 'className',
          label: '课程名',
          align: 'left',
          field: 'className',
          required: true
        },
        {
          label: '课程号',
          name: 'classNo',
          align: 'left',
          field: 'classNo',
          sortable: true,
          required: true
        },
        {
          name: 'credit',
          label: '学分',
          align: 'center',
          field: 'credit',
          sortable: true,
          required: true
        },
        {
          name: 'area',
          label: '校区',
          align: 'center',
          field: 'area',
          required: true
        },
        {
          name: 'teacherName',
          label: '教师名',
          align: 'left',
          field: 'teacherName',
          required: true
        },
        {
          name: 'teacherNo',
          label: '教工号',
          align: 'center',
          field: 'teacherNo',
          required: true
        },
        {
          name: 'time',
          label: '上课时间',
          align: 'left',
          field: 'time',
          required: true
        },
        {
          name: 'capacity',
          label: '人数上限',
          align: 'center',
          field: 'capacity',
          required: true
        },
        {
          name: 'selectedNum',
          label: '选课人数',
          align: 'center',
          field: 'selectedNum'
        },
        {
          name: 'classroom',
          label: '教室',
          align: 'center',
          field: 'classroom',
          required: true
        },
        {
          name: 'college',
          label: '学院',
          align: 'left',
          field: 'college',
          required: true,
          sortable: true
        },
        {
          name: 'grade',
          label: '成绩',
          align: 'center',
          field: 'grade',
          sortable: true
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
          color: 'secondary',
          icon: 'pan_tool',
          // shape: 'round',
          isRound: false,
          label: '',
          isDisabled: false
        }
      }
    },
    tableStyle: {
      type: String,
      default () {
        return 'max-height: 45vh;'
      }
    }
  }
}
</script>

<style>

</style>
