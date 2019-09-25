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
        <div class="main-left-item">
          <h3>产品与服务</h3>
          <h4>PRODUCTS<br>
            &SERVICES</h4>
        </div>

        <ul>
          <li><a href="#">
              <p style="background-image: url(https://www.bgy.com.cn/upload/img/2019-05-30/a6506c8c-8fc8-47ca-ab7a-ac47f5ad9b21.png)"><span>地产</span></p>
            </a></li>
          <li><a href="#">
              <p style="background-image: url(https://www.bgy.com.cn/upload/img/2019-05-30/14cadb83-c8a4-44f3-a3ce-9329bfd44326.png)"><span>农业</span></p>
            </a></li>
          <li><a href="#">
              <p style="background-image: url(https://www.bgy.com.cn/upload/img/2019-05-30/a996aebd-aec7-483a-8e67-2c8d90102686.png)"><span>物业</span></p>
            </a></li>
          <li><a href="#">
              <p style="background-image: url(https://www.bgy.com.cn//upload/img/2019-05-30/d43654d7-eea6-4566-81c3-4157da39c99e.png)"><span>酒店</span></p>
            </a></li>
          <li><a href="#">
              <p style="background-image: url(https://www.bgy.com.cn/upload/img/2019-05-30/8cae205f-aa51-421c-a71c-2f4adf6a1b11.png)"><span>客服中心</span></p>
            </a></li>
          <li><a href="#">
              <p style="background-image: url(https://www.bgy.com.cn/upload/img/2019-06-03/b23867ce-7215-48a1-bb38-fa000229a67d.png)"><span>其他</span></p>
            </a></li>
        </ul>
      </div>
      <div class="main-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "center",
  data () {
    return {
      photoList: [
        {
          src: "../../../static/img/b1.jpg",
        },
        {
          src: "../../../static/img/b2.jpg",
        },
        {
          src: "../../../static/img/b3.jpg",
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #e1ebf7;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #e1e6ec;
}

.center {
  width: 100%;
  .carousel {
    width: 100%;
    .carouselImg {
      width: 100%;
      height: 100%;
    }
  }

  .showProductItem {
    width: 100%;
    border: 1px solid red;
    .main-left {
      width: 65%;
      height: 240px;
      border: 1px solid red;

      .main-left-item {
        width: 120px;
        height: 180px;
        float: left;
        h3 {
          font-size: 18px;
          color: #333333;
          padding: 20px 0 5px 0;
        }
        h4 {
          font-size: 24px;
          color: #999999;
          font-family: "dinCond-Medium";
          line-height: 24px;
          font-weight: 500;
          margin-top: 10px;
        }
      }

      ul {
        border: 1px solid red;
        float: right;
        list-style: none;
        li {
          width: 98px;
          float: left;
          text-align: center;
          a {
            text-decoration: none;
            display: block;
            p {
              font-size: 26px;
              display: inline-block;
              background-repeat: no-repeat;
              color: #666666;
              font-weight: bold;
              text-align: center;
              padding-top: 66px;
              -webkit-transition: all 0.3s;
              width: 45px;
              span {
                font-size: 16px;
                color: #666666;
                font-weight: bold;
              }
            }
            a:hover {
              color: #333;
              -webkit-transition: all 400ms;
              transition: all 400ms;
            }
          }
        }
      }
    }
  }
}
</style>