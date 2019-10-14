<template>
  <div class="dailyNews">
    <el-rate v-model="value" show-text allow-half @change="getRate"></el-rate>
      <div id='unitChart' style='width: 300px; height: 300px'></div>
      <div id='pointChart' style='width: 300px; height: 300px'></div>
  </div>
</template>

<script>
import {getCountOfUser, getAvgScore} from '../../service/user/dailyNews.service'
import _ from "lodash"
export default {
  name: "dailyNews",
  data() {
    return {
      value: null,
      unitData: [],
      pointData: [3.5, 4.0, 2.0]
    }
  },
  components: {

  },
  mounted () {
    this.getCountOfUser();
    this.getAvgScore();
    this.drawLine();
  },
  methods: {
    async getCountOfUser() {
      const self = this;
      const result = await getCountOfUser(self);
      self.unitData = result.data;
      this.drawLine();
    },
    async getAvgScore() {
      const self = this;
      const result = await getAvgScore(self);
      const arr = result.data;
      for (let i=0; i < arr.length; i++) {
        if (arr[i] == null){
          arr[i] = arr[i];
        }
        else {
          arr[i] = arr[i].toFixed(2);
        }
      }
      self.pointData = arr;
      this.drawLine();
    },
    getRate(value) {
      this.pointData[0] = value;
      this.drawLine();
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let unitChart = this.$echarts.init(document.getElementById('unitChart'))
        let pointChart = this.$echarts.init(document.getElementById('pointChart'))
        // 绘制图表
        unitChart.setOption({
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: { text: '各单元总人数' },
            xAxis: {
                type : 'category',
                data: ["A1单元","A2单元","A3单元","B1单元","B2单元","C单元"]
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
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                data: ["A1单元","A2单元","A3单元","B1单元","B2单元","C单元"]
            },
            yAxis: {},
            series: [{
                name: '评分',
                type: 'bar',
                data: this.pointData,
            }]
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
