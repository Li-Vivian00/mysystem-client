import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import homePage from '../components/page/HomePage';
import homeCenter from '../components/page/HomeCenter';
import aboutUs from '../components/page/AboutUs.vue';
import dailyNews from '../components/page/dailyNews.vue';
import adminLogin from '../components/login/AdminLogin';
import userLogin from '../components/login/UserLogin';
import register from '../components/login/Register';
import adminHome from '../components/admin/common/AdminHome';
import userCenter from '../components/user/UserCenter';
import userOnlineService from '../components/user/UserOpinion';
import userPoint from '../components/user/userPoint';
import userComment from '../components/user/UserRepair';
import userHome from '../components/user/UserHome';
import adminCenter from '../components/admin/adminCenter';
import billManage from '../components/admin/billManage/billManage.vue';
import modifyPassword from '../components/user/UserModifyPassword';
import customerManage from '../components/admin/userManage/CustomerManage';
import adminManage from '../components/admin/userManage/AdminManage';
import board from '../components/admin/villaCenter/Board';
import phoneModule from '../components/admin/villaCenter/BoardPhoneModule';
import warningModule from '../components/admin/villaCenter/BoardWarningModule';
import baseInfo from '../components/admin/villaCenter/BaseInfo';
import baseInfoAboutUs from '../components/admin/villaCenter/BaseInfoAboutUs';
import baseInfoAboutBuilding from '../components/admin/villaCenter/BaseInfoAboutBuilding';
import baseFacility from '../components/admin/villaCenter/BaseFacility';
import repairManage from '../components/admin/repairManage/RepairManage';
import opinionManage from '../components/admin/repairManage/OpinionManage';
import buildingManage from '../components/admin/buildingManage/BuildingManage';
import adminForget from '../components/login/AdminForget';
import userForget from '../components/login/UserForget';
import payPage from '../components/user/payPage.vue';
import userBill from '../components/user/UserBill';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      children: [
        {
          path: '/homeCenter',
          component: homeCenter
        },
        {
          path: '/aboutUs',
          component: aboutUs
        },
        {
          path: '/dailyNews',
          component: dailyNews
        },
        {
          path: '/userHome',
          component: userHome,
          children: [
            {
              path: '/userCenter',
              component: userCenter
            },
            {
              path: '/modifyPassword',
              component: modifyPassword
            },
            {
              path: '/onlineService',
              component: userComment
            },
            {
              path: '/userComment',
              component: userOnlineService
            },
            {
              path: '/userPoint',
              component: userPoint
            },
            {
              path: '/userBill',
              component: userBill
            }
          ]
        }
      ]
    },

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
      path: '/adminHome',
      component: adminHome,
      children: [
        //个人中心
        {
          path: '/adminCenter',
          component: adminCenter
        },

        //别墅中心
        {
          path: '/board',
          component: board,
          children: [
            {
              path: '/phoneModule',
              component: phoneModule
            },
            {
              path: '/warningModule',
              component: warningModule
            }
          ]
        },
        {
          path: '/baseInfoAboutBuilding',
          component: baseInfo
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

        //账单管理
        {
          path: '/billManage',
          component: billManage
        },
        //楼栋管理
        {
          path: '/buildingManage',
          component: buildingManage
        }
      ]
    },

    {
      path: '/adminForget',
      component: adminForget
    },

    {
      path: '/userForget',
      component: userForget
    },

    {
      path: '/payPage',
      component: payPage
    }
  ]
});
