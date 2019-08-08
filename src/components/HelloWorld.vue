<template>
  <div class="login-wrap">
    添加用户信息：
    <p>
      输入用户名:<el-input v-model="username" class="el-input__inner"></el-input>
      输入密码:<el-input v-model="password" class="el-input__inner"></el-input>
    </p>
    <el-button type="primary" @click="addInfo">添加</el-button>
    <p>{{showAddInfo}}</p>
    <br />
    
    判断用户名是否存在：
    <p>
      输入用户名:<el-input v-model="username" class="el-input__inner"></el-input>
    </p>
    <el-button type="primary" @click="checkInfo">查询</el-button>
    <p>{{showUserNameInfo}}</p>

    <br />
    
    更新用户名信息：
    <p>
      输入用户ID名:<el-input v-model="id" class="el-input__inner"></el-input>
      输入用户名:<el-input v-model="username" class="el-input__inner"></el-input>
    </p>
    <el-button type="primary" @click="updateInfo">查询</el-button>
    <p>{{showUpdateInfo}}</p>
    <br />
    
    更新用户密码信息：
    <p>
      输入用户ID名:<el-input v-model="id" class="el-input__inner"></el-input>
      输入用户密码:<el-input v-model="password" class="el-input__inner"></el-input>
    </p>
    <el-button type="primary" @click="updatePassword">查询</el-button>
    <p>{{showModifyInfo}}</p>
    <br>

    登录验证:
    <p>
      输入用户名:<el-input v-model="username" class="el-input__inner"></el-input>
      输入用户密码:<el-input v-model="password" class="el-input__inner"></el-input>
    </p>
    <el-button type="primary" @click="login">查询</el-button>
    <p>{{showLoginInfo}}</p>
    <br />

    删除用户信息：
    <p>
      输入用户ID名:<el-input v-model="id" class="el-input__inner"></el-input>
      输入用户名:<el-input v-model="username" class="el-input__inner"></el-input>
    </p>
    <el-button type="primary" @click="deleteUser">查询</el-button>
    <p>{{showDeleteInfo}}</p>
    <br>
    
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      id: "",
      username: "",
      password: "",
      showAddInfo: "",
      showUserNameInfo: "",
      showUpdateInfo: "",
      showModifyInfo: "",
      showLoginInfo:"",
      showDeleteInfo:"",
    };
  },
  methods: {
    addInfo() {
      var username = this.username;
      var password = this.password;
      this.$http
        .post(
          "/api/user/addUser",
          { username: username, password: password },
          {}
        )
        .then(response => {
          console.log(response);
        });
    },
    checkInfo() {
      var username = this.username;
      this.$http
        .post("/api/user/getUser", { username: username }, {})
        .then(response => {
          console.log(response);
          if (response.data === -1) {
            this.showUserNameInfo = "用户名不存在";
          } else {
            this.showUserNameInfo = "用户名存在";
          }
        });
    },
    updateInfo() {
      var id = this.id;
      var username = this.username;
      this.$http
        .post("/api/user/updateUser", { id: id, username: username }, {})
        .then(response => {
          console.log(response);
          if (response.data === "更新失败，请联系管理员") {
            this.showUpdateInfo = "用户名更新失败";
             console.log("用户名更新失败")
          } else {
            this.showUpdateInfo = "用户名更新成功";
             console.log("用户名更新成功")
          }
        });
    },
    updatePassword() {
      var id = this.id;
      var password = this.password;
      this.$http
        .post("/api/user/modifyPassword", { id: id, password: password }, {})
        .then(response => {
          console.log(response);
          if (response.data === "修改密码失败，请联系管理员") {
            this.showModifyInfo = "用户密码更新失败";
            console.log("用户密码更新失败")
          } else {
            this.showModifyInfo = "用户密码更新成功";
            console.log("用户密码更新成功")
          }
        });
    },
    login() {
      var username = this.username;
      var password = this.password;
      this.$http
        .post(
          "/api/user/login",
          { username: username , password: password},
          {}
        )
        .then(response => {
          if(response.data === -1) {
            console.log("用户名不存在")
            this.showLoginInfo="用户名不存在"
          } else if(response.data  === 0){
            console.log("密码错误")
            this.showLoginInfo= "密码错误"
          } else {
            console.log("登陆成功")
            this.showLoginInfo="登陆成功"
          }
        });
    },

    deleteUser() {
      var id = this.id;
      this.$http
        .post("/api/user/deleteUser", { id: id }, {})
        .then(response => {
          console.log(response);
          if (response.data === "删除用户失败") {
            console.log("删除用户失败")
            this.showDeleteInfo = "删除用户失败";
          } else {
            this.showDeleteInfo = "删除用户成功";
            console.log("删除用户成功")
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 240px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.ms-login span {
  color: red;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
.el-input__inner {
  width: 20%;
}
</style>
