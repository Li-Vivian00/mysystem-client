<template>
  <div class="admincenter">
    <div class="crumbs">
      <el-breadcrumb separator="/" class="centerItem">
        <el-breadcrumb-item>
          <span>
            <i class="el-icon-user"></i>{{$t("header.userCenter")}}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="adminContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label='`${$t("register.label.loginId")}`'>
          <el-input v-model="form.loginid" readonly></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.userName")}`'>
          <el-input v-model="form.adminname" readonly></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.sex")}`'>
          <el-input v-model="form.sex" readonly></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.phone")}`'>
          <el-input v-model="form.phone" readonly></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.card")}`'>
          <el-input v-model="form.card" readonly></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.email")}`'>
          <el-input v-model="form.email" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminCenter } from "../../service/admin/adminCenter.service";
export default {
  data() {
    return {
      form: {
        adminname: "",
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
      const adminLoginId = sessionStorage.getItem("adminLoginId");
      const response = await adminCenter(self, adminLoginId);
      if (response.status == 200) {
        let result = response.data;
        self.form.adminname = result.adminname;
        self.form.loginid = result.loginid;
        self.form.email = result.email;
        self.form.phone = result.phone;
        self.form.card = result.card;
        self.form.sex = result.sex;
        self.form.Id = result.Id;
      }
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style scoped lang="scss">
.admincenter {
  .crumbs {
    margin: 30px auto;
    .centerItem {
      display: inline-block;
      font-size: 18px;
      margin: 0 auto;
    }
  }
  .adminContent {
    width: 400px;
    margin: 0 auto;
  }
  // .select-sex {
  //   width: 320px;
  // }
}
</style>