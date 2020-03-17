<template id="">
  <div id="xk_content">
    <blockquote style="margin-left:4%;color:#7b7b7b">
      选课成功的记录日志
    </blockquote>
    <div class="flex justify-center toc-set" style="margin-top:15px;max-height:400px;overflow-y:scroll">
      <q-list highlight inset-separator>
              <q-item multiline>
                <q-item-side icon="check_circle" color="positive" />
                <q-item-main
                  label="自动选课为您成功选上 赵兵 老师的《环境与绿色发展》!"
                  label-lines="2"
                  sublabel="本课程选课总耗时14小时07分钟，您终于如愿以偿！"
                  sublabel-lines="2"
                />
                <q-item-side right>
                  <q-item-tile stamp>1小时前</q-item-tile>
                </q-item-side>
              </q-item>
              <q-item multiline>
                <q-item-side icon="check_circle" color="positive"/>
                <q-item-main
                  label="自动选课为您成功选上 汪学广 老师的《纳米及纳米催化》!"
                  label-lines="2"
                  sublabel="本课程选课总耗时1小时07分钟，您终于如愿以偿！"
                  sublabel-lines="2"
                />
                <q-item-side right>
                  <q-item-tile stamp>1周前</q-item-tile>
                </q-item-side>
              </q-item>
      </q-list>

    </div>
  </div>
</template>
<style media="screen">

</style>
<script type="text/javascript">
export default {
  name: 'Toc'
}
</script>
