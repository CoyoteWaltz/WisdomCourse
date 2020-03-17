# 上大智课v1.0.0

[TOC]

​	SHU class recommendation platform by CoyoteWaltz

一个模拟的教务管理系统、选课平台，三端登录（学生、老师、管理员）

线上测试版本: http://www.coyoo.xyz/wisdom，测试账号获取请点击登录的标题

***

### 如何运行

#### 前端(本仓库)

##### 需要的依赖

* Git
* Nodejs and npm
* @vue/cli, @quasar/cli

##### 下载代码后运行

`cd WisdomCourse`

`npm install`

`quasar dev`

#### 后端(暂时没有整理好代码)

***

### 功能说明

#### 管理员

* 查看所有学期的开课情况及班级学生信息
* 搜索开课信息（按选课时间）
* 新建、删除学期（名称、选课时间、登分时间、学分上限）
* 录入老师账号信息
* 创建、删除课程
* 开设课程（按学期）
* *发布公告（尚未完成）*

#### 教师

* 查看本学期及历史学期的上课情况及班级学生信息
* 搜索开课信息（按选课时间）
* 录入学生分数
* *发布公告（尚未完成）*

#### 学生

* 查看本学期及历史学期的选课情况
* 搜索开课信息（按选课时间）
* 选课
* *自动选课（尚未完成）*
* *评价课程（尚未完成）*

#### features

* SPA（刷新页面不丢失用户状态）
* 一站式登录
* （根据用户身份）动态导航栏&路由
* token登录体系

### 搭建过程

#### 技术选择

##### 前端

* Vuejs + Vue-Router + Vuex
* Quasar，Quasar-cli（基于Vuejs)

##### 后端

* python Flask + Flask的各种库
* MySQL
* Flask-Sqlalchemy ORM框架

#### 数据库设计

每个表都有create_time和update_time字段

##### 用户表

```
user:
	id					Int 主键
	name				String
    user_no				String unique
    password_hash		String
    sex					Tinyint(1)
    major				String
    privilege 			Tinyint(1) 权限身份
    intergal			Int	积分（评价课程课获得）
    college_id			Int 外键：所属学院
```

##### 学院表

```
college:
	id					Int 主键
	name				String
```

##### 课程表

```
course:
	id					Int 主键
    name				String unique
	credit				Int 学分
	hour				Int 学时
	college_id			Int 外键：所属学院
	(课程号由学院id和课程id组合得出)
```

##### 学期表

```
semester:
	id					Int 主键
    name				String unique
    selection_start		Date	   选课开始时间
    selection_end		Date
    register_start		Date	   登分开始时间
    register_end		Date
    credit_ceiling		Int		   学分上限
    is_current			Tinyint(1) 是否是当期学期
```

##### 开课表

```
teacher2course:
	id					Int 主键
    selected_num		Int 选课人数
    capacity			Int 人数容量
    time				String 上课时间
    area 				String 校区
    classroom			String
    score_ratio			Decimal(2,1) 平时分数所占比例
    unique_hash			String 解决重复开课的唯一标识 unique
    course_name  		String 冗余字段课程名字
    teacher_name		String 冗余字段教师名字
    teacher_id			Int 外键：上课教师 user
    course_id			Int 外键：课程id course
    semester_id 		Int 外键：所属学期 semester
```

##### 选课表

```
student2course:
	id					Int 主键
    grade				Decimal(2,1) 绩点
    rate				Int评价 暂定为整型
    usual_score 		Int 平时分数
    exam_score 			Int 考试分数
    final_score 		Int 总评分数    
    user_id				Int 外键：学生id user
    open_course_id		Int 外键：开课信息id teacher2course
    semester_id 		Int 外键：所属学期id 冗余字段 semester
```

#### 前端设计

##### 页面设计

因为没有美工，布局就自己来了。。。

几乎都用的是quasar框架的UI组件，以及flex布局

主要是数据展示和交互逻辑上的设计

###### 首页/index

* 介绍
* 导航标签（登录，查课，推荐，抢课）

###### 关于我们/about

* 开发人员
* Github地址

###### 登录页/login

* 登录后跳转查课页面

###### 课程查询（学生/老师/管理员）/query

* 查看每个学期（选课/上课/开课）的课程信息
  * 课程信息：操作，课程名，课程号，教师号，上课时间，人数上限（选课/容量)，教师，校区，学分，绩点（学生）
  * 操作：退课（学生）（有退课提示），管理（教师/管理员）（均可查看选课学生信息，教师可以登入分数）
  * 学期选择旁的刷新按钮，可以重新获取该学期的课程
* 搜索课程
  * 对信息的模糊查询（目前开放了3个），仅查符合要求学期的课程（本地时间不在未来学期选课时间段内，则为当前学期的课程）
  * 搜索结果加入待选（弹出选课数量栏，导航到选课页）（学生）

###### 选课（学生）/autoxk

* 选课
  * 展示已加入待选的课程，可移除；展示选课状态，和选课信息
  * 继续选课跳转回查询页
  * 开始选课后弹出对话框选课结果，更新选课信息
* 其他模块开发中

###### 课程设置（管理员）/course

* 创建课程
  * 表单数据校验（待完善）
  * 创建成功后底部已有课程
* 开课
  * 必须选择课程才可以开
  * 学期的选择，必须是未来学期
  * 教师的选择，可以搜索过滤
  * 校区选择（写死）
* 底部已创建课程根据学院选择展示，在上面两个tab切换的时候变化操作
  * 删除课程（创建课程）
  * 添加到开课课程（开课）

###### 教学安排（管理员）/arrangement

* 学期设置
  * 选择不同的学期，学期卡片展示，可设置为当前学期
  * 不可将当前学期设置重复设置
  * 新建学期信息，时间顺序的校验
* 教师管理
  * 展示已有教师
  * 新建教师，新用户的密码和工号一致

##### 系统状态&存储

###### Vuex

* user: 登录用户信息
* semester: 学期信息以及对应的课程
* college(管理员): 学院信息及其创建的课程
* teacher(管理员): 所有教师信息
* bulletin

###### sessionStorage

* token
* 刷新页面时作为Vuex的临时缓存

###### Vue-Router

* 动态加载路由，在路由拦截beforeEach钩子中获得闭包的addRoute标识符，根据身份仅需添加路由一次

##### 可复用组件封装(/components)

###### PureClassTable

* 对quasar的q-table再次封装
* 接收父组件：可指定可见列名，操作按钮的设置（click事件响应在外部传入callback）

###### PureUserTable

* 对quasar的q-table再次封装
* 接收父组件：table的数据，可指定可见列名，操作按钮的设置（click事件响应在外部传入callback）

其实感觉这两个table可以再次封装一下？。。

###### ClassList

* 对PureClassTable的二次封装
* 对于数据的获取在这一层操作
* 学期选择切换PureClassList展示的课程信息
* 刷新按钮重新获取所选学期的课程
* 从store获取semester信息，如果store中无该semester的课程信息，则发起网络请求获取并commit到store更新其课程

###### ManageClass

* 对PureUserTable的二次封装
* 接收外部：课程信息（包含classList）
* 返回按键：通知外部v-show=false
* 提供插槽

###### SemesterCard

* 封装学期信息，接收外部传递参数

##### 网络请求模块封装



##### 主要页面逻辑(/pages)

###### 登录(comon/Login.vue)

用户信息{username, password}（校验是否为空），提交后台login API

success:

* 根据身份不同，Vuex中存入user状态，学期semester状态（包括课程），等

falied:

* 提示失败原因

###### 布局(/layout)

布局(MyLayout.vue):

* quasar的组件，拆分为一下组件组合
* 有`<router-view/>`是所有pages的父组件

左侧导航栏drawer(LeftNavigation.vue):

* 未登录状态渲染{首页，关于我们}
* 登录后更加身份动态加载路由信息（见Router）

公告栏(BulletinBoard.vue):

* 展示公告信息（开发中）

用户信息(BulletinBoard.vue):

* 从store中获取姓名，学工号，身份

* 注销按键（在未登录的状态为登录按键）
  * 注销清空sessionStorage
  * replace到/login，window.location.reload()

###### 查询课程(comon/QueryClass.vue)

我的课程

* 三个身份有自己的组件(components/query/Student[Admin, Teacher]ClassList.vue)，通过身份v-if判断
  * 分别都是ClassList组件的再次封装
  * 管理员和教师有ManageClass.vue组件，封装了展示班级学生的功能
  * 各自封装对课程操作的button，传递到子组件；对课程的操作
    * 退课操作（学生）在此组件发起网络请求，退课成功后同步通过传递给子组件的删除数据实现前端同步删除记录（会不会重新载入组件更简单）
    * 显示管理组件（老师，管理员）
    * 提交分数（教师）：校验分数非空以及0-100

搜索课程(SearchClasses.vue)

* 搜索内容先过滤是否非空，发送网络请求
* 搜索结果传递到AddSelection组件中渲染
  * 加入待选（学生）之后滑出已选门数和导航按钮，加入待选的数据更新在Vuex中
  * 利用PureClassTable组件展示搜索结果

###### 课程设置(admin/Course.vue)

* 控制切换创建课程和开设课程的两个tab时的状态
  * 创建课程时传递删除操作到ExistingCourseList
  * 开设课程时传递添加操作到ExistingCourseList，将添加的课程对象同步传递到OpenCourse组件
* 在本层发起删除课程的网络请求

创建课程(NewCourse.vue)

* created从store获取学院信息，若无，网络请求
* 发起网络请求，成功后将数据提交store更新；传递给ExistingCourseList同步

开设课程(OpenCourse.vue)

* created从store获取学期、教师信息，若无，网络请求
* 接受父组件传递的课程对象
* 表单校验，发起网络请求

已创建课程list(ExistingCourseList.vue)

* created时获取store中学院+课程信息，如果没有，则网络请求获取
* 接受父组件传递新增课程，watch属性监视改变，加入数据
* 接受父组件传递的被删除课程，对数组做splice

###### 教学安排(admin/Arrangement.vue)

学期设置(SemesterSetting.vue)

* CurrentSemester.vue: 展示选择学期信息
  * 利用两个SemesterCard展示当前学期和选择其他学期的信息
  * 计算属性判断所选学期和当前学期是否一致，如果一致则只展示当前学期，设定为当前学期的按钮disabled
  * 发起网络请求更新当前学期，store更新当前学期信息
* NewSemester.vue:
  * 时间数据的校验，提交网络请求
  * 新建之后提交store更新加入
  * 通知父组件新建成功，父组件同步传递到CurrentSemester的选择option里

教师管理(TeacherManage.vue)

* TeacherList.vue: 基于PureUserTable
  * 展示老师列表，created发起网络请求或者从store得到老师信息
  * 接收父组件传递新增老师信息，watch监听变化新增教师数组
* NewTeacher.vue: 网络请求提交新建信息；成功后提交store新增

###### 自动选课(AutoXk.vue)

选课(SelectedClasses.vue)

* 子组件PureClassTable渲染加入待选的课程
* 开始选课校验待选课程是否为空，发起网络请求
  * 将成功的课程提交store在待选课程中splice
  * 失败的课程提交store更新选课状态

其他模块开发中...

具体逻辑还是请看代码

#### API接口文档



```
统一响应:
	{
		data: json数据,
		code: 业务代码,
		msg: 响应信息
	}
未登录响应代码:4101
```

##### 登录
```
desc: 统一登录接口 返回学期信息(当前学期以及历史学期) 公告栏信息
url: /user/login
methods: POST
params(form): 
	username:
	password:
returns:
	success: {
			data: {
				token: 'xxxxx',
				user_info: {
					id: 2, // 可以不给
					username: '小明',
					user_no: '17155236',
					identity: 0/1/2, // 学生/教师/管理员
					intergal: 13
				},
				bulletin_info: 'html模板',
				semester_info: [
					// 所有学期的list
					{
						id: 1,
						name: '2019-2020春季学期',
						selection_start: '2019/2/2',
						selection_end: '2019/2/3',
						register_start: '2019/2/5',
						register_end: '2019/2/8'
					},
					{
						id: 4,
						name: '2019-2020冬季学期',
						selection_start: '2019/2/2',
						selection_end: '2019/2/3',
						register_start: '2019/2/5',
						register_end: '2019/2/8'
					},
					...
				],
				// 当前学期的课程 我上的 我交的 已经开的
				current_semester: {
					semester_info: {
						id: 1,
						name: '2019-2020春季学期',
						selection_start: '2019/2/2',
						selection_end: '2019/2/3',
						register_start: '2019/2/5',
						register_end: '2019/2/8'
					},
					classes: [
						// 课程list
						{
							id: 2,
							name: '辣鸡课',
							course_no: '124dsfadf',
							college_id: 1,
							college_name: '学院',
							semester_id: 1,
							teacher_id: 142,
							teacher_no: 'sdf',
							teacher_name: '李老师',
							classroom: 'A404',
							time: '三1-3',
							credit: 2,
							hour: 20,
							rate: 3.4,
							grade: 3.4 // 只有学生才有
						}
					],
					...
					// 以上为统一返回数据 如果是管理员 学院信息 直接在课程设置里面获得
				}
			},
			code: 0,
			msg: "请求成功"
		}		
	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(无此用户)
```

##### 根据学期获得class

```
desc: 切换学期的时候获得对应的classes
url: /classes?semester=<semester_id>
methods: GET
query:
	semester = 学期id

returns:
	success: {
		classes: [
			// 课程list
			{
				id: 2,
				name: '辣鸡课',
				course_no: '124dsfadf',
				college_id: 1,
				semester_id: 3,
				teacher_id: 142,
				teacher_name: '李老师',
				classroom: 'A404',
				time: '三1-3',
				credit: 2,
				hour: 20,
				rate: 3.4,
				grade: 3.4 // 只有学生才有
			}
		],
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```

##### 获取历史学期信息

```
desc: 获取学期信息list(无当前学期对象) 和 当前学期对象(包含课！)
url: /semesters
methods: GET
returns:
	success: {
		data: {
			semester_list: [
				{
					id: 1,
					name: '2020-2021秋季学期',
					selection_start: '2019/2/12',
					selection_end: '2019/2/22',
					register_start: '2019/6/12',
					register_end: '2019/7/2',
					credit_ceiling: 35
				},
				...
			],
			current_semester: {
				id: 1,
				name: '2020-2021秋季学期',
				selection_start: '2019/2/12',
				selection_end: '2019/2/22',
				register_start: '2019/6/12',
				register_end: '2019/7/2',
				credit_ceiling: 35,
				class_list: [
					{
						id:2,
						name: '克明',
						course_no: '124dsfadf',
						college_id: 1,
						semester_id: 3,
						teacher_id: 142,
						teacher_name: '李老师',
						classroom: 'A404',
						time: '三1-3',
						credit: 2,
						hour: 20,
						rate: 3.4,
						grade: 3.4 // 只有学生才有
					},
					...
				]
			},
		}
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```


##### 搜索课程(当前学期) 

```
desc: 根据信息过滤符合条件的课程
url: /classes/query?collegeId=&className=&teacherName=&credit=&time=&area=
methods: GET
params:
	课程号	可选
	课程名	可选
	教师名	可选
	学分	可选
	时间	可选
	校区	可选

returns:
	success: {
		classes: [
			// 课程list
			{
				id: 2,
				name: '辣鸡课',
				course_no: '124dsfadf',
				college_id: 1,
				semester_id: 3,
				teacher_id: 142,
				teacher_name: '李老师',
				classroom: 'A404',
				time: '三1-3',
				credit: 2,
				hour: 20,
				rate: 3.4,
				grade: 3.4 // 只有学生才有
			}
		],
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```



##### 学生

###### 退课

```
desc: 在选课课表地方退课
url: /classes/<class_id>
methods: DELETE
returns:
	success: {
		data: id: 1, // 返回id让前端去删掉store存的对应课
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```

###### 选课

```
desc: autoxk选课 返回成功选上的课程
url: /classes/selection
methods: POST
data: 选的课的id的list
	classes_ids = [1, 2, 3, 4]
returns:
	success: {
		data: {
			success: [1, 2, 3],
			failed: [
				{
					id: 1,
					reason: 'xxxxxx'
				}
			]
		}，
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```



##### 教师

###### 查看课的学生信息

```
desc: 在课表的地方查看课程的学生信息 返回学生信息
url: /classes/<int:class_id>
methods: GET
returns:
	success: {
		data: [
			{
				id: 1, 		// 选课记录的id
				username: '小明',
				college_name: '计算机学院',
				user_no: '134123',
				sex: '男',
				usual_score: 66,
				exam_score: 86,
				final_score: 66
			},
			...
		],
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```

###### 登记分数

```
desc: 在课表的地方查看课程的学生信息 返回学生信息 后台验证这个老师是否是教这门课 and 是否在登记时间
url: /classes/<int:class_id>
methods: PATCH
所需参数: 
	{
		[
			{
				id: 1,		// 选课记录
				usual_score: 123,
				exam_score: 22
			},
			{
				id: 21,		// 选课记录
				usual_score: 123,
				exam_score: 22
			},
			...
		]
	}
returns:
	success: {
		data: null
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```



##### 管理员

###### 获取所有课程

```
desc: 获取所有学院下的所有课程
url: /courses
methods: GET
returns:
	success: {
		data: [
			{
				id: 1,
				college_name: '计算机学院',
				course_list: [
					{
						id: 2,
						name: '辣鸡课',
						course_no: '124dsfadf',
						college_id: 1,
						credit: 2,
						hour: 20
					},
					...
				]
			},
			...
		],
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```

###### 删除某course

```
desc: 根据id删除某course 返回删除成功的id
url: /courses/<int:course_id>
methods: DELETE
returns:
	success: {
		data: 1
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4003  "数据库操作失败(数据库中已存在等情况都返回这个)"
```

###### 新建课程

```
desc: 新建课程 返回新建的对象
url: /courses
methods: POST
参数:	课程名 	course_name
		学时	hour
		学分	credit
		学院	college_id
returns:
	success: {
		data: {
			id: 3,
			name: '辣鸡课',
			course_no: '124dsfadf',
			college_id: 1,
			credit: 2,
			hour: 20
		},
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```

###### 获取所有的老师list

```
desc: 获取所有老师list
url: /teachers
methods: GET
参数:	课程名 	course_name
		学时	hour
		学分	credit
		学院	college_id
returns:
	success: {
		data: [
			{
				id: 1,
				name: '王老师',
				user_no: 'xxz1231',
				college_id: 3,
				college_name: '学院',
				sex: '男'
			},
			...
		],
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```

###### 开课

```
desc: 新建开课对象 成功返回完整信息
url: /classes
methods: POST
参数:	课程id 	course_id	int
		上课时间  time		str
		学期id  semester_id		int
		教师id  teacher_id		int
		教室 classroom 		str
		平时分占比 score_ratio   .1float
returns:
	success: {
		data: {
			id: 2,
			name: '辣鸡课',
			course_no: '124dsfadf',
			college_id: 1,
			college_name: '学院',
			semester_id: 1,
			semester_name: '某某学期',
			teacher_id: 142,
			teacher_name: '李老师',
			classroom: 'A404',
			time: '三1-3',
			credit: 2,
			hour: 20,
		}
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```




###### 设置当前学期

```
desc: 获取学期信息list和当前学期对象
url: /semesters/current/<int:semester_id>
methods: PATCH
returns:
	success: {
		data: {
			id: 2,
			name: '2020-2021秋季学期',
			selection_start: '2019/2/12',
			selection_end: '2019/2/22',
			register_start: '2019/6/12',
			register_end: '2019/7/2',
			credit_ceiling: 35
		}
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
		重复设置不允许
```

###### 新建学期信息

```
desc: 新建学期信息 成功返回完整信息
url: /semesters
methods: POST
参数:	学期名称 	name
		选课开始时间	selection_start
		选课结束时间	selection_end
		登分开始时间	register_start
		登分结束时间	register_end
		学分上限		credit_ceiling	int

returns:
	success: {
		data: {
			id: 2,
			name: '2020-2021秋季学期',
			selection_start: '2019/2/12',
			selection_end: '2019/2/22',
			register_start: '2019/6/12',
			register_end: '2019/7/2',
			credit_ceiling: 35
		}
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```


###### 删除某一个学期

```
desc: 新建学期信息 成功返回完整信息
url: /semesters/<int:s_id>
methods: DELETE
参数: s_id 为学期id

returns:
	success: {
		data: 12,
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```


###### 新建教师

```
desc: 新建教师对象 成功返回完整信息
url: /teachers
methods: POST
参数:	姓名	name
		性别	sex
		学院id	college_id
		工号	user_no

returns:
	success: {
		data: {
			id: 1,
			name: '王老师',
			user_no: 'xxz1231',
			college_id: 3,
			college_name: '学院',
			sex: '男'
		}
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"
```





## 问题存在

* es6迷惑 for (let i in obj) {obj.i 是undef?? obj[i]是可以的}，而且obj.i的时候eslint告诉你i没被使用



## TODO

表单提交的**正确性**校验

