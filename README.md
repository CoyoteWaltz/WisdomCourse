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

TODO 可以封装 学期信息 学院信息


## API接口

```
统一响应:
	{
		data: json数据,
		code: 业务代码,
		msg: 响应信息
	}
未登录响应代码:4101
```

### 登录
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

### 根据学期获得class

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

### 获取历史学期信息

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


### 搜索课程(当前学期) TODO需要思考一下

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



### 学生

#### 退课

```
desc: 在选课课表地方退课
url: /classes/<class_id>
methods: DELETE
returns:
	success: {
		data: {
			id: 1 // 返回id让前端去删掉store存的对应课
		},
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```


### 教师

#### 查看课的学生信息

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

#### 登记分数

```
desc: 在课表的地方查看课程的学生信息 返回学生信息 后台验证这个老师是否是教这门课 and 是否在登记时间
url: /classes/<int:class_id>
methods: PATCH
所需参数: 
	{
		[
			{

			}
		]
	}
returns:
	success: {
		data: {

		},
		code: 0,
		msg: '请求成功'
	}

	failed:
		code  msg    			data(null)
		4001  "数据库中未找到"(没有选这门课/没有开这门课)
```



### 管理员

#### 获取所有课程

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

#### 删除某course

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

#### 新建课程

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

#### 获取所有的老师list

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

#### 开课

```
desc: 新建开课对象 成功返回完整信息
url: /classes
methods: POST
参数:	课程id 	course_id	int
		上课时间  time		str
		学期id  semester_id		int
		教师id  teacher_id		int
		教室 classroom 		str
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




#### 设置当前学期

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

#### 新建学期信息

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


#### 新建教师

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
