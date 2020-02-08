<template id="">
  <div style="background-color:#fbfbfb">
    <div id="search_content">
      <q-search icon="poll" placeholder="课程号" v-model="search" style="margin-right:10%;margin-bottom:10px"/>
      <q-search icon="pages" placeholder="课程名" v-model="search" style="margin-bottom:10px" />
        <q-search icon="person" placeholder="教师名" v-model="search" style="margin-right:10%;" />
        <q-search icon="reorder" placeholder="学分" v-model="search" />
        <q-search icon="timer" placeholder="时间(格式一1-2)" v-model="search" style="margin-right:10%;"/>
        <q-select
          icon="school"
          v-model="area"
          float-label="校区"
          radio
         :options="selectOptions"
        />
    </div>

    <q-table
    :data="tableData"
    :columns="columns"
    row-key="operation"
    rows-per-page-label="每页显示行数"
    :rows-per-page-options="rowsPerPageOpts"
    >
    <q-tr slot="body" slot-scope="props" :props="props" id="table">
        <q-td key="operation" :props="props"><q-btn round icon="add" size="sm" color="secondary"/></q-td>
        <q-td key="className" :props="props">{{ props.row.className }}</q-td>
        <q-td key="classNo" :props="props">{{ props.row.classNo }}</q-td>
        <q-td key="teacherName" :props="props">{{ props.row.teacherName }}</q-td>
        <q-td key="time" :props="props">{{ props.row.time }}</q-td>
        <q-td key="credit" :props="props">{{ props.row.credit }}</q-td>
        <q-td key="personNum" :props="props">{{ props.row.personNum }}</q-td>
        <q-td key="school" :props="props">{{ props.row.school }}</q-td>
      </q-tr>
  </q-table>
  </div>
</template>
<style media="screen">
#search_content{
  border-color: #fafafa;
  border-style: solid;
  box-shadow: 0px 0px 10px #cdcdcd;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 15px;
}
#table{
  color: #7b7b7b;
}
</style>
<script>
export default{
  name: 'searchClasses',
  data () {
    return {
      area: {},
      rowsPerPageOpts: [5, 10, 0],
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
        required: true,
        label: '操作',
        align: 'center',
        field: 'operation'
      },
      {
        name: 'className',
        label: '课程名',
        align: 'left',
        field: 'className'
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
        label: '时间',
        align: 'left',
        field: 'time'
      },
      {
        name: 'credit',
        label: '学分',
        align: 'left',
        field: 'credit'
      },
      {
        name: 'personNum',
        label: '人数',
        align: 'left',
        field: 'personNum'
      },
      {
        name: 'school',
        label: '校区',
        align: 'left',
        field: 'school'
      }
    ],
      tableData:
    [
      {
        className: '环境与绿色发展',
        classNo: '1100LH01',
        teacherName: '赵兵',
        time: '三7-8(6-10周)',
        credit: '4',
        personNum: '0/70',
        school: '宝山校区'
      },
      {
        className: '环境与绿色发展',
        classNo: '1100LH01',
        teacherName: '赵兵',
        time: '二3-4 五3-4',
        credit: '4',
        personNum: '0/70',
        school: '宝山校区'
      }
    ]
    }
  }
}
</script>
