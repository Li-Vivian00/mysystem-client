export default {
  login: {
    userLogin: {
      inputPlaceholder: 'Please input user loginid',
      password: 'Please input password',
      code: 'Please input code',
      load: 'Load',
      register: 'Register',
      adminLogin: 'AdminLogin',
      forgetPwd: 'ForgetPassword?',
      oldPassword: 'Old Password:',
      placeholderOldPassword: 'Please input old password',
      newPassword: 'New Password',
      placeholderNewPassword: 'Please input new password'
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
      stay_date: 'Stay_Date:',
      name: 'Name'
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
      loginIdNotExist: 'The login account is not exists',
      passwordError: 'Password mistake',
      repeatPasswordError: 'The two passwords did not match',
      phoneExist: 'The phone number has been registered',
      room_id: 'Please enter room id',
      complaintType: 'Please select type',
      complaintDetail: 'Please enter the detail',
      userRequire:
        'Please enter comments/suggestions, if not, fill in the "No" '
    }
  },

  button: {
    ok: 'ok',
    cancel: 'cancel',
    update: 'update',
    submit: 'Submit',
    add: 'Add'
  },

  manage: {
    batchDelete: 'Batch Delete',
    addUser: 'Add User',
    keyWord: 'KeyWord:',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    export: 'Export All',
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
      batchDeleteEmpty: 'Please select the info which you want to delete',
      oldPasswordIsError: 'The old password is wrong',
      successUpdatePwd: 'Change password successfully! Click ok to login again.',
      successSend: 'Success to remind!',
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
      buildingManage: 'BuildingManage',
      billManage: 'BillManage',
    },
    user: {
      onlineService: 'Online service',
      comments: 'Comments/complaints',
      point: 'Online score',
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
    noticeBoard: 'Bulletin board information',
    infrastructure: 'Infrastructure information',
    baseInfoTitle: 'Basic information editing',
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
      title: 'Title:',
      content: 'Content:',
      inputTitle: 'Please input Title',
      conpleteFilling: 'Please fill in the complete information'
    },

    baseInfo: {
      baseInfoAboutUs: 'About Us',
      baseInfoBuilding: 'About Building'
    }
  },

  repairManage: {
    type: 'Type',
    problemDescription: 'Problem Description',
    time: 'Submission Time',
    handleTime: 'Handle Time',
    status: 'Status',
    remark: 'Remark',
    room_id: 'Room ID',
    phone: 'Contact Number',
    keyWord: 'Query Criteria: ',
    processed: 'Processed',
    pending: 'Pending',
    isProcessed: 'Has the problem been processed?',
    repairManageTitle: 'Online Repair Management'
  },

  opinionManage: {
    opinionManageTitle: 'Opinions/Complaint Management',
    replied: 'Replied',
    noReply: 'No Reply',
    waitReply: 'No Reply',
    userName: 'User Name',
    phone: 'Contact Number',
    require: 'Require',
    type: 'Type of opinion / complaint',
    content: 'Content of complaint / opinion',
    emergencyDegree: 'Emergency Degree',
    date: 'Submission Time',
    answerContent: 'Reply to content',
    isHandleReply: 'Whether to submit a response?',
    answerContentIsNull: 'Please enter the reply!'
  },

  billManage: {
    addBill: 'Add Bill',
    selectDate: 'Please select the start and end date',
    waterRent: 'Water Rent',
    powerRent: 'Power Rent',
    managementFee: 'Property Management Fee',
    garbageCharge: 'Garbage Charge',
    unpaid: 'Unpaid',
    PaidFee: 'Already Paid',
    detail: 'Detail',
    price: 'Price:',
    count: 'Count:',
    date: 'Date',
    to: 'To',
    start_date: 'Start Date',
    end_date: 'End Date',
    remark: 'Remark',
    execute: 'Executing...',
    remindPay: 'Reminders for payment',
    total: 'Total Price',
  },
  buildingManage: {
    floorId: 'Floor Id',
    floorName: 'Floor Name',
    startDate: 'Start Date',
    endDate: 'End Date',
    floorHold: 'Floor Hold',
    floorArea: 'Floor Area',
    roomArea: 'Room Area',
    roomType: 'Room Type',
    score: 'User Rating ',
  },
  adminCenter: {
    editMessage: 'You can begin to edit info'
  },

  homePage: {
    homeHeader: {
      home: 'Home',
      login: 'Login',
      adminLogin: 'Admin Login',
      userLogin: 'User Login',
      aboutUs: 'About Us',
      dailyNews: 'Wonderful Moment',
    },
    homeCenter: {
      forestItem: 'Forests City Of Happiness Harbor',
      forestDetailItem:
        'The ground of forest city is all a park, vehicles are running through the ground, the ground is pollution-free rail transit, the outer wall of the building is full of vertically distributed plants, every day, people are living in the garden, breathing in the forest, pleasure from...',
      learnMore: 'Learn More >',
      realEstate: 'Real Estate',
      agricultural: 'Agricultural',
      property: 'Property',
      hotel: 'Hotel',
      customerCenter: 'Customer Center',
      other: 'Others'
    },
    userRepair: {
      addApplication: 'To apply for the repair',
      title: 'Online Application Form',
      waitHandle: 'Wait to handle',
      finishHandle: 'Processed ',
      repairType: 'Repair Type',
      repairContent: 'Repair Content',
      netWrok: 'Network fault',
      environment: 'Harsh',
      hydroelectricity: 'Water and electricity supply',
      emergencyHandle: 'Emergency treatment'
    },
    userOpinion: {
      title: 'Complaint/Opinion Form',
      addComplaint: 'Fill in form',
      typePlaceholder: 'Please select type',
      netWork: 'NetWork',
      environment: 'Environment',
      hydroelectricity: 'Hydroelectricity',
      others: 'Others',
      detail: 'Detailed content ',
      require: 'Observations/recommendations '
    },
    dailyNews: {
      serviceHotline: 'Service Hotline',
      setPoint: 'Go to Give a Mark >>>',
      totalOwner: 'Total number of modules',
      totalPoint: 'Household score of each unit',
    },
    aboutUs: {
      companyProfile: 'Company Profile',
      corporateCulture: 'Corporate Culture',
      leftTitle: "Fuli port is the practitioner of China's new urbanization process and the builder of global green ecological smart cities",
      town: 'Town',
      owners: 'Thousand Owners',
      whatFuli: 'What is FuLi',
      whatFuliTwo: 'FuLi is a high-tech comprehensive enterprise that creates better life products for the whole world',
      titleOne: 'We are committed to providing good homes, good communities for people who want a better life',
      titleOneSub: 'For more than 20 years, as a practical practitioner of new urbanization, we have brought modern urban appearance to more than 1200 cities and towns in order to build Minsheng real estate. With the application of high technology, we have become the builders of green ecological intelligent architecture. We pioneered the three-dimensional layered modern urban architecture-Forest City, which was named "the top five cities affecting the future of the world" by Forbes. ',
      titleOneSubT: 'Today, more than 4 million owners choose to live and work in country Garden. Entering the era of industrial 4.0, with the addition of construction robots, we will improve the safety, beauty, economy, applicability and durability of the house with the high performance and price ratio of craftsmen. High-tech intelligent community, let us always maintain the world-class community service level. The country Garden project has always been the beautiful scenery and business card of the city: garden landscape, life square makes the local people forget to return, clubhouse, property service makes people live comfortably and safely. ',
      titleTwo: 'We are actively involved in intelligent manufacturing and development of science and technology.',
      titleTwoSub: "Science and technology is the first productive force, intelligent manufacturing has great potential. As an enterprise with nearly 200000 employees and more than 1000 doctors, we invest a lot of money to build robot valley, invite top talents, do a good job of incubator, set up R & D team, turn the most advanced scientific research results into practical and cheap high-tech products, make people's lives better, help the national scientific and technological progress, and benefit all mankind.",
      titleThree: 'We develop modern agriculture and revitalize the countryside.',
      titleThreeSub: "We introduce the world's first-class agricultural production technology and equipment, and also use the research and development advantages of the robot, layout the whole industrial chain of agriculture, and through the retail of the community and the whole society of the Biguiyuan, and share the dividend of the development of modern agriculture with the farmers, and help the farmers to increase their income and become rich. At the same time, to produce and provide safe, delicious, affordable, rich agricultural products and daily necessities for each family at a lower price.",
      titleFour: 'We want society to be better because of our existence. ',
      titleFourSub: 'Precision poverty alleviation and rural revitalization are also one of our main undertakings. To this end, we make unremitting efforts to create social value',
      p1: 'Values: we should be sunshine enterprises with conscience and social responsibility. ',
      p2: 'Corporate mission: hope that society will be better because of our existence ',
      p3: 'Enterprise spirit: good for people and good for society ',
      p4: 'Brand concept: give you a five-star home ',
      p5: 'Quality policy: process boutique, human settlements model',
      p6: 'The concept of talents: the virtue of virtue is the virtue of virtue, and the talents and the talents are both unique and capable of being at the same time ',
      p7: 'Strategic Vision: To be the most competitive real estate company in the world.',
    },
    foot: {
      a1: 'Copyright Guangzhou Yuexiu district Fuligang property development co., Ltd all rights reserved by Guangdong icp no. 11111111-1 ',
      a2: 'Legal Declaration  ·',
      a3: 'Site Map ·',
      a4: 'Technical Support',
      a5: 'Fuli Port headquarters Service Supervisory telephone:400888888',
    }
  }
};
