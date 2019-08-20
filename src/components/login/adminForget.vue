<template>
  <div class="bg_bank">
    <div class="bg_color">
      <el-dropdown @command="selectLang" class="lang">
        <span class="el-dropdown-link">
          {{lang == 'ZH'? $t("header.zh"):$t("header.en")}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ZH">{{$t("header.zh")}}</el-dropdown-item>
          <el-dropdown-item command="EN">{{$t("header.en")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-steps
        :active="active"
        finish-status="success"
        simple
        style="width: 64%; margin: 78px auto;"
      >
        <el-step :title='`${$t("forgetPwd.stepOne")}`'></el-step>
        <el-step :title='`${$t("forgetPwd.stepTwo")}`'></el-step>
        <el-step :title='`${$t("forgetPwd.stepThree")}`'></el-step>
      </el-steps>
      <div v-show="stepOne">
        <el-form :rules="rules" label-width="80px">
          <el-form-item prop="user_phone" :label='`${$t("forgetPwd.label.phone")}`' class="el-input-phone">
            <el-input
            @input="phone_Message"
            v-model="user_phone"
            name="phone"
            :placeholder='`${$t("register.inputPlaceholder.phone")}`'
            prefix-icon="el-icon-mobile-phone"
            oninput="if(value.length > 11)value = value.slice(0,11)"/>
          </el-form-item>
          <el-form-item prop="user_verif" :label='`${$t("forgetPwd.label.code")}`' class="el-input-phone">
            <el-input
            @input="verif_Message"
            v-model="user_verif"
            name="code"
            :placeholder='`${$t("login.adminLogin.code")}`'
            prefix-icon="el-icon-check"/>
          </el-form-item>
          <el-form-item class="reto_code">
            <el-button type="info" id="btn" @click="send_code" @disabled="isSend">{{$t(verif_code)}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn_login" @click="nextClick" id="nextBtn">{{$t("forgetPwd.nextStep")}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="stepTwo">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item prop="password" :label='`${$t("register.label.password")}`' class="el-input-pwd">
            <el-input v-model="form.password" type="password" :placeholder='`${$t("register.inputPlaceholder.password")}`'></el-input>
          </el-form-item>
          <el-form-item prop="repeatPassword" :label='`${$t("register.label.repeatPassword")}`' class="el-input-pwd">
            <el-input
              v-model="form.repeatPassword"
              type="password"
              :placeholder='`${$t("register.inputPlaceholder.repeatPassword")}`'
              :readonly="isValue"
            />
          </el-form-item>
          <el-button type="primary" class="btn_login" @click="onSubmit('form')" id="login">{{$t("forgetPwd.nextStep")}}</el-button>
        </el-form>
      </div>
      <div v-show="stepThree" class="wrapper">
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
  </div>
</template>
<script>
import { store } from "../../Vuex/store";
import { mapGetters } from "vuex";
import { adminModifyPassword, getAdminPhone } from "../../service/user/modifyPassword.service";
import { constants } from 'crypto';
export default {
  name: "Login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.inputPlaceholder.password")));
      } else {
        if (this.form.repeatPassword !== "") {
          this.$refs.form.validateField("repeatPassword");
        }
        callback();
      }
    };
    const validateRepeatPass = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("register.inputPlaceholder.repeatPassword"))
        );
      } else if (value !== this.form.password) {
        callback(new Error(this.$t("register.inputPlaceholder.repeatError")));                 
      } else {
        callback();
      }
    };
    const validatePhone = async (rule, value, callback) => {
      if (this.user_phone === "") {
        callback(new Error(this.$t("forgetPwd.phoneNotNull")));        
      } else if (!/^1[34578]\d{9}$/.test(this.user_phone)) {
        callback(new Error(this.$t("forgetPwd.formatPhone")));        
        return;
      } else {
        const self = this;
        const phone = self.user_phone;
        const response = await getAdminPhone(self, phone);
        let result = response.data;
        if (result == 'phone not exist') {
          this.isCorrect = false;
          callback(new Error(this.$t("forgetPwd.phoneNotExist")));          
        }
        else if (result == 'phone is exist') {
          callback();
          this.isCorrect = true; 
        }
      }
    };
    const validateCode = (rule, value, callback) => {
      if (this.user_verif === "") {
        callback(new Error(this.$t("forgetPwd.codeNotNull")));        
      } else if (this.user_verif_store != this.verif_code_store) {
        callback(new Error(this.$t("forgetPwd.codeError")));        
      } else {
        callback();
      }
    };
    return {
      active: 1,
      user_phone: "",
      phone: false,
      label_phone: false,
      verif_code: "forgetPwd.verif_code",
      loadTimer:null,
      timer: null,
      user_verif: "",
      url: "/apis/",
      verif: false,
      code: "",
      isSend: true,
      isCorrect:true,
      label_verif: false,
      stepOne: true,
      stepTwo: false,
      stepThree: false,
      isValue: false,
      form: {
        password: "",
        repeatPassword: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        repeatPassword: [{ validator: validateRepeatPass, trigger: "blur" }],
        user_phone: [{ validator: validatePhone, trigger: "blur" }],
        user_verif: [{ validator: validateCode, trigger: "blur" }]
      },
      runTime: "",
      lang: ""
    };
  },
  mounted() {
   this.selectLang(sessionStorage.getItem("adminLang")) 
  },
  computed: {
    //Vuex 组件之间传值
    user_phone_store: state => store.state.user_phone, // 获取Input_phone组件的传输值
    user_verif_store: state => store.state.user_verif, // 获取输入的验证码组件的传输值
    verif_code_store: state => store.state.verif_code // 获取发送的验证码组件的传输值
  },
  methods: {
    nextClick() {
      if (
        this.user_phone_store === "" ||
        !/^1[34578]\d{9}$/.test(this.user_phone_store) ||
        this.user_verif_store === "" ||
        this.user_verif_store != this.verif_code_store
      ) {
        return;
      } else {
        this.$message({
          type: "success",
          message: this.$t("forgetPwd.message.verifySuccess")
        });
        this.active++;
        this.stepOne = false;
        this.stepTwo = true;
      }
    },
    phone_Message() {
      //Vuex 将user_phone的状态保存到创库中
      store.commit("phone_Message", this.user_phone);
    },
    send_code() {
      //发送随机验证码
      if (this.user_phone === "") {
        return;
      } else if (!/^1[34578]\d{9}$/.test(this.user_phone)) {
        return;
      } else {
        const count = 60;
        let times = 60;
        if(this.isCorrect) {
          if (!this.timer) {
            this.isSend = false; //按钮禁用
            this.code = this.random_code(); //调用随机生成随机验证码的方法
            console.log("点击验证码code：" + this.code);
            localStorage.setItem("verif_code", this.code);
            this.send_note(this.user_phone, this.code); //调用发送短信的方法
            this.timer = setInterval(() =>
              //倒计时;
              {
                if (times > 0 && times <= count) {
                  this.verif_code = "forgetPwd.sendLater";
                } else {
                  this.isSend = true; //按钮可用
                  this.verif_code = this.$t("forgetPwd.verif_code");
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          }
        }
    },
    send_note(tel, code) {
      //发送短信模板
      const text = this.$t("forgetPwd.label.code") + code + this.$t("forgetPwd.message.sendMessage"); //短信内容模板，已经在sms平台绑定此内容，所以会比普通的更快到达用户手机。
      let param = new URLSearchParams();
      param.append("Uid", "kinglww");
      param.append("Key", "d41d8cd98f00b204e980");
      param.append("smsMob", tel);
      param.append("smsText", text);
      this.$http
        .post(this.url, param, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        })
        .then(function(response) {
          console.log(response);
        });
    },
    random_code() {
      //生成随机6位验证码
      let code = "";
      let code_lenght = 6;

      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      for (
        let i = 0;
        i < code_lenght;
        i++ //随机生成6位验证码
      ) {
        let index = Math.floor(Math.random() * 10);
        this.code += random[index];
      }
      console.log("随机生成验证码:" + this.code);
      return this.code;
    },
    verif_Message() {
      //Vuex 将user_verif的状态保存到创库中
      store.commit("verif_Message", this.user_verif, this.code);
    },
    onSubmit(formName) {
      const self = this;
      let formData = {
        phone: self.user_phone_store,
        password: self.form.password,
      };
      self.$refs[formName].validate(async valid => {
        if (valid) {
          const response = await adminModifyPassword(self, formData);
          if (response.data == "fail to update password") {
            self.$message({
              type: "error",
              message: this.$t("forgetPwd.message.modifyError")
            });
          } else if (response.data == "success") {
            self.$message({
              type: "success",
              message: this.$t("forgetPwd.message.modifySuccess")
            });
            self.active++;
            self.stepOne = false;
            self.stepTwo = false;
            self.stepThree = true;
            self.timeGo();
          }
        } else {
          self.$message({
            type: "error",
            message: this.$t("forgetPwd.message.modifyError")
          });
          return false;
        }
      });
    },
    timeGo() {
      const timeCount = 5;
      if (!this.loadTimer) {
        this.runTime = timeCount;
        this.loadTimer = setInterval(() => {
          this.runTime--;
          if (this.runTime == 0) {
            clearInterval(this.loadTimer);
            this.successRegister = false;
            this.loadTimer = null;
            sessionStorage.clear();
            this.$router.push("/adminLogin");
            location.reload();
          }
        }, 1000);
      }
    },
    onCancle() {
        sessionStorage.clear();
        this.$router.push("/adminLogin");
        location.reload();
    },
    selectLang(command) {
      this.lang = this.getLangName(command);
      // sessionStorage.setItem("userLang", this.lang)
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
<style lang="scss" scoped>
@import "../../../static/css/login/forgetPwd.scss";

.lang {
  float: right;
  margin: 35px;
}

</style>
