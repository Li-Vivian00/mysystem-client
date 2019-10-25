<template>
  <div class="userPoint">
    <div class="main">
      <p>超级用户评分</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "userPoint"
}
</script>

<style lang="scss" scoped>
.userPoint {
  width: 100%;
  height: 100%;
  position: relative;
  .main {
    width: 60%;
    height: 40%;
    border: 2px solid #b8ecfc;
    box-shadow: 10px 10px 10px #8adcf5;
    position: absolute;
    top: 25%;
    left: 22%;

    p {
      font-family: 'YouYuan'
    }
  }
}
</style>
