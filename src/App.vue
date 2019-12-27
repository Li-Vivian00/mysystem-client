<template>
  <div id="app" @click="isTimeOut">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      lastTime: null,
      currentTime: null,
      timeOut: 30*60*1000
    }
  },
  create() {
    this.lastTime = new Date().getTime();
  },
  methods: {
    isTimeOut() {
      this.currentTime = new Date().getTime();
      if (this.currentTime - this.lastTime > this.timeOut) {
        if (sessionStorage.getItem("userLoginId")) {
          this.$router.push("/userLogin");
        } else {
          this.lastTime = new Date().getTime()
        }
      } else {
        this.lastTime = new Date().getTime();
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: url("../static/img/1.jpg");
  background-size: 100% 100%;
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
}

.v-modal {
  position: inherit !important;
}

.el-form-item__label {
  padding: 0 9px 0 0 !important;
  width: 113px !important;
}

.input .el-input__inner,
.validate-code .el-input__inner {
  background: transparent !important;
  color: #faecec;
}

.el-dialog {
  width: 40%;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  font-size: 16px !important;
  margin-bottom: 2px solid #fff;
}
</style>

