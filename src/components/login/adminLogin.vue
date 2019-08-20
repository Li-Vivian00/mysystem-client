<template>
  <div class="login_box">
    <div class="login_l_img">
      <img src="../../../static/img/login_img.png" />
    </div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <div class="login_logo">
          <a href="#">
            <img src="../../../static/img/login_logo.png" />
          </a>
        </div>
        <p class="login-enter" @click="userLogin">{{$t('login.adminLogin.userLogin')}}</p>
        <el-form-item prop="loginId">
          <el-input
            v-model="ruleForm.loginId"
            :placeholder='`${$t("login.adminLogin.inputPlaceholder")}`'
          ></el-input>
          <span>{{errAccountInfo}}</span>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            :placeholder='`${$t("login.adminLogin.password")}`'
            v-model="ruleForm.password"
            show-password
          ></el-input>
          <span>{{errPwdInfo}}</span>
        </el-form-item>

        <div class="radio">
          <p class="language">Language:</p>
            <template>
              <el-radio v-model="radio" label="ZH" @change="selectRadio">中文</el-radio>
              <el-radio v-model="radio" label="EN" @change="selectRadio">英文</el-radio>
            </template> 
        </div>

        <el-form-item prop="validate">
          <el-input
            v-model="ruleForm.validate"
            class="validate-code"
            :placeholder='`${$t("login.adminLogin.code")}`'
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
          <div class="code" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">{{$t('login.adminLogin.load')}}</el-button>
        </div>
        <p class="forgetPwd" @click="forgetPwd">{{$t('login.adminLogin.forgetPwd')}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./Identity";
import { adminLogin } from "../../service/login/adminLogin.service";
// import { constants } from 'crypto';
export default {
  name: "adminLogin",
  data() {
    const validateLoginId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.userLogin.inputPlaceholder")));
      } 
        callback();
    };
    const validatePassoword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.adminLogin.password")));
      } 
        callback();
    };
    const checkVal = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.adminLogin.code")));
        this.tureVali = false;
      }
      setTimeout(() => {
        if (this.ruleForm.validate != this.identifyCode) {
          callback(new Error(this.$t("forgetPwd.codeError")));
          this.tureVali = false;
        } else {
          this.tureVali = true;
        }
      }, 100);
    };
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      errAccountInfo: "",
      errPwdInfo: "",
      tureVali: false,
      ruleForm: {
        loginId: "",
        password: "",
        validate: ""
      },
      rules: {
        loginId: [
          {
            required: true,
            validator: validateLoginId,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassoword,
            trigger: "blur"
          }
        ],
        validate: [
          { required: true, validator: checkVal, trigger: "blur" }
        ]
      },
      radio: "ZH",
      lang: "ZH",
      loading: false
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    this.selectRadio(this.lang)
  },
  components: {
    SIdentify
  },
  methods: {
    async submitForm(formName) {
      const self = this;
      if (self.tureVali) {
        self.loading = true;
        const response = await adminLogin(self.ruleForm, self);
        console.log(response);
        if (response.data == "loginid not exist") {
          self.errAccountInfo = self.$t("login.adminLogin.loginIdNotExist");
          self.errPwdInfo = "";
        } else if (response.data == "password not correct") {
          self.errAccountInfo = "";
          self.errPwdInfo = self.$t("register.status.passwordError");
        } else if (response.status == 200) {
          self.errAccountInfo = "";
          self.errPwdInfo = "";
          sessionStorage.setItem("adminLoginId", self.ruleForm.loginId);
          self.$router.push("/adminHome");
          self.loading = false;
        }
      } else {
        self.$message({
          type: "error",
          message: self.$t("login.loadingError")
        });
        return false;
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    userLogin() {
      sessionStorage.clear();
      this.$router.push("/userLogin");
      location.reload();
    },
    forgetPwd() {
      this.$router.push("/adminForget");
    },
    selectRadio(value) {
      this.lang = value;
      this.lang = this.getLangName(value);
      // this.$cookies.set("adminLang",this.lang)
      // localStorage.setItem("adminLang",this.lang);
      sessionStorage.setItem("adminLang",this.lang);
      this.$i18n.locale = this.lang;
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

<style scoped lang="scss">
@import "../../../static/css/login/adminLogin.scss";

</style>
