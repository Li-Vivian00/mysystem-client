<template>
  <div class="login_box">
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
      >
        <div class="login_logo">
          <a href="#">
            <img src="../../../static/img/login_logo.png" />
          </a>
        </div>
        <p class="login-enter" @click="adminLogin">
          {{ $t("login.userLogin.adminLogin") }}
        </p>
        <el-form-item prop="loginId">
          <el-input
            clearable
            class="input"
            v-model="ruleForm.loginId"
            :placeholder="`${$t('login.userLogin.inputPlaceholder')}`"
            @keyup.enter.native="submitForm('ruleForm')"
          >
          </el-input>
          <span>{{ errAccountInfo }}</span>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            class="input"
            :placeholder="`${$t('login.userLogin.password')}`"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
            show-password
          ></el-input>
          <span>{{ errPwdInfo }}</span>
        </el-form-item>

        <div class="radio">
          <p class="language">语言：</p>
          <template>
            <el-radio v-model="radio" label="ZH" @change="selectRadio"
              >中文</el-radio
            >
            <el-radio v-model="radio" label="EN" @change="selectRadio"
              >英文</el-radio
            >
          </template>
        </div>
        <el-form-item prop="validate">
          <el-input
            clearable
            v-model="ruleForm.validate"
            class="validate-code"
            :placeholder="`${$t('login.userLogin.code')}`"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
          <div class="code" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm('ruleForm')"
            >{{ $t("login.userLogin.load") }}</el-button
          >
        </div>
        <p class="register" @click="handleCommand">
          {{ $t("login.userLogin.register") }}
        </p>
        <p class="forgetPwd" @click="forgetPwd">
          {{ $t("login.userLogin.forgetPwd") }}
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./Identity";
import { userLogin } from "../../service/login/userLogin.service";
import { constants } from "crypto";
import showMessageBox from "../../mixin/showMessageBox";
import createCode from "../../mixin/createCode";
import getLangName from "../../mixin/getLangName";
import { create } from "domain";
import { validateLoginId, validatePass } from "../../utils/utilsValidate";
export default {
  name: "userLogin",
  data() {
    const self = this;
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.adminLogin.code")));
        this.correctCode = false;
      }
      setTimeout(() => {
        if (this.ruleForm.validate != this.identifyCode) {
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
        loginId: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateLoginId(rule, value, callback, self),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validatePass(rule, value, callback, self),
            trigger: "blur"
          }
        ],
        validate: [{ required: true, validator: validateCode, trigger: "blur" }]
      },
      radio: "ZH",
      lang: "ZH",
      loading: false
    };
  },
  mixins: [showMessageBox, createCode, getLangName],
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    this.selectRadio(this.lang);
  },
  components: {
    SIdentify
  },
  methods: {
    async submitForm(formName) {
      const self = this;
      const from = "loginid";
      if (self.correctCode) {
        self.loading = true;
        const response = await userLogin(self.ruleForm, self, from);
        if (response.data == "loginid not exist") {
          self.errAccountInfo = this.$t("login.userLogin.loginIdNotExist");
          self.errPwdInfo = "";
          self.refreshCode();
        } else if (response.data == "password not correct") {
          self.errAccountInfo = "";
          self.errPwdInfo = this.$t("register.status.passwordError");
          self.refreshCode();
        } else if (response.status == 200) {
          self.errAccountInfo = "";
          self.errPwdInfo = "";
          sessionStorage.setItem("userLoginId", self.ruleForm.loginId);
          self.$router.push("/homeCenter");
        }
        self.loading = false;
      } else {
        self.refreshCode();
        self.loginError();
        return false;
      }
    },

    handleCommand() {
      this.$router.push("/register");
    },

    adminLogin() {
      sessionStorage.clear();
      this.$router.push("/adminLogin");
      location.reload();
    },

    forgetPwd() {
      this.$router.push("/userForget");
    },

    selectRadio(value) {
      this.lang = value;
      this.lang = this.getLangName(value);
      sessionStorage.setItem("userLang", this.lang);
      this.$i18n.locale = this.lang;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../static/css/login/adminLogin.scss";
</style>
