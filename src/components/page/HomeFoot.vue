<template>
  <div class="bottom">
      <div class="bottom-main">
        <a href="#">佛山市顺德区碧桂园物业发展有限公司版权所有 粤ICP备05055114号-1</a> <br>
        <a href="#">法律声明 ·</a>
        <a href="#">法律声明 ·</a>
        <a href="#">法律声明</a><br>
        <span>碧桂园总部服务监督电话：4008919338</span>
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
    .bottom-main {
      width: 68%;
      height: 100%;
      margin: 0 auto;
      text-align: left;
      a, span{
        text-decoration: none;
        font-size: 14px;
        color: #8c8c8c;
        font-weight: bold;
        margin-bottom: 5px;
        display: inline-block;
      }
      a:hover {
        color:#0e98a5;
      }
    }
  }
</style>
