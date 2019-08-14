<template>
  <div>
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-edit"></i> 个人中心
        </el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="pass" label="密码">
          <el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input
            v-model="form.checkPass"
            type="password"
            placeholder="请再次输入密码"
            :readonly="isValue"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {modifyPassword} from '../../service/user/modifyPassword.service'
export default {
  data() {
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
    onSubmit(formName) {
      const self = this;
      let formData = {
        id: parseInt(sessionStorage.getItem("ms_userId")),
        pass: self.form.pass,
        checkPass: self.form.checkPass
      };
      console.log("id:", formData.id);
      self.$refs[formName].validate(valid => {
        if (valid) {
          const response = modifyPassword(self, formData);
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
    onCancle() {
      // const
      (this.form.pass = ""), (this.form.checkPass = "");
      // this.$router.push("/userCenter");
    }
  }
};
</script>

<style>
.userContent {
  width: 400px;
  margin: 8% 40%;
}
</style>
   