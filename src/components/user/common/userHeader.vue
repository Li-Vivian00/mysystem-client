<template>
  <div class="header">
    <div class="logo">{{$t("header.userHeader")}}</div>
    <div class="user-info">
      <el-dropdown  @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <img class="user-logo" src="../../../../static/img/img.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userCenter">{{$t("header.userCenter")}}</el-dropdown-item>
          <el-dropdown-item command="loginout">{{$t("header.logout")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
       <el-dropdown @command="selectLang">
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
</template>
<script>
export default {
  data() {
    return {
      name: "Hi,user",
      lang: this.getLangName(sessionStorage.getItem("userLang"))
      // lang: this.$t("header.zh")
    };
  },
  computed: {
    username() {
      let username = "Hello," + sessionStorage.getItem("userLoginId");
      return username ? username : this.name;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        sessionStorage.removeItem("userLoginId");
        this.$router.push("/userLogin");
      } else if (command == "userCenter") {
        this.$router.push("/userCenter");
      }
    },
    selectLang(command) {
      this.lang = this.getLangName(command);
      sessionStorage.setItem("userLang", this.lang)
      this.$i18n.locale = this.lang;
      // location.reload();
    },
    getLangName(key) {
      const langArr = {
        EN: "EN",
        ZH: "ZH"
      };
      return langArr[key];
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  /* color: #fff; */
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-dropdown-link {
  color: rgb(156, 156, 156) !important;
}
</style>
