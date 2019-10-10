<template>
  <div>
    <div class="userContent">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="oldPass"
                      :label='`${$t("login.userLogin.oldPassword")}`'>
          <el-input v-model="form.oldPass"
                    type="password"
                    :placeholder='`${$t("login.userLogin.placeholderOldPassword")}`'
                    show-password></el-input>
        </el-form-item>
        <el-form-item prop="newPass"
                      :label='`${$t("login.userLogin.newPassword")}`'>
          <el-input v-model="form.newPass"
                    type="password"
                    :placeholder='`${$t("login.userLogin.placeholderNewPassword")}`'
                    show-password></el-input>
        </el-form-item>
        <el-form-item prop="checkPass"
                      :label='`${$t("register.label.repeatPassword")}`'>
          <el-input v-model="form.checkPass"
                    type="password"
                    :placeholder='`${$t("register.inputPlaceholder.repeatPassword")}`'
                    show-password></el-input>
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
import _ from "lodash"
import showMessageBox from "../../mixin/showMessageBox"
export default {
  name: "userModifyPassword",
  data () {
    const validateOldPass = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("register.inputPlaceholder.password")));
      }
      callback();
    };
    const validateNewPass = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("register.inputPlaceholder.password")));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validateRepeatPass = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("register.inputPlaceholder.repeatPassword")));
      } else if (value !== this.form.newPass) {
        callback(new Error(this.$t("register.inputPlaceholder.repeatError")));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPass: "",
        newPass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        checkPass: [{ validator: validateRepeatPass, trigger: "blur" }]
      }
    };
  },
  mixins: [showMessageBox],
  methods: {
    onSubmit (formName) {
      const self = this;
      const oldPass = sessionStorage.getItem("userPwd");
      const newPass = self.form.newPass;
      const loginid = sessionStorage.getItem("userLoginId");
      self.$refs[formName].validate(async valid => {
        if (valid) {
          if (!_.isEqual(oldPass, self.form.oldPass)) {
            self.oldPasswordIsError();
            return;
          }
          const response = await userModifyPassword(self, loginid, newPass);
          if (response.data === 'fail to update password') {
            self.modifyPwdError();
            return;
          } else {
            self.form.oldPass = "";
            self.form.newPass = "";
            self.form.checkPass = "";
            self.successUpdateAndLogin();
          }
        } else {
          return false;
        }
      });
    },
    onCancle () {
      const self = this;
      self.form.oldPass = "";
      self.form.newPass = "";
      self.form.checkPass = "";
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
