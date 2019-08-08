<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from "./userHeader.vue";
import vSidebar from "./userSidebar.vue";
export default {
  components: {
    vHead,
    vSidebar
  }
};
</script>

<style lang="css" scoped>
.wrapper {
  /* margin: 120px auto 0; */
  /* position: fixed; */
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: #ffffff;
}
</style>
