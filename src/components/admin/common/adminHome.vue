<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from "./adminHeader.vue";
import vSidebar from "./adminSidebar.vue";
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
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: #ffffff;
}
.content {
  position: absolute;
  top: 105px;
  left: 249px;
  width: 80%;
  height: 84%;
  /* border: 2px solid #9fd9ff; */
  box-shadow: 0px 2px 9px #dc8181;
  /* float: right; */
}
</style>
