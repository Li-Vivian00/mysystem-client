<template>
  <div class="warningModule">
    <div class="ModuleContent">
      <div class="title">
        <span>{{$t("villaCenter.warningModule.title")}}</span>
        <el-input class="inputWidth"
                  type="text"
                  :placeholder='`${$t("villaCenter.warningModule.inputTitle")}`'
                  v-model="updateInfo.title"
                  show-word-limit
                  @change="isEdit"
                  clearable></el-input>
      </div>
      <div class="context">
        <span>{{$t("villaCenter.warningModule.content")}}</span>
        <el-input class="inputWidth"
                  type="textarea"
                  :placeholder='`${$t("manage.inputText")}`'
                  v-model="updateInfo.content"
                  maxlength="800"
                  show-word-limit
                  rows="13"
                  @change="isEdit"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { getWarningModuleInfo, updatePhoneModuleInfo, updateWarningModuleInfo } from "../../../service/admin/villaCenter/boardService"
import showMessageBox from "../../../mixin/showMessageBox"
export default {
  name: "boardWarningModule",
  data () {
    return {
      updateInfo:
      {
        Id: "",
        title: "",
        content: "",
      }
    };
  },
  mixins: [showMessageBox],
  mounted () {
    this.getWarningModuleInfo();
  },

  methods: {
    // get all warning module info
    async getWarningModuleInfo () {
      const self = this;
      const response = await getWarningModuleInfo(self);
      if (_.isEmpty(response.data)) {
        return;
      }
      self.updateInfo = response.data[0];
    },

    // edit warning module info
    isEdit () {
      const self = this;
      self
        .$confirm(
          self.$t("villaCenter.confirm.changeContent"),
          self.$t("manage.confirm.warning"),
          {
            confirmButtonText: self.$t("button.ok"),
            cancelButtonText: self.$t("button.cancel"),
            type: "warning"
          }
        )
        .then(async () => {
          const response = await updateWarningModuleInfo(self, self.updateInfo);
          if (_.isEqual(response.data, "fail to update") || _.isEmpty(response.data)) {
            self.showErrorMessageBox();
          } else {
            self.getWarningModuleInfo();
            self.showSuccessMessageBox();
          }
        })
        .catch(() => {
          self.getWarningModuleInfo();
          self.showCancelMessageBox();
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.warningModule {
  .ModuleContent {
    width: 100%;
    .editBtn {
      float: right;
      margin-right: 10px;
    }
    .title {
      .inputWidth {
        width: 40%;
        margin-left: 10px;
      }
    }

    .context {
      margin: 20px 0;
      .inputWidth {
        width: 60%;
        height: 60%;
        vertical-align: top;
        margin-left: 10px;
      }
    }
  }
}
</style>