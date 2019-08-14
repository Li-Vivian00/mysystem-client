<template>
  <div class="bg_bank">
    <div class="bg_color">
      <Input_phone />
      <Verif_code />
      <div class="re_login">
        <el-button type="primary" class="btn_login" @click="login" id="login">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Verif_code from "./verif_code";
import Input_phone from "./input_phone";
import { store } from "../../../Vuex/store";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {};
  },
  components: {
    Verif_code,
    Input_phone
  },
  computed: {
    //Vuex 组件之间传值
    user_phone: state => store.state.user_phone, // 获取Input_phone组件的传输值
    user_verif: state => store.state.user_verif, // 获取输入的验证码组件的传输值
    verif_code: state => store.state.verif_code // 获取发送的验证码组件的传输值
  },
  methods: {
    login() {
      console.log(
        "验证码：" + this.user_verif + "发送验证码" + this.verif_code
      );
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
      } else if (this.user_verif === "") {
        this.$toast({
          message: "验证码为空!!",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.user_verif != this.verif_code) {
        this.$toast({
          message: "验证码不正确!",
          position: "middle",
          duration: 1500
        });
        return;
      } else {
        this.$toast({
          message: "验证成功!",
          position: "middle",
          duration: 1500
        });
        //  this.$router.push('/home');
        console.log("success");
      }
    }
  }
};
</script>
<style scoped>
@import "../../../assets/css/login.css";
</style>
