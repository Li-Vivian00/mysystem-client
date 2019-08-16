<template>
  <div class="wrapper">
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i>{{$t("register.label.register")}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown @command='selectLang'>
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
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="92px" label-position="right">
        <el-form-item prop="loginid" :label='`${$t("register.label.loginId")}`'>
          <el-input
            v-model.trim="form.loginid"
            :placeholder='`${$t("register.inputPlaceholder.loginId")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username" :label='`${$t("register.label.userName")}`'>
          <el-input
            v-model.trim="form.username"
            :placeholder='`${$t("register.inputPlaceholder.userName")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" :label='`${$t("register.label.password")}`'>
          <el-input
            v-model.trim="form.password"
            type="password"
            :placeholder='`${$t("register.inputPlaceholder.password")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repeatpass" :label='`${$t("register.label.repeatPassword")}`'>
          <el-input
            v-model.trim="form.repeatpass"
            type="password"
            :placeholder='`${$t("register.inputPlaceholder.repeatPassword")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex" :label='`${$t("register.label.sex")}`'>
          <el-select
            class="select-sex"
            v-model.trim="form.sex"
            :placeholder='`${$t("register.inputPlaceholder.sex")}`'
            :disabled="successRegister"
          >
            <el-option :label='`${$t("register.label.male")}`' value="male"></el-option>
            <el-option :label='`${$t("register.label.female")}`' value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" :label='`${$t("register.label.phone")}`'>
          <el-input
            v-model.trim="form.phone"
            :placeholder='`${$t("register.inputPlaceholder.phone")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" :label='`${$t("register.label.email")}`'>
          <el-input
            v-model.trim="form.email"
            :placeholder='`${$t("register.inputPlaceholder.email")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="card" :label='`${$t("register.label.card")}`'>
          <el-input
            v-model.trim="form.card"
            :placeholder='`${$t("register.inputPlaceholder.card")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('form')"
            :disabled="successRegister"
          >{{$t('button.ok')}}</el-button>
          <el-button @click="onCancle()" :disabled="successRegister">{{$t('button.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mainBox" v-show="successRegister">
      <div class="mainBox-Main">
        <span class="info">
          <img src="../../../static/img/true.png" alt id="true" />
          <span id="success">{{$t("register.title.successItem")}}</span>
        </span>
        <div class="loading">
          <span id="return">
            {{$t("register.title.returniItem")}}
            <span id="runTime">{{runTime}} s</span>
          </span>
          <img src="../../../static/img/loading.gif" id="loadingPicture" />
          <p class="load" @click="onCancle()">{{$t("register.title.clickItem")}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from "../../utils/utils";
import {
  register,
  validateId,
  getUser
} from "../../service/login/register.service";
import { REGISTER_LOGIN_STATUS } from "../../locales/login/register.const";
import { constants } from 'crypto';
export default {
  data() {
    const validateId = async (rule, value, callback) => {
      const self = this;
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_LOGINID));
      } else {
        let loginid = self.form.loginid;
        const response = await getUser(self, loginid);
        let result = response.data;
        if (result == 'fail to register') {
          callback(new Error(REGISTER_LOGIN_STATUS.LOGINID_ISEXIST));
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_PASSWORD));
      } else {
        if (this.form.repeatpass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validateRepeatPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_REPEATPASSWORD));
      } else if (value !== this.form.repeatpass) {
        callback(new Error(REGISTER_LOGIN_STATUS.REPEATPASSWORD_ERROR));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_EMAIL));
      } else if (!Util.emailReg.test(this.form.email)) {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_FORMATEMAIL));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_PHONE));
      } else if (!Util.phoneReg.test(this.form.phone)) {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_FORMATPHONE));
      } else {
        callback();
      }
    };
    const validateCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_CARD));
      } else if (!Util.idCardReg.test(this.form.card)) {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_FORMATCARD));
      } else {
        callback();
      }
    };
    return {
      successRegister: false,
      runTime: "",
      timer: null,
      form: {
        username: "",
        loginid: "",
        password: "",
        repeatpass: "",
        email: "",
        phone: "",
        card: "",
        sex: "",
        login_id:"",
      },
      rules: {
        username: [
          {
            required: true,
            message: REGISTER_LOGIN_STATUS.INPUT_NAME,
            trigger: "blur"
          }
        ],
        loginid: [
          {
            required: true,
            validator: validateId,
            trigger: "blur"
          }
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        repeatpass: [
          { required: true, validator: validateRepeatPass, trigger: "blur" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        card: [{ required: true, validator: validateCard, trigger: "blur" }],
        sex: [
          {
            required: true,
            message: REGISTER_LOGIN_STATUS.INPUT_SEX,
            trigger: "blur"
          }
        ]
      },
      lang:this.getLangName(sessionStorage.getItem("registerLang"))
    };
  },
  methods: {
    onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.getDateTimes();
          const response = register(self.form, self);
          if (response.data == "fail to register") {
            self.alertMessage();
          } else {
            self.successRegister = true;
            self.timeGo();
          }
        } else {
          self.alertMessage();
          return false;
        }
      });
    },
    onCancle() {
      this.$router.push("/userLogin");
    },
    timeGo() {
      const timeCount = 5;
      if (!this.timer) {
        this.runTime = timeCount;
        this.timer = setInterval(() => {
          this.runTime--;
          if (this.runTime == 0) {
            clearInterval(this.timer);
            this.successRegister = false;
            this.timer = null;
            this.$router.push("/userLogin");
          }
        }, 1000);
      }
    },
    getDateTimes() {
      const str = new Date().toString();
      this.form.login_id = str;
      console.log(this.form.login_id);
      return this.form.login_id;
    },
    alertMessage() {
      this.$alert(this.$t("register.showMessage.register"), this.$t("manage.confirm.warning"), {
        confirmButtonText: this.$t("button.ok")
      });
    },
    selectLang(command) {
      this.lang = this.getLangName(command);
      sessionStorage.setItem("registerLang", this.lang)
      this.$i18n.locale = this.lang
      // location.reload();
    },
    getLangName (key) {
      const langArr = {
        'EN': 'EN',
        'ZH': 'ZH',
      };
      return langArr[key]
    }
  },
};
</script>

<style scoped>
@import "../../../static/css/login/register.css";
.el-dropdown {
  float: right !important;
  margin-right: 30px;
}
 .el-form-item {
  margin: 20px !important;
 }
</style>>