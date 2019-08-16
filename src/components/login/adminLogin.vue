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
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('login.adminLogin.load')}}</el-button>
        </div>
        <p class="forgetPwd" @click="forgetPwd">{{$t('login.adminLogin.forgetPwd')}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./Identity";
import { adminLogin } from "../../service/login/adminLogin.service";
import { ADMIN_LOGIN_STATUS } from "../../locales/login/adminLogin.const";
import { constants } from 'crypto';
export default {
  name: "adminLogin",
  data() {
    const checkVal = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(ADMIN_LOGIN_STATUS.INPUT_CODE));
        this.tureVali = false;
      }
      setTimeout(() => {
        if (this.ruleForm.validate != this.identifyCode) {
          callback(new Error(ADMIN_LOGIN_STATUS.ERROR_CODE));
          this.tureVali = false;
        } else {
          this.tureVali = true;
        }
      }, 100);
    };
    return {
      identifyCodes: ADMIN_LOGIN_STATUS.IDENTIFYCODES,
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
            message: ADMIN_LOGIN_STATUS.INPUT_NAME,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: ADMIN_LOGIN_STATUS.INPUT_PASSWORD,
            trigger: "blur"
          }
        ],
        validate: [
          {
            required: true,
            message: ADMIN_LOGIN_STATUS.INPUT_CODE,
            trigger: "blur"
          },
          { validator: checkVal, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  components: {
    SIdentify
  },
  methods: {
    async submitForm(formName) {
      const self = this;
      if (self.tureVali) {
        const response = await adminLogin(self.ruleForm, self);
        console.log(response);
        if (response.data == "loginid not exist") {
          self.errAccountInfo = ADMIN_LOGIN_STATUS.LOGINID_NOT_EXIST;
          self.errPwdInfo = "";
        } else if (response.data == "password not correct") {
          self.errAccountInfo = "";
          self.errPwdInfo = ADMIN_LOGIN_STATUS.PASSWORD_ERROR;
        } else if (response.status == 200) {
          self.errAccountInfo = "";
          self.errPwdInfo = "";
          sessionStorage.setItem("adminLoginId", self.ruleForm.loginId);
          self.$router.push("/adminHome");
          // sessionStorage.setItem("admin", JSON.stringify(self.ruleForm));
        }
      } else {
        self.$message({
          type: "error",
          message: ADMIN_LOGIN_STATUS.LOADING_ERROR
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
      this.$router.push("/userLogin");
    },
    forgetPwd() {

    }
  }
};
</script>

<style scoped>
@import "../../../static/css/login/adminLogin.css";
</style>
