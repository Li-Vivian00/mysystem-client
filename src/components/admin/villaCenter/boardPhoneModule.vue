<template>
  <div class="phoneModule">
    <el-table :data="form.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
              stripe
              border
              v-loading="loading"
              :element-loading-text='`${$t("manage.loadingText")}`'
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height="442"
              style="width: 100%">
      <el-table-column prop="id"
                       :label='`${$t("villaCenter.Id")}`'
                       width="250"
                       sortable>
      </el-table-column>
      <el-table-column prop="item"
                       :label='`${$t("villaCenter.phoneType")}`'
                       width="340"
                       sortable>
      </el-table-column>
      <el-table-column prop="phone"
                       :label='`${$t("villaCenter.phoneNumber")}`'
                       width="280"
                       sortable>
      </el-table-column>
      <el-table-column :label='`${$t("manage.operate")}`'
                       width="260">
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
                   :page-sizes="[5, 10, 15, 20]"
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
        <el-form-item prop="phone"
                      :label='`${$t("villaCenter.phoneNumberEdit")}`'>
          <el-input v-model.trim="editForm.phone"
                    auto-complete="off"
                    class="inputPhone">{{form.phone}}</el-input>
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
import _ from "lodash"
import { getAllPhoneModuleInfo, updatePhoneModuleInfo } from "../../../service/admin/villaCenter/boardService"
import { setTimeout } from 'timers';
export default {
  name: "phoneModule",
  data () {
    const validatePhone = async (rule, value, callback) => {
      const self = this;
      if (_.isEmpty(value)) {
        callback(new Error(self.$t("register.status.phone")));
      } else if (!Util.phoneModuleReg.test(self.editForm.phone)) {
        callback(new Error(self.$t("register.status.formatPhone")));
      } else {
        callback();
      }
    };
    return {
      form: [],
      loading: true,
      currentPage: 1,
      pagesize: 5,
      editForm: {
        phone: "",
        item: ""
      },
      showBtn: [],
      isEdit: false,
      editFormVisible: false,
      rules: {
        phone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
      },
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
    this.getAllPhoneModuleInfo();
  },
  methods: {
    //单个移除
    deleteRow (index, rows) {
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

    async getAllPhoneModuleInfo () {
      const self = this;
      const response = await getAllPhoneModuleInfo(self)
      if (_.isEqual(response.data, "fail to get phoneModuleInfo")) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
        for (let i = 0; i < self.form.length; i++) {
          self.form[i].item = self.$t("villaCenter." + self.form[i].item)
        }
      }
    },

    //点击编辑
    handleEdit (index, row) {
      const self = this;
      self.editFormVisible = true;
      self.editForm = Object.assign({}, row);
      self.editForm.phone = row.phone;
      self.editForm.item = self.$t("villaCenter." + row.item);
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
              const response = await updatePhoneModuleInfo(self, self.editForm);
              if (_.isEqual(response.data, "fail to update")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.getAllPhoneModuleInfo();
                self.editFormVisible = false;
                self.showSuccessMessageBox();
              }
            })
            .catch(() => {
              self.showCancelMessageBox();
            });
        }
      });
    },

    //showMessageBox
    showErrorMessageBox () {
      this.$message({
        type: "error",
        message: this.$t("manage.showMessage.operateError")
      });
    },

    showCancelMessageBox () {
      this.$message({
        type: "info",
        message: this.$t("manage.showMessage.cancel")
      });
    },

    showSuccessMessageBox () {
      this.$message({
        type: "success",
        message: this.$t("manage.showMessage.operateSuccess")
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
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";
.phoneModule {
  .inputPhone {
    width: 88% !important;
  }
}
</style>