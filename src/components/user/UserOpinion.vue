<template>
  <div class="onlineService">
    <p>{{$t('homePage.userOpinion.title')}}</p>
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
              style="width: 100%; margin-top:20px;"
              height="437">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username"
                       :label='`${$t("opinionManage.userName")}`'
                       sortable>
      </el-table-column>
      <el-table-column prop="phone"
                       :label='`${$t("opinionManage.phone")}`'
                       sortable></el-table-column>
      <el-table-column prop="complaint_type"
                       :label='`${$t("opinionManage.type")}`'
                       sortable></el-table-column>
      <el-table-column prop="content"
                       :label='`${$t("opinionManage.content")}`'
                       sortable></el-table-column>
      <el-table-column prop="suggestion"
                       :label='`${$t("opinionManage.require")}`'
                       sortable></el-table-column>
      <el-table-column prop="submit_date"
                       :label='`${$t("opinionManage.date")}`'
                       sortable></el-table-column>
      <el-table-column prop="answer_date"
                       :label='`${$t("repairManage.handleTime")}`'
                       sortable></el-table-column>
      <el-table-column prop="answer_content"
                       :label='`${$t("opinionManage.answerContent")}`'
                       sortable></el-table-column>
      <el-table-column fixed="right"
                       :label='`${$t("repairManage.status")}`'>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0"
                class="waitHandle">{{$t("homePage.userRepair.waitHandle")}}</span>
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
    <el-dialog :title='`${$t("homePage.userOpinion.title")}`'
               :visible.sync="dialogVisible"
               :before-close="handleClose">
      <el-form :model="editForm"
               :rules="rules"
               ref="editForm"
               label-width="100px"
               class="demo-ruleForm"
               label-position="right">
        <el-form-item :label='`${$t("register.label.name")}`'
                      prop="username">
          <el-input v-model="editForm.username"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("register.label.phone")}`'
                      prop="phone">
          <el-input v-model="editForm.phone"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("opinionManage.type")}`'
                      prop="complaint_type">
          <el-select v-model="editForm.complaint_type"
                     :placeholder='`${$t("homePage.userOpinion.typePlaceholder")}`'
                     class="selectStyle">
            <el-option :label='`${$t("homePage.userOpinion.netWork")}`'
                       :value='`${$t("homePage.userOpinion.netWork")}`'></el-option>
            <el-option :label='`${$t("homePage.userOpinion.environment")}`'
                       :value='`${$t("homePage.userOpinion.environment")}`'></el-option>
            <el-option :label='`${$t("homePage.userOpinion.hydroelectricity")}`'
                       :value='`${$t("homePage.userOpinion.hydroelectricity")}`'></el-option>
            <el-option :label='`${$t("homePage.userOpinion.others")}`'
                       :value='`${$t("homePage.userOpinion.others")}`'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='`${$t("homePage.userOpinion.detail")}`'
                      prop="content">
          <el-input type="textarea"
                    v-model="editForm.content"
                    class="textStyle"
                    maxlength="300"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item :label='`${$t("homePage.userOpinion.require")}`'
                      prop="suggestion">
          <el-input type="textarea"
                    v-model="editForm.suggestion"
                    class="textStyle"
                    maxlength="200"
                    show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">{{$t("button.cancel")}}</el-button>
        <el-button type="primary"
                   @click="submitForm('editForm')">{{$t("button.submit")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserOpinionInfo, submitOpinion } from '../../service/user/userOpinion';
import showMessageBox from "../../mixin/showMessageBox"
import getDateTimes from "../../mixin/getDateTimes"
import { validateName, validatePhone, validateType, validateDetail, validateRequire } from "../../utils/utilsValidate";
import { deleteOpinionInfo } from "../../service/admin/repairManage/opinionManage.Service";
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
        Id: "",
        loginid: "",
        username: "",
        phone: "",
        complaint_type: "",
        content: "",
        suggestion: "",
        status: "0",
        answer_content: "",
        submit_date: ""
      },
      rules: {
        username: [{ required: true, validator: ((rule, value, callback) => validateName(rule, value, callback, self)), trigger: "blur" }],
        phone: [{ required: true, validator: ((rule, value, callback) => validatePhone(rule, value, callback, self)), trigger: "blur" }],
        complaint_type: [{ required: true, validator: ((rule, value, callback) => validateType(rule, value, callback, self)), trigger: "blur" }],
        content: [{ required: true, validator: ((rule, value, callback) => validateDetail(rule, value, callback, self)), trigger: "blur" }],
        suggestion: [{ required: true, validator: ((rule, value, callback) => validateRequire(rule, value, callback, self)), trigger: "blur" }]
      }
    };
  },
  mixins: [showMessageBox, getDateTimes],
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllOpinionInfo();
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
              self.editForm.submit_date = self.getDateTimes();
              self.editForm.loginid = sessionStorage.getItem("userLoginId");
              const response = await submitOpinion(self, self.editForm);
              if (_.isEqual(response.data, "fail to submit")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.getAllOpinionInfo();
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
    async getAllOpinionInfo () {
      const self = this;
      const loginid = sessionStorage.getItem("userLoginId");
      const response = await getUserOpinionInfo(self, loginid);
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
      console.log(row);
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
          const response = await deleteOpinionInfo(self, str);
          console.log(response);
          if (_.isEqual(response.data, "fail to delete user")) {
            self.showErrorMessageBox();
          } else {
            self.getAllOpinionInfo();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    },

    handleSizeChange (size) {
      this.pagesize = size;
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
    },

    handleClose () {
      this.dialogVisible = false;
      this.$nextTick(() => {
        this.$refs['editForm'].clearValidate();
      })
      this.$refs['editForm'].resetFields();
    },

  }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/user/userOnlineService.scss";
</style>
