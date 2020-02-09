<template>
  <div style="background-color:#fbfbfb">
    <blockquote style="margin-top:15px;margin-bottom:15px;color:#7b7b7b">
      已添加的课程如下，最多能添加6门课程
    </blockquote>
    <q-table
    :loading="isLoading"
    :title="title"
    :data="tableData"
    :columns="columns"
    row-key="classNo"
    :hide-bottom="true"
    :pagination.sync="paginationControl">
      <q-tr slot="body" slot-scope="props" :props="props" id="table">
        <q-td key="operation" :props="props"><q-btn round icon="remove" size="sm" color="negative" @click="btnClick(props.row)"/></q-td>
        <q-td key="className" :props="props">{{ props.row.className + 'sss' }}</q-td>
        <q-td key="classNo" :props="props">{{ props.row.classNo }}</q-td>
        <q-td key="teacherName" :props="props">{{ props.row.teacherName }}</q-td>
        <q-td key="time" :props="props">{{ props.row.time }}</q-td>
        <q-td key="state" :props="props" v-if="props.row.state"><q-btn label="成功" color="secondary" size="sm" disable /></q-td>
        <q-td key="state" v-else :props="props"><q-btn label="失败" color="negative" size="sm" disable /></q-td>
        <q-td key="reason" :props="props">{{ props.row.reason }}</q-td>
      </q-tr>
  </q-table>

  <div id="xk_content">
    <div class="flex justify-center">
      <q-btn label="继续添加" style="margin-right:10%" color="secondary"/>
      <q-btn label="开始选课" color="primary"/>
    </div>
  </div>
  </div>
</template>
<style media="screen">
#xk_content{
  border-color: #fafafa;
  border-style: solid;
  box-shadow: 0px 0px 10px #cdcdcd;
  margin-top: 20px;
  padding: 15px;
}
</style>

<script>
export default{
  name: 'SearchClasses',
  methods: {
    btnClick (obj) {
      console.log(obj)
    }
  },
  data () {
    return {
      title: null,
      isLoading: false,
      // selection: 'sssss',
      selected: [],
      paginationControl: { rowsPerPage: 0, page: 1 },
      rangeValues: {
        min: 1,
        max: 13
      },
      selectOptions: [
        {
          label: '宝山校区',
          value: 1
        },
        {
          label: '嘉定校区',
          value: 2
        },
        {
          label: '延长校区',
          value: 3
        }
      ],
      search: '',
      columns:
    [
      {
        name: 'operation',
        label: '操作',
        align: 'center',
        field: 'operation'
      },
      {
        name: 'className',
        label: '课程名',
        align: 'left',
        field: 'className',
        sortable: true
      },
      {
        label: '课程号',
        name: 'classNo',
        align: 'left',
        field: 'classNo'
      },
      {
        name: 'teacherName',
        label: '教师名',
        align: 'left',
        field: 'teacherName'
      },
      {
        name: 'time',
        label: '上课时间',
        align: 'left',
        field: 'time'
      },
      {
        name: 'state',
        label: '选课状态',
        align: 'left',
        field: 'state',
        sortable: true
      },
      {
        name: 'reason',
        label: '原因',
        align: 'left',
        field: 'reason',
        required: true
      }
    ],
      tableData:
    [
      {
        className: '环境与绿色发展',
        classNo: '1100LH01',
        teacherName: '赵兵',
        time: '二3-4 五3-4',
        state: false,
        reason: '尚未开始'
      },
      {
        className: '纳米及纳米催化',
        classNo: '1000Y013',
        teacherName: '汪学广',
        time: '三7-8(6-10周)',
        state: true,
        reason: '选课成功'
      }
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // },
      // {
      //   className: '环境与绿色发展',
      //   classNo: '1100LH01',
      //   teacherName: '赵兵',
      //   time: '二3-4 五3-4',
      //   state: false,
      //   reason: '尚未开始'
      // },
      // {
      //   className: '纳米及纳米催化',
      //   classNo: '1000Y013',
      //   teacherName: '汪学广',
      //   time: '三7-8(6-10周)',
      //   state: true,
      //   reason: '选课成功'
      // }
    ]
    }
  }
}
</script>
