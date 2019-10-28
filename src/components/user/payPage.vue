<template>
  <div class="payPage">
    <div class="goods-psd">
      <p class="apply-title">请输入支付密码</p>
      <p style="margin: 0.2rem">
        确认支付
        <span>{{password}}</span>
      </p>
      <div class="psd-container">
        <input class="psd-input"
          type="password"
          readonly
          v-for="(value,index) in passwordGroup"
          :key="index"
          :value="value.value"/>
      </div>
      <div class="input-pan">
        <div class="pan-num"
          v-for="(value,num) in number"
          :key="num"
          @click="inputPsd(value)">{{value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: "payPage",
  data() {
    return {
      popupVisible1: true,
      realInput: "",
      password: "111",
      passwordGroup: [],
      number: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "取消",
        "0",
        "删除"
      ],
      pasgroup: [],
      currentInputIndex: -1
    };
  },
  mounted() {
    this.initPasswordGroup();
  },
  methods: {
    inputPsd(value) {
      switch (value) {
        case "取消":
          this.currentInputIndex = -1;
          this.pasgroup = [];
          this.initPasswordGroup();
          break;
        case "删除":
          if (_.isEmpty(this.pasgroup)) {
            return;
          }
          this.pasgroup.pop();
          this.passwordGroup[this.currentInputIndex].value = null;
          this.currentInputIndex--;
          break;
        default:
          this.pasgroup.push(value);
          this.currentInputIndex++;
          this.passwordGroup[this.currentInputIndex].value = value;
      }
    },

    initPasswordGroup() {
      this.passwordGroup = [];
      for (var i = 0; i < 6; i++) {
        this.passwordGroup.push({
          value: null
        });
      }
    }
  },

  watch: {
    currentInputIndex(val) {
      if (val == 5) {
        console.log(this.pasgroup + "支付成功");
      } else if (val <= -1) {
        this.currentInputIndex = -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.payPage {
  background: #fff !important;
  width: 100%;
  height: 100%;
  .goods-psd {
    width: 20%;
    height: 56%;
    // border: 1px solid rgb(133, 216, 248);
    box-shadow: 2px 2px 8px rgb(133, 216, 248);
    text-align: center;
    position: relative;
    margin: 0 auto;
    .psd-container {
      width: 100%;
      margin-bottom: 20px;
      margin-top: 20px;
      .psd-input {
        width: 40px;
        height: 40px;
        border: 1px solid black;
        text-align: center;
        font-size: 20px;
      }
    }
    .input-pan {
      width: 100%;
      text-align: center;
      margin-left: 3px;
      .pan-num {
        width: 124px;
        height: 50px;
        border: 1px solid rgb(77, 77, 77);
        float: left;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
      .pan-num:hover {
        background: rgb(224, 220, 220);
      }
    }

  }
}
</style>
