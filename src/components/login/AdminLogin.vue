<template>
  <div class="login_box">
    <div class="ms-login">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="0px">
        <div class="login_logo">
          <a href="#">
            <img src="../../../static/img/login_logo.png" />
          </a>
        </div>
        <p class="login-enter"
           @click="userLogin">{{$t('login.adminLogin.userLogin')}}</p>
        <el-form-item prop="loginId">
          <el-input clearable
                    class="input"
                    v-model="ruleForm.loginId"
                    :placeholder='`${$t("login.adminLogin.inputPlaceholder")}`'></el-input>
          <span>{{errAccountInfo}}</span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    class="input"
                    :placeholder='`${$t("login.adminLogin.password")}`'
                    v-model="ruleForm.password"
                    show-password></el-input>
          <span>{{errPwdInfo}}</span>
        </el-form-item>
        <div class="radio">
          <p class="language">Language:</p>
          <template>
            <el-radio v-model="radio"
                      label="ZH"
                      @change="selectRadio">中文</el-radio>
            <el-radio v-model="radio"
                      label="EN"
                      @change="selectRadio">英文</el-radio>
          </template>
        </div>
        <el-form-item prop="validate">
          <el-input clearable
                    v-model="ruleForm.validate"
                    class="validate-code"
                    :placeholder='`${$t("login.adminLogin.code")}`'
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
          <div class="code"
               @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary"
                     :loading="loading"
                     @click="submitForm('ruleForm')">{{$t('login.adminLogin.load')}}</el-button>
        </div>
        <p class="forgetPwd"
           @click="forgetPwd">{{$t('login.adminLogin.forgetPwd')}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./Identity";
import { adminLogin } from "../../service/login/adminLogin.service";
// import { constants } from 'crypto';
import showMessageBox from "../../mixin/showMessageBox"
import createCode from "../../mixin/createCode"
import getLangName from "../../mixin/getLangName"
import { validateLoginId, validatePass } from "../../utils/utilsValidate";
export default {
  name: "adminLogin",
  data () {
    const self = this;
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.adminLogin.code")));
        this.correctCode = false;
      }
      setTimeout(() => {
        if (this.ruleForm.validate != this.identifyCode) {
          this.identifyCode = "";
          this.refreshCode();
          callback(new Error(this.$t("forgetPwd.codeError")));
          this.correctCode = false;
        } else {
          this.correctCode = true;
        }
      }, 100);
    };
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      errAccountInfo: "",
      errPwdInfo: "",
      correctCode: false,
      ruleForm: {
        loginId: "",
        password: "",
        validate: ""
      },
      rules: {
        loginId: [{ required: true, validator: ((rule, value, callback) => validateLoginId(rule, value, callback, self)), trigger: "blur" }],
        password: [{ required: true, validator: ((rule, value, callback) => validatePass(rule, value, callback, self)), trigger: "blur" }],
        validate: [{ required: true, validator: validateCode, trigger: "blur" }]
      },
      radio: "ZH",
      lang: "ZH",
      loading: false
    };
  },
  mixins: [showMessageBox, createCode, getLangName],
  mounted () {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    this.selectRadio(this.lang)
  },
  components: {
    SIdentify
  },
  methods: {
    async submitForm (formName) {
      const self = this;
      if (self.correctCode) {
        self.loading = true;
        const response = await adminLogin(self.ruleForm, self);
        if (response.data == "loginid not exist") {
          self.errAccountInfo = self.$t("login.adminLogin.loginIdNotExist");
          self.errPwdInfo = "";
          self.loading = false;
          self.refreshCode();
        } else if (response.data == "password not correct") {
          self.errAccountInfo = "";
          self.loading = false;
          self.errPwdInfo = self.$t("register.status.passwordError");
          self.refreshCode();
        } else if (response.status == 200) {
          self.errAccountInfo = "";
          self.errPwdInfo = "";
          sessionStorage.setItem("adminLoginId", self.ruleForm.loginId);
          self.$router.push("/adminHome");
          self.loading = false;
        }
      } else {
        self.refreshCode();
        self.loginError();
      }
    },

    userLogin () {
      sessionStorage.clear();
      this.$router.push("/userLogin");
      location.reload();
    },

    forgetPwd () {
      this.$router.push("/adminForget");
    },

    selectRadio (value) {
      this.lang = value;
      this.lang = this.getLangName(value);
      sessionStorage.setItem("adminLang", this.lang);
      this.$i18n.locale = this.lang;
    },

  }
};
</script>

<style scoped lang="scss">
@import "../../../static/css/login/adminLogin.scss";
</style>
