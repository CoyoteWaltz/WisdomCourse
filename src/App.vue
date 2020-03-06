<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // 获取localStorage 更新state
  },
  beforeDestroy () {
    // 清空localStorage
  }
}
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, "Hiragino Sans GB", "Heiti SC", Arial, "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
</style>
