<template>
  <div class="wrapper">
    <v-header></v-header>
    <!-- <v-center></v-center> -->
    <div class="content">
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHeader from "./HomeHeader";
export default {
  name: "homePage",
  data() {
    return {
    }
  },
  components: {
    vHeader,
  },
  mounted () {
    // this.$router.push("homeCenter")
    // this.activeIndex = 'homeCenter'
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: #fff !important;
}

.content {
  position: absolute;
  top: 105px;
  // left: 249px;
  width: 100%;
  height: 100%;
  // border: 2px solid #9fd9ff;
  // box-shadow: 0px 2px 9px #dc8181;
  /* float: right; */
}
</style>
