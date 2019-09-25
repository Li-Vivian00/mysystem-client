<template>
  <div class="homeHeader">
    <div class="logo">
      <img src="../../../static/img/logo.jpg"
           alt="The Shield">
    </div>
    <div class="menuBox">
      <el-menu class="el-menu-demo menu"
               mode="horizontal"
               @select="handleSelect">
        <el-menu-item index="1">{{$t("homePage.homeHeader.home")}}</el-menu-item>
        <el-menu-item index="2">{{$t("homePage.homeHeader.aboutUs")}}</el-menu-item>
        <el-submenu index="3">
          <template slot="title">{{$t("homePage.homeHeader.login")}}</template>
          <el-menu-item index="3-1">{{$t("homePage.homeHeader.adminLogin")}}</el-menu-item>
          <el-menu-item index="3-2">{{$t("homePage.homeHeader.userLogin")}}</el-menu-item>
        </el-submenu>

      </el-menu>
      <div class="langBox">
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
      activeIndex: '1',
    }
  },
  mixins: [getLangName],
  mounted () {
    this.selectLang("ZH");
  },
  methods: {
    selectLang (command) {
      this.lang = this.getLangName(command);
      this.$i18n.locale = this.lang;
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 17px;
}
.homeHeader {
  width: 100%;
  height: 14%;
  position: relative;
  box-sizing: border-box;
  line-height: 70px;
  .logo {
    position: absolute;
    width: 18%;
    height: 100%;
    margin-left: 6%;

    img {
      width: 230px;
      height: 130px;
      position: relative;
      top: -22%;
    }
  }

  .menuBox {
    position: relative;
    width: 50%;
    height: 100%;
    float: right;
    .menu {
      border: none;
      position: absolute;
      margin-right: 20px;
      margin-top: 20px;
      el-menu-item {
        font-size: 17px !important;
      }
    }

    .langBox {
      float: right;
      position: relative;
      top: 6px;
      .language {
        float: right;
        margin-right: 20px;
        margin-top: 8px;
        height: 100%;

        .el-dropdown-link {
          position: relative;
          display: inline-block;
          padding-left: 50px;
          color: #fff;
          cursor: pointer;
          vertical-align: middle;
          padding: 0px !important;
        }

        .el-dropdown-menu__item {
          text-align: center;
        }
        .el-dropdown-link {
          color: rgb(156, 156, 156) !important;
        }
      }

      .global {
        margin-right: 6px;
        margin-bottom: -10px;
      }
    }
  }

  .el-submenu__title {
    font-size: 17px !important;
  }
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  font-size: 17px !important;
}
</style>