<template>
  <div class="userPoint">
    <div class="main">
      <p>{{ $t("homePage.userOpinion.userRating") }}</p>
      <div>
        <span>{{ $t("homePage.userOpinion.publicSecurity") }}</span>
        <el-rate
          v-model="userPoint.public_security"
          :disabled="isSubmit"
          show-score
          allow-half
          text-color="#ff9900"
          style="display: inline-block"
          score-template="{value}"
        >
        </el-rate>
      </div>
      <div>
        <span>{{ $t("homePage.userOpinion.equipmentMaintenance") }}</span>
        <el-rate
          v-model="userPoint.equipment_maintenance"
          :disabled="isSubmit"
          show-score
          allow-half
          text-color="#ff9900"
          style="display: inline-block"
          score-template="{value}"
        >
        </el-rate>
      </div>
      <div>
        <span>{{ $t("homePage.userOpinion.serviceAttitude") }}</span>
        <el-rate
          v-model="userPoint.service_attitude"
          :disabled="isSubmit"
          show-score
          allow-half
          text-color="#ff9900"
          style="display: inline-block"
          score-template="{value}"
        >
        </el-rate>
      </div>
      <div>
        <span>{{ $t("homePage.userOpinion.environmentalAssessment") }}</span>
        <el-rate
          v-model="userPoint.environmental_assessment"
          :disabled="isSubmit"
          show-score
          allow-half
          text-color="#ff9900"
          style="display: inline-block"
          score-template="{value}"
        >
        </el-rate>
      </div>
      <div>
        <span>{{ $t("homePage.userOpinion.overallEvaluation") }}</span>
        <el-rate
          v-model="userPoint.overall_evaluation"
          :disabled="isSubmit"
          show-score
          allow-half
          text-color="#ff9900"
          style="display: inline-block"
          score-template="{value}"
        >
        </el-rate>
      </div>
      <div>
        <el-button
          type="primary"
          @click.native="handlePoint"
          style="margin-top: 10px"
          :disabled="isSubmit"
          >{{ isSubmit ? "已提交" : $t("button.submit") }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import {
  handlePoint,
  getUserpoint
} from "../../service/user/userPoint.service";
import showMessageBox from "../../mixin/showMessageBox";
export default {
  name: "userPoint",
  data() {
    return {
      isSubmit: false,
      userPoint: {
        public_security: null,
        equipment_maintenance: null,
        service_attitude: null,
        environmental_assessment: null,
        overall_evaluation: null,
        loginid: ""
      }
    };
  },
  mixins: [showMessageBox],
  mounted() {
    this.getUserpoint();
  },
  methods: {
    async getUserpoint() {
      const self = this;
      const loginid = sessionStorage.getItem("userLoginId");
      const response = await getUserpoint(self, loginid);
      console.log(response);
      const list = response.data[0];
      if (_.isEmpty(list)) {
        self.isSubmit = false;
      } else {
        for (var key in list) {
          const number = Number(list[key]);
          self.userPoint[key] = number;
        }
        if (_.isEqual(list.is_rate, "0")) {
          self.isSubmit = false;
        } else {
          self.isSubmit = true;
        }
      }
    },

    async handlePoint() {
      const self = this;
      self.userPoint.loginid = sessionStorage.getItem("userLoginId");
      self.userPoint.is_rate = 1;
      const response = await handlePoint(self, self.userPoint);
      self.showSuccessMessageBox();
      self.isSubmit = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.userPoint {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    width: 45%;
    border: 2px solid #b8ecfc;
    box-shadow: 10px 10px 10px #8adcf5;
    position: absolute;
    top: 15%;
    left: 28%;

    p span {
      font-family: "YouYuan";
    }
    span {
      text-align: left;
    }

    div {
      margin: 5px;
      margin-left: 5%;
    }
  }
}
</style>
