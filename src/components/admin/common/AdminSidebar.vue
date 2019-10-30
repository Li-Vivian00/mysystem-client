<template>
  <div class="sidebar">
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
  name: "AdminSidebar",
  data () {
    return {
      items: [
        {
          icon: "el-icon-setting",
          index: "baseInfo",
          title: "sidebar.admin.villaCenter",
          subs: [
            {
              index: "phoneModule",
              title: "sidebar.admin.board"
            },
            {
              index: "baseInfoAboutBuilding",
              title: "villaCenter.baseInfo.baseInfoBuilding"
            },
            {
              index: "baseFacility",
              title: "sidebar.admin.baseFacility"
            }
          ]
        },
        {
          icon: "el-icon-setting",
          index: "repairManage",
          title: "sidebar.admin.propertyManage",
          subs: [
            {
              index: "repairManage",
              title: "sidebar.admin.repairManage"
            },
            {
              index: "opinionManage",
              title: "sidebar.admin.opinionManage"
            }
          ]
        },
        {
          icon: "el-icon-setting",
          index: "customerManage",
          title: "sidebar.admin.userManage",
          subs: [
            {
              index: "customerManage",
              title: "sidebar.admin.customerManage"
            },
            {
              index: "adminManage",
              title: "sidebar.admin.adminManage"
            }
          ]
        },
        {
          icon: "el-icon-setting",
          index: "buildingManage",
          title: "sidebar.admin.buildingManage"
        },
        {
          icon: "el-icon-wallet",
          index: "billManage",
          title: "sidebar.admin.billManage"
        }
      ]
    };
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace("/", "");
    }
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 105px;
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
