<template>
  <div class="billManage">
    <el-button type="primary" @click="clickAddBill" class="batchDelect">{{$t('billManage.addBill')}}</el-button>
    {{$t("manage.keyWord")}}
    <el-select v-model="selectValue"
               clearable
               filterable
               :placeholder='`${$t("manage.selectHolder")}`'>
      <el-option v-for="item in options"
                 :key="item.value"
                 :label='`${$t(item.label)}`'
                 :value="item.value"></el-option>
    </el-select>
    <el-button type="primary"
               @click="searchBill"
               class="searchUser"
               plain>{{$t("manage.search")}}</el-button>
    <el-table
      :data="form.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
      row-key="id"
      border
      stripe
      lazy
      height="416"
      v-loading="loading"
      :element-loading-text='`${$t("manage.loadingText")}`'
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="username" width="180"></el-table-column>
      <el-table-column prop="phone" label="phone" width="180"></el-table-column>
      <el-table-column prop="room_id" label="room_id" width="180"></el-table-column>
      <el-table-column prop="total" label="total" width="180"></el-table-column>
      <el-table-column prop="start_date" label="start_date" width="180"></el-table-column>
      <el-table-column prop="end_date" label="end_date" width="180"></el-table-column>
      <el-table-column :label='`${$t("repairManage.status")}/${$t("manage.operate")}`'>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">{{$t("billManage.unpaid")}}
            <el-tooltip :content='`${$t("billManage.detail")}`' placement="top">
              <el-button type="text"
                        size="small" @click="showBillDetail(scope.row)"><i class="el-icon-view el-icon--right"></i></el-button>
            </el-tooltip>
          </span>
          <span v-else
                class="processed">{{$t("billManage.PaidFee")}}
            <el-button type="text"
                      size="small"
                      @click="deleteBill(scope.row)"><i class="el-icon-delete"></i></el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.length"
    ></el-pagination>

    <el-dialog title='新增账单'
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
          <el-input v-model.trim="editForm.loginid"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="username"
                      :label='`${$t("register.label.userName")}`'>
          <el-input v-model.trim="editForm.username"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="room_id"
                      :label='`${$t("register.label.room_id")}`'>
          <el-input v-model.trim="editForm.room_id"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="phone"
                      :label='`${$t("register.label.phone")}`'>
          <el-input v-model.trim="editForm.phone"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="type"
                      :label='`${$t("repairManage.type")}`'>
          <el-select class="inputWidth"
                     v-model.trim="editForm.type"
                     :placeholder='`${$t("register.status.complaintType")}`'>
            <el-option :label='`${$t("billManage.waterRent")}`'
                       :value='`${$t("billManage.waterRent")}`'></el-option>
            <el-option :label='`${$t("billManage.powerRent")}`'
                       :value='`${$t("billManage.powerRent")}`'></el-option>
            <el-option :label='`${$t("billManage.managementFee")}`'
                       :value='`${$t("billManage.managementFee")}`'></el-option>
            <el-option :label='`${$t("billManage.garbageCharge")}`'
                       :value='`${$t("billManage.garbageCharge")}`'></el-option>
          </el-select>
          单价：<el-input-number v-model="editForm.price" :precision="2" :step="0.1" :min="1" size="medium"></el-input-number><br>
          数量：<el-input-number v-model="editForm.count" :precision="2" :step="0.1" :min="1" size="medium"></el-input-number>
          <p v-show="editForm.type != ''"style="margin: 0px; text-align: left">{{editForm.type}}: {{editForm.price}} * {{editForm.count}} = {{total}}</p>
        </el-form-item>
        <el-form-item label="起止日期" prop="date">
          <el-date-picker
            v-model="editForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            class="inputWidth"></el-date-picker>
        </el-form-item>
        <el-form-item :label='`${$t("homePage.userOpinion.require")}`'
                      prop="remark">
          <el-input type="textarea"
                    v-model="editForm.remark"
                    class="textStyle"
                    maxlength="100"
                    show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="handleClose">{{$t("button.cancel")}}</el-button>
        <el-button type="primary"
                   @click.native="submitBill('editForm')">{{$t("button.add")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllBill, getBillByloginId, addBill, getBillByItem, deleteBill } from "../../../service/admin/billManage/billManage.Service";
import {validateName, validateLoginId, validatePhone, validateRoomId, validateType, validateDate} from '../../../utils/utilsValidate'
import _ from 'lodash';
import getDateTimes from "../../../mixin/getDateTimes"
import showMessageBox from "../../../mixin/showMessageBox"
import {getUserLoginid} from "../../../service/login/register.service"
export default {
  name: "billPage",
  data() {
    const self = this;
    const validateLoginId = async (rule, value, callback) => {
      const self = this;
        if (_.isEmpty(value)) {
          callback(new Error(self.$t("register.status.loginId")));
        } else {
          const loginid = value;
          const response = await getUserLoginid(self, loginid);
          let result = response.data;
          if (result != 'loginid is exist') {
            callback(new Error(self.$t("register.status.loginIdNotExist")));
          }
          callback();
      }
    };
    return {
      valueDate: "",
      form: [],
      currentPage: 1,
      pagesize: 5,
      loading: true,
      editFormVisible: false,
      rules: {
        loginid: [{ required: true, validator: validateLoginId, trigger: "blur" }],
        username: [{ required: true, validator: ((rule, value, callback) => validateName(rule, value, callback, self)), trigger: "blur" }],
        room_id: [{ required: true, validator: ((rule, value, callback) => validateRoomId(rule, value, callback, self)), trigger: "blur" }],
        phone: [{ required: true, validator: ((rule, value, callback) => validatePhone(rule, value, callback, self)), trigger: "blur" }],
        type: [{ required: true, validator: ((rule, value, callback) => validateType(rule, value, callback, self)), trigger: "blur" }],
        date: [{ required: true, validator: ((rule, value, callback) => validateDate(rule, value, callback, self)), trigger: "blur" }]
      },
      editForm: {
        Id:"",
        loginid: "",
        username: "",
        phone: "",
        room_id: "",
        type: "",
        price: "",
        count: "",
        total: "",
        order_date: "",
        start_date: "",
        end_date: "",
        remark: "",
        date:"",
        status: "0"
      },
      selectValue:"all",
      options: [
        {
          value: "all",
          label: "manage.options.label.all"
        },
        {
          value: "0",
          label: "billManage.unpaid"
        },
        {
          value: "1",
          label: "billManage.PaidFee"
        }
      ],
      selectAll: true,
    };
  },
  mixins: [getDateTimes, showMessageBox],
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllBill();
  },
  methods: {
    async getAllBill() {
      const self = this;
      const respone = await getAllBill(self);
      self.form = _.sortBy(respone.data, 'status');
      self.form = _.uniqBy(self.form,'loginid');
    },

    clickAddBill() {
      this.editFormVisible = true;
    },
    submitBill() {
      const self = this;
      self.$refs['editForm'].validate(async (valid) => {
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
              self.editForm.order_date = self.getDateTimes();
              self.editForm.start_date = self.editForm.date[0];
              self.editForm.end_date = self.editForm.date[1];
              self.editForm.total = self.total;
              const response = await addBill(self, self.editForm);
              if (_.isEqual(response.data, "fail to update")) {
                self.showErrorMessageBox();
              } else if (_.isEqual(response.data, "success")) {
                self.getAllBill();
                self.showSuccessMessageBox();
                self.editFormVisible = false;
              }
            })
            .catch(() => {
              self.showCancelMessageBox()
            });
        }
      })
    },

    handleSizeChange(size) {
      this.pagesize = size;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },

    async showBillDetail(row) {
      const h = this.$createElement;
      let msg = [];
      const self = this;
      const result = await getBillByloginId(self, row.loginid);
      _.forEach(result.data, item => {
        msg.push(h('div', null, `类型: ${item.type} - 价格: ${item.price} - 数量: ${item.count} - 总价: ${item.total}元 - 缴费时间: ${item.pay_date?item.pay_date:'未缴费'} - 备注: ${item.remark?item.remark:'无'}` ));
      });
      this.$msgbox({
        title:`${row.username} Bill Details`,
        message: h('p', null, msg),
        showCancelButton: true,
        confirmButtonText: '提醒缴费',
        canceButtonTest: '取消',
         beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '已成功发送提醒消息！'
          });
      });
    },

    handleClose () {
      this.editFormVisible = false;
      this.$nextTick(() => {
        this.$refs['editForm'].clearValidate();
      })
      this.$refs['editForm'].resetFields();
    },

    async searchBill () {
      const self = this;
      const selValue = self.selectValue;
      if (_.isEqual(selValue, "all")) {
        self.getAllBill();
        return;
      } else {
          const response = await getBillByItem(self, selValue);
          if (response.data == null) {
            self.selectValue = "all";
            self.form = [];
          } else {
            if (selValue == "1") {
              self.form = response.data;
            }
            else {
              self.form = _.uniqBy(response.data,'loginid');
            }
          }
        }
    },

    deleteBill(row) {
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
          const Id = row.id;
          const response = await deleteBill(self, Id);
          console.log(response.data);
          // if (_.isEqual(response.data, "fail to delete user")) {
          //   self.showErrorMessageBox();
          // } else {
          //   self.getAllBill();
          //   self.showSuccessMessageBox();
          // }
        })
        .catch(() => {
          self.showCancelMessageBox();
        });
    }
  },
  computed: {
    total() {
      const priceTotal = this.editForm.price * this.editForm.count;
      return priceTotal.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../static/css/userManage/userManage";
.billManage {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid red;
  .batchDelect {
    margin-top: 10px;
  }
  .processed {
    color: rgb(248, 128, 128);
  }
}
</style>
