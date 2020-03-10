<template>
  <q-page class="content">
    <q-tabs v-model="selectedTab" color="secondary" text-color="white">
      <!-- 选项卡 - 注意slot="title" -->
      <q-tab default slot="title" label="选课" two-lines name="selectedClasses" icon="computer" />
      <q-tab slot="title" label="选课设置(开发中)" two-lines name="settings" icon="settings" />
      <q-tab slot="title" label="操作日志(开发中)" two-lines name="toc" icon="toc" />
      <!-- 目标 -->
      <q-tab-pane name="selectedClasses">
        <selectedClasses />
      </q-tab-pane>
      <q-tab-pane name="settings">
        <blockquote style="margin-top:15px;margin-bottom:15px;color:#7b7b7b">
          选课时间间隔建议为7秒，否则可能会被学校封号
        </blockquote>
        <div id="xk_content">
          <div class="settings">
            <q-field
              icon="bubble_chart"
              helper="相邻两次自动选课间隔时间"
            >
              <q-input v-model="settings.frequency" float-label="选课间隔" suffix="秒/次" />
            </q-field>
            <q-field
              icon="access_time"
              helper="最大等待超时的时间"
            >
              <q-input v-model="settings.maxWaitTime" float-label="最大超时时间" suffix="秒" />
            </q-field>
          </div>
          <div class="settings">
            <q-field
              icon="timeline"
              helper="自动选课的时间段"
            >
            <q-select
              v-model="settings.times"
              float-label="选课时间段"
              radio
             :options="selectTimes"
            />
            </q-field>
            <q-field
              icon="error"
              helper="对时间冲突、重课冲突等冲突处理"
            >
            <q-select
              v-model="settings.errors"
              float-label="课程冲突处理"
              radio
             :options="selectErrors"
            />
            </q-field>
          </div>
          <div class="flex justify-center">
            <q-field
              icon="warning"
              label="断线重连"
              helper="是否开启断线重连"
            >
            <q-radio v-model="settings.reLogin" val="true" label="开启" />
            <q-radio v-model="settings.reLogin" val="false" label="关闭" />
            </q-field>
            <q-field
              icon="cloud"
              label="云端选课"
              helper="是否开启云端选课"
            >
            <q-radio v-model="settings.cloud" val="true" label="开启" />
            <q-radio v-model="settings.cloud" val="false" label="关闭" />
            </q-field>
          </div>
          <q-field
            icon="mail"
            helper="选课成功通知的邮箱号"
          >
            <q-input v-model="settings.email" float-label="通知邮箱"  />
          </q-field>
        </div>
        <div class="flex justify-center settings" style="margin-top:15px">
          <q-btn label="恢复默认" style="margin-right:10%" color="secondary"/>
          <q-btn label="保存设置" color="primary"/>
        </div>
      </q-tab-pane>
      <q-tab-pane name="toc">
        <toc />
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<style>
.settings{
  margin: 10px;
}
.content{
  padding: 20px 20px 0px 20px;
  background-color: #fafafa;
}

</style>
<script>
import SelectedClasses from 'components/autoxk/SelectedClasses.vue'
import toc from '../../components/Tocs.vue'
export default {
  name: 'AutoXk',
  components: {
    SelectedClasses,
    toc
  },
  data () {
    return {
      settings: {
        times: 1,
        errors: 1,
        frequency: 7,
        maxWaitTime: 15,
        reLogin: 'true',
        cloud: 'true',
        email: ''
      },
      selectedTab: 'selectedClasses',
      selectTimes: [
        {
          label: '00:00-24:00',
          value: 1
        },
        {
          label: '00:00-08:00',
          value: 2
        },
        {
          label: '20:00-06:00',
          value: 3
        }
      ],
      selectErrors: [
        {
          label: '剔除课程',
          value: 1
        },
        {
          label: '退掉原课',
          value: 2
        },
        {
          label: '不处理',
          value: 3
        }
      ]
    }
  }
}
</script>
