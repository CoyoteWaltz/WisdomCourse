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
  font-family: "Microsoft YaHei", "黑体", "宋体", "Arial", sans-serif;
}
</style>
