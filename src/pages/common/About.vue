<template>
  <q-page id="bg">
    <blockquote style="margin-left:4%;margin-top:4%;color:#7b7b7b">
      开发人员
    </blockquote>
    <div class="flex justify-center">
      <div class="carousel" v-if="false">
        <div class="carousel-inner">
            <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked">
            <div class="carousel-item">
                <div id="content" style="background-color:#027be3;text-align:center;">
                  <img src="~assets/images/front.png" alt="">
                  <div id="right" class="flex justify-center" style="background-color:#26a69a">
                    <ul>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        前端：薛傲如
                      </li>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        擅长：机器视觉、web前端
                      </li>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        Blog：<q-btn label="cnblogs" size="sm"/>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden="">
            <div class="carousel-item">
                <div id="content" style="background-color:#26a69a;text-align:center;">
                  <img src="~assets/images/back.png" alt="">
                  <div id="right" class="flex justify-center" style="background-color:#21ba54">
                    <ul>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        后端：李经纬
                      </li>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        擅长：test
                      </li>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        Blog：<q-btn label="test" size="sm"/>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden="">
            <div class="carousel-item">
                <div id="content" style="background-color:#21ba54;text-align:center;">
                  <img src="~assets/images/data.png" alt="">
                  <div id="right" class="flex justify-center" style="background-color:#027be3">
                    <ul>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        推荐系统：王治冶
                      </li>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        擅长：test
                      </li>
                      <li>
                        <q-icon name="keyboard_arrow_right" color="white" />
                        Blog：<q-btn label="test" size="sm"/>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <label for="carousel-3" class="carousel-control prev control-1">‹</label>
            <label for="carousel-2" class="carousel-control next control-1">›</label>
            <label for="carousel-1" class="carousel-control prev control-2">‹</label>
            <label for="carousel-3" class="carousel-control next control-2">›</label>
            <label for="carousel-2" class="carousel-control prev control-3">‹</label>
            <label for="carousel-1" class="carousel-control next control-3">›</label>
            <ol class="carousel-indicators">
                <li>
                    <label for="carousel-1" class="carousel-bullet">•</label>
                </li>
                <li>
                    <label for="carousel-2" class="carousel-bullet">•</label>
                </li>
                <li>
                    <label for="carousel-3" class="carousel-bullet">•</label>
                </li>
            </ol>
        </div>
      </div>
    </div>
    <blockquote style="margin-left:4%;margin-top:4%;color:#7b7b7b">
      开源
    </blockquote>
    <div id="bottom">
      <a target="_blank" href="https://github.com/CoyoteWaltz/WisdomCourse" >
        <img src="~assets/images/github.png" alt=""> Github
      </a>
    </div>
  </q-page>
</template>

<style lang="stylus">
@import '~variables'
a {
  text-decoration:none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
.carousel {
    position: relative;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.64);
    margin-top: 26px;
    width:80%;
    border-radius: 5px;
    background-color: $info;
}
li{
  list-style:none;
  margin-bottom: 3vw;
  text-align: left;
}
#bottom img{
  height: 30px;
  vertical-align:middle;
}
#bottom{
  margin-top: 15px;
  text-align: center;
  margin-bottom: 15px;
}
.carousel-inner {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 5px;
}
.carousel-open:checked + .carousel-item {
    position: static;
    opacity: 100;
}

.carousel-item {
    color: white;
    position: absolute;
    opacity: 0;
    -webkit-transition: opacity 0.6s ease-out;
    transition: opacity 0.6s ease-out;
}
.carousel-item #content img{
  padding:2vw;
  width: 30%;
}
.carousel-item #content #right{
  font-wieght:bold;
  padding-bottom:20px;
}
.carousel-control {
    background: rgba(0, 0, 0, 0.28);
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    display: none;
    font-size: 40px;
    height: 40px;
    line-height: 35px;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    cursor: pointer;
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    text-align: center;
    width: 40px;
    z-index: 10;
}

.carousel-control.prev {
    left: 2%;
}

.carousel-control.next {
    right: 2%;
}

.carousel-control:hover {
    background: rgba(0, 0, 0, 0.8);
    color: #aaaaaa;
}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
    display: block;
}

.carousel-indicators {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 2%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
}

.carousel-indicators li {
    display: inline-block;
    margin: 0 5px;
}

.carousel-bullet {
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 35px;
}

.carousel-bullet:hover {
    color: #aaaaaa;
}

#carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
    color: #428bca;
}

</style>
<script>
export default {
  name: 'PageAbout'
}
</script>
