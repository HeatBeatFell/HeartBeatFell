import Mock from 'mockjs'


// 模拟 /classes 班级数据
Mock.mock('http://127.0.0.1:8080/api/v1/classes', {
  'ok': '@integer(0,1)',
  'data': [{
    'id': 1,
    'class_name': '全栈1班'
  }, {
    'id': 2,
    'class_name': '全栈2班'
  }]
})

// 模拟 /students 学生数据
Mock.mock('http://127.0.0.1:8080/api/v1/students', {
  'data|1-10': [{
    'id|+1': 1,
    'student_name': '@cname',
    'age': '@integer(1,100)',
    'face': '@dataImage(80x80)',
    'time': '@date(yyyy-MM-dd)',
    'class_id': '@integer(1,2)'
  }]
})

// 模拟 /access_token 登录接口数据
Mock.mock('http://127.0.0.1:8080/api/v1/access_token', {
  'ok': '@integer(0,1)', // 0 或者 1
  'error': '用户名或者密码错误',
  'data': {
    'token': 'FDASFEWJQFDSLrewrhweofsdfhowjefwjesjd'
  }
})
