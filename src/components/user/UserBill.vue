<template>
  <div class="userBill">
    <div class="headerStyle">
      {{ $t("manage.keyWord") }}
      <el-select
        v-model="selectValue"
        clearable
        filterable
        :disabled="payVisible"
        :placeholder="`${$t('manage.selectHolder')}`"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="`${$t(item.label)}`"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        :disabled="payVisible"
        @click="searchBill()"
        class="searchUser"
        plain
        >{{ $t("manage.search") }}</el-button
      >
    </div>
    <el-table
      :data="userBill"
      border
      height="468"
      :summary-method="getSummaries"
      show-summary
      v-loading="loading"
      :element-loading-text="`${$t('manage.loadingText')}`"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="index" sortable width="50"></el-table-column>
      <el-table-column prop="type" :label="`${$t('repairManage.type')}`">
      </el-table-column>
      <el-table-column prop="price" :label="`${$t('userBill.price')}`">
      </el-table-column>
      <el-table-column prop="count" :label="`${$t('userBill.count')}`">
      </el-table-column>
      <el-table-column prop="order_date" :label="`${$t('userBill.orderDate')}`">
      </el-table-column>
      <el-table-column prop="pay_date" :label="`${$t('userBill.payDate')}`">
      </el-table-column>
      <el-table-column prop="total" :label="`${$t('userBill.total')}`">
      </el-table-column>
      <el-table-column prop="status" :label="`${$t('userBill.status')}`">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0"
            >{{ $t("billManage.unpaid") }}
            <el-tooltip
              :content="`${$t('userBill.click_pay')}`"
              placement="top"
            >
              <el-button type="text" size="small" @click="clickToPay(scope.row)"
                ><i class="el-icon-thumb"></i
              ></el-button>
            </el-tooltip>
          </span>
          <span v-else class="processed"
            >{{ $t("billManage.PaidFee") }}
            <!-- <el-button type="text" size="small" @click="deleteBill(scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button> -->
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pay-page
      v-if="payVisible"
      :totalPrice="totalPrice"
      :payVisible="payVisible"
      :userPwd="userPwd"
      @change-visible="handleClose"
      @handle-pay-bill="handlePay"
    ></pay-page>
  </div>
</template>

<script>
import _ from "lodash";
import payPage from "./payPage";
import {
  getUserBill,
  getUserBillByItem,
  updateUserBillStatus
} from "../../service/user/userBill.service";
import showMessageBox from "../../mixin/showMessageBox";
import getDateTimes from "../../mixin/getDateTimes";
import { userCenter } from "../../service/user/userCenter.service";
export default {
  name: "userBill",
  data() {
    return {
      selectValue: "all",
      loading: true,
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
      userBill: [],
      totalPrice: 0,
      payVisible: false,
      userPwd: 0,
      loginid: sessionStorage.getItem("userLoginId"),
      userId: 0,
      userPayTime: ""
    };
  },
  mixins: [showMessageBox, getDateTimes],
  components: {
    payPage
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getUserBill();
  },
  methods: {
    async getUserBill() {
      const self = this;
      self.userBill = [
        {
          type: "水费",
          price: "5/吨",
          count: "4.1",
          total: 20.1,
          status: 1,
          order_date: "2020-2-9 22:03:22",
          pay_date: "2020-2-8 22:03:22"
        }
      ];
      const userInfo = await userCenter(self, self.loginid);
      self.userPwd = parseInt(userInfo.data[0].payPwd);
      const response = await getUserBill(self, self.loginid);
      response.data.map(item => {
        self.userBill.push({
          id: item.id,
          price: item.price,
          type: item.type,
          count: item.count,
          status: item.status,
          total: parseInt(item.total),
          order_date: item.order_date,
          pay_date: item.pay_date
        });
      });
    },

    clickToPay(item) {
      this.totalPrice = item.total;
      this.userId = item.id;
      this.payVisible = true;
    },

    async searchBill() {
      const self = this;
      const value = self.selectValue;
      if (_.isEqual(value, "all")) {
        self.getUserBill();
        return;
      } else {
        const userInfo = await userCenter(self, self.loginid);
        self.userPwd = parseInt(userInfo.data[0].payPwd);
        const response = await getUserBillByItem(self, self.loginid, value);
        self.userBill = [
          {
            type: "水费",
            price: "5/吨",
            count: "4.1",
            total: 20.1,
            status: value === "0" ? 0 : 1,
            order_date: value === "0" ? "" : "2020-2-9 22:03:22",
            pay_date: value === "0" ? "" : "2020-2-8 22:03:22"
          }
        ];
        response.data.map(item => {
          self.userBill.push({
            id: item.id,
            price: item.price,
            type: item.type,
            count: item.count,
            status: item.status,
            total: parseInt(item.total),
            order_date: item.order_date,
            pay_date: item.pay_date
          });
        });
      }
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总数";
          return;
        }
        if (
          index === 1 ||
          index === 2 ||
          index === 4 ||
          index === 5 ||
          index === 7
        ) {
          sums[index] = "N/A";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 3) {
            sums[index];
          } else {
            this.totalPrice = sums[index];
            sums[index] += " 元";
          }
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },

    handleClose(value) {
      this.payVisible = value;
    },

    async handlePay(value) {
      const self = this;
      if (_.isEqual(value, "fail")) {
        self.failToPay();
      } else {
        self.successToPay();
        self.payVisible = false;
        self.userPayTime = self.getDateTimes();
        const response = await updateUserBillStatus(
          self,
          self.userId,
          self.userPayTime
        );
        self.getUserBill();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../static/css/user/userBill";
</style>
