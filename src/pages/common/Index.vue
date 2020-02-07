<template>
  <q-page id="bg">
    <blockquote style="margin-left:4%;margin-top:4%;font-weight: bold;color:#7b7b7b">
      网站特色
    </blockquote>

    <div id="character">
      <h5 style="color:#7b7b7b">上大智课，选课不再纠结，更能先人一步！</h5>
      <div style="color:gray">
        我们致力于为上海大学同学们提供更智能化的选课方式，
        不仅可以在本站快速便捷地查询课程，
        还可以利用本站技术更加智能地进行推荐选课。
        为了方便同学们选课，我们也提供了自动抢课服务。
        上大智课，保证了同学们选课先人一步，选课不再纠结！你，还在等什么？
      </div>
      <q-btn label="立即开始" outline color="secondary" style="margin-top:20px" to="/query"/>
    </div>
    <blockquote style="margin-left:4%;margin-top:2%;font-weight: bold;color:#7b7b7b">
      功能板块
    </blockquote>
    <div class="flex justify-center" style="padding:30px;">
      <div class="block">
        <q-icon name="book" size="9rem" color="secondary"/>
        <div>
          <q-btn label="轻松查课" size="sm" outline color="secondary" to="/query"/>
        </div>
      </div>
      <div class="block">
        <q-icon name="web" size="9rem" color="secondary"/>
        <div>
          <q-btn label="智能推荐" size="sm" outline color="secondary" to="/recommend"/>
        </div>
      </div>
      <div class="block">
        <q-icon name="computer" size="9rem" color="secondary"/>
        <div>
          <q-btn label="自动抢课" size="sm" outline color="secondary" to="/autoxk"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
#character{
  margin-left: 8%;
  margin-right: 8%;
  text-align: center;
}
.block{
  width: 200px;
  height: 180px;
  border-radius: 10px;
  margin: 15px;
  text-align: center;
  background-color: #fafafa;
  margin-bottom: 20px;
  box-shadow: 0px 0px 15px #cdcdcd;
  transition: all 0.5s ease-in-out;
}
.block:hover{
  -webkit-transform:translateY(-6px);
  transform: translateY(-6px);
  transition: all 0.5s ease-in-out;
}
#bg{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fafafa;
}
</style>
<script>
export default {
  name: 'PageIndex'
}
</script>
