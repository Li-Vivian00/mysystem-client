<template>
  <div class="sidebar">
    <div class="userImg">
      <img src="../../../static/img/userImg.jpg"
           alt="">
      <p>{{username}}</p>
    </div>
    <el-menu :default-active="onRoutes"
             class="el-menu-vertical-demo"
             theme="dark"
             unique-opened
             router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              {{ $t(item.title) }}
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs"
                          :key="i"
                          :index="subItem.index">{{ $t(subItem.title) }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>
            {{  $t(item.title) }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: "el-icon-user",
          index: "userCenter",
          title: "sidebar.admin.baseInfo",
          // subs: [
          //   {
          //     index: "phoneModule",
          //     title: "sidebar.admin.board"
          //   },
          //   {
          //     index: "baseInfoAboutUs",
          //     title: "sidebar.admin.baseInfo"
          //   },
          //   {
          //     index: "baseFacility",
          //     title: "sidebar.admin.baseFacility"
          //   }
          // ]
        },
        {
          icon: "el-icon-mobile",
          index: "modifyPassword",
          title: "forgetPwd.stepTwo",
        },
      ]
    };
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace("/", "");
    }
  },
  computed: {
    username () {
      let username = "Welcome! " + sessionStorage.getItem("userLoginId");
      return sessionStorage.getItem("userLoginId") ? username : "";
    }
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 105px;
  bottom: 0;
  background: #ffffff;
  /* z-index:99999; */
  .userImg {
    width: 100%;
    height: 25%;
    position: relative;
    img {
      position: relative;
      display: inline-block;
      width: 33%;
      /* left: -57px; */
      /* float: left; */
      height: 50%;
      margin-bottom: 5px;
    }
    p {
      color: #333333;
      font-family: "dincond-medium";
    }
  }
}
.sidebar > ul {
  height: 100%;
}
.el-menu-vertical-demo {
  background: #ffffff !important;
}
</style>
