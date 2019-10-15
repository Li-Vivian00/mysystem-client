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
          <span href="#" class="selectItem" :class="activeClass == 'culture' ? 'active' : ''" @click="turnToPage('culture')">企业文化</span>
          <span href="#" class="selectItem" :class="activeClass == 'company' ? 'active' : ''" @click="turnToPage('company')">公司简介</span>
        </div>
      </div>
      <div class="main" v-if="isCompany">
        <div class="main-center">
          <div class="center-top">
          </div>
          <div class="center-main">
            <div class="main-left">
              <h2>SINCE 2019</h2>
              <h3>富力港是中国新型城镇化进程的身体力行者是全球绿色生态智慧城市的建造者</h3>
              <h5><em>1200+</em>城镇</h5>
              <h5><em>400+</em>万业主</h5>
            </div>
            <div class="main-right">
              <h3>碧桂园是什么<br>
                  碧桂园是为全世界创造美好生活产品的高科技综合性企业。</h3>
              <p><strong>我们一直致力于为追求美好生活的人提供好房子，好社区。</strong>20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。</p>
              <p><strong>我们一直致力于为追求美好生活的人提供好房子，好社区。</strong>20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。</p>
              <p><strong>我们一直致力于为追求美好生活的人提供好房子，好社区。</strong>20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。</p>
              <p><strong>我们一直致力于为追求美好生活的人提供好房子，好社区。</strong>20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。</p>
              <p><strong>我们一直致力于为追求美好生活的人提供好房子，好社区。</strong>20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。</p>
              <p><strong>我们一直致力于为追求美好生活的人提供好房子，好社区。</strong>20多年来，作为新型城镇化的身体力行者，以打造民生地产为己任，我们已为超过1200个城镇带来现代化的城市面貌。高科技的应用，让我们成为了绿色生态智慧建筑的建造者，我们首创立体分层现代都市建筑——森林城市，被《福布斯》评为“影响世界未来的5座城市”之首。</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>culture</div>
      <v-foot></v-foot>
    </div>
</template>

<script>
import vFoot from './HomeFoot'
export default {
  name: "AboutUs",
  data() {
    return {
      selectTitle: "homePage.dailyNews.companyProfile",
      activeClass:'',
      isCompany: true,
    }
  },
  components: {
    vFoot,
  },
  mounted () {
  },
  methods: {
    turnToPage(i) {
      this.activeClass = i;
      if (i == 'company'){
        this.selectTitle = "homePage.dailyNews.companyProfile"
        this.isCompany = true;
      }
      else{
        this.selectTitle = "homePage.dailyNews.corporateCulture"
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
