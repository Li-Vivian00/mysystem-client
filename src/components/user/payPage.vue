<template>
  <div class="payPage">
    <div class="goods-psd">
      <p class="apply-title">支付密码
      <el-button class="closeStyle" @click="handleClose()">x</el-button>
      </p>
      <p style="margin: 0.2rem">
        确认支付
        <span>￥{{totalPrice}}</span>
      </p>
      <div class="psd-container">
        <input class="psd-input"
          type="password"
          readonly
          v-for="(item,index) in passwordGroup"
          :key="index"
          :value="item.value"/>
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
  props: {
    totalPrice: {
      type: Number,
      default: () => 0
    },
    payVisible: {
      type: Boolean,
      default: () => false
    },
    userPwd: {
      type: Number,
      default:() => 0
    }
  },
  data() {
    return {
      popupVisible1: true,
      realInput: "",
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
      currentInputIndex: -1,
      visible: this.payVisible,
      userPassword: this.userPwd,
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
    },

    handleClose() {
      this.visible = false;
      this.$emit("change-visible", this.visible);
    }
  },

  watch: {
    currentInputIndex(val) {
      if (val == 5) {
        const value = this.pasgroup;
        let str =""
        for(let i = 0; i< value.length; i++) {
          str += value[i];
        }
        if (_.isEqual(parseInt(str), this.userPassword)) {
          this.$emit("handle-pay-bill", "success");
          return;
        }else {
          this.pasgroup = [];
          this.$emit("handle-pay-bill", "fail");
          return;
        }
      } else if (val <= -1) {
        this.currentInputIndex = -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.payPage {
  // background: #fff !important;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 10%;
  .goods-psd {
    width: 34%;
    height: 52%;
    background: #ffe6e6;
    box-shadow: 2px 2px 8px #f39494;
    text-align: center;
    position: relative;
    margin: 0 auto;
    .closeStyle {
      float: right;
      cursor: pointer;
      border: none;
      background: none;
      padding: 0px;
      margin-right: 5px;
    }
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
        margin: 2px;
      }
    }
    .input-pan {
      width: 100%;
      text-align: center;
      margin-left: 3px;
      .pan-num {
        width: 124px;
        height: 50px;
        border: 1px solid rgb(128, 127, 127);
        float: left;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
      .pan-num:hover {
        background: rgb(247, 165, 165);
      }
    }

  }
}
</style>
