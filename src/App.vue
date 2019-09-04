<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
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
</style>

