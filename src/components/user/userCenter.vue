<template>
  <div class="usercenter">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i>个人中心
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="form.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="账号名称">
          <el-input v-model="form.loginid" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.card" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {userCenter} from '../../service/user/userCenter.service'
export default {
  data() {
    return {
      form: {
        username: "",
        loginid: "",
        email: "",
        phone: "",
        card: "",
        sex: "",
        Id: ""
      }
    };
  },
  methods: {
    async getUserData() {
      const self = this;
      const userLoginId = sessionStorage.getItem("userLoginId");
      const response = await userCenter(self, userLoginId);
      if (response.status == 200){
          let result = response.data[0];
          self.form.username = result.username;
          self.form.loginid = result.loginid;
          self.form.email = result.email;
          self.form.phone = result.phone;
          self.form.card = result.card;
          self.form.sex = result.sex;
          self.form.Id = result.Id;
          // sessionStorage.setItem("ms_userId", result.Id);
      }
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style scoped>
.userContent {
  width: 400px;
  margin: 0 auto;
}
.select-sex {
  width: 320px;
}
</style>