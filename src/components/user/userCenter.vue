<template>
  <div class="usercenter">
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i>{{$t("header.userCenter")}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="userContent">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item :label='`${$t("register.label.userName")}`'>
          <el-input v-model="form.username"
                    readonly
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.loginId")}`'>
          <el-input v-model="form.loginid"
                    readonly
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.sex")}`'>
          <el-input v-model="form.sex"
                    readonly
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.phone")}`'>
          <el-input v-model="form.phone"
                    readonly
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.card")}`'>
          <el-input v-model="form.card"
                    readonly
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.email")}`'>
          <el-input v-model="form.email"
                    readonly
                    class="inputWidth"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userCenter } from '../../service/user/userCenter.service'
export default {
  name: "userCenter",
  data () {
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
    async getUserData () {
      const self = this;
      const userLoginId = sessionStorage.getItem("userLoginId");
      const response = await userCenter(self, userLoginId);
      if (response.status == 200) {
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
  mounted () {
    this.getUserData();
  }
};
</script>

<style lang="scss" scoped>
.userContent {
  width: 400px;
  margin: 55px auto;
  .inputWidth {
    width: 88% !important;
  }
}
.select-sex {
  width: 320px;
}
</style>