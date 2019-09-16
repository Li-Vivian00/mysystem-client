<template>
  <div class="opinionManage">
    <div class="title">
      <span class="edit_title">{{$t("opinionManage.opinionManageTitle")}}</span>
      <i class="el-icon-edit"></i>
    </div>
    {{$t("repairManage.keyWord")}}
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
    <el-button type="primary"
               @click="searchOpinionByItem"
               plain>{{$t("manage.search")}}</el-button>
    <el-table :data="form.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
              stripe
              border
              v-loading="loading"
              :default-sort="{prop: 'Id', order: 'ascending'}"
              :element-loading-text='`${$t("manage.loadingText")}`'
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height="416"
              style="width: 100%; margin-top:20px;">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username"
                       :label='`${$t("opinionManage.userName")}`'
                       sortable>
      </el-table-column>
      <el-table-column prop="phone"
                       :label='`${$t("opinionManage.phone")}`'
                       sortable></el-table-column>
      <el-table-column prop="type"
                       :label='`${$t("opinionManage.type")}`'
                       sortable></el-table-column>
      <el-table-column prop="content"
                       :label='`${$t("opinionManage.content")}`'
                       sortable></el-table-column>
      <el-table-column prop="require"
                       :label='`${$t("opinionManage.require")}`'
                       sortable></el-table-column>
      <el-table-column prop="emergency_degree"
                       :label='`${$t("opinionManage.emergencyDegree")}`'
                       sortable></el-table-column>
      <el-table-column prop="date"
                       :label='`${$t("opinionManage.date")}`'
                       sortable></el-table-column>
      <el-table-column fixed="right"
                       :label='`${$t("repairManage.status")}`'>
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="scope.row.status == 0"
                     @click.native="clickReply(scope.$index, scope.row)">{{$t("opinionManage.noReply")}}</el-button>
          <span type="text"
                v-else
                class="processed">{{$t("opinionManage.replied")}}</span>
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
    <el-dialog :title='`${$t("opinionManage.replied")}`'
               :visible.sync="updateReplyFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               :before-close="handleClose">
      <el-form :model="updateReplyForm"
               ref="updateReplyForm">
        <el-form-item prop="content"
                      :label='`${$t("opinionManage.content")}`'
                      class="labelStyle">
          <el-input v-model="updateReplyForm.content"
                    auto-complete="off"
                    readonly
                    class="">{{form.content}}</el-input>
        </el-form-item>
        <el-form-item prop="answer_content"
                      :label='`${$t("opinionManage.answerContent")}`'
                      class="labelStyle">
          <el-input v-model="updateReplyForm.answer_content"
                    type="textarea"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="updateReplyFormVisible = false">{{$t("button.cancel")}}</el-button>
        <el-button type="primary"
                   @click.native="handleReply()">{{$t("button.submit")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import showMessageBox from "../../../mixin/showMessageBox"
import { getAllOpinionInfo, updateOpinionInfo, getOpinionInfoByItem, deleteOpinionInfo } from "../../../service/admin/repairManage/opinionManage.Service"
export default {
  name: "opinionManage",
  data () {
    return {
      form: [],
      loading: true,
      currentPage: 1,
      pagesize: 5,
      selectValue: "",
      value: "",
      options: [
        {
          value: "all",
          label: "manage.options.label.all"
        },
        {
          value: "1",
          label: "opinionManage.replied"
        },
        {
          value: "0",
          label: "opinionManage.waitReply"
        }
      ],
      updateReplyFormVisible: false,
      updateReplyForm: {
        Id: "",
        content: "",
        answer_content: "",
      },
    }
  },
  mixins: [showMessageBox],
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllOpinionInfo();
  },
  methods: {

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
          const response = await deleteOpinionInfo(self, str);
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

    //get all repair info
    async getAllOpinionInfo () {
      const self = this;
      const response = await getAllOpinionInfo(self);
      if (_.isEqual(response.data, "fail to get phoneModuleInfo")) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
      }
    },

    // 点击回复
    async clickReply (index, row) {
      const self = this;
      self.updateReplyFormVisible = true;
      self.updateReplyForm = Object.assign({}, row);
    },

    // 提交回复
    handleReply () {
      const self = this;
      if (_.isEmpty(self.updateReplyForm.answer_content)) {
        self.answerContentIsNull();
      }
      else {
        self.$confirm(
          this.$t("opinionManage.isHandleReply"),
          this.$t("manage.confirm.warning"),
          {
            confirmButtonText: this.$t("button.ok"),
            cancelButtonText: this.$t("button.cancel"),
            type: "warning"
          }
        )
          .then(async () => {
            self.updateReplyForm.status = 1;
            const response = await updateOpinionInfo(self, self.updateReplyForm.status, self.updateReplyForm.id, self.updateReplyForm.answer_content);
            if (response.data == "success to update") {
              self.updateReplyFormVisible = false;
              self.getAllOpinionInfo();
            }
          })
          .catch(() => {
            self.showCancelMessageBox();
          })
      }
    },

    //关闭编辑用户dialog
    handleClose (done) {
      const self = this;
      self.updateReplyFormVisible = false;
    },

    //关键字查询报修信息
    async searchOpinionByItem () {
      const self = this;
      const selValue = self.selectValue;
      if (_.isEqual(selValue, "all")) {
        self.getAllOpinionInfo();
      } else {
        if (_.isEmpty(selValue)) {
          self.showWarningSelectType();
        } else {
          const response = await getOpinionInfoByItem(self, selValue);
          if (_.isEmpty(response)) {
            self.input = " ";
            self.form = [];
          } else {
            self.form = response.data;
          }
        }
      }
    },

    //选择器取值
    selectItem (val) {
      this.selectValue = val;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";

.opinionManage {
  width: 100%;
  margin-top: 20px;
  .title {
    margin-bottom: 18px;
  }

  .processed {
    color: rgb(248, 128, 128);
  }

  .el-input,
  .el-textarea {
    width: 78% !important;
  }
}
</style>