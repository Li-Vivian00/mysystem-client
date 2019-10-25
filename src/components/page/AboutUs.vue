<template>
    <div class="aboutUs">
      <div class="top">
        <ul>
          <li></li>
        </ul>
      </div>
      <div class="submenu">
        <div class="submenuSub">
          <i class="el-icon-s-home homeIcon"></i>
          <a href="#">{{$t("homePage.homeHeader.aboutUs")}} <i class="el-icon-caret-right rightIcon"></i></a>
          <span v-model="selectTitle">{{$t(selectTitle)}}</span>
          <span href="#" class="selectItem" :class="activeClass == 'culture' ? 'active' : ''" @click="turnToPage('culture')">{{$t("homePage.aboutUs.corporateCulture")}}</span>
          <span href="#" class="selectItem" :class="activeClass == 'company' ? 'active' : ''" @click="turnToPage('company')">{{$t("homePage.aboutUs.companyProfile")}}</span>
        </div>
      </div>
      <div class="companyMain" v-if="isCompany">
        <div class="main-center">
          <div class="center-top">
          </div>
          <div class="center-main">
            <div class="main-left">
              <h2>SINCE 2019</h2>
              <h3>{{$t("homePage.aboutUs.leftTitle")}}</h3>
              <h5><em>1200+</em>{{$t("homePage.aboutUs.town")}}</h5>
              <h5><em>400+</em>{{$t("homePage.aboutUs.owners")}}</h5>
            </div>
            <div class="main-right">
              <h3>{{$t("homePage.aboutUs.whatFuli")}}<br>
                  {{$t("homePage.aboutUs.whatFuliTwo")}}</h3>
              <p><strong>{{$t("homePage.aboutUs.titleOne")}}</strong>{{$t("homePage.aboutUs.titleOneSub")}}<br>{{$t("homePage.aboutUs.titleOneSubT")}}</p>
              <p><strong>{{$t("homePage.aboutUs.titleTwo")}}</strong>{{$t("homePage.aboutUs.titleTwoSub")}}</p>
              <p><strong>{{$t("homePage.aboutUs.titleThree")}}</strong>{{$t("homePage.aboutUs.titleThreeSub")}}</p>
              <p><strong>{{$t("homePage.aboutUs.titleFour")}}</strong>{{$t("homePage.aboutUs.titleFourSub")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="cultureMain">
        <div class="main-center">
          <div class="center-left">
            <h3>核心文化理念</h3>
            <h4>THE CORE CULTURE IDEA</h4>
          </div>
          <div class="center-right">
            <p>{{$t("homePage.aboutUs.p1")}}</p>
            <p>{{$t("homePage.aboutUs.p2")}}</p>
            <p>{{$t("homePage.aboutUs.p3")}}</p>
            <p>{{$t("homePage.aboutUs.p4")}}</p>
            <p>{{$t("homePage.aboutUs.p5")}}</p>
            <p>{{$t("homePage.aboutUs.p6")}}</p>
            <p>{{$t("homePage.aboutUs.p7")}}</p>
          </div>
        </div>
      </div>
      <v-foot></v-foot>
    </div>
</template>

<script>
import vFoot from './HomeFoot'
export default {
  name: "AboutUs",
  data() {
    return {
      selectTitle: "homePage.aboutUs.companyProfile",
      activeClass:'',
      isCompany: true,
    }
  },
  components: {
    vFoot,
  },
  mounted () {
    this.activeClass = 'company';
  },
  methods: {
    turnToPage(i) {
      this.activeClass = i;
      if (i == 'company'){
        this.selectTitle = "homePage.aboutUs.companyProfile"
        this.isCompany = true;
      }
      else{
        this.selectTitle = "homePage.aboutUs.corporateCulture"
        this.isCompany = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/homePage/aboutUs.scss";
.active {
  color: #0e98a5;
  border-bottom: 2px solid #0e98a5;
}
</style>
