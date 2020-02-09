# SHU class recommendation platform

## Front-end

Using Quasar Framework **0.x**

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


## 数据库(初稿)

```python
user:
	id
	u_name
	password_hash	密码哈希
	sex
	u_number
	intergal	用户积分，目前没用
	college_id
	privilege	身份权限 0 1 2表示

college: 学院
	id
	name
	
course: 课程信息
	id
	c_number
	credit	学分
	hour	学时
	college_id

teacher2course:开课表 绑定课程和教师 开课学期 上课时间 上课教室？
	id
	course_id
	teacher_id(user)
	semester_id
	time 上课时间
	classroom 教室

user2course: 选课表
	id
	user_id
	open_course_id 开课表 外键fk	
	grade	成绩
	rate 课程评价

semester_info:
	id
	semester 学期 2019学年秋季
	selection_start  选课时间段
	selection_duration  选课时间长
	register_start	教师登分开始
	register_duration
	credit_ceiling 学分上限

    
boardcast:公告
	id
	to_who	给谁的公告 对应privilege
	status 	开启1 关闭0
	content
	from_id	谁发布的 fk
    
管理员开课日志记录？
...待完善
```
