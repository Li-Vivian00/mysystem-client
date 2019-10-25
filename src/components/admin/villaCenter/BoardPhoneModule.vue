<template>
  <div class="phoneModule">
    <el-button type="primary"
               @click="batchDelect"
               class="batchDelect">{{$t('manage.batchDelete')}}</el-button>
    <el-button type="primary"
               @click="addPhoneModule"
               class="batchDelect">{{$t('villaCenter.addPhoneModule')}}</el-button>
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
               @click="searchPhoneType"
               plain>{{$t("manage.search")}}</el-button>
    <el-table :data="form.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
              stripe
              border
              v-loading="loading"
              :default-sort="{prop: 'Id', order: 'ascending'}"
              :element-loading-text='`${$t("manage.loadingText")}`'
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height="360"
              style="width: 100%;"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column type="index"
                       width="200"></el-table-column>
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
                     v-if="!showBtn[scope.$index]"><i class="el-icon-edit"></i></el-button>
          <el-button @click="deleteRow(scope.$index, scope.row)"
                     type="text"
                     size="small"><i class="el-icon-delete"></i></el-button>
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
    <el-dialog :title='`${$t("villaCenter.addPhoneModule")}`'
               :visible.sync="addPhoneFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               :before-close="handleAddPhoneClose">
      <el-form :model="addPhoneForm"
               label-width="80px"
               ref="addPhoneForm"
               :rules="rules">
        <el-form-item prop="item"
                      :label='`${$t("villaCenter.phoneType")}`'>
          <el-input v-model.trim="addPhoneForm.item"
                    auto-complete="off"
                    class="inputPhone"></el-input>
        </el-form-item>
        <el-form-item prop="phone"
                      :label='`${$t("villaCenter.phoneNumberEdit")}`'>
          <el-input v-model.trim="addPhoneForm.phone"
                    auto-complete="off"
                    class="inputPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="addPhoneFormVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button type="primary"
                   @click.native="handleAddPhoneModule('addPhoneForm')">{{$t("button.update")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Util from "../../../utils/utilsReg";
import _ from "lodash"
import { getAllPhoneModuleInfo, updatePhoneModuleInfo, deletePhoneModule, getOnePhoneModule } from "../../../service/admin/villaCenter/boardService"
import { setTimeout } from 'timers';
import showMessageBox from "../../../mixin/showMessageBox"
export default {
  name: "phoneModule",
  data () {
    const validatePhone = async (rule, value, callback) => {
      const self = this;
      if (_.isEmpty(value)) {
        callback(new Error(self.$t("register.status.phone")));
      } else if (!Util.phoneModuleReg.test(value)) {
        callback(new Error(self.$t("register.status.formatPhone")));
      } else {
        callback();
      }
    };
    const validatePhoneType = (rule, value, callback) => {
      if (_.isEmpty(value)) {
        callback(new Error(this.$t("villaCenter.inputPhoneType")));
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
      options: [
        {
          value: "all",
          label: "manage.options.label.all"
        },
        {
          value: "item",
          label: "villaCenter.phoneType"
        },
      ],
      input: "",
      selectValue: "",
      value: "",
      selectAll: true,
      multipleSelection: [],
      addPhoneFormVisible: false,
      addPhoneForm: {
        id: "",
        item: "",
        phone: "",
      },
      rules: {
        item: [{ required: true, validator: validatePhoneType, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
      },
    }
  },
  mixins: [showMessageBox],
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
          const response = await deletePhoneModule(self, str);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getAllPhoneModuleInfo();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    //批量删除
    batchDelect () {
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
          const response = await deletePhoneModule(self, formatId);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getAllPhoneModuleInfo();
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

    //格式化多选Id
    formatId (val) {
      let sqlId = [];
      for (let i = 0; i < val.length; i++) {
        sqlId.push(val[i].id);
      }
      return sqlId;
    },

    //获取全部phoneModule
    async getAllPhoneModuleInfo () {
      const self = this;
      const response = await getAllPhoneModuleInfo(self)
      if (_.isEqual(response.data, "fail to get phoneModuleInfo")) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
      }
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

    //点击编辑
    handleEdit (index, row) {
      const self = this;
      self.editFormVisible = true;
      self.editForm = Object.assign({}, row);
      // self.editForm.item = self.$t("villaCenter." + row.item);
      self.isEdit = true;
    },

    //取消编辑
    handleClose () {
      editFormVisible = false;
    },
    //关闭编辑电话号码dialog
    handleClose (done) {
      const self = this;
      self.editFormVisible = false;
    },

    //关闭添加电话类型dialog
    handleAddPhoneClose (done) {
      const self = this;
      self.addPhoneFormVisible = false;
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

    //点击添加电话类型
    addPhoneModule () {
      const self = this;
      self.addPhoneFormVisible = true;
    },

    //添加电话类型
    handleAddPhoneModule (formName) {
      const self = this;
      self.$refs[formName].validate(async value => {
        if (value) {
          self
            .$confirm(
              this.$t("manage.confirm.addUserInfo"),
              this.$t("manage.confirm.warning"),
              {
                confirmButtonText: this.$t("button.ok"),
                cancelButtonText: this.$t("button.cancel"),
                type: "warning"
              }
            )
            .then(async () => {
              const response = await updatePhoneModuleInfo(self, self.addPhoneForm);
              if (_.isEqual(response.data, "fail to add user")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.addPhoneFormVisible = false;
                self.getAllPhoneModuleInfo();
                self.showSuccessMessageBox();
                self.addPhoneForm = {};
              }
            })
            .catch(() => {
              self.showCancelMessageBox()
            });
        }
      })
    },

    //关键字查询用户
    async searchPhoneType () {
      const self = this;
      const selValue = self.selectValue;
      const inpValue = self.input;
      if (_.isEqual(selValue, "all")) {
        self.getAllPhoneModuleInfo();
      } else {
        if (_.isEmpty(selValue)) {
          self.showWarningSelectType();
        } else if (_.isEmpty(inpValue)) {
          self.showWarningInputeValue()
        } else {
          self.selectAll = false;
          const response = await getOnePhoneModule(self, inpValue);
          if (_.isEmpty(response)) {
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
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";
.phoneModule {
  height: 95%;
  .inputPhone {
    width: 88% !important;
  }
}
</style>
