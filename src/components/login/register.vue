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
            oninput="if(value.length > 11)value = value.slice(0,11)"
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
  getUserLoginid,
  getUserPhone
} from "../../service/login/register.service";
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.status.userName")));
      } 
        callback();
    };
    const validateId = async (rule, value, callback) => {
      const self = this;
      if (value === "") {
        callback(new Error(this.$t("register.status.loginId")));
      } else {
        const loginid = self.form.loginid;
        const response = await getUserLoginid(self, loginid);
        let result = response.data;
        if (result == 'loginid is exist') {
          callback(new Error(this.$t("register.status.loginIdExist")));
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.status.password")));
      } else {
        if (this.form.repeatpass !== "") {
          this.$refs.form.validateField("repeatpass");
        }
        callback();
      }
    };
    const validateRepeatPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.status.repeatPassword")));
      } else if (value !== this.form.password) {
        callback(new Error(this.$t("register.status.repeatPasswordError")));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.status.email")));
      } else if (!Util.emailReg.test(this.form.email)) {
        callback(new Error(this.$t("register.status.formatEmail")));
      } else {
        callback();
      }
    };
    const validatePhone = async (rule, value, callback) => {
      const self = this;
      if (value === "") {
        callback(new Error(self.$t("register.status.phone")));
      } else if (!Util.phoneReg.test(self.form.phone)) {
        callback(new Error(self.$t("register.status.formatPhone")));
      } else {
        const phone = self.form.phone;
        // const from = "phone"
        const response = await getUserPhone(self, phone);
        let result = response.data;
        console.log(result)
        if (result == 'phone is exist') {
          callback(new Error(self.$t("register.status.phoneExist")));
        }
        callback();
      }
    };
    const validateCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.status.card")));
      } else if (!Util.idCardReg.test(this.form.card)) {
        callback(new Error(this.$t("register.status.formatCard")));
      } else {
        callback();
      }
    };
    return {
      successRegister: false,
      runTime: "",
      timer: null,
      form: {
        loginid: "",
        username: "",
        password: "",
        repeatpass: "",
        sex: "",
        phone: "",
        email: "",
        card: "",
        stay_date:"",
      },
      rules: {
        username: [
          {
            required: true,
            validator: validateName,
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
            message: this.$t("register.status.sex"),
            trigger: "blur"
          }
        ]
      },
      lang:'ZH'
    };
  },
  mounted() {
    this.selectLang(sessionStorage.getItem("userLang"));
  },
  methods: {
    onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate( async (valid) => {
        if (valid) {
          self.getDateTimes();
          const response = await register(self.form, self);
          console.log(response)
          if (response.data == "fail to register") {
            self.alertMessage();
          } else if(response.data == "success") {
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
        sessionStorage.clear();
      this.$router.push("/userLogin");
      location.reload();
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
            sessionStorage.clear();
            this.$router.push("/userLogin");
          }
        }, 1000);
      }
    },
    getDateTimes() {
      const str = new Date().toString();
      this.form.stay_date = str;
      return this.form.stay_date;
    },
    alertMessage() {
      this.$alert(this.$t("register.showMessage.register"), this.$t("manage.confirm.warning"), {
        confirmButtonText: this.$t("button.ok")
      });
    },
    selectLang(command) {
      this.lang = this.getLangName(command);
      sessionStorage.setItem("userLang", this.lang)
      this.$i18n.locale = this.lang
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

<style scoped lang="scss" >
@import "../../../static/css/login/register.scss";
.el-dropdown {
  float: right !important;
  margin-right: 30px;
}
 .el-form-item {
  margin: 20px !important;
 }
</style>>