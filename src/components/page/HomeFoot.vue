<template>
  <div class="bottom">
    <div class="bottom-main">
      <a href="#">{{$t("homePage.foot.a1")}}</a> <br>
      <a href="#">{{$t("homePage.foot.a2")}}</a>
      <a href="#">{{$t("homePage.foot.a3")}}</a>
      <a href="#">{{$t("homePage.foot.a4")}}</a><br>
      <span>{{$t("homePage.foot.a5")}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFoot"
}
</script>

<style lang="scss" scoped>
.bottom {
  width: 100%;
  height: 8%;
  border-top: 1px solid rgb(231, 231, 231);
  position: absolute;
  bottom: -42%;
  .bottom-main {
    width: 68%;
    height: 100%;
    margin: 0 auto;
    text-align: left;
    a,
    span {
      text-decoration: none;
      font-size: 14px;
      color: #8c8c8c;
      font-weight: bold;
      margin-bottom: 5px;
      display: inline-block;
    }
    a:hover {
      color: #0e98a5;
    }
  }
}
</style>
