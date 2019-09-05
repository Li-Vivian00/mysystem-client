<template>
  <div class="admincenter">
    <div class="crumbs">
      <el-breadcrumb separator="/"
                     class="centerItem">
        <el-breadcrumb-item>
          <span>
            <i class="el-icon-user"></i>{{$t("header.userCenter")}}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="adminContent">
      <el-form ref="form"
               :model="form"
               label-width="80px"
               :rules="rules">
        <el-form-item :label='`${$t("register.label.loginId")}`'
                      prop="loginid">
          <el-input v-model.trim="form.loginid"
                    class="inputWidth"
                    readonly></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.userName")}`'
                      prop="adminname">
          <el-input v-model.trim="form.adminname"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.sex")}`'>
          <el-input v-model.trim="form.sex"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      :label='`${$t("register.label.password")}`'>
          <el-input v-model.trim="form.password"
                    type="password"
                    :placeholder='`${$t("register.inputPlaceholder.password")}`'
                    show-password
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.phone")}`'
                      prop="phone">
          <el-input v-model.trim="form.phone"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.card")}`'
                      prop="card">
          <el-input v-model.trim="form.card"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.email")}`'
                      prop="email">
          <el-input v-model.trim="form.email"
                    class="inputWidth"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminCenter } from "../../service/admin/adminCenter.service";
import _ from "lodash"
import Util from "../../utils/utils";
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.status.userName")));
      }
      callback();
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
        // const phone = self.form.phone;
        // const response = await getUserPhone(self, phone);
        // let result = response.data;
        // console.log(result)
        // if (result == 'phone is exist') {
        //   callback(new Error(self.$t("register.status.phoneExist")));
        // }
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
      isNotEdit: true,
      form: {
        adminname: "",
        loginid: "",
        email: "",
        phone: "",
        card: "",
        sex: "",
        Id: ""
      },
      rules: {
        adminname: [{ required: true, validator: validateName, trigger: "blur" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        card: [{ required: true, validator: validateCard, trigger: "blur" }],
        sex: [{ required: true, message: this.$t("register.status.sex"), trigger: "blur" }]
      },
    };
  },
  methods: {
    async getUserData () {
      const self = this;
      const adminLoginId = sessionStorage.getItem("adminLoginId");
      const response = await adminCenter(self, adminLoginId);
      if (!_.isEmpty(response)) {
        let result = response.data[0];
        self.form = result;
      }
    }
  },
  mounted () {
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
    .inputWidth {
      width: 88% !important;
    }
  }
  // .select-sex {
  //   width: 320px;
  // }
}
</style>