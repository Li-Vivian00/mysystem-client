<template>
  <div class="center">
    <div class="carousel">
      <el-carousel :interval="2000"
                   height="300px">
        <el-carousel-item v-for="item in photoList"
                          :key="item.src">
          <img :src="item.src"
               alt=""
               class="carouselImg">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="showProductItem">
      <div class="main-left">
        <div class="main-left-top">
          <div class="main-left-item">
            <h3>产品与服务</h3>
            <h4>PRODUCTS<br>
              &SERVICES</h4>
          </div>
          <ul>
            <li v-for="item in imgList">
              <a href="#">
                <div class="iamgeStyle">
                  <img :src="item.url"></img>
                </div>
                <div class="value">
                  <span>{{$t(item.value)}}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="main-left-bottm">
          <div class="main-left-bottmLeft">
            <div class="leftPicture">
              <div class="leftItem">
                <h3>富力港是什么</h3>
                <h4>ABOUT US</h4>
              </div>
              <a href="">
                <img class="left"
                     src="https://www.bgy.com.cn/images/main-bg1.png"
                     alt="">
              </a>
            </div>
            <div class="rightPicture">
              <div class="rightItem">
                <h3>全球布局</h3>
                <h4>GLOBAL STRATEGY</h4>
              </div>
              <img class="right"
                   src="https://www.bgy.com.cn/images/main-bg2.jpg"
                   alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="main-right"
           id="right">
        <div class="main-img">
          <img src="https://www.bgy.com.cn/upload/img/2018-10-15/a70a0ef4-3cc3-4ded-b65e-98fb84b32ec4.jpg"
               alt="">
        </div>
        <h3>{{$t("homePage.homeCenter.forestItem")}}</h3>
        <p>{{$t("homePage.homeCenter.forestDetailItem")}}</p>
        <a href="#"
           target="_blank">{{$t("homePage.homeCenter.learnMore")}}></a>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-main">
        <a href="#">{{$t("homePage.foot.a1")}}</a> <br>
        <a href="#">{{$t("homePage.foot.a2")}}</a>
        <a href="#">{{$t("homePage.foot.a3")}}</a>
        <a href="#">{{$t("homePage.foot.a4")}}</a><br>
        <span>{{$t("homePage.foot.a5")}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeCenter",
  data () {
    return {
      photoList: [
        { src: "../../../static/img/b1.jpg" },
        { src: "../../../static/img/b2.jpg", },
        { src: "../../../static/img/b3.jpg", },
      ],
      imgList: [
        {
          url: "https://www.bgy.com.cn/upload/img/2019-05-30/a6506c8c-8fc8-47ca-ab7a-ac47f5ad9b21.png",
          value: "homePage.homeCenter.realEstate"
        },
        {
          url: "https://www.bgy.com.cn/upload/img/2019-05-30/14cadb83-c8a4-44f3-a3ce-9329bfd44326.png",
          value: "homePage.homeCenter.agricultural"
        },
        {
          url: "https://www.bgy.com.cn/upload/img/2019-05-30/a996aebd-aec7-483a-8e67-2c8d90102686.png",
          value: "homePage.homeCenter.property"
        },
        {
          url: "https://www.bgy.com.cn//upload/img/2019-05-30/d43654d7-eea6-4566-81c3-4157da39c99e.png",
          value: "homePage.homeCenter.hotel"
        },
        {
          url: "https://www.bgy.com.cn/upload/img/2019-05-30/8cae205f-aa51-421c-a71c-2f4adf6a1b11.png",
          value: "homePage.homeCenter.customerCenter"
        },
        {
          url: "https://www.bgy.com.cn/upload/img/2019-06-03/b23867ce-7215-48a1-bb38-fa000229a67d.png",
          value: "homePage.homeCenter.other"
        },
      ]
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/homePage/homeCenter";
</style>
