export default {
  login: {
    userLogin: {
      inputPlaceholder: "Please input user loginid",
      password: "Please input password",
      code: "Please input code",
      load: "Load",
      register: "Register"
    },

    adminLogin: {
      inputPlaceholder: "Please input admin loginid",
      password: "Please input password",
      code: "Please input code"
    },
  },

  register: {
    label: {
      loginId: "LoginId:",
      userName: "UserName:",
      password: "Password:",
      repeatPassword: "RepeatPassword:",
      sex: "Sex:",
      phone: "Phone:",
      email: "Email:",
      card: "Card:",
      male: "Male:",
      female: "Female:"
    },

    inputPlaceholder: {
      loginId: "Please input LoginId",
      userName: "Please input userName",
      password: "Please input password",
      repeatPassword: "Please input repeatPassword",
      sex: "Please input sex",
      phone: "Please input phone",
      email: "Please input email",
      card: "Please input card"
    }
  },

  button: {
    ok: "ok",
    cancel: "cancel",
    update: "update"
  },

  manage: {
    batchDelete: "Batch Delete",
    keyWord: "KeyWord:",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    operate: "Operate",
    loadingText: "Loading",
    inputText: "Please input text",
    loginId: "LoginId",
    userName: "UserName",
    options: {
      label: {
        all: "All",
        loginId: "LoginId",
        userName: "UserName"
      }
    },
    confirm: {
      deleteAdmin: "This operation deletes the user. Do you want to continue?",
      updateUserInfo: "Whether to update the user information",
      warning: "Warning",
    },
    showMessage: {
      deleteUserError: "删除用户失败",
      delteError:"Failed to delete user",
      deleteUserSuccess: "User deleted successfully",

      cancel: "Cancel the operation",

      getUserInfoError:"获取用户信息失败",
      getUserError: "Failed to retrieve user information",

      updateUserError:"更新用户失败",
      updateError: "Failed to update user",
      updateUserSuccess: "User updated successfully",

      inputText: "The input cannot be empty. Enter the user you want to query",
      userIsNull: "No user information is available",
      userUndefined: "No user information, please search again!",
      searchError: "Fail to query"
    }
  }
}
