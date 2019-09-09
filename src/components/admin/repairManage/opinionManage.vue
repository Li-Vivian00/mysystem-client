<template>
  <div class="opinionManage">
    <div class="title">
      <span class="edit_title">{{$t("opinionManage.opinionManageTitle")}}</span>
      <i class="el-icon-edit"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "opinionManage"
}
</script>

<style lang="scss" scoped>
.opinionManage {
  width: 100%;
  margin-top: 20px;
  .title {
    margin-bottom: 18px;
  }
}
</style>