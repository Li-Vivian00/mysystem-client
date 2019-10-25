<template>
  <div class="homeHeader">
    <div class="logo">
      <img src="../../../static/img/logo.jpg"
           alt="The Shield">
    </div>
    <div class="menuBox">
      <el-menu class="el-menu-demo menu"
               mode="horizontal"
               router
               @select="handleSelect">
        <el-menu-item index="homeCenter">{{$t("homePage.homeHeader.home")}}</el-menu-item>
        <el-menu-item index="aboutUs">{{$t("homePage.homeHeader.aboutUs")}}</el-menu-item>
        <el-menu-item index="dailyNews">{{$t("homePage.homeHeader.dailyNews")}}</el-menu-item>
        <el-submenu index="3"
                    v-if="username == ''">
          <template slot="title">{{$t("homePage.homeHeader.login")}}</template>
          <el-menu-item index="adminLogin">{{$t("homePage.homeHeader.adminLogin")}}</el-menu-item>
          <el-menu-item index="/">{{$t("homePage.homeHeader.userLogin")}}</el-menu-item>
        </el-submenu>
        <el-submenu index="userHome"
                    v-else>
          <template slot="title" style="border-bottom: 2px solid #fff;">{{$t("header.userCenter")}}</template>
          <el-menu-item index="userHome">{{$t("sidebar.admin.baseInfo")}}</el-menu-item>
          <el-menu-item index="/">{{$t("header.logout")}}</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="langBox">
        <span class="item"
              v-if="username != null">
          {{username}}
        </span>
        <img src="../../../static/global.svg"
             alt=""
             class="global">
        <el-dropdown @command="selectLang"
                     class="language">
          <span class="el-dropdown-link">
            {{lang == 'ZH'? $t("header.zh"):$t("header.en")}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="ZH">{{$t("header.zh")}}</el-dropdown-item>
            <el-dropdown-item command="EN">{{$t("header.en")}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script>
import getLangName from "../../mixin/getLangName"
export default {
  name: "homeHeader",
  data () {
    return {
      lang: "",
      activeKey: ""
    }
  },
  mixins: [getLangName],
  mounted () {
    this.selectLang("ZH");
    this.showHomeCenter();
  },
  computed: {
    username () {
      let username = "Welcome! " + sessionStorage.getItem("userLoginId");
      return sessionStorage.getItem("userLoginId") ? username : "";
    },

  },
  methods: {
    selectLang (command) {
      this.lang = this.getLangName(command);
      this.$i18n.locale = this.lang;
    },
    handleSelect (key, keyPath) {
      if (key == '/') {
        sessionStorage.clear();
      }
      return this.$route.path.replace("/", key);
    },
    showHomeCenter() {
      this.$router.push("homeCenter");
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/homePage/homeHeader";
</style>
