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
  name: "userSidebar",
  data () {
    return {
      items: [
        {
          icon: "el-icon-service",
          index: "onlineService",
          title: "sidebar.user.comments",
        },
        {
          icon: "el-icon-chat-line-round",
          index: "userComment",
          title: "sidebar.user.onlineService",
        },
        {
          icon: "el-icon-user",
          index: "userCenter",
          title: "sidebar.admin.baseInfo",
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
    },
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
      width: 35%;
      /* left: -57px; */
      /* float: left; */
      height: 60%;
      margin-bottom: 5px;
    }
    p {
      color: #8d8b8b;
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
