# SHU class recommendation platform

## Front-end

Using Quasar Framework

BY-Xue aoru

extend and reconstruct by CoyoteWaltz

## 依赖安装

@vue/cli3/4
@quasar/cli

## 启动

解压之后进入文件所在目录的命令行，输入`npm install`安装依赖包

`quasar dev`启动项目

## 前端逻辑

### 登陆login

登陆页面 {username, password, identity} (用户所填) => 后端login API

success:

* 后端返回所有所需的数据
* token存入localStorage or **sessionStorage**(待决定)
* {username, stuNo, identity, lastTime, intergal(optional)} => $store.state.user.info
* {bulletinInfo} => $store.state.bulletin
* 学期信息?
* {others} => $store.state.user.others (TODO)
* $router.push/replace(/index)

failed:

* 页面提示失败原因

### 布局layout

data

* 左边导航栏的list of item全部

computed

* 左边导航栏根据用户身份计算
  * 游客: {index, about} (base)
  * 学生: {query, autoxk, recommend}
  * 老师: {query, bulletin}
  * 管理员: {query, bulletin}
* 用户信息 = $this.store.state.user.info

### mapping of 路由router  and 页面pages

根据导航栏对应的页面，跳转路由的时候对身份进行验证，成功则next(true)

component: 'routePath':

* Index: /index 首页 1

* About: /about 关于 1

* Error404: * 404页面

* QueryClass: /query 查询课程页面(公有)

  student:

* Recommend: /recommend (课程推荐)

* AutoXk: /autoxk (自动选课)

  teacher:

* Bulletin: /bulletin (公告发布)

  admin:

* Course: /course (课程开设)

* Arrangement: /arragement (教学安排)

* Bulletin: /bulletin (公告发布)(和teacher同一个)

### 状态store

#### user

```json
// 用户信息
info: {
    username: '游客',
    identity: -1,
    stuNo: '',
    lastTime: '', // 上次登陆时间
    intergal: null // 积分
},

```

#### bulletin



#### system



### 页面

### 模块封装

#### axios

#### store

#### router