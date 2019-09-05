export default {
  login: {
    userLogin: {
      inputPlaceholder: '请输入用户账号',
      password: '请输入密码',
      code: '请输入验证码',
      load: '登录',
      register: '注册',
      adminLogin: '管理员登录',
      forgetPwd: '忘记密码？',
      loginIdNotExist: '用户账号不存在'
    },

    adminLogin: {
      inputPlaceholder: '请输入管理员账号',
      password: '请输入密码',
      code: '请输入验证码',
      load: '登录',
      userLogin: '用户登录',
      forgetPwd: '忘记密码？',
      loginIdNotExist: '管理员账号不存在'
    },
    identifyCodes: '1234567890',
    loadingError: '登陆失败'
  },

  register: {
    label: {
      register: '注册',
      loginId: '登录账号：',
      userName: '用户名：',
      password: '密码：',
      repeatPassword: '确认密码：',
      sex: '性别：',
      phone: '联系电话：',
      email: '邮箱：',
      card: '身份证：',
      male: '男',
      female: '女',
      room_id: '房间号：',
      stay_date: '入住时间：'
    },

    inputPlaceholder: {
      loginId: '请输入登录账号',
      userName: '请输入用户名称',
      password: '请输入密码',
      repeatPassword: '请再次输入密码',
      repeatError: '两次输入的密码不一致',
      sex: '请输入性别',
      phone: '请输入手机号',
      email: '请输入邮箱',
      card: '请输入身份证'
    },

    title: {
      successItem: '恭喜你注册成功，加入温暖的小区！',
      returniItem: '正在跳转至登录界面',
      clickItem: '点击跳转登录界面'
    },

    showMessage: {
      register: '注册失败'
    },

    status: {
      loginId: '请输入登录账号',
      userName: '请输入用户名',
      password: '请输入密码',
      repeatPassword: '请再次输入密码',
      email: '请输入邮箱',
      formatEmail: '请输入正确的邮箱',
      phone: '请输入手机号',
      formatPhone: '请输入正确的号码',
      card: '请输入身份证号',
      formatCard: '请输入正确的身份证号',
      sex: '请输入性别',
      loginIdExist: '登录账号已存在',
      passwordError: '密码错误',
      repeatPasswordError: '两次输入的密码不一致',
      phoneExist: '该手机号已被注册',
      room_id: '请输入房间号'
    }
  },

  button: {
    ok: '确认',
    cancel: '取消',
    update: '更新'
  },

  manage: {
    batchDelete: '批量删除',
    addUser: '添加用户',
    keyWord: '关键字：',
    edit: '编辑',
    delete: '删除',
    search: '搜索',
    operate: '操作',
    selectHolder: '请选择',
    loadingText: '拼命加载中',
    inputText: '请输入内容',
    loginId: '登陆账号',
    id: 'ID',
    userName: '用户名',
    options: {
      label: {
        all: '全部',
        loginId: '登录账号',
        userName: '用户名'
      }
    },
    confirm: {
      deleteAdmin: '此操作删除该用户，是否继续？',
      updateUserInfo: '是否更新该用户信息？',
      addUserInfo: '是否添加该用户信息？',
      warning: '提示'
    },
    showMessage: {
      deleteError: '删除用户失败',
      deleteUserSuccess: '删除用户成功！',

      operateError: '操作失败',
      operateSuccess: '操作成功',

      cancel: '取消操作',

      getUserError: '获取用户信息失败',

      updateError: '更新用户失败',
      updateUserSuccess: '用户更新成功',

      selectType: '请选择查询关键字',
      inputText: '输入不能为空，请输入需要查询的用户',
      userUndefined: '无该用户信息，请重新搜索！',
      searchError: '查询失败'
    }
  },

  header: {
    adminHeader: '管理员登录系统',
    userHeader: '用户登录系统',
    userCenter: '个人中心',
    logout: '退出',
    zh: '中文',
    en: '英文'
  },

  sidebar: {
    admin: {
      villaCenter: '别墅中心',
      board: '公告栏',
      baseInfo: '基本信息',
      baseFacility: '基础设施',
      propertyManage: '物业管理',
      repairManage: '网上报修管理',
      opinionManage: '意见/投诉管理',
      userManage: '用户管理',
      customerManage: '住户管理',
      adminManage: '管理员管理',
      buildingManage: '楼栋管理'
    }
  },

  forgetPwd: {
    stepOne: '验证手机号',
    stepTwo: '更改密码',
    stepThree: '完成',
    nextStep: '下一步',
    verif_code: '获取验证码',
    phoneNotNull: '手机号不能为空',
    formatPhone: '手机号格式错误',
    phoneNotExist: '该手机号未被注册',
    codeNotNull: '验证码不能为空',
    codeError: '验证码错误',
    sendLater: '已发送',
    message: {
      verifySuccess: '验证成功!',
      sendMessage: ',您正在使用登陆功能,该验证码仅用于身份验证,在五分钟之内有效，请勿泄露给其他人使用。',
      modifyError: '修改密码失败，即将返回！',
      modifySuccess: '修改密码成功！'
    },
    label: {
      phone: '手机号:',
      code: '验证码:'
    }
  },

  villaCenter: {
    noticeBoard: '公告栏信息编辑',
    infrastructure: '基础设施信息编辑',
    baseInfo: '基本信息编辑',
    phoneModule: '便民电话模块',
    warningModule: '温馨提示模块',
    Id: 'Id',
    phoneType: '电话类型',
    phoneNumber: '电话号码',
    phoneNumberEdit: '电话号码：',
    police: '警察',
    fire: '火警',
    ambulance: '救护车',
    planeBooking: '飞机订票',
    trainBooking: '火车订票',
    busHotline: '交通热线',
    consumerComplaints: '消费者投诉热线',
    weatherForecast: '天气预报热线',
    waterResources: '水利资源',
    environmentalComplaint: '环境保护投诉',
    customerService: '消费者服务',
    repairService: '维修服务',
    '警察': 'police',
    '火警': 'fire',
    '救护车': 'ambulance',
    '飞机订票': 'planeBooking',
    '火车订票': 'trainBooking',
    '交通热线': 'busHotline',
    '消费者投诉热线': 'consumerComplaints',
    '天气预报热线': 'weatherForecast',
    '水利资源': 'waterResources',
    '环境保护投诉': 'environmentalComplaint',
    '消费者服务': 'customerService',
    '维修服务': 'repairService',

    confirm: {
      deletePhone: '是否删除该电话类型？',
    },

    addPhoneModule: '添加电话类型',
    inputPhoneType: '请输入电话类型名称',
  },

  adminCenter: {
    editMessage: "用户可开始进行编辑操作"
  }
};
