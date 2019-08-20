<template>
  <div class="userManage">
    <el-button type="primary" @click="batchDelect" class="batchDelect">{{$t('manage.batchDelete')}}</el-button>{{$t("manage.keyWord")}}
    <el-select v-model="value" clearable @change="selectItem" :placeholder='`${$t("manage.selectHolder")}`'>
      <el-option v-for="item in options" :key="item.value" :label='`${$t(item.label)}`' :value="item.value"></el-option>
    </el-select>
    <el-input
      :placeholder='`${$t("manage.inputText")}`'
      v-model.trim="input"
      clearable
      :disabled="selectAll"
      style="width:210px; margin-left:12px;margin-right:10px"
    ></el-input>
    <el-button type="primary" @click="searchUser" class="searchUser" plain>{{$t("manage.search")}}</el-button>

    <el-table
      :data="form"
      style="width: 100%"
      :default-sort="{prop: 'Id', order: 'ascending'}"
      height="468"
      border
      str
      v-loading="loading"
      :element-loading-text='`${$t("manage.loadingText")}`'
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
              <span>{{ props.row.username }}</span>
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
            <el-form-item :label='`${$t("register.label.card")}`'>
              <span>{{ props.row.date }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :label='`${$t("manage.id")}`' prop="id" sortable></el-table-column>
      <el-table-column :label='`${$t("manage.loginId")}`' prop="loginid" sortable></el-table-column>
      <el-table-column :label='`${$t("manage.userName")}`' prop="username" sortable></el-table-column>
      <el-table-column fixed="right" :label='`${$t("manage.operate")}`' width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native="handleEdit(scope.$index, scope.row)"
            v-if="!showBtn[scope.$index]"
          >{{$t("manage.edit")}}</el-button>
           <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">{{$t("manage.delete")}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title='`${$t("manage.edit")}`'
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
          <el-input v-model="editForm.username" auto-complete="off">{{form.username}}</el-input>
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
  getAllUser,
  deleteUser,
  updateUser,
  searchUser
} from "../../../service/admin/userManage/userManage.service";
import { constants } from 'crypto';
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
        // Id:"",
        loginid: "",
        username: "",
        password: "",
        repeatpass:"",
        sex: "",
        phone: "",
        email: "",
        card: "",
        data:"",
      },
      options: [
        {
          value: "all",
          label: "manage.options.label.all"
        },
        {
          value: "Id",
          label: "manage.id"
        },
        {
          value: "loginid",
          label: "manage.options.label.loginId"
        },
        {
          value: "username",
          label: "manage.options.label.userName"
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
        .$confirm(this.$t("manage.confirm.deleteAdmin"),
          this.$t("manage.warning"), {
          confirmButtonText: this.$t("button.ok"),
          cancelButtonText: this.$t("button.cancel"),
          type: "warning"
        })
        .then(() => {
          const str = []
          const id = rows.id;
          str.push(id)
          console.log(id);
          const response = deleteUser(self, str);
          if (response.data === "fail to delete user") {
            self.$message({
              type: "error",
              message: this.$t("manage.showMessage.deleteError")
            });
          } else {
            self.getUserData();
            self.$message({
              type: "success",
              message: this.$t("manage.showMessage.deleteUserSuccess")                         
            });
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: this.$t("manage.showMessage.cancel")            
          });
        });
    },

    //获得所有用户信息
    async getUserData() {
      const self = this;
      const username = "";
      const response = await getAllUser(self, username);
      if (response.data === "fail to get user info") {
        self.$message({
          type: "error",
          message: self.$t("manage.showMessage.getUserError")          
        });
      } else {
        self.form = response.data;
        console.log(self.form);
      }
    },

    //点击编辑
    handleEdit(index, row) {
      const self = this
      self.editFormVisible = true;
      self.editForm = Object.assign({}, row);
      self.editForm.date = row.date
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
      self
        .$confirm(this.$t("manage.confirm.updateUserInfo"), this.$t("manage.confirm.warning"), {
          confirmButtonText: this.$t("button.ok"),
          cancelButtonText: this.$t("button.cancel"),
          type: "warning"
        })
        .then(async () => {
          const response = await updateUser(
            self,
            self.editForm
          );
          if (response.data === "fail to update") {
            self.$message({
              type: "error",
              message: this.$t("manage.showMessage.updateError")
            });
          } else if (response.data == "success") {
            self.$message({
              type: "success",
              message: this.$t("manage.showMessage.updateUserSuccess")
            });
            self.getUserData();
            self.editFormVisible = false;
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: this.$t("manage.showMessage.cancel")
          });
        });
    },

    //批量删除
    batchDelect() {
      const self = this;
      const formatId = self.formatId(self.multipleSelection);
      self
        .$confirm(this.$t("manage.confirm.deleteAdmin"), this.$t("manage.confirm.warning"), {
          confirmButtonText: this.$t("button.ok"),
          cancelButtonText: this.$t("button.cancel"),
          type: "warning"
        })
        .then(() => {
          const response = deleteUser(self, formatId);
          if (response.data === "fail to delete user") {
            self.$message({
              type: "error",
              message: this.$t("manage.showMessage.deleteError")
            });
          } else {
            self.$message({
              type: "success",
              message: this.$t("manage.showMessage.deleteUserSuccess")
            });
            self.getUserData();
          }
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: this.$t("manage.showMessage.cancel")            
          });
        });
    },

    //多选框取值
    handleSelectionChange(val) {
      const self = this
      self.multipleSelection = val;
    },
    formatId(val) {
      let sqlId = []
      for (let i = 0; i < val.length; i++) {
        sqlId.push(val[i].id)
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
    async searchUser() {
      const self = this;
      const selValue = self.selectValue;
      const inpValue = self.input;
      if (selValue == "all") {
        self.getUserData();
      } else {
        if (_.isEmpty(selValue))
        {
          self.$alert(self.$t("manage.showMessage.selectType"), self.$t("manage.confirm.warning"), {
            confirmButtonText: self.$t("button.ok")
          });
        }
        else if (_.isEmpty(inpValue)) {
          self.$alert(self.$t("manage.showMessage.inputText"), self.$t("manage.confirm.warning"), {
            confirmButtonText: self.$t("button.ok")
          });
        } else {
          self.selectAll = false;
          const response = await searchUser(self, selValue, inpValue);
          if (response.data === "fail to get user info") {
            self.input = " ";
            self.form = [];
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
.userManage {
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
