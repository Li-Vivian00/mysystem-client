<template>
  <div class="userPoint">
    <div class="main">
      <p>超级用户评分</p>
      <div><span>治安管理：</span>
        <el-rate v-model="userPoint.ServicePoint"
                 show-score
                 allow-half
                 text-color="#ff9900"
                 style="display: inline-block"
                 score-template="{value}">
        </el-rate>
      </div>
      <div><span>设备维护：</span>
        <el-rate v-model="userPoint.devicePoint"
                 show-score
                 allow-half
                 text-color="#ff9900"
                 style="display: inline-block"
                 score-template="{value}">
        </el-rate>
      </div>
      <div><span>服务态度：</span>
        <el-rate v-model="userPoint.attitudePoint"
                 show-score
                 allow-half
                 text-color="#ff9900"
                 style="display: inline-block"
                 score-template="{value}">
        </el-rate>
      </div>
      <div><span>环境评价：</span>
        <el-rate v-model="userPoint.EnvirPoint"
                 show-score
                 allow-half
                 text-color="#ff9900"
                 style="display: inline-block"
                 score-template="{value}">
        </el-rate>
      </div>
      <div><span>整体评价：</span>
        <el-rate v-model="userPoint.AllPoint"
                 show-score
                 allow-half
                 text-color="#ff9900"
                 style="display: inline-block"
                 score-template="{value}">
        </el-rate>
      </div>
      <el-button type="primary"
                 @click.native="handlePoint()"
                 style="margin-top: 10px">{{ (isSubmit) ? '已提交' : $t("button.submit")}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userPoint",
  data () {
    return {
      isSubmit: false,
      userPoint: {
        ServicePoint: null,
        devicePoint: null,
        attitudePoint: null,
        EnvirPoint: null,
        AllPoint: null,
        score: null,
        loginid: ""
      }

    }
  },
  mounted () {
    this.handlePoint();
  },
  methods: {
    async handlePoint () {
      const self = this;
      self.userPoint.score = (parseInt(self.userPoint.ServicePoint) + parseInt(self.userPoint.devicePoint) + parseInt(self.userPoint.attitudePoint) + parseInt(self.userPoint.EnvirPoint) + parseInt(self.userPoint.AllPoint)) / 5;
      self.userPoint.loginid = sessionStorage.getItem("userLoginId");
      const respone = await handlePoint(self, userPoint);
    },

  }
}
</script>

<style lang="scss" scoped>
.userPoint {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    width: 45%;
    height: 45%;
    border: 2px solid #b8ecfc;
    box-shadow: 10px 10px 10px #8adcf5;
    position: absolute;
    top: 15%;
    left: 28%;

    p span {
      font-family: "YouYuan";
    }

    div {
      margin: 5px;
      margin-left: 5%;
    }
  }
}
</style>
