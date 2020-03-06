<template id="">
  <div style="background-color:#fbfbfb;">
    <q-table
    :data="tableData"
    :columns="columns"
    row-key="time"
    hide-bottom
    :pagination.sync="paginationControl">
    <q-tr slot="body" slot-scope="props" :props="props" style="color:#F0F0F0">
      <q-td key="time" :props="props" :style="{'background-color':props.row.colors[0]}">{{ props.row.time }}</q-td>
      <q-td key="monday" :props="props" :style="{'background-color':props.row.colors[1]}">{{ props.row.monday }}</q-td>
      <q-td key="tuesday" :props="props" :style="{'background-color':props.row.colors[2]}">{{ props.row.tuesday }}</q-td>
      <q-td key="wednesday" :props="props" :style="{'background-color':props.row.colors[3]}">{{ props.row.wednesday }}</q-td>
      <q-td key="thursday" :props="props" :style="{'background-color':props.row.colors[4]}">{{ props.row.thursday }}</q-td>
      <q-td key="friday" :props="props" :style="{'background-color':props.row.colors[5]}">{{ props.row.friday }}</q-td>
    </q-tr>
  </q-table>
  </div>
</template>

<style media="screen">
#table{
  color: red;
}
</style>

<script>
export default{
  name: 'MyClassesTable',
  data () {
    return {
      mycolor: 'red',
      paginationControl: { rowsPerPage: 0, page: 1 },
      columns:
    [
      {
        name: 'time',
        required: true,
        label: '节数',
        align: 'center',
        field: 'time'
      },
      {
        name: 'monday',
        label: '周一',
        align: 'center',
        field: 'monday'
      },
      {
        name: 'tuesday',
        label: '周二',
        align: 'center',
        field: 'tuesday'
      },
      {
        name: 'wednesday',
        label: '周三',
        field: 'wednesday',
        align: 'center'
      },
      {
        name: 'thursday',
        label: '周四',
        align: 'center',
        field: 'thursday'
      },
      {
        name: 'friday',
        label: '周五',
        align: 'center',
        field: 'friday'
      }
    ],
      tableData:
    [
      {
        time: '1',
        monday: '大学物理',
        tuesday: '大学英语',
        wednesday: '微积分',
        thursday: '线性代数',
        friday: '信号处理',
        colors: ['#333399', '#f6941d', '#cdd541', '#219167', '#0080ff', '#800080']
      },
      {
        time: '2',
        monday: '大学物理',
        tuesday: '大学英语',
        wednesday: '微积分',
        thursday: '线性代数',
        friday: '信号处理',
        colors: ['#333399', '#f6941d', '#cdd541', '#219167', '#0080ff', '#800080']
      },
      {
        time: '3',
        monday: '大学英语',
        tuesday: '大学物理',
        wednesday: '线性代数',
        thursday: '微积分',
        friday: '信号处理',
        colors: ['#333399', '#cdd541', '#f6941d', '#0080ff', '#219167', '#800080']
      },
      {
        time: '4',
        monday: '大学英语',
        tuesday: '大学物理',
        wednesday: '线性代数',
        thursday: '微积分',
        friday: '信号处理',
        colors: ['#333399', '#cdd541', '#f6941d', '#0080ff', '#219167', '#800080']
      }
    ]
    }
  }
}
</script>
