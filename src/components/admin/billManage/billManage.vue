<template>
  <div class="billManage">
    <el-button type="primary" @click="addBill" class="batchDelect">{{$t('billManage.addBill')}}</el-button>
    <!-- <span class="demonstration">默认</span>
    <el-date-picker
      v-model="form"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      @change="inputDate"
    ></el-date-picker>-->
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
      <el-table-column :label='`${$t("repairManage.status")}/操作`'>
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未缴费
            <el-tooltip content="详细信息" placement="top">
          <el-button type="text"
                     size="small" @click="showBillDetail(scope.row)"><i class="el-icon-view el-icon--right"></i></el-button>
                     </el-tooltip></span>
          <span v-else
                class="processed">已缴费
          <el-button type="text"
                     size="small"><i class="el-icon-delete"></i></el-button></span>
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
  </div>
</template>

<script>
import { getAllBill, getBillByloginId } from "../../../service/admin/billManage/billManage.Service";
import _ from 'lodash';
export default {
  name: "billPage",
  data() {
    return {
      // form: "",
      form: [],
      currentPage: 1,
      pagesize: 5,
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllBill();
  },
  methods: {
    inputDate(value) {
      console.log(value);
    },
    async getAllBill() {
      const self = this;
      const respone = await getAllBill(self);
      self.form = _.sortBy(respone.data, 'status');
      console.log(self.form);
    },
    addBill() {},
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
        message: h('p', {style: 'width: 500px'}, msg),
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
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
