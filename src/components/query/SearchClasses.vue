<template id="">
  <div style="background-color:#fbfbfb">
    <div id="search_content">
      <div id="available_semester">
        查询所在学期：{{availableSemester.name}}
      </div>
      <q-search icon="poll" float-label="课程号" placeholder="课程号" v-model.lazy="searchInfo.classNo" style="margin-right:10%;margin-bottom:10px"/>
      <q-search icon="pages" float-label="课程名" placeholder="课程名" v-model.lazy="searchInfo.className" style="margin-bottom:10px" />
      <q-search icon="person" float-label="教师名" placeholder="教师名" v-model.lazy="searchInfo.teacherName" style="margin-right:10%;" />
      <div class="under-development">
        <div class="under-development-word">以上的搜索条件可选，均为精确搜索<br>以下搜索功能仍在开发中</div>
        <q-search icon="reorder" float-label="学分" placeholder="学分" v-model.lazy.number="searchInfo.credit" />
        <q-search icon="timer" float-label="时间(格式一1-2)" placeholder="时间(格式一1-2)" v-model="searchInfo.time" style="margin-right:10%;"/>
        <q-select
          icon="school"
          v-model="searchInfo.area"
          float-label="校区"
          radio
          :options="areaSelectOptions"
        />
      </div>
      <div class="flex justify-center" style="margin-top:15px;">
        <q-btn label="清空" style="margin-right:25%"  @click="reset" color="primary"/>
        <q-btn label="搜索" @click="search" color="secondary"/>
      </div>
    </div>
    <add-selection
      :tableItems="searchResult"
    >
    </add-selection>
  </div>
</template>

<script>
/*
查课 添加到已选课列表
选课模块获得的选项 搜索 网络请求 送去下面的组件 AddSelection
AddSelection 负责渲染table 操作 保存
*/
import AddSelection from './AddSelection'
import {AREAINDEX} from 'common/const'
import openClass from 'network/openClass'
export default {
  name: 'SearchClasses',
  components: {
    AddSelection
  },
  created () {
    // 获取可查询的学期名称
    this.availableSemester = this.$store.getters['semester/available']
    console.log(this.availableSemester)
    this.searchInfo.semesterId = this.availableSemester.id
  },
  methods: {
    search () {
      console.log('to search')
      console.log(this.searchInfo)
      if (this.searchInfo.area !== null) {
        const area = this.areaSelectOptions.filter((value, index) => {
          return this.searchInfo.area === value.id
        })
        this.searchInfo.area = area[0].label
      }
      openClass.searchClasses(this.searchInfo).then(res => {
        // TODO
        console.log(res)
        if (res.code === '0') {
          this.searchResult = res.data
        }
      })
      // this.searchResult = [
      //   {
      //     id: 1,
      //     // 课程名 课程号 教师名 上课时间 学分 人数 校区 教室
      //     // 只需要传递对应name的属性就行，q会匹配！爽啊
      //     className: '课程',
      //     classNo: '13231',
      //     teacherName: '老师name',
      //     time: '三3-4, 五1-3',
      //     credit: 4,
      //     capacity: 50,
      //     classroom: '教室',
      //     area: '校区'
      //   },
      // ]
    },
    reset () {
      this.searchInfo = {
        classNo: null,
        semesterId: null,
        className: null,
        teacherName: null,
        credit: null,
        time: null,
        area: null
      }
    }
  },
  data () {
    return {
      availableSemester: '',
      searchResult: [],
      // area发起网络请求获取吧
      areaSelectOptions: [
        AREAINDEX.baoshan,
        AREAINDEX.yanchang,
        AREAINDEX.jiading
      ],
      searchInfo: {
        classNo: null,
        className: null,
        teacherName: null,
        credit: null,
        time: null,
        area: null // v-model绑定之后得到的是valu
      }
    }
  }
}
</script>

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
  .under-development {
    margin: 10px 0;
    padding: 10px;
    background-color: #888888;
    border: 2px;
    border-radius: 5px;
  }
  .under-development-word {
    width: 100%;
    text-align: center;
    color: #ffeeff;
    font-size: 10px;
  }
</style>
