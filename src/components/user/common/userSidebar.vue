<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      theme="dark"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              {{ item.title }}
            </template>
            <el-menu-item
              v-for="(subItem,i) in item.subs"
              :key="i"
              :index="subItem.index"
            >{{ subItem.title }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // items: [
      //   {
      //     icon: "el-icon-setting",
      //     index: "readme",
      //     title: "别墅管理",
      //     subs: [
      //       {
      //         index: "readme",
      //         title: "别墅信息"
      //       },
      //       {
      //         index: "readme",
      //         title: "公告栏信息"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-setting",
      //     index: "userCenter",
      //     title: "用户管理"
      //   },
      //   {
      //     icon: "el-icon-setting",
      //     index: "userCenter",
      //     title: "楼宇管理"
      //   },
      //   {
      //     icon: "el-icon-setting",
      //     index: "userCenter",
      //     title: "设备管理"
      //   },
      //   {
      //     icon: "el-icon-setting",
      //     index: "userCenter",
      //     title: "物业管理"
      //   }
      // ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #ffffff;
  /* z-index:99999; */
}
.sidebar > ul {
  height: 100%;
}
.el-menu-vertical-demo {
  background: #ffffff !important;
}
</style>
