<template>
  <div class="adminManage">
    <el-button type="primary" @click="batchDelect" class="batchDelect">{{$t('adminManage.batchDelete')}}</el-button>关键字：
    <el-select v-model="value" clearable @change="selectItem">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input
      :placeholder='`${$t("adminManage.inputText")}`'
      v-model="input"
      clearable
      :disabled="selectAll"
      style="width:210px; margin-left:12px;margin-right:10px"
    ></el-input>
    <el-button type="primary" @click="searchAdmin" plain>{{$t("adminManage.search")}}</el-button>

    <el-table
      :data="form"
      style="width: 100%"
      :default-sort="{prop: 'Id', order: 'ascending'}"
      height="468"
      border
      str
      v-loading="loading"
      :element-loading-text='`${$t("adminManage.loadingText")}`'
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange"
      class="tableFont"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label='`${$t("register.label.loginId")}`'>
              <span>{{ props.row.loginid }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.userName")}`'>
              <span>{{ props.row.adminname }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.password")}`'>
              <span>{{ props.row.password }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.sex")}`'>
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.phone")}`'>
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.email")}`'>
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.card")}`'>
              <span>{{ props.row.card }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="Id" sortable></el-table-column>
      <el-table-column :label='`${$t("adminManage.loginId")}`' prop="loginid" sortable></el-table-column>
      <el-table-column :label='`${$t("adminManage.userName")}`' prop="adminname" sortable></el-table-column>
      <el-table-column fixed="right" :label='`${$t("adminManage.operate")}`' width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native="handleEdit(scope.$index, scope.row)"
            v-if="!showBtn[scope.$index]"
          >{{$t("adminManage.edit")}}</el-button>
          <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">{{$t("adminManage.delete")}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title='`${$t("adminManage.edit")}`'
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      class="edit-form"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item :label='`${$t("register.label.loginId")}`'>
          <el-input v-model="editForm.loginid" auto-complete="off" disabled>{{form.loginid}}</el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.userName")}`'>
          <el-input v-model="editForm.adminname" auto-complete="off">{{form.adminname}}</el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.password")}`'>
          <el-input v-model="editForm.password" auto-complete="off">{{form.password}}</el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.sex")}`'>
          <el-input v-model="editForm.sex" auto-complete="off" disabled>{{form.sex}}</el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.phone")}`'>
          <el-input v-model="editForm.phone" auto-complete="off">{{form.phone}}</el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.email")}`'>
          <el-input v-model="editForm.email" auto-complete="off">{{form.email}}</el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.card")}`'>
          <el-input v-model="editForm.card" auto-complete="off" disabled>{{form.card}}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">{{$t("button.update")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Util from "../../../utils/utils";
import _ from "lodash";
import {
  deleteAdmin,
  getAllAdmin,
  updateAdmin,
  searchAdmin
} from "../../../service/admin/userManage/adminManage.service";
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
          label: this.$t("adminManage.options.label.all")
        },
        {
          value: "Id",
          label: "ID"
        },
        {
          value: "loginid",
          label: this.$t("adminManage.options.label.loginId")
        },
        {
          value: "adminname",
          label: this.$t("adminManage.options.label.userName")
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
      const self = this;
      self
        .$confirm(this.$t("adminManage.confirm.deleteAdmin"), this.$t("adminManage.warning"), {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          const id = rows.Id;
          const response = deleteAdmin(self, id);
          if (response.data === "删除用户失败") {
            self.$message({
              type: "error",
              message: "删除用户失败!"
            });
          } else {
            self.getAdminData();
            self.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //获得所有用户信息
    async getAdminData() {
      const self = this;
      const adminname = "";
      const response = await getAllAdmin(self, adminname);
      if (response.data === "获取用户信息失败") {
        self.$message({
          type: "error",
          message: "获取用户信息失败!"
        });
      } else {
        self.form = response.data;
      }
    },

    //点击编辑
    handleEdit(index, row) {
      const self = this
      self.editFormVisible = true;
      self.editForm = Object.assign({}, row);
      self.isEdit = true;
    },

    //关闭dialog
    handleClose(done) {
      const self = this
      self.editFormVisible = false;
    },
    //点击更新
    handleUpdate(formName) {
      const self = this;
      const loginid = self.editForm.loginid;
      const adminname = self.editForm.adminname;
      const password = self.editForm.password;
      const email = self.editForm.email;
      const phone = self.editForm.phone;
      const card = self.editForm.card;
      self
        .$confirm("是否更新该用户信息", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          const response = updateAdmin(
            self,
            loginid,
            adminname,
            password,
            email,
            phone,
            card
          );
          if (response.data === "更新失败，请联系管理员") {
            his.$message({
              type: "error",
              message: "用户信息更新失败!"
            });
          } else {
            self.$message({
              type: "success",
              message: "用户信息更新成功!"
            });
            self.getAdminData();
            self.editFormVisible = false;
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "取消更新"
          });
        });
    },

    //批量删除
    batchDelect() {
      const self = this;
      const formatId = self.formatId(self.multipleSelection);
      self
        .$confirm("此操作删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          const response = deleteAdmin(self, formatId);
          if (response.data === "删除用户失败") {
            self.showDeleteInfo = "删除用户失败";
          } else {
            self.showDeleteInfo = "删除用户成功";
            self.getAdminData();
            self.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },

    //多选框取值
    handleSelectionChange(val) {
      const self = this
      self.multipleSelection = val;
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
    async searchAdmin() {
      const self = this;
      const selValue = self.selectValue;
      const inpValue = self.input;
      if (selValue == "all") {
        self.getAdminData();
      } else {
        if (_.isEmpty(inpValue) && !_.isEmpty(self.selectValue)) {
          self.$alert("输入不能为空，请输入需要查询的用户", "警告", {
            confirmButtonText: "确定"
          });
        } else {
          self.selectAll = false;
          const response = await searchAdmin(self, selValue, inpValue);
          if (response.data === "无该用户信息") {
            self.$alert("无该用户信息，请重新搜索！", "查询失败", {
              confirmButtonText: "确定"
            });
            self.input = " ";
          } else {
            self.form = response.data;
          }
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAdminData();
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
