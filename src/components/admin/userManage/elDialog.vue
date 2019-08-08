<template>
  <el-dialog
    title="编辑"
    :visible.sync="editFormVisible"
    :close-on-click-modal="false"
    class="edit-form"
    :before-close="handleClose"
  >
    <el-form :model="editForm" label-width="80px" ref="editForm">
      <el-form-item label="登陆账号">
        <el-input v-model="editForm.loginid" auto-complete="off" disabled>{{form.loginid}}</el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="editForm.username" auto-complete="off">{{form.username}}</el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="editForm.password" auto-complete="off">{{form.password}}</el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="editForm.sex" auto-complete="off" disabled>{{form.sex}}</el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="editForm.phone" auto-complete="off">{{form.phone}}</el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editForm.email" auto-complete="off">{{form.email}}</el-input>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="editForm.card" auto-complete="off" disabled>{{form.card}}</el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="editFormVisible = false">取消</el-button>
      <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "elDialog",
  data() {
    return {
      editFormVisible: false,
      editForm: {
        loginid: "",
        username: "",
        password: "",
        sex: "",
        phone: "",
        email: "",
        card: ""
      }
    };
  },
  methods: {
      //关闭dialog
    handleClose(done) {
      this.editFormVisible = false;
    },
    //点击更新
    handleUpdate(formName) {
      let loginid = this.editForm.loginid;
      console.log(loginid);
      let username = this.editForm.username;
      let password = this.editForm.password;
      let email = this.editForm.email;
      let phone = this.editForm.phone;
      let card = this.editForm.card;
      this.$confirm("是否更新该用户信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              "/api/userManage/updateUser",
              {
                loginid: loginid,
                username: username,
                password: password,
                email: email,
                phone: phone,
                card: card
              },
              {}
            )
            .then(response => {
              console.log(response);
              if (response.data === "更新失败，请联系管理员") {
                this.showUpdateInfo = "用户信息更新失败";
                console.log("用户信息更新失败");
              } else {
                this.showUpdateInfo = "用户信息更新成功";
                this.$message({
                  type: "success",
                  message: "用户信息更新成功!"
                });
                console.log("用户信息更新成功");
              }
            });
          this.getUserData();
          this.editFormVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新"
          });
        });
    },
  }
};
</script>

<style>
</style>
