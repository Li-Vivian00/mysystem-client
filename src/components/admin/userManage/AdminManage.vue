<template>
  <div class="adminManage" style="margin-top: 8px;">
    <el-button type="primary" @click="batchDelect" class="batchDelect">{{
      $t("manage.batchDelete")
    }}</el-button>
    <el-button type="primary" @click="addUser" class="batchDelect">{{
      $t("manage.addUser")
    }}</el-button>
    {{ $t("manage.keyWord") }}
    <el-select
      v-model="value"
      clearable
      filterable
      @change="selectItem"
      :placeholder="`${$t('manage.selectHolder')}`"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="`${$t(item.label)}`"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-input
      :placeholder="`${$t('manage.inputText')}`"
      v-model.trim="input"
      clearable
      :disabled="selectAll"
      class="searchInput"
    ></el-input>
    <el-button type="primary" @click="searchAdmin" plain>{{
      $t("manage.search")
    }}</el-button>
    <el-table
      :data="form.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
      :default-sort="{ prop: 'Id', order: 'ascending' }"
      height="468"
      border
      stripe
      v-loading="loading"
      :element-loading-text="`${$t('manage.loadingText')}`"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange"
      class="tableFont"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="`${$t('register.label.loginId')}`">
              <span>{{ props.row.loginid }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('register.label.userName')}`">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('register.label.password')}`">
              <span>{{ props.row.password }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('register.label.sex')}`">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('register.label.phone')}`">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('register.label.email')}`">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('register.label.card')}`">
              <span>{{ props.row.card }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        :label="`${$t('manage.loginId')}`"
        prop="loginid"
        sortable
      ></el-table-column>
      <el-table-column
        :label="`${$t('manage.userName')}`"
        prop="username"
        sortable
      ></el-table-column>
      <el-table-column
        fixed="right"
        :label="`${$t('manage.operate')}`"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native="handleEdit(scope.$index, scope.row)"
            v-if="!showBtn[scope.$index]"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button
            @click="deleteRow(scope.$index, scope.row)"
            type="text"
            size="small"
            ><i class="el-icon-delete"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.length"
    >
    </el-pagination>
    <dialog-form
      :editFormVisible="editFormVisible"
      :isAdd="isAdd"
      :title="EditTitle"
      :form="editForm"
      :rules="rules"
      ref="inputForm"
      @change-visible="handleCancle"
      @update-form="handleUpdate"
    >
    </dialog-form>
  </div>
</template>

<script>
import Util from "../../../utils/utilsReg";
import dialogForm from "./EditForm";
import {
  validateName,
  validateSex,
  validateEmail,
  validatePass,
  validateCard
} from "../../../utils/utilsValidate";
import _ from "lodash";
import {
  deleteAdmin,
  getAllAdmin,
  updateAdmin,
  searchAdmin,
  getAdminLoginid
} from "../../../service/admin/userManage/adminManage.service";
import { getAdminPhone } from "../../../service/user/modifyPassword.service";
import showMessageBox from "../../../mixin/showMessageBox";

export default {
  name: "AdminManage",
  components: {
    dialogForm
  },
  data() {
    const self = this;
    const validateLoginId = async (rule, value, callback) => {
      const self = this;
      if (self.addFormVisible) {
        if (_.isEmpty(value)) {
          callback(new Error(this.$t("register.status.loginId")));
        } else {
          const loginid = value;
          const response = await getAdminLoginid(self, loginid);
          let result = response.data;
          if (result == "loginid is exist") {
            callback(new Error(this.$t("register.status.loginIdExist")));
          }
          callback();
        }
      }
    };
    const validatePhone = async (rule, value, callback) => {
      const self = this;
      if (_.isEmpty(value)) {
        callback(new Error(self.$t("register.status.phone")));
      } else if (!Util.phoneReg.test(value)) {
        callback(new Error(self.$t("register.status.formatPhone")));
      } else if (_.isEqual(value, self.oldPhone)) {
        callback();
      } else {
        const phone = value;
        const response = await getAdminPhone(self, phone);
        let result = response.data;
        if (result == "phone is exist") {
          callback(new Error(self.$t("register.status.phoneExist")));
        }
      }
    };
    return {
      form: [],
      currentPage: 1,
      pagesize: 10,
      showBtn: [],
      selectAll: true,
      multipleSelection: [],
      loading: true,
      editFormVisible: false,
      addUserFormVisible: false,
      editForm: {
        Id: "",
        loginid: "",
        username: "",
        password: "",
        sex: "",
        phone: "",
        email: "",
        card: ""
      },
      addUserForm: {
        loginid: "",
        username: "",
        password: "",
        sex: "",
        phone: "",
        email: "",
        card: ""
        // stay_date:"",
      },
      options: [
        {
          value: "all",
          label: "manage.options.label.all"
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
        loginid: [
          { required: true, validator: validateLoginId, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        username: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateName(rule, value, callback, self),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validatePass(rule, value, callback, self),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateEmail(rule, value, callback, self),
            trigger: "blur"
          }
        ],
        card: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateCard(rule, value, callback, self),
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateSex(rule, value, callback, self),
            trigger: "blur"
          }
        ]
      },
      value: "",
      input: "",
      selectValue: "",
      oldPhone: "",
      isDisabled: true,
      isAdd: false,
      EditTitle: ""
    };
  },
  mixins: [showMessageBox],
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAdminData();
  },
  methods: {
    //单个移除
    deleteRow(index, rows) {
      const self = this;
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
          const str = [];
          const id = rows.id;
          str.push(id);
          const response = await deleteAdmin(self, str);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getAdminData();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    //获得所有用户信息
    async getAdminData() {
      const self = this;
      const response = await getAllAdmin(self);
      if (_.isEqual(response.data, "fail to get user info")) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
      }
    },

    //点击编辑
    handleEdit(index, row) {
      this.editForm = Object.assign({}, row);
      this.editFormVisible = true;
      this.isAdd = false;
      this.oldPhone = row.phone;
      this.EditTitle = "manage.edit";
    },

    //点击更新
    handleUpdate(formValue) {
      const self = this;
      self.$refs["inputForm"].$refs["editForm"].validate(async valid => {
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
              const response = await updateAdmin(self, formValue);
              if (_.isEqual(response.data, "fail to update")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.getAdminData();
                self.showSuccessMessageBox();
                self.editFormVisible = false;
              }
            })
            .catch(() => {
              self.showCancelMessageBox();
            });
        }
      });
    },

    handleCancle(value) {
      this.editFormVisible = value;
      this.addFormVisible = value;
      this.$nextTick(() => {
        this.$refs["inputForm"].$refs["editForm"].clearValidate();
      });
      this.$refs["inputForm"].$refs["editForm"].resetFields();
    },

    //点击添加用户
    addUser() {
      this.isAdd = true;
      this.editFormVisible = true;
      this.addFormVisible = true;
      this.EditTitle = "manage.addUser";
      this.editForm = this.addUserForm;
    },

    //批量删除
    batchDelect() {
      const self = this;
      if (_.isEmpty(self.multipleSelection)) {
        self.showWarningBatchDelete();
        return;
      }
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
          const response = await deleteAdmin(self, formatId);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getAdminData();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    //多选框取值
    handleSelectionChange(val) {
      const self = this;
      self.multipleSelection = val;
    },

    //格式化多选Id
    formatId(val) {
      let sqlId = [];
      for (let i = 0; i < val.length; i++) {
        sqlId.push(val[i].id);
      }
      return sqlId;
    },

    //选择器取值
    selectItem(val) {
      this.selectValue = val;
      if (_.isEqual(this.selectValue, "all") || _.isEmpty(this.selectValue)) {
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
      if (_.isEqual(selValue, "all")) {
        self.getAdminData();
      } else {
        if (_.isEmpty(selValue)) {
          self.showWarningSelectType();
        } else if (_.isEmpty(inpValue)) {
          self.showWarningInputeValue();
        } else {
          self.selectAll = false;
          const response = await searchAdmin(self, selValue, inpValue);
          if (_.isEqual(response.data, "fail to get user info")) {
            self.input = " ";
            self.form = [];
          } else {
            self.form = response.data;
          }
        }
      }
    },

    handleSizeChange(size) {
      this.pagesize = size;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";
</style>
