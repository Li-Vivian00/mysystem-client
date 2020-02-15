<template>
  <div class="center_page">
    <div class="title">
      <span class="edit_title">{{ $t("sidebar.admin.rateManage") }}</span>
      <i class="el-icon-edit"></i>
    </div>
    <el-table
      :data="userPoint"
      border
      :summary-method="getSummaries"
      show-summary
      height="468"
      v-loading="loading"
      :element-loading-text="`${$t('manage.loadingText')}`"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="index" width="65"> </el-table-column>
      <el-table-column prop="loginid" sortable label="LoginId">
      </el-table-column>
      <el-table-column
        prop="public_security"
        sortable
        :label="`${$t('homePage.userOpinion.publicSecurity')}`"
      >
      </el-table-column>
      <el-table-column
        prop="equipment_maintenance"
        sortable
        :label="`${$t('homePage.userOpinion.equipmentMaintenance')}`"
      >
      </el-table-column>
      <el-table-column
        prop="service_attitude"
        sortable
        :label="`${$t('homePage.userOpinion.serviceAttitude')}`"
      >
      </el-table-column>
      <el-table-column
        prop="environmental_assessment"
        sortable
        :label="`${$t('homePage.userOpinion.environmentalAssessment')}`"
      >
      </el-table-column>
      <el-table-column
        prop="overall_evaluation"
        sortable
        :label="`${$t('homePage.userOpinion.overallEvaluation')}`"
      >
      </el-table-column>
      <el-table-column prop="is_rate" :label="`${$t('repairManage.status')}`">
        <template slot-scope="scope">
          <span v-if="scope.row.is_rate == 0">
            未评分
          </span>
          <span v-else>
            <el-tooltip content="点击置零, 用户重新评分" placement="top">
              <el-button
                type="text"
                size="small"
                @click="clickToReset(scope.row)"
              >
                <i class="el-icon-thumb"></i>
              </el-button>
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getUserPoint,
  updateUserPoint
} from "../../../service/admin/rateManage/rateManage.Service";
import showMessageBox from "../../../mixin/showMessageBox";
export default {
  name: "rateManage",
  data() {
    return {
      loading: true,
      userPoint: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getUserPoint();
  },
  mixins: [showMessageBox],
  methods: {
    async getUserPoint() {
      const self = this;
      self.userPoint = [
        {
          loginid: "demo",
          public_security: "1.5",
          equipment_maintenance: "2.5",
          service_attitude: "2",
          environmental_assessment: "3.5",
          overall_evaluation: "4.5",
          is_rate: "1"
        }
      ];
      const response = await getUserPoint(self);
      response.data.map(item => {
        self.userPoint.push(item);
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const length = data.length;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "平均值";
          return;
        }
        if (index === 7) {
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
          sums[index] = (sums[index] / length).toFixed(2);
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    async clickToReset(item) {
      const self = this;
      const userRate = {
        id: item.id,
        loginid: item.loginid,
        public_security: "",
        equipment_maintenance: "",
        service_attitude: "",
        environmental_assessment: "",
        overall_evaluation: "",
        is_rate: "0"
      };
      const response = await updateUserPoint(self, userRate);
      if (_.isEqual(response.data, "fail to update")) {
        self.showErrorMessageBox();
      } else if (_.isEqual(response.data, "success to update")) {
        self.getUserPoint();
        self.showSuccessMessageBox();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 10px;
}
</style>
