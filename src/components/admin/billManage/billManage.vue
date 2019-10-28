<template>
  <div class="billManage">
    <el-button type="primary"
               @click="addBill"
               class="batchDelect">{{$t('billManage.addBill')}}</el-button>
    <!-- <span class="demonstration">默认</span>
    <el-date-picker
      v-model="dateValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      @change="inputDate"
    ></el-date-picker> -->
  </div>
</template>

<script>
export default {
  name: "billPage",
  data() {
    return {
      dateValue: ""
    };
  },
  methods: {
    inputDate (value) {
      console.log(value);
    },
    addBill () {

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
}
</style>
