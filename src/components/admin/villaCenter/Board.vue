<template>
  <div class="center_page">
    <div class="title">
      <span class="edit_title">{{$t("villaCenter.noticeBoard")}}</span>
      <i class="el-icon-edit"></i>
    </div>
    <el-menu
             :default-active="onRoutes"
             router
             class="el-menu-demo"
             mode="horizontal">
      <template v-for="item in items">
        <template>
          <el-menu-item :index="item.index">
            {{ $t(item.label) }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="content">
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { constants } from 'crypto';
export default {
  name: "board",
  data () {
    return {
      activeIndex: "phoneModule",
      items: [
        {
          index: "phoneModule",
          label: "villaCenter.phoneModuleTitle"
        },
        {
          index: "warningModule",
          label: "villaCenter.warningModuleTitle"
        }
      ]
    }
  },
  mounted () {
    this.$router.push("/phoneModule")
  },
  computed: {
    onRoutes (key, keyPath) {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    // onRoutes (key, keyPath) {
    //   this.activeIndex = key;
    //   console.log(key + '--' + keyPath + this.activeIndex);
    //   if (keyPath == 'phoneModule') {
    //     this.activeIndex = 'phoneModule'
    //   }
    //   return this.$route.path.replace("/", "");
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/css/villaCenter/villaCenter";
</style>
