<template>
  <div class="header">
    <!-- <div class="logo">{{$t("header.adminHeader")}}</div> -->
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          <img class="user-logo" src="../../../../static/img/img.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="adminCenter">{{
            $t("header.userCenter")
          }}</el-dropdown-item>
          <el-dropdown-item command="loginout">{{
            $t("header.logout")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="selectLang" v-model="lang">
        <span class="el-dropdown-link">
          {{ lang == "ZH" ? $t("header.zh") : $t("header.en") }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ZH">{{
            $t("header.zh")
          }}</el-dropdown-item>
          <el-dropdown-item command="EN">{{
            $t("header.en")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import getLangName from "../../../mixin/getLangName";
export default {
  data() {
    return {
      name: "Hi,admin",
      lang: ""
    };
  },
  mixins: [getLangName],
  mounted() {
    this.selectLang(sessionStorage.getItem("adminLang"));
  },
  computed: {
    username() {
      let username = "Hello," + sessionStorage.getItem("adminLoginId");
      return username ? username : this.name;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        sessionStorage.clear();
        this.$router.push("/adminLogin");
        location.reload();
      } else if (command == "adminCenter") {
        this.$router.push("/adminCenter");
      }
    },
    selectLang(command) {
      this.lang = this.getLangName(command);
      sessionStorage.setItem("adminLang", this.lang);
      this.$i18n.locale = this.lang;
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 106px;
  font-size: 22px;
  line-height: 70px;
  /* color: #fff; */
  background-image: url("../../../../static/img/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: "dincond-medium";
  .user-info {
    width: 18%;
    height: 100%;
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
    line-height: 119px;

    .el-dropdown-link {
      position: relative;
      display: inline-block;
      padding-left: 50px;
      color: #fff;
      cursor: pointer;
      vertical-align: middle;
      padding: 0px !important;
    }
    .user-logo {
      position: absolute;
      left: -50px;
      top: 35px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.el-dropdown-menu__item {
  text-align: center;
}
.el-dropdown-link {
  color: rgb(156, 156, 156) !important;
}
.el-dropdown {
  height: 83px !important;
  margin-left: 18px !important;
}
</style>
