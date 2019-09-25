<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-center></v-center>
    <div class="content">
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHeader from "./homeHeader";
import vCenter from "./homeCenter";
export default {
  components: {
    vHeader,
    vCenter
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: #fff !important;
}
</style>