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
      loginIdNotExist: '用户账号不存在',
      oldPassword: '旧密码：',
      placeholderOldPassword: '请输入旧密码',
      newPassword: '新密码：',
      placeholderNewPassword: '请输入新密码'
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
      stay_date: '入住时间：',
      name: '姓名'
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
      loginIdNotExist: '登录账号不存在',
      passwordError: '密码错误',
      repeatPasswordError: '两次输入的密码不一致',
      phoneExist: '该手机号已被注册',
      room_id: '请输入房间号',
      complaintType: '请选择类型',
      complaintDetail: '请输入详细内容',
      userRequire: '请输入意见/建议，如无则填写“无”'
    }
  },

  button: {
    ok: '确认',
    cancel: '取消',
    update: '更新',
    submit: '提交',
    add: '添加'
  },

  manage: {
    batchDelete: '批量删除',
    addUser: '添加用户',
    keyWord: '关键字：',
    edit: '编辑',
    delete: '删除',
    search: '搜索',
    export: '导出所有',
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
      searchError: '查询失败',
      batchDeleteEmpty: '请选择需要删除的信息',
      oldPasswordIsError: '旧密码错误',
      successUpdatePwd: '修改密码成功！点击确认后重新登陆。',
      successSend: '已成功发送提醒消息！',
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
      buildingManage: '楼栋管理',
      billManage: '账单管理',
    },
    user: {
      onlineService: '网上报修',
      comments: '意见/投诉',
      point: '线上评分',
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
    noticeBoard: '公告栏',
    infrastructure: '基础设施',
    baseInfoTitle: '基本信息编辑',
    phoneModuleTitle: '便民电话模块',
    warningModuleTitle: '温馨提示模块',
    Id: 'Id',
    phoneType: '电话类型',
    phoneNumber: '电话号码',
    phoneNumberEdit: '电话号码：',

    confirm: {
      deletePhone: '是否删除该电话类型？',
      changeContent: '是否更新此内容？'
    },

    addPhoneModule: '添加电话类型',
    inputPhoneType: '请输入电话类型名称',

    warningModule: {
      title: '标题：',
      content: '内容：',
      inputTitle: '请输入标题',
      conpleteFilling: '请填写完整信息'
    },

    baseInfo: {
      baseInfoAboutUs: '关于我们',
      baseInfoBuilding: '楼宇信息'
    }
  },

  repairManage: {
    type: '类型',
    problemDescription: '问题描述',
    time: '提交时间',
    handleTime: '处理时间',
    status: '状态',
    remark: '备注',
    room_id: '房间号',
    phone: '联系电话',
    keyWord: '查询条件：',
    processed: '已处理',
    pending: '待处理',
    isProcessed: '是否已处理该问题？',
    repairManageTitle: '网上报修管理'
  },

  opinionManage: {
    opinionManageTitle: '意见/投诉管理',
    replied: '已回复',
    noReply: '待回复',
    waitReply: '待回复',
    userName: '联系人',
    phone: '联系电话',
    type: '意见/投诉类型',
    content: '意见/投诉内容',
    require: '提出要求',
    emergencyDegree: '紧急程度',
    date: '提交时间',
    answerContent: '回复内容',
    isHandleReply: '是否提交回复？',
    answerContentIsNull: '请输入回复内容！'
  },

  billManage: {
    addBill: '添加账单',
    selectDate: '请选择起止日期',
    waterRent: '水费',
    powerRent: '电费',
    managementFee: '物业管理费',
    garbageCharge: '垃圾费',
    unpaid: '未缴费',
    PaidFee: '已缴费',
    detail: '详细信息',
    price: '单价：',
    count: '数量：',
    date: '起止日期',
    to: '至',
    start_date: '开始日期',
    end_date: '结束日期',
    remark: '备注',
    execute: '执行中...',
    remindPay: '提醒缴费',
    total: '合计',
  },

  buildingManage: {
    floorId: '楼栋号',
    floorName: '楼栋名称',
    startDate: '开工时间',
    endDate: '竣工时间',
    floorHold: '得房率',
    floorArea: '建筑面积',
    roomArea: '房间面积',
    roomType: '房间类型',
    score: '用户评分',
  },

  adminCenter: {
    editMessage: '用户可开始进行编辑操作'
  },

  homePage: {
    homeHeader: {
      home: '首页',
      login: '登录',
      adminLogin: '管理员登录',
      userLogin: '用户登录',
      aboutUs: '关于幸福港',
      dailyNews: '精彩一刻',
    },
    homeCenter: {
      forestItem: '幸福港森林城市',
      forestDetailItem:
        '森林城市地面都是公园，车辆在底层穿行，地面是无污染轨道交通，建筑外墙长满垂直分布的植物，每一天，人们就都生活在花园里，呼吸在森林里，愉悦在自...',
      learnMore: '了解更多 >',
      realEstate: '地产',
      agricultural: '农业',
      property: '物业',
      hotel: '酒店',
      customerCenter: '客服中心',
      other: '其他'
    },
    userRepair: {
      addApplication: '申请报修',
      title: '网上报修申请表',
      waitHandle: '待处理',
      finishHandle: '已处理',
      repairType: '报修类型',
      repairContent: '报修内容',
      netWrok: '网络故障',
      environment: '环境恶劣',
      hydroelectricity: '水电供应',
      emergencyHandle: '紧急处理'
    },
    userOpinion: {
      title: '投诉/意见表',
      addComplaint: '填写表格',
      typePlaceholder: '请选择类型',
      netWork: '网络',
      environment: '环境',
      hydroelectricity: '水电',
      others: '其他',
      detail: '详细内容',
      require: '意见/建议'
    },
    dailyNews: {
      serviceHotline: '服务热线',
      setPoint: '我要去评分 >>>',
      totalOwner: '各单元总人数',
      totalPoint: '各单元用户评分',
    },

    aboutUs: {
      companyProfile: '公司简介',
      corporateCulture: '企业文化',
      leftTitle: "富力港是中国新型城镇化进程的身体力行者是全球绿色生态智慧城市的建造者",
      town: '城镇',
      owners: '万业主',
      whatFuli: '碧桂园是什么',
      whatFuliTwo: '碧桂园是为全世界创造美好生活产品的高科技综合性企业。',
      titleOne: '我们一直致力于为追求美好生活的人提供好房子，好社区。',
      titleOneSub: '20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。',
      titleOneSubT: '如今，有超过400万业主选择在碧桂园安居乐业。进入工业4.0的时代，随着建筑机器人的加入，我们以工匠精神反复推敲的高性价比房子，在安全、美观、经济、适用和耐久上将得到全面提升。高科技打造的智慧社区，让我们始终保持世界一流的小区服务水平。碧桂园项目一直是所在城市的亮丽风景线和名片：园林景观、生活广场使当地人民流连忘返，会所、物业服务令人生活舒适、安全。',
      titleTwo: '我们积极投身智能制造，发展科学技术。',
      titleTwoSub: '科学技术是第一生产力，智能制造大有可为。作为一家拥有近20万名员工，1000多名博士的企业，我们投巨资，建机器人谷，延请顶尖人才，做好孵化器，成立研发团队，把最先进的科研成果转化成实用又物美价廉的高科技产品，让人们的生活更美好，助力国家科技进步，造福全人类。',
      titleThree: '我们发展现代农业，振兴乡村。',
      titleThreeSub: '我们引入世界一流的农业生产技术、设备，同时利用机器人研发优势，布局农业全产业链，并通过对碧桂园的社区及全社会进行零售，与农民共享现代农业发展的红利，帮助农民增收致富，同时以较低的价格，为每一个家庭生产和提供安全、好吃、实惠、丰富的农产品及常用生活用品。',
      titleFour: '我们希望社会因我们的存在而变得更加美好。',
      titleFourSub: '精准扶贫和乡村振兴也是我们的主业之一。为此，我们不懈创造社会价值和经济价值。立业至今，碧桂园创始人及集团累计参与社会慈善捐款已超55亿元，并主动承担起全国9省14县的精准扶贫和乡村振兴工作，正帮助33.6万农村贫困人口脱贫致富。',
      p1: '价值观：我们要做有良心、有社会责任感的阳光企业',
      p2: '企业使命：希望社会因我们的存在而变得更加美好',
      p3: '企业精神：对人好，对社会好',
      p4: '品牌理念：给您一个五星级的家',
      p5: '质量方针：过程精品，人居典范',
      p6: '人才理念：以德为本，德才兼备；不拘一格，能者居上',
      p7: '战略愿景：做全球最具竞争力的房地产公司',
    },

    foot: {
      a1: '广州市越秀区富力港物业发展有限公司版权所有 粤ICP备11111111号-1',
      a2: '法律声明 ·',
      a3: '网站地图 ·',
      a4: '技术支持',
      a5: '富力港总部服务监督电话：400888888',
    }
  }
};
