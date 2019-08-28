<template>
  <div class="userManage">
    <el-button type="primary"
               @click="batchDelect"
               class="batchDelect">{{$t('manage.batchDelete')}}</el-button>
    {{$t("manage.keyWord")}}
    <el-select v-model="value"
               clearable
               filterable
               @change="selectItem"
               :placeholder='`${$t("manage.selectHolder")}`'>
      <el-option v-for="item in options"
                 :key="item.value"
                 :label='`${$t(item.label)}`'
                 :value="item.value"></el-option>
    </el-select>
    <el-input :placeholder='`${$t("manage.inputText")}`'
              v-model.trim="input"
              clearable
              :disabled="selectAll"
              class="searchInput"></el-input>
    <el-button type="primary"
               @click="searchUser"
               class="searchUser"
               plain>{{$t("manage.search")}}</el-button>
    <el-table :data="form.slice((currentPage-1) * pagesize, currentPage * pagesize)"
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
              class="tableFont">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
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
            <el-form-item :label='`${$t("register.label.stay_date")}`'>
              <span>{{ props.row.stay_date }}</span>
            </el-form-item>
            <el-form-item :label='`${$t("register.label.room_id")}`'>
              <span>{{ props.row.room_id }}</span>
              <el-link :underline="false">查看<i class="el-icon-view el-icon--right"></i> </el-link>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :label='`${$t("manage.id")}`'
                       prop="id"
                       sortable></el-table-column>
      <el-table-column :label='`${$t("manage.loginId")}`'
                       prop="loginid"
                       sortable></el-table-column>
      <el-table-column :label='`${$t("manage.userName")}`'
                       prop="username"
                       sortable></el-table-column>
      <el-table-column fixed="right"
                       :label='`${$t("manage.operate")}`'
                       width="120">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click.native="handleEdit(scope.$index, scope.row)"
                     v-if="!showBtn[scope.$index]">{{$t("manage.edit")}}</el-button>
          <el-button @click="deleteRow(scope.$index, scope.row)"
                     type="text"
                     size="small">{{$t("manage.delete")}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="form.length">
    </el-pagination>
    <el-dialog :title='`${$t("manage.edit")}`'
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               :before-close="handleClose">
      <el-form :model="editForm"
               label-width="80px"
               ref="editForm"
               :rules="rules">
        <el-form-item prop="loginid"
                      :label='`${$t("register.label.loginId")}`'>
          <el-input v-model="editForm.loginid"
                    auto-complete="off"
                    disabled>{{form.loginid}}</el-input>
        </el-form-item>
        <el-form-item prop="username"
                      :label='`${$t("register.label.userName")}`'>
          <el-input v-model="editForm.username"
                    auto-complete="off">{{form.username}}</el-input>
        </el-form-item>
        <el-form-item prop="password"
                      :label='`${$t("register.label.password")}`'>
          <el-input v-model="editForm.password"
                    show-password
                    auto-complete="off">{{form.password}}</el-input>
        </el-form-item>
        <el-form-item prop="sex"
                      :label='`${$t("register.label.sex")}`'>
          <el-input v-model="editForm.sex"
                    auto-complete="off"
                    disabled>{{form.sex}}</el-input>
        </el-form-item>
        <el-form-item prop="phone"
                      :label='`${$t("register.label.phone")}`'>
          <el-input v-model="editForm.phone"
                    auto-complete="off">{{form.phone}}</el-input>
        </el-form-item>
        <el-form-item prop="email"
                      :label='`${$t("register.label.email")}`'>
          <el-input v-model="editForm.email"
                    auto-complete="off">{{form.email}}</el-input>
        </el-form-item>
        <el-form-item prop="card"
                      :label='`${$t("register.label.card")}`'>
          <el-input v-model="editForm.card"
                    auto-complete="off"
                    disabled>{{form.card}}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="editFormVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button type="primary"
                   @click.native="handleUpdate('editForm')">{{$t("button.update")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Util from "../../../utils/utils";
import _ from "lodash";
import {
  getAllUser,
  deleteUser,
  updateUser,
  searchUser
} from "../../../service/admin/userManage/userManage.service";
import { getUserPhone } from "../../../service/login/register.service";
import { constants } from "crypto";
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("register.status.userName")));
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("register.status.password")));
      }
      callback();
    };
    const validateEmail = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("register.status.email")));
      } else if (!Util.emailReg.test(this.editForm.email)) {
        callback(new Error(this.$t("register.status.formatEmail")));
      } else {
        callback();
      }
    };
    const validatePhone = async (rule, value, callback) => {
      const self = this;
      if (_.isEmpty(value)) {
        callback(new Error(self.$t("register.status.phone")));
      } else if (!Util.phoneReg.test(self.editForm.phone)) {
        callback(new Error(self.$t("register.status.formatPhone")));
      } else if (_.isEqual(value, self.oldPhone)) {
        callback();
      } else {
        const phone = self.editForm.phone;
        const response = await getUserPhone(self, phone);
        let result = response.data;
        if (_.isEqual(result, "phone is exist")) {
          callback(new Error(self.$t("register.status.phoneExist")));
        }
      }
    };
    return {
      form: [],
      currentPage: 1,
      pagesize: 5,
      showBtn: [],
      isEdit: false,
      selectAll: true,
      multipleSelection: [],
      loading: true,
      editFormVisible: false,
      showBtnOrdinary: true,
      editForm: {
        loginid: "",
        username: "",
        password: "",
        repeatpass: "",
        sex: "",
        phone: "",
        email: "",
        card: "",
        stay_date: ""
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
      rules: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      value: "",
      input: "",
      selectValue: "",
      oldPhone: ""
    };
  },
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getUserData();
  },
  methods: {
    //单个移除
    deleteRow (index, rows) {
      const self = this;
      self
        .$confirm(
          this.$t("manage.confirm.deleteAdmin"),
          this.$t("manage.warning"),
          {
            confirmButtonText: this.$t("button.ok"),
            cancelButtonText: this.$t("button.cancel"),
            type: "warning"
          }
        )
        .then(async () => {
          const str = [];
          const id = rows.id;
          str.push(id);
          const response = await deleteUser(self, str);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getUserData();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    //获得所有用户信息
    async getUserData () {
      const self = this;
      const username = "";
      const response = await getAllUser(self, username);
      if (_.isEqual(response.data, "fail to get user info")) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
      }
    },

    //点击编辑
    handleEdit (index, row) {
      const self = this;
      self.editFormVisible = true;
      self.editForm = Object.assign({}, row);
      self.editForm.stay_date = row.stay_date;
      self.oldPhone = row.phone;
      self.isEdit = true;
    },

    //关闭dialog
    handleClose (done) {
      const self = this;
      self.editFormVisible = false;
    },

    //点击更新
    handleUpdate (formName) {
      const self = this;
      self.$refs[formName].validate(async valid => {
        if (valid) {
          self
            .$confirm(
              this.$t("manage.confirm.updateUserInfo"),
              this.$t("manage.confirm.warning"),
              {
                confirmButtonText: this.$t("button.ok"),
                cancelButtonText: this.$t("button.cancel"),
                type: "warning"
              }
            )
            .then(async () => {
              const response = await updateUser(self, self.editForm);
              if (_.isEqual(response.data, "fail to update")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.getUserData();
                self.showSuccessMessageBox();
                self.editFormVisible = false;
              }
            })
            .catch(() => {
              self.showCancelMessageBox()
            });
        }
      });
    },

    //批量删除
    batchDelect () {
      const self = this;
      const formatId = self.formatId(self.multipleSelection);
      self
        .$confirm(
          this.$t("manage.confirm.deleteAdmin"),
          this.$t("manage.confirm.warning"),
          {
            confirmButtonText: this.$t("button.ok"),
            cancelButtonText: this.$t("button.cancel"),
            type: "warning"
          }
        )
        .then(async () => {
          const response = await deleteUser(self, formatId);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getUserData();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    //多选框取值
    handleSelectionChange (val) {
      const self = this;
      self.multipleSelection = val;
    },

    formatId (val) {
      let sqlId = [];
      for (let i = 0; i < val.length; i++) {
        sqlId.push(val[i].id);
      }
      return sqlId;
    },

    //选择器取值
    selectItem (val) {
      this.selectValue = val;
      if (_.isEqual(this.selectValue, "all") || _.isEmpty(this.selectValue)) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },

    //关键字查询用户
    async searchUser () {
      const self = this;
      const selValue = self.selectValue;
      const inpValue = self.input;
      if (_.isEqual(selValue, "all")) {
        self.getUserData();
      } else {
        if (_.isEmpty(selValue)) {
          self.showWarningSelectType();
        } else if (_.isEmpty(inpValue)) {
          self.showWarningInputeValue();
        } else {
          self.selectAll = false;
          const response = await searchUser(self, selValue, inpValue);
          if (_.isEqual(response.data, "fail to get user info")) {
            self.input = " ";
            self.form = [];
          } else {
            self.form = response.data;
          }
        }
      }
    },

    //showMessageBox
    showErrorMessageBox () {
      this.$message({
        type: "error",
        message: this.$t("manage.showMessage.operateError")
      });
    },

    showSuccessMessageBox () {
      this.$message({
        type: "success",
        message: this.$t("manage.showMessage.operateSuccess")
      });
    },

    showCancelMessageBox () {
      this.$message({
        type: "info",
        message: this.$t("manage.showMessage.cancel")
      });
    },

    showWarningSelectType () {
      this.$alert(
        this.$t("manage.showMessage.selectType"),
        this.$t("manage.confirm.warning"),
        {
          confirmButtonText: this.$t("button.ok")
        }
      );
    },

    showWarningInputeValue () {
      this.$alert(
        this.$t("manage.showMessage.inputText"),
        this.$t("manage.confirm.warning"),
        {
          confirmButtonText: this.$t("button.ok")
        }
      );
    },

    handleSizeChange (size) {
      this.pagesize = size;
      console.log(this.pagesize)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";
</style>
