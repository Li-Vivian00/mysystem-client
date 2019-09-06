export default {
  login: {
    userLogin: {
      inputPlaceholder: 'Please input user loginid',
      password: 'Please input password',
      code: 'Please input code',
      load: 'Load',
      register: 'Register',
      adminLogin: 'AdminLogin',
      forgetPwd: 'ForgetPassword?'
    },

    adminLogin: {
      inputPlaceholder: 'Please input admin loginid',
      password: 'Please input password',
      code: 'Please input code',
      userLogin: 'UserLogin',
      load: 'Load',
      forgetPwd: 'ForgetPassword?',
      loginIdNotExist: 'Loginid is not exist'
    },
    identifyCodes: '1234567890',
    loadingError: 'Fail to loading'
  },

  register: {
    label: {
      register: 'Register',
      loginId: 'LoginId:',
      userName: 'UserName:',
      password: 'Password:',
      repeatError: 'The two passwords did not match',
      repeatPassword: 'RepeatPwd:',
      sex: 'Sex:',
      phone: 'Phone:',
      email: 'Email:',
      card: 'Card:',
      male: 'Male',
      female: 'Female',
      room_id: 'Room Id:',
      stay_date: 'Stay_Date:'
    },

    inputPlaceholder: {
      loginId: 'Please input LoginId',
      userName: 'Please input userName',
      password: 'Please input password',
      repeatPassword: 'Please input repeatPassword',
      sex: 'Please input sex',
      phone: 'Please input phone',
      email: 'Please input email',
      card: 'Please input card'
    },

    title: {
      successItem:
        'Congratulations on your successful registration and joining the warm community!',
      returniItem: 'Jumping to the login interface',
      clickItem: 'Click on the jump login interface'
    },

    showMessage: {
      register: 'Registration failed'
    },

    status: {
      loginId: 'Please enter your login account',
      userName: 'Please enter user name',
      password: 'Please enter password',
      repeatPassword: 'Please enter your password again',
      email: 'Please enter your email',
      formatEmail: 'Please enter your correct email',
      phone: 'Please enter your phone',
      formatPhone: 'Please enter your correct phone',
      card: 'Please enter your card',
      formatCard: 'Please enter your correct card',
      sex: 'Please enter your sex',
      loginIdExist: 'The login account already exists',
      passwordError: 'Password mistake',
      repeatPasswordError: 'The two passwords did not match',
      phoneExist: 'The phone number has been registered',
      room_id: 'Please enter room id'
    }
  },

  button: {
    ok: 'ok',
    cancel: 'cancel',
    update: 'update'
  },

  manage: {
    batchDelete: 'Batch Delete',
    addUser: 'Add User',
    keyWord: 'KeyWord:',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    operate: 'Operate',
    selectHolder: 'Please choose',
    loadingText: 'Loading',
    inputText: 'Please input text',
    loginId: 'LoginId',
    id: 'ID',
    userName: 'UserName',
    options: {
      label: {
        all: 'All',
        loginId: 'LoginId',
        userName: 'UserName'
      }
    },
    confirm: {
      deleteAdmin: 'This operation deletes the user. Do you want to continue?',
      updateUserInfo: 'Whether to update the user information?',
      addUserInfo: 'Whether to add the user information?',
      warning: 'Warning'
    },
    showMessage: {
      delteError: 'Failed to delete user',
      deleteUserSuccess: 'User deleted successfully',

      cancel: 'Cancel the operation',

      getUserError: 'Failed to retrieve user information',

      operateError: 'Failed to operate',
      operateSuccess: 'Success to operate',

      updateError: 'Failed to update user',
      updateUserSuccess: 'User updated successfully',

      selectType: 'Please select the query keyword',
      inputText: 'The input cannot be empty. Enter the user you want to query',
      userUndefined: 'No user information, please search again!',
      searchError: 'Fail to query',
      batchDeleteEmpty: 'Please select the info which you want to delete'
    }
  },

  header: {
    adminHeader: 'Admin System',
    userHeader: 'User System',
    userCenter: 'User Center',
    logout: 'Logout',
    zh: 'ZH',
    en: 'EN'
  },

  sidebar: {
    admin: {
      villaCenter: 'VillaCenter',
      board: 'Board',
      baseInfo: 'BaseInfo',
      baseFacility: 'BaseFacility',
      propertyManage: 'PropertyManage',
      repairManage: 'RepairManage',
      opinionManage: 'OpinionManage',
      userManage: 'UserManage',
      customerManage: 'CustomerManage',
      adminManage: 'AdminManage',
      buildingManage: 'BuildingManage'
    }
  },

  forgetPwd: {
    stepOne: 'Verify phone number',
    stepTwo: 'Change password',
    stepThree: 'Finish',
    nextStep: 'Next step',
    verif_code: 'Get code',
    phoneNotNull: 'Cell phone number cannot be empty',
    formatPhone: 'Wrong format of phone number',
    phoneNotExist: 'The phone number is not registered',
    codeNotNull: 'The verification code cannot be empty',
    codeError: 'Verification code error',
    sendLater: 'Already send',
    message: {
      verifySuccess: 'Authentication is successful!',
      sendMessage:
        ',You are using the login function. This verification code is only used for authentication. It is valid for five minutes.',
      modifyError: 'Password change failed. Coming back!',
      modifySuccess: 'Password changed successfully!'
    },
    label: {
      phone: 'Phone:',
      code: 'Code:'
    }
  },

  villaCenter: {
    noticeBoard: 'Bulletin board information editing',
    infrastructure: 'Infrastructure information editing',
    baseInfo: 'Basic information editing',
    phoneModuleTitle: 'Convenient telephone module',
    warningModuleTitle: 'Tips module',
    Id: 'Id',
    phoneType: 'Phone Type',
    phoneNumber: 'Phone Number',
    phoneNumberEdit: 'PhoneNumber:',

    confirm: {
      deletePhone: 'Whether to delete the phone type?',
      changeContent: 'Whether to update the content?'
    },

    addPhoneModule: 'Add Phone Module',
    inputPhoneType: 'Pleast enter the type of phone module',

    warningModule: {
      title: "Title:",
      content: "Content:",
      inputTitle: "Please input Title"
    }
  },

  repairManage: {
    type: 'Type',
    problemDescription: 'Problem Description',
    time: 'submission Time',
    status: 'Status',
    remark: 'Remark',
    room_id: 'Room ID',
    phone: 'Contact Number',
    keyWord: 'Query Criteria: ',
    processed: 'Processed',
    pending: 'Pending',
  },

  adminCenter: {
    editMessage: 'You can begin to edit info'
  }
};
