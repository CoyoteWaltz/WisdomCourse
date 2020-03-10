<template>
  <div class="flex justify-center">
    <div class="notice">
        <div id="title">
        <q-icon name="notifications" style="margin-right:3px;font-weight:bold;font-size:14px"/>
          公告
        </div>
        <div id="content" style="height: 100px">
          <div v-html="$store.state.bulletin.message"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BulletinBoard'
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.notice{
  border-radius: 5px;
  text-align: center;
  padding: 5px 0px 5px 0px;
  width: 80%;
  box-shadow: 0px 0px 15px #cdcdcd;
  margin-top:3px;
}
.notice #title{
  background-color:$light;
  border-radius: 3px;
}
.notice #content{
  font-size: 12px;
  margin: 7px;
  text-align: left;
  color: #7b7b7b;
  word-wrap: break-word;
}
</style>
