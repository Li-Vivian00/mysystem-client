<template>
  <div class="wrapper">
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i>注册
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown @command='selectLang'>
        <span class="el-dropdown-link">
          {{lang}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ZH">ZH</el-dropdown-item>
          <el-dropdown-item command="EN">EN</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="loginId" :label='`${$t("register.label.loginId")}`'>
          <el-input
            v-model="form.loginId"
            :placeholder='`${$t("register.inputPlaceholder.loginId")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" :label='`${$t("register.label.userName")}`'>
          <el-input
            v-model="form.name"
            :placeholder='`${$t("register.inputPlaceholder.userName")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" :label='`${$t("register.label.password")}`'>
          <el-input
            v-model="form.pass"
            type="password"
            :placeholder='`${$t("register.inputPlaceholder.password")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" :label='`${$t("register.label.repeatPassword")}`'>
          <el-input
            v-model="form.checkPass"
            type="password"
            :placeholder='`${$t("register.inputPlaceholder.repeatPassword")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex" :label='`${$t("register.label.sex")}`'>
          <el-select
            class="select-sex"
            v-model="form.sex"
            :placeholder='`${$t("register.inputPlaceholder.sex")}`'
            :disabled="successRegister"
          >
            <el-option :label='`${$t("register.label.male")}`' value="male"></el-option>
            <el-option :label='`${$t("register.label.female")}`' value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" :label='`${$t("register.label.phone")}`'>
          <el-input
            v-model="form.phone"
            :placeholder='`${$t("register.inputPlaceholder.phone")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" :label='`${$t("register.label.email")}`'>
          <el-input
            v-model="form.email"
            :placeholder='`${$t("register.inputPlaceholder.email")}`'
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="card" :label='`${$t("register.label.card")}`'>
          <el-input
            v-model="form.card"
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
          <span id="success">恭喜你注册成功，加入温暖的小区！</span>
        </span>
        <div class="loading">
          <span id="return">
            正在跳转至登录界面
            <span id="runTime">{{runTime}}</span>
          </span>
          <img src="../../../static/img/loading.gif" id="load" />
          <p class="load" @click="onCancle()">点击跳转登录界面</p>
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
        let loginId = self.form.loginId;
        const response = await getUser(self, loginId);
        let result = response.data[0];
        if (result) {
          callback(new Error(REGISTER_LOGIN_STATUS.LOGINID_ISEXIST));
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_PASSWORD));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validateRepeatPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(REGISTER_LOGIN_STATUS.INPUT_REPEATPASSWORD));
      } else if (value !== this.form.pass) {
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
        name: "",
        loginId: "",
        pass: "",
        checkPass: "",
        email: "",
        phone: "",
        card: "",
        sex: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: REGISTER_LOGIN_STATUS.INPUT_NAME,
            trigger: "blur"
          }
        ],
        loginId: [
          {
            required: true,
            validator: validateId,
            trigger: "blur"
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
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
      lang:'ZH'
    };
  },
  methods: {
    onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          const response = register(self.form, self);
          if (response.data == "注册失败") {
            self.alertMessage();
          } else {
            self.successRegister = true;
            self.timeGo();
          }
        } else {
          self.alertMessage();
          console.log("error submit!!");
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
    // getDateTimes(str) {
    //   const str = new Date(str);
    //   return str;
    // }
    alertMessage() {
      this.$alert("注册失败", "警告", {
        confirmButtonText: "确定"
      });
    },
    selectLang(command) {
      this.lang = this.getLangName(command);
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
  }
};
</script>

<style>
.crumbs-register {
  background-color: #324157;
  height: 50px;
  line-height: 50px;
}
.register-title {
  line-height: 50px;
  margin: 0 auto;
  width: 50px;
  font-size: 16px;
}
.userContent {
  width: 400px;
  margin: 50px auto;
}
.select-sex {
  width: 320px;
}

.wrapper {
  height: auto;
  position: relative;
}

.wrapper .mainBox {
  position: absolute;
  left: 50%;
  margin-left: -14.5%;
  margin-top: -475px;
  width: 30%;
  height: 273px;
  background: #fff;
  position: relative;
}

.wrapper .mainBox .mainBox-Main {
  width: 569px;
  height: 261px;
  border: 3px dashed rgb(64, 238, 157);
  position: absolute;
  top: 3px;
  text-align: center;
}

.wrapper .mainBox .mainBox-Main .info #true {
  display: inline-block;
  width: 45px;
  height: 45px;
}

.wrapper .mainBox .mainBox-Main .info {
  display: inline-block;
  width: 560px;
  position: relative;
  text-align: left;
}

.wrapper .mainBox .mainBox-Main .info #success {
  display: inline-block;
  margin-left: 10px;
  position: absolute;
  top: 11px;
  font-size: 22px;
}

.wrapper .mainBox .mainBox-Main .lamp {
  display: inline-block;
  width: 535px;
  position: relative;
  margin-top: 17px;
  text-align: left;
  margin-left: 20px;
}
#info1 {
  display: inline-block;

  background: linear-gradient(to left, rgb(236, 248, 182), rgb(246, 250, 184));
}

.wrapper .mainBox .mainBox-Main .lamp img {
  width: 40px;
  height: 30px;
}
.wrapper .mainBox .mainBox-Main .lamp #info1 {
  position: absolute;
  top: 8px;
  font-size: 13px;
}
.wrapper .mainBox .mainBox-Main .loading {
  width: 500px;
  height: 150px;
  margin: 20px auto;
}
.wrapper .mainBox .mainBox-Main .loading #return {
  display: block;
  font-size: 22px;
  letter-spacing: 2px;
}
.wrapper .mainBox .mainBox-Main .loading #runTime {
  color: rgb(250, 54, 54);
  padding-left: 10px;
}
.wrapper .mainBox .mainBox-Main .loading #load {
  display: block;
  width: 200px;
  height: 100px;
  margin: 0 auto;
}
.wrapper .mainBox .mainBox-Main .loading a {
  color: red;
  float: right;
  font-size: 13px;
}
.wrapper .mainBox .mainBox-Main .loading a:hover {
  text-decoration: underline;
}
</style>