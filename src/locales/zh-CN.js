export default {
  login: {
    userLogin: {
      inputPlaceholder: "请输入用户账号",
      password: "请输入密码",
      code: "请输入验证码",
      load: "登录",
      register: "注册"
    },
    adminLogin: {
      inputPlaceholder: "请输入管理员账号",
      password: "请输入密码",
      code: "请输入验证码",
      load: "登录",
    },
  },

  register: {
    label: {
      loginId: "登录账号：",
      userName: "用户名：",
      password: "密码：",
      repeatPassword: "确认密码：",
      sex: "性别：",
      phone: "联系电话：",
      email: "邮箱：",
      card: "身份证：",
      male: "男",
      female: "女"
    },
    inputPlaceholder: {
      loginId: "请输入登录账号",
      userName: "请输入用户名称",
      password: "请输入密码",
      repeatPassword: "请再次输入密码",
      sex: "请输入性别",
      phone: "请输入手机",
      email: "请输入邮箱",
      card: "请输入身份证"
    }
  },

  button: {
    ok: "确认",
    cancel: "取消",
    update: "更新"
  },

  adminManage: {
    batchDelete: "批量删除",
    edit: "编辑",
    delete: "删除",
    search: "搜索",
    operate: "操作",
    loadingText: "拼命加载中",
    inputText: "请输入内容",
    loginId: "登陆账号",
    userName: "用户名",
    options: {
      label: {
        all: "全部",
        loginId: "登陆账号",
        userName: "用户名"
      }
    },
    confirm: {
      deleteAdmin: "此操作删除该管理员，是否继续？",
      updateUserInfo:"是否更新该用户信息",
      warning: "提示",
    },
    showMessage: {
      deleteUserError: "删除用户失败",
      deleteUserSuccess: "删除用户成功！",
      
      cancel: "取消操作",

      getUserInfoError:"获取用户信息失败",

      updateUserError: "更新用户失败",
      updateUserSuccess: "用户更新成功",

      inputText: "输入不能为空，请输入需要查询的用户",
      userIsNull:"无该用户信息",
      userUndefined:"无该用户信息，请重新搜索！",
      searchError:"查询失败"
    }
  }
}