<template>
  <div class="wrapper">
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item>
          <i class="el-icon-setting"></i>注册
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="loginId" label="登录账号">
          <el-input v-model="form.loginId" placeholder="请输入登录账号" :readonly="successRegister"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户名称">
          <el-input v-model="form.name" placeholder="请输入用户名称" :readonly="successRegister"></el-input>
        </el-form-item>
        <el-form-item prop="pass" label="密码">
          <el-input
            v-model="form.pass"
            type="password"
            placeholder="请输入密码"
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input
            v-model="form.checkPass"
            type="password"
            placeholder="请再次输入密码"
            :readonly="successRegister"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select
            class="select-sex"
            v-model="form.sex"
            placeholder="请选择性别"
            :disabled="successRegister"
          >
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="form.phone" placeholder="请输入手机号" :readonly="successRegister"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" :readonly="successRegister"></el-input>
        </el-form-item>
        <el-form-item prop="card" label="身份证">
          <el-input v-model="form.card" placeholder="请输入身份证号" :readonly="successRegister"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :disabled="successRegister">确定</el-button>
          <el-button @click="onCancle()" :disabled="successRegister">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mainBox" v-show="successRegister">
      <div class="mainBox-Main">
        <span class="info">
          <img src="../../../static/img/true.png" alt id="true" />
          <span id="success">恭喜你注册成功，加入温暖的小区！</span>
        </span>
        <div class="loading">
          <span id="return">
            正在跳转至登录界面
            <span id="runTime">{{runTime}}</span>
          </span>
          <img src="../../../static/img/loading.gif" id="load" />
          <p class="load" @click="onCancle()">点击跳转登录界面</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from "../../utils/utils";
import {register} from "../../service/login/register"
export default {
  data() {
    var validateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登陆账号"));
      } else {
        let loginId = this.form.loginId;
        this.$http
          .get("/api/userLogin/getUser", { params: { loginId: loginId } })
          .then(function(response) {
            console.log(response);
            let result = response.data[0];
            if (result) {
              callback(new Error("用户已存在"));
            }
            callback();
          });
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!Util.emailReg.test(this.form.email)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!Util.phoneReg.test(this.form.phone)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var validateCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号"));
      } else if (!Util.idCardReg.test(this.form.card)) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    };
    return {
      successRegister: false,
      runTime: "",
      timer: null,
      form: {
        name: "",
        loginId: "",
        pass: "",
        checkPass: "",
        email: "",
        phone: "",
        card: "",
        sex: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        loginId: [
          {
            required: true,
            validator: validateId,
            trigger: "blur"
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        card: [{ required: true, validator: validateCard, trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }]
      }
    };
  },
  methods: {
     onSubmit(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          const response = register(self.form, self)
              if (response.data == "注册失败") {
                self.$alert("注册失败", "警告", {
                  confirmButtonText: "确定"
                });
              } else {
                self.successRegister = true;
                self.timeGo();
              }
        } else {
          self.$alert("注册失败", "警告", {
                  confirmButtonText: "确定"
                });
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancle() {
      this.$router.push("/userLogin");
    },
    timeGo() {
      const timeCount = 5;
      if (!this.timer) {
        this.runTime = timeCount;
        this.timer = setInterval(() => {
          this.runTime--;
          if (this.runTime == 0) {
            clearInterval(this.timer);
            this.successRegister = false;
            this.timer = null;
            this.$router.push("/userLogin");
          }
        }, 1000);
      }
    }
    // getDateTimes(str) {
    //   var str = new Date(str);
    //   return str;
    // }
  }
};
</script>

<style>
.crumbs-register {
  background-color: #324157;
  height: 50px;
  line-height: 50px;
}
.register-title {
  line-height: 50px;
  margin: 0 auto;
  width: 50px;
  font-size: 16px;
}
.userContent {
  width: 400px;
  margin: 50px auto;
}
.select-sex {
  width: 320px;
}

.wrapper {
  height: auto;
  position: relative;
}

.wrapper .mainBox {
  position: absolute;
  left: 50%;
  margin-left: -14.5%;
  margin-top: -475px;
  width: 30%;
  height: 273px;
  background: #fff;
  position: relative;
}

.wrapper .mainBox .mainBox-Main {
  width: 569px;
  height: 261px;
  border: 3px dashed rgb(64, 238, 157);
  position: absolute;
  top: 3px;
  text-align: center;
}

.wrapper .mainBox .mainBox-Main .info #true {
  display: inline-block;
  width: 45px;
  height: 45px;
}

.wrapper .mainBox .mainBox-Main .info {
  display: inline-block;
  width: 560px;
  position: relative;
  text-align: left;
}

.wrapper .mainBox .mainBox-Main .info #success {
  display: inline-block;
  margin-left: 10px;
  position: absolute;
  top: 11px;
  font-size: 22px;
}

.wrapper .mainBox .mainBox-Main .lamp {
  display: inline-block;
  width: 535px;
  position: relative;
  margin-top: 17px;
  text-align: left;
  margin-left: 20px;
}
#info1 {
  display: inline-block;

  background: linear-gradient(to left, rgb(236, 248, 182), rgb(246, 250, 184));
}

.wrapper .mainBox .mainBox-Main .lamp img {
  width: 40px;
  height: 30px;
}
.wrapper .mainBox .mainBox-Main .lamp #info1 {
  position: absolute;
  top: 8px;
  font-size: 13px;
}
.wrapper .mainBox .mainBox-Main .loading {
  width: 500px;
  height: 150px;
  margin: 20px auto;
}
.wrapper .mainBox .mainBox-Main .loading #return {
  display: block;
  font-size: 22px;
  letter-spacing: 2px;
}
.wrapper .mainBox .mainBox-Main .loading #runTime {
  color: rgb(250, 54, 54);
  padding-left: 10px;
}
.wrapper .mainBox .mainBox-Main .loading #load {
  display: block;
  width: 200px;
  height: 100px;
  margin: 0 auto;
}
.wrapper .mainBox .mainBox-Main .loading a {
  color: red;
  float: right;
  font-size: 13px;
}
.wrapper .mainBox .mainBox-Main .loading a:hover {
  text-decoration: underline;
}
</style>