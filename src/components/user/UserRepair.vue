<template>
  <div class="onlineService">
    <p>{{$t('homePage.userRepair.title')}}</p>
    <el-button type="primary"
               @click="addSubmit"
               class="addApplication">{{$t('homePage.userOpinion.addComplaint')}}</el-button>
    <el-table :data="form.slice((currentPage-1) * pagesize, currentPage * pagesize)"
              stripe
              border
              v-loading="loading"
              :default-sort="{prop: 'Id', order: 'ascending'}"
              :element-loading-text='`${$t("manage.loadingText")}`'
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              style="width: 100%; margin-top:20px;">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username"
                       :label='`${$t("opinionManage.userName")}`'
                       sortable>
      </el-table-column>
      <el-table-column prop="phone"
                       :label='`${$t("opinionManage.phone")}`'
                       sortable></el-table-column>
      <el-table-column prop="repair_type"
                       :label='`${$t("opinionManage.type")}`'
                       sortable></el-table-column>
      <el-table-column prop="problem_description"
                       :label='`${$t("opinionManage.content")}`'
                       sortable></el-table-column>
      <el-table-column prop="sub_time"
                       :label='`${$t("opinionManage.date")}`'
                       sortable></el-table-column>
      <el-table-column prop="handle_time"
                       :label='`${$t("opinionManage.date")}`'
                       sortable></el-table-column>
      <el-table-column fixed="right"
                       :label='`${$t("repairManage.status")}`'>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0" class="waitHandle">{{$t("homePage.userRepair.waitHandle")}}</span>
          <span v-else
                class="processed">{{$t("homePage.userRepair.finishHandle")}}</span>
          <el-button @click="deleteRow(scope.$index, scope.row)"
                     type="text"
                     size="small"
                     v-if="scope.row.status == 1"><i class="el-icon-delete"></i></el-button>
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
    <el-dialog :title='`${$t("homePage.userRepair.title")}`'
               :visible.sync="dialogVisible"
               :before-close="handleClose">
      <el-form :model="editForm"
               :rules="rules"
               ref="editForm"
               label-width="100px"
               class="demo-ruleForm"
               label-position="right">
        <el-form-item :label='`${$t("register.label.name")}`' prop="username">
          <el-input v-model="editForm.username"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.phone")}`' prop="phone">
          <el-input v-model="editForm.phone"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="房间号"
                      prop="room_id">
          <el-input v-model="editForm.room_id"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="报修类型"
                      prop="repair_type">
          <el-select v-model="editForm.repair_type"
                     placeholder="请选择报修类型"
                     class="selectStyle">
            <el-option label="网络故障"
                       value="shanghai"></el-option>
            <el-option label="环境恶劣"
                       value="beijing"></el-option>
            <el-option label="水电供应"
                       value="beijing"></el-option>
            <el-option label="其他"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细说明"
                      prop="problem_description">
          <el-input type="textarea"
                    v-model="editForm.problem_description"
                    class="textStyle"
                    maxlength="100"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="紧急处理"
                      prop="remark">
          <el-switch v-model="editForm.remark" style="width: 103px"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t("button.cancel")}}</el-button>
        <el-button type="primary" @click="submitForm('editForm')">{{$t("button.submit")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import showMessageBox from "../../mixin/showMessageBox"
import {deleteRepairInfo} from "../../service/admin/repairManage/repairManage.Service";
import {validateDetail, validateName, validatePhone, validateRoomId, validateType} from "../../utils/utilsValidate";
import {getUserRepairInfo, submitRepair} from "../../service/user/userRepair";
export default {
  name: "userOpinion",
  data () {
    const self = this;
    return {
      form: [],
      loading: true,
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false,
      editForm: {
        loginid:'',
        username: '',
        phone: '',
        repair_type: '',
        problem_description: '',
        remark: false,
        sub_time: '',
        handle_time: '',
        room_id: ''
      },
      rules: {
        username: [{ required: true, validator: ((rule, value, callback) => validateName(rule, value, callback, self)), trigger: "blur" }],
        phone: [{ required: true, validator: ((rule, value, callback) => validatePhone(rule, value, callback, self)), trigger: "blur" }],
        repair_type: [{ required: true, validator: ((rule, value, callback) => validateType(rule, value, callback, self)), trigger: "blur" }],
        problem_description: [{ required: true, validator: ((rule, value, callback) => validateDetail(rule, value, callback, self)), trigger: "blur" }],
        room_id: [{ required: true, validator: ((rule, value, callback) => validateRoomId(rule, value, callback, self)), trigger: "blur" }]
      }
    };
  },
  mixins: [showMessageBox],
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllRepairInfo();
  },
  methods: {
    submitForm (formName) {
      const self = this;
      this.$refs[formName].validate(async (valid) => {
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
              self.getDateTimes();
              self.editForm.loginid = sessionStorage.getItem("userLoginId");
              const response = await submitRepair(self, self.editForm);
              if (_.isEqual(response.data, "fail to submit")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.getAllRepairInfo();
                self.showSuccessMessageBox();
                self.dialogVisible = false;
              }
            })
            .catch(() => {
              self.showCancelMessageBox()
            });
        }
      });
    },

    //get all repair info
    async getAllRepairInfo () {
      const self = this;
      const loginid = sessionStorage.getItem("userLoginId");
      const response = await getUserRepairInfo(self, loginid);
      if (_.isEmpty(response.data)) {
        self.showErrorMessageBox();
      } else {
        console.log(response.data);
        self.form = response.data;
      }
    },

    //点击添加用户
    addSubmit () {
      this.dialogVisible = true;
    },

    //单个移除
    deleteRow (index, row) {
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
          const id = row.id;
          str.push(id);
          const response = await deleteRepairInfo(self, str);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getAllRepairInfo();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    handleSizeChange(size) {
      this.pagesize = size;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },

    handleClose(done) {
      this.dialogVisible = false;
      this.$nextTick(() => {
        this.$refs['editForm'].clearValidate();
      });
      this.$refs['editForm'].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/css/user/userOnlineService.scss';
</style>
