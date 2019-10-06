<template>
  <div>
    <div class="userContent">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="pass"
                      :label='`${$t("register.label.password")}`'>
          <el-input v-model="form.pass"
                    type="password"
                    :placeholder='`${$t("login.adminLogin.password")}`'></el-input>
        </el-form-item>
        <el-form-item prop="checkPass"
                      :label='`${$t("register.label.repeatPassword")}`'>
          <el-input v-model="form.checkPass"
                    type="password"
                    :placeholder='`${$t("register.inputPlaceholder.repeatPassword")}`'
                    :readonly="isValue"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit('form')">{{$t("button.ok")}}</el-button>
          <el-button @click="onCancle()">{{$t("button.cancel")}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userModifyPassword } from '../../service/user/modifyPassword.service'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.inputPlaceholder.password")));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.inputPlaceholder.repeatPassword")));
      } else if (value !== this.form.pass) {
        this.isValue = true;
        callback(new Error("两次输入的密码不一致"));
      } else {
        this.isValue = false;
        callback();
      }
    };
    return {
      isValue: false,
      form: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit (formName) {
      const self = this;
      let formData = {
        id: parseInt(sessionStorage.getItem("ms_userId")),
        pass: self.form.pass,
        checkPass: self.form.checkPass
      };
      self.$refs[formName].validate(valid => {
        if (valid) {
          const response = userModifyPassword(self, formData);
          if (response.data === -1) {
            console.log("change pwd is wrong");
          } else {
            self.$router.push("/login");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancle () {
      // const
      (this.form.pass = ""), (this.form.checkPass = "");
      // this.$router.push("/userCenter");
    }
  }
};
</script>

<style scoped lang="scss">
.userContent {
  width: 400px;
  margin: 8% 30%;
  .el-input {
    width: 88% !important;
  }
}
</style>
   