<template>
  <div class="adminManage">
    <el-button type="primary" @click="batchDelect" class="batchDelect">批量删除</el-button>关键字：
    <el-select v-model="value" clearable @change="selectItem">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable
      :disabled="selectAll"
      style="width:210px; margin-left:12px;margin-right:10px"
    ></el-input>
    <el-button type="primary" @click="searchAdmin" plain>搜索</el-button>

    <el-table
      :data="form"
      style="width: 100%"
      :default-sort="{prop: 'Id', order: 'ascending'}"
      height="468"
      border
      str
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange"
      class="tableFont"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="登录id：">
              <span>{{ props.row.loginid }}</span>
            </el-form-item>
            <el-form-item label="管理员名称">
              <span>{{ props.row.adminname }}</span>
            </el-form-item>
            <el-form-item label="管理员密码">
              <span>{{ props.row.password }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="身份证">
              <span>{{ props.row.card }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="Id" sortable></el-table-column>
      <el-table-column label="登录账号" prop="loginid" sortable></el-table-column>
      <el-table-column label="用户名" prop="adminname" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">移除</el-button>
          <el-button
            type="text"
            size="small"
            @click.native="handleEdit(scope.$index, scope.row)"
            v-if="!showBtn[scope.$index]"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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
          <el-input v-model="editForm.adminname" auto-complete="off">{{form.adminname}}</el-input>
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
  </div>
</template>

<script>
// import Util from "../../../utils/utils";
import _ from 'lodash'
export default {
  data() {
    return {
      form: [],
      showBtn: [],
      isEdit: false,
      selectAll: true,
      multipleSelection: [],
      loading: true,
      editFormVisible: false,
      showBtnOrdinary: true,
      editForm: {
        loginid: "",
        adminname: "",
        password: "",
        sex: "",
        phone: "",
        email: "",
        card: ""
      },
      options: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "Id",
          label: "ID"
        },
        {
          value: "loginid",
          label: "loginID"
        },
        {
          value: "adminname",
          label: "用户名"
        }
      ],
      value: "",
      input: "",
      selectValue: ""
    };
  },
  methods: {
    //单个移除
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      this.$confirm("此操作删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const self = this;
          let id = rows.Id;
          self.$http
            .post("/api/adminManage/deleteAdmin", { id: id }, {})
            .then(response => {
              console.log(response);
              if (response.data === "删除用户失败") {
                this.showDeleteInfo = "删除用户失败";
              } else {
                this.showDeleteInfo = "删除用户成功";
              }
            });
          this.getUserData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //获得所有用户信息
    getUserData() {
      const self = this;
      let adminname = "";
      self.$http
        .get("/api/adminManage/getAdmin", { params: { name: adminname } })
        .then(function(response) {
          console.log(response);
          if (response.data === "获取用户信息失败") {
            this.$message({
              type: "error",
              message: "获取用户信息失败!"
            });
          } else {
            self.form = response.data;
          }
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },

    //点击编辑
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.isEdit = true;
    },

    //关闭dialog
    handleClose(done) {
      this.editFormVisible = false;
    },
    //点击更新
    handleUpdate(formName) {
      let loginid = this.editForm.loginid;
      console.log(loginid);
      let adminname = this.editForm.adminname;
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
              "/api/adminManage/updateAdmin",
              {
                loginid: loginid,
                adminname: adminname,
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

    //批量删除
    batchDelect() {
      let formatId = this.formatId(this.multipleSelection);
      this.$confirm("此操作删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const self = this;
          self.$http
            .post("/api/adminManage/deleteAdmin", { id: formatId }, {})
            .then(response => {
              console.log(response);
              if (response.data === "删除用户失败") {
                this.showDeleteInfo = "删除用户失败";
              } else {
                this.showDeleteInfo = "删除用户成功";
              }
            });
          this.getUserData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //多选框取值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatId(val) {
      let sqlId = "";
      for (let i = 0; i < val.length; i++) {
        sqlId += val[i].Id;
        if (i == val.length - 1) {
          sqlId += "";
        } else {
          sqlId += ",";
        }
      }
      return sqlId;
    },

    //选择器取值
    selectItem(val) {
      this.selectValue = val;
      if (this.selectValue == "all" || _.isEmpty(this.selectValue)) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    //关键字查询用户
    searchAdmin() {
      const self = this;
      let selValue = self.selectValue;
      let inpValue = self.input;
      console.log(selValue + " " + inpValue);
      if (selValue == "all") {
        this.getUserData();
      } else {
        if (_.isEmpty(inpValue) && !_.isEmpty(this.selectValue)) {
          self.$alert("输入不能为空，请输入需要查询的用户", "警告", {
            confirmButtonText: "确定"
          });
        } else {
          self.selectAll = false;
          self.$http
            .get("/api/adminManage/getOneAdmin", {
              params: { id: selValue, name: inpValue }
            })
            .then(function(response) {
              console.log(response);
              if (response.data === "无该用户信息") {
                console.log("无该用户信息");
                self.$alert("无该用户信息，请重新搜索！", "查询失败", {
                  confirmButtonText: "确定"
                });
                self.input = " ";
              } else {
                self.form = response.data;
              }
            })
            .catch(function(error) {
              console.log("error", error);
            });
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getUserData();
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #a4a6a8;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.adminManage {
  width: 100%;
  position: absolute;
  top: 10px;
}
.batchDelect {
  float: left;
  margin-left: 15px;
  margin-bottom: 22px;
}
.tableFont {
  font: 16px !important;
}
</style>
