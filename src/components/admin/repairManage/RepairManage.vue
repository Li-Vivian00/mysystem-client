<template>
  <div class="repairManage">
    <div class="title">
      <span class="edit_title">{{$t("repairManage.repairManageTitle")}}</span>
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
               @click="searchRepairByItem"
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
      <el-table-column prop="repair_type"
                       :label='`${$t("repairManage.type")}`'
                       sortable>
      </el-table-column>
      <el-table-column prop="loginid"
                       :label='`${$t("manage.loginId")}`'
                       sortable></el-table-column>
      <el-table-column prop="room_id"
                       :label='`${$t("repairManage.room_id")}`'
                       sortable></el-table-column>
      <el-table-column prop="phone"
                       :label='`${$t("repairManage.phone")}`'
                       sortable></el-table-column>
      <el-table-column prop="problem_description"
                       :label='`${$t("repairManage.problemDescription")}`'
                       sortable></el-table-column>
      <el-table-column prop="remark"
                       :label='`${$t("repairManage.remark")}`'></el-table-column>
      <el-table-column prop="sub_time"
                       :label='`${$t("repairManage.time")}`'
                       sortable></el-table-column>
      <el-table-column prop="handle_time"
                       :label='`${$t("repairManage.handleTime")}`'
                       sortable></el-table-column>
      <el-table-column fixed="right"
                       :label='`${$t("repairManage.status")}`'>
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="scope.row.status == 0"
                     @click.native="donePending(scope.$index, scope.row)">{{$t("repairManage.pending")}}</el-button>
          <span type="text"
                v-else
                class="processed">{{$t("repairManage.processed")}}</span>
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
  </div>
</template>

<script>
import Util from "../../../utils/utilsReg";
import _ from "lodash";
import { setTimeout } from "timers";
import { getAllRepairInfo, updateRepairInfo, getRepairInfoByItem, deleteRepairInfo } from "../../../service/admin/repairManage/repairManage.Service";
import { async } from 'q';
import showMessageBox from "../../../mixin/showMessageBox"
import getDateTimes from '../../../mixin/getDateTimes';
export default {
  name: "repairManage",
  data () {
    return {
      form: [],
      loading: true,
      currentPage: 1,
      pagesize: 5,
      selectValue: "",
      // selectAll: true,
      value: "",
      options: [
        {
          value: "all",
          label: "manage.options.label.all"
        },
        {
          value: "1",
          label: "repairManage.processed"
        },
        {
          value: "0",
          label: "repairManage.pending"
        }
      ],
      updatePending: {
        handle_time: '',
      }
    };
  },
  mixins: [showMessageBox, getDateTimes],
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllRepairInfo();
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

    //get all repair info
    async getAllRepairInfo () {
      const self = this;
      const response = await getAllRepairInfo(self);
      if (_.isEqual(response.data, "fail to get phoneModuleInfo")) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
      }
    },

    // 点击待处理
    async donePending (index, row) {
      const self = this;
      self.$confirm(
        this.$t("repairManage.isProcessed"),
        this.$t("manage.confirm.warning"),
        {
          confirmButtonText: this.$t("button.ok"),
          cancelButtonText: this.$t("button.cancel"),
          type: "warning"
        }
      )
        .then(async () => {
          self.updatePending = Object.assign({}, row);
          self.updatePending.status = 1;
          self.updatePending.handle_time = self.getDateTimes();
          const response = await updateRepairInfo(self, self.updatePending);
          if (response.data == "success to update") {
            self.getAllRepairInfo();
          }
        })
        .catch(() => {
          self.showCancelMessageBox();
        })
    },

    //选择器取值
    selectItem (val) {
      this.selectValue = val;
    },

    //关键字查询报修信息
    async searchRepairByItem () {
      const self = this;
      const selValue = self.selectValue;
      if (_.isEqual(selValue, "all")) {
        self.getAllRepairInfo();
      } else {
        if (_.isEmpty(selValue)) {
          self.showWarningSelectType();
        } else {
          const response = await getRepairInfoByItem(self, selValue);
          if (_.isEmpty(response)) {
            self.input = " ";
            self.form = [];
          } else {
            self.form = response.data;
          }
        }
      }
    },

    handleSizeChange (size) {
      this.pagesize = size;
    },

    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";

.repairManage {
  width: 100%;
  margin-top: 20px;
  .title {
    margin-bottom: 18px;
  }
  .processed {
    color: rgb(248, 128, 128);
  }
}
</style>;
