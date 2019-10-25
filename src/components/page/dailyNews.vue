<template>
  <div class="dailyNews">
    <div class="top">
      <div class="top-left">上左
      </div>
      <div class="top-right">
        <p v-if="userIsLogin">
          <el-link href="http://localhost:8081/#/userPoint"
                   type="warning"
                   target="_blank">{{$t("homePage.dailyNews.setPoint")}}</el-link>
        </p>
        <div id='unitChart'
             class="chartStyle"></div>
        <div id='pointChart'
             class="chartStyle"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <img src="../../../static/img/cellBoard.png"
             alt="cellBoard">
        <ul class="left-ul">
          <p>{{$t("homePage.dailyNews.serviceHotline")}}</p>
          <li v-for="(i, index) in phoneList">{{i.item}}: {{i.phone}}</li>
        </ul>
      </div>
      <div class="bottom-right">右下</div>
    </div>
  </div>
</template>

<script>
import { getCountOfUser, getAvgScore, getPhoneModule } from '../../service/user/dailyNews.service'
import _ from "lodash"
export default {
  name: "dailyNews",
  data () {
    return {
      value: null,
      unitData: [],
      pointData: [],
      phoneList: [],
    }
  },
  components: {

  },
  mounted () {
    this.getCountOfUser();
    this.getAvgScore();
    this.drawLine();
    this.getPhoneModule();
  },
  methods: {
    async getCountOfUser () {
      const self = this;
      const result = await getCountOfUser(self);
      self.unitData = result.data;
      this.drawLine();
    },

    async getPhoneModule () {
      const self = this;
      const result = await getPhoneModule(self);
      this.phoneList = result.data;
    },
    async getAvgScore () {
      const self = this;
      const result = await getAvgScore(self);
      const arr = result.data;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == null) {
          arr[i] = arr[i];
        }
        else {
          arr[i] = arr[i].toFixed(2);
        }
      }
      self.pointData = arr;
      this.drawLine();
    },

    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let unitChart = this.$echarts.init(document.getElementById('unitChart'))
      let pointChart = this.$echarts.init(document.getElementById('pointChart'))
      // 绘制图表
      unitChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: { text: '各单元总人数' },
        xAxis: {
          type: 'category',
          data: ["A1单元", "A2单元", "A3单元", "B1单元", "B2单元", "C单元"]
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: this.unitData,
        }]
      });
      pointChart.setOption({
        title: { text: '各单元住户评分' },
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          data: ["A1单元", "A2单元", "A3单元", "B1单元", "B2单元", "C单元"]
        },
        yAxis: {},
        series: [{
          name: '分值',
          type: 'bar',
          data: this.pointData,
        }]
      });
    },

  },
  computed: {
    userIsLogin () {
      let user = sessionStorage.getItem("userLoginId");
      if (_.isEmpty(user)) {
        return false;
      }
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/homePage/dailyNews.scss";
</style>
