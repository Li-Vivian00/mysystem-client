<template>
  <div class>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="font-size: 15px; margin-top:20px; margin-bottom:20px;"
    >
      <el-breadcrumb-item
        ><a @click="isBuildPage()">首页</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ selectBuildingVal }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="form"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      v-loading="loading"
      :element-loading-text="`${$t('manage.loadingText')}`"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      stripe
      border
      height="513"
      v-if="isBuildingPage"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="floor_id"
        :label="`${$t('buildingManage.floorId')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="floor_name"
        :label="`${$t('buildingManage.floorName')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="start_date"
        :label="`${$t('buildingManage.startDate')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="end_date"
        :label="`${$t('buildingManage.endDate')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="floor_hold"
        :label="`${$t('buildingManage.floorHold')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="floor_area"
        :label="`${$t('buildingManage.floorArea')}`"
        sortable
      ></el-table-column>
      <el-table-column
        fixed="right"
        :label="`${$t('manage.operate')}`"
        width="150"
      >
        <template slot-scope="scope">
          <div>
            <a href="#" v-for="item in optionsA"></a>
          </div>
          <el-select
            v-model="selectValue"
            clearable
            placeholder="请选择"
            @change="selectBuilding"
          >
            <el-option
              v-if="scope.row.floor_id == 'A'"
              v-for="item in optionsA"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <el-option
              v-if="scope.row.floor_id == 'B'"
              v-for="item in optionsB"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <el-option
              v-if="scope.row.floor_id == 'C'"
              v-for="item in optionsC"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="form.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      v-loading="loading"
      :element-loading-text="`${$t('manage.loadingText')}`"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      stripe
      border
      height="478"
      v-else
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="loginid"
        :label="`${$t('register.label.loginId')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="room_id"
        :label="`${$t('register.label.room_id')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="room_type"
        :label="`${$t('buildingManage.roomType')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="room_area"
        :label="`${$t('buildingManage.roomArea')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="stay_date"
        :label="`${$t('register.label.stay_date')}`"
        sortable
      ></el-table-column>
      <el-table-column
        prop="score"
        :label="`${$t('buildingManage.score')}`"
        sortable
      ></el-table-column>
      <!-- <el-table-column fixed="right" :label='`${$t("manage.operate")}`' width="150">
        <template slot-scope="scope">
          <el-select v-model="selectValue" clearable placeholder="请选择" @change="selectBuilding">
            <el-option
              v-if="scope.row.floor_id == 'A'"
              v-for="item in optionsA"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <el-option
              v-if="scope.row.floor_id == 'B'"
              v-for="item in optionsB"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <el-option
              v-if="scope.row.floor_id == 'C'"
              v-for="item in optionsC"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      v-if="!isBuildingPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="form.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getAllBuilding,
  getRoomByFloorId
} from "../../../service/admin/buildingManage/buildingManage.Service.js";
import _ from "lodash";
export default {
  name: "buildingManage",
  data() {
    return {
      form: [],
      loading: true,
      selectValue: "",
      optionsA: [
        {
          value: "A1",
          label: "A1"
        },
        {
          value: "A2",
          label: "A2"
        },
        {
          value: "A3",
          label: "A3"
        }
      ],
      optionsB: [
        {
          value: "B1",
          label: "B1"
        },
        {
          value: "B2",
          label: "B2"
        },
        {
          value: "B3",
          label: "B3"
        }
      ],
      optionsC: [
        {
          value: "C1",
          label: "C1"
        },
        {
          value: "C2",
          label: "C2"
        },
        {
          value: "C3",
          label: "C3"
        }
      ],
      selectBuildingVal: "",
      isBuildingPage: true,
      currentPage: 1,
      pagesize: 10
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getAllBuilding();
  },
  methods: {
    async getAllBuilding() {
      const self = this;
      const response = await getAllBuilding(self);
      if (response.data == null) {
        self.showErrorMessageBox();
      } else {
        self.form = response.data;
      }
    },
    async selectBuilding(value) {
      const self = this;
      self.isBuildingPage = false;
      self.selectBuildingVal = value + this.$t("billManage.detail");
      const response = await getRoomByFloorId(self, value);
      if (response.data == null) {
        self.showErrorMessageBox();
      } else {
        self.form = self.formatForm(response.data);
      }
    },

    isBuildPage() {
      this.getAllBuilding();
      this.isBuildingPage = true;
      this.selectValue = "";
      this.selectBuildingVal = "";
    },

    handleSizeChange(size) {
      this.pagesize = size;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },

    formatForm(val) {
      val.forEach(item => {
        if (item.loginid == null) {
          item.loginid = "-";
        }
      });
      return val;
    }
  }
};
</script>

<style></style>
