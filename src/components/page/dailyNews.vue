<template>
  <div class="dailyNews">
    <div class="top">
      <div class="top-left">
        <!-- <img src="../../../static/img/cellBoard.png"
             alt="cellBoard">
        <ul class="left-ul">
          <p>{{$t("homePage.dailyNews.serviceHotline")}}</p>
          <li v-for="(i, index) in phoneList">{{i.item}}: {{i.phone}}</li>
        </ul> -->
        <p style="text-align: left; font-size:18px; margin:0px;padding:5px; font-weight: bolder">每日要闻</p>
        <p style="font-weight: bolder; font-size: 18px; padding: 0px">{{warnTitle}}</p>
        <p style="text-align: left; padding: 5px;text-indent: 20px; letter-spacing:2px; margin:0px">{{warnContent}}</p>
      </div>
      <div class="top-right">

        <p class="explainChart">{{$t("homePage.dailyNews.analysContent")}}
          <el-link v-if="userIsLogin"
                   href="http://localhost:8081/#/userPoint"
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
      <div class="bottom-left">左下</div>
      <div class="bottom-right">右下</div>
    </div>
  </div>
</template>

<script>
import { getCountOfUser, getAvgScore, getPhoneModule, getWarningModuleInfo } from '../../service/user/dailyNews.service'
import _ from "lodash"
export default {
  name: "dailyNews",
  data () {
    return {
      value: null,
      unitData: [],
      pointData: [],
      phoneList: [],
      warnTitle: '',
      warnContent: ''
    }
  },
  components: {

  },
  mounted () {
    this.getUserNumber();
    this.getAvgScore();
    // this.drawLine();
    this.getPhoneModule();
    this.getWarningModuleInfo();
  },
  methods: {
    async getUserNumber () {
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

    async getWarningModuleInfo () {
      const self = this;
      const respone = await getWarningModuleInfo(self);
      const result = respone.data;
      self.warnTitle = result[0].title;
      self.warnContent = result[0].content;
    }

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
