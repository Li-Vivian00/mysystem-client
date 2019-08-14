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
        <p class="login-enter" @click="adminLogin">{{$t('login.userLogin.adminLogin')}}</p>
        <el-form-item prop="loginId">
          <el-input
            v-model="ruleForm.loginId"
            :placeholder='`${$t("login.userLogin.inputPlaceholder")}`'
            @keyup.enter.native="submitForm('ruleForm')"
          >
          </el-input>
          <span>{{errAccountInfo}}</span>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            :placeholder='`${$t("login.userLogin.password")}`'
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
            show-password
          ></el-input>
          <span>{{errPwdInfo}}</span>
        </el-form-item>
        <el-form-item prop="validate">
          <el-input
            v-model="ruleForm.validate"
            class="validate-code"
            :placeholder='`${$t("login.userLogin.code")}`'
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
          <div class="code" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('login.userLogin.load')}}</el-button>
        </div>
        <p class="register" @click="handleCommand">{{$t('login.userLogin.register')}}</p>
        <p class="forgetPwd" @click="forgetPwd">{{$t('login.userLogin.forgetPwd')}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./Identity";
import { userLogin } from "../../service/login/userLogin.service";
import { USER_LOGIN_STATUS } from "../../locales/login/userLogin.const";
export default {
  name: "userLogin",
  data() {
    const checkVal = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(USER_LOGIN_STATUS.INPUT_CODE));
        this.tureVali = false;
      }
      setTimeout(() => {
        if (this.ruleForm.validate != this.identifyCode) {
          callback(new Error(USER_LOGIN_STATUS.ERROR_CODE));
          this.tureVali = false;
        } else {
          this.tureVali = true;
        }
      }, 100);
    };
    return {
      identifyCodes: USER_LOGIN_STATUS.IDENTIFYCODES,
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
            message: USER_LOGIN_STATUS.INPUT_NAME,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: USER_LOGIN_STATUS.ERROR_PASSWORD,
            trigger: "blur"
          }
        ],
        validate: [
          {
            required: true,
            message: USER_LOGIN_STATUS.INPUT_NAME,
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
        const response = await userLogin(self.ruleForm, self);
        if (response.data == -1) {
          self.errAccountInfo = USER_LOGIN_STATUS.LOGINID_NOT_EXIST;
          self.errPwdInfo = "";
        } else if (response.data == 0) {
          self.errAccountInfo = "";
          self.errPwdInfo = USER_LOGIN_STATUS.ERROR_PASSWORD;
        } else if (response.status == 200) {
          self.errAccountInfo = "";
          self.errPwdInfo = "";
          sessionStorage.setItem("userLoginId", self.ruleForm.loginId);
          self.$router.push("/userHome");
          // sessionStorage.setItem("user", JSON.stringify(self.ruleForm));
        }
      } else {
        self.$message({
          type: "error",
          message: USER_LOGIN_STATUS.LOADING_ERROR
        });
        return false;
      }
    },
    handleCommand() {
      this.$router.push("/register");
    },
    adminLogin() {
      this.$router.push("/adminLogin");
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
    forgetPwd() {
      
    }
  }
};
</script>

<style scoped>
@import "../../css/login/adminLogin.css";
</style>
