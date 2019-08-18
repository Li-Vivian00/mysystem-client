import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import adminLogin from '../components/login/adminLogin'
import userLogin from '../components/login/userLogin'
import register from '../components/login/register'
import userHome from '../components/user/common/userHome'
import adminHome from '../components/admin/common/adminHome'
import Readme from '../components/Readme'
import userCenter from '../components/user/userCenter'
import adminCenter from '../components/admin/adminCenter'
import modifyPassword from '../components/user/modifyPassword'
import customerManage from '../components/admin/userManage/customerManage'
import adminManage from '../components/admin/userManage/adminManage'
import villaCenter from '../components/admin/villaCenter/villaCenter'
import board from '../components/admin/villaCenter/board'
import baseInfor from '../components/admin/villaCenter/baseInfo'
import baseFacility from '../components/admin/villaCenter/baseFacility'
import repairManage from '../components/admin/repairManage/repairManage'
import opinionManage from '../components/admin/repairManage/opinionManage'
import buildingManage from '../components/admin/buildingManage/buildingManage'
import adminForget from '../components/login/adminForget'
import userForget from '../components/login/userForget'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/userlogin',
      component: userLogin
    },
    {
      path: '/userHome',
      component: userHome,
      children: [
        {
          path: '/readme',
          component: Readme
        },
        {
          path: '/userCenter',
          component: userCenter    // 拖拽列表组件 
        },
        {
          path: '/modifyPassword',
          component: modifyPassword
        },
      ]
    },
    {
      path: '/adminHome',
      component: adminHome,
      children: [
        //首页
        {
          path: '/readme',
          component: Readme
        },

        //个人中心
        {
          path: '/adminCenter',
          component: adminCenter
        },

        //别墅中心
        {
          path: '/villaCenter',
          component: villaCenter
        },
        {
          path: '/board',
          component: board
        },
        {
          path: '/baseInfo',
          component: baseInfor
        },
        {
          path: '/baseFacility',
          component: baseFacility
        },

        //物业管理
        {
          path: '/repairManage',
          component: repairManage
        },
        {
          path: '/opinionManage',
          component: opinionManage
        },

        //用户管理
        {
          path: '/customerManage',
          component: customerManage
        },
        {
          path: '/adminManage',
          component: adminManage
        },

        //楼栋管理
        {
          path: '/buildingManage',
          component: buildingManage
        }
      ]
    },

    //忘记密码
    {
      path: '/adminForget',
      component: adminForget
    },

    {
      path: '/userForget',
      component: userForget
    }
  ]
})
