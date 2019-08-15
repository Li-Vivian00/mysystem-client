<template>
  <div class="bg_bank">
    <div class="bg_color">
      <el-steps
        :active="1"
        finish-status="success"
        simple
        style="width: 64%;
              margin: 20px auto;">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <!-- <Input_phone /> -->
      <el-input
      @input="phone_Message"
      oninput="if(value.length > 11)value = value.slice(0,11)"
      v-model="user_phone"
      @focus="phone_show"
      @blur="phone_display"
      class="el-input-phone"
      name="phone"
      :placeholder='`${$t("register.inputPlaceholder.phone")}`'
      prefix-icon="el-icon-mobile-phone"/>

      <el-input
      @input="verif_Message"
      v-model="user_verif"
      class="el-input-verif"
      @focus="verif_show"
      @blur="verif_display"
      name="code"
      :placeholder='`${$t("login.adminLogin.code")}`'
      prefix-icon="el-icon-check"/>

      <el-button
        type="info"
        class="reto_code"
        id="btn"
        @click="send_code"
        @disabled="isSend">{{verif_code}}</el-button>

      <!-- <Verif_code /> -->
        <el-button type="primary" class="btn_login" @click="login" id="login">下一步</el-button>
    </div>
  </div>
</template>
<script>
// import Verif_code from "./verif_code";
// import Input_phone from "./input_phone";
import { store } from "../../../Vuex/store";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      active: 0,
      user_phone: "",
      phone: false,
      label_phone: false,
      verif_code: "获取验证码",
      timer: null,
      user_verif: "",
      url: "/apis/",
      verif: false,
      code: "",
      isSend: true,
      label_verif: false
    };
  },
  computed: {
    //Vuex 组件之间传值
    user_phone_store: state => store.state.user_phone, // 获取Input_phone组件的传输值
    user_verif_store: state => store.state.user_verif, // 获取输入的验证码组件的传输值
    verif_code_store: state => store.state.verif_code // 获取发送的验证码组件的传输值
  },
  methods: {
    login() {
      console.log(
        "验证码：" + this.user_verif_store + "发送验证码" + this.verif_code_store
      );
      if (this.user_phon_storee === "") {
        this.$toast({
          message: "电话号码不能为空!",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (!/^1[34578]\d{9}$/.test(this.user_phone_store)) {
        this.$toast({
          message: "电话号码格式不对!",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.user_verif_store === "") {
        this.$toast({
          message: "验证码为空!!",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.user_verif_store != this.verif_code_store) {
        this.$toast({
          message: "验证码不正确!",
          position: "middle",
          duration: 1500
        });
        return;
      } else {
        if (this.active++ > 2) this.active = 0;
        this.$toast({
          message: "验证成功!",
          position: "middle",
          duration: 1500
        });
        //  this.$router.push('/home');
        console.log("success");
      }
    },
    phone_Message() {
      //Vuex 将user_phone的状态保存到创库中
      store.commit("phone_Message", this.user_phone);
    },
    phone_show() {
      //显示电话的图标和动画
      this.phone = true;
      this.label_phone = true;
    },
    phone_display() {
      //恢复初始状态
      this.phone = false;
      if (this.user_phone === "") {
        this.label_phone = false;
      } else {
        this.label_phone = true;
      }
    },
    verif_show() {
      //不显示验证图标和规划
      this.verif = true;
      this.label_verif = true;
    },
    verif_display() {
      //恢复初始状态
      this.verif = false;
      if (this.user_verif === "") {
        this.label_verif = false;
      } else {
        this.label_verif = true;
      }
    },
    send_code() {
      //发送随机验证码
      if (this.user_phone === "") {
        this.$toast({
          message: "电话号码不能为空!",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (!/^1[34578]\d{9}$/.test(this.user_phone)) {
        this.$toast({
          message: "电话号码格式不对!",
          position: "middle",
          duration: 1500
        });
        return;
      } else {
        const count = 60;
        let times = 60;
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
                this.verif_code = times-- + "s后重新发送";
              } else {
                this.isSend = true; //按钮可用
                this.verif_code = "获取验证码";
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
        }
      }
    },
    send_note(tel, code) {
      //发送短信模板
      const text =
        "验证码：" +
        code +
        ",您正在使用登陆功能,该验证码仅用于身份验证,在五分钟之内有效，请勿泄露给其他人使用。"; //短信内容模板，已经在sms平台绑定此内容，所以会比普通的更快到达用户手机。
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
      console.log("存入仓库中" + this.code);
      store.commit("verif_Message", this.user_verif, this.code);
    }
  }
};
</script>
<style scoped>
@import "../../../assets/css/login.css";
</style>
