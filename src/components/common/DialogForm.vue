<template>
  <div class="dialog">
    <el-dialog :title='`${$t(title)}`'
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form"
               :before-close="handleClose">
      <el-form :model="editForm"
               label-width="80px"
               ref="editForm"
               :rules="rules">
        <el-form-item prop="loginid"
                      :label='`${$t("register.label.loginId")}`'>
          <el-input v-show="!isAdd"
                    v-model="editForm.loginid"
                    auto-complete="off"
                    disabled
                    class="inputWidth"></el-input>
          <el-input v-show="isAdd"
                    v-model.trim="editForm.loginid"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="username"
                      :label='`${$t("register.label.userName")}`'>
          <el-input v-model.trim="editForm.username"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      :label='`${$t("register.label.password")}`'>
          <el-input v-model.trim="editForm.password"
                    show-password
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="sex"
                      :label='`${$t("register.label.sex")}`'>
          <el-select class="inputWidth"
                     v-model.trim="editForm.sex"
                     :placeholder='`${$t("register.inputPlaceholder.sex")}`'>
            <el-option :label='`${$t("register.label.male")}`'
                       :value='`${$t("register.label.male")}`'></el-option>
            <el-option :label='`${$t("register.label.female")}`'
                       :value='`${$t("register.label.female")}`'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone"
                      :label='`${$t("register.label.phone")}`'>
          <el-input v-model.trim="editForm.phone"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="email"
                      :label='`${$t("register.label.email")}`'>
          <el-input v-model.trim="editForm.email"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item prop="card"
                      :label='`${$t("register.label.card")}`'>
          <el-input v-show="!isAdd"
                    v-model="editForm.card"
                    auto-complete="off"
                    disabled
                    class="inputWidth"></el-input>
          <el-input v-show="isAdd"
                    v-model.trim="editForm.card"
                    auto-complete="off"
                    class="inputWidth"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.native="handleClose()">{{$t("button.cancel")}}</el-button>
        <el-button type="primary"
                   v-show="!isAdd"
                   @click.native="handleUpdate()">{{$t("button.update")}}</el-button>
        <el-button type="primary"
                   v-show="isAdd"
                   @click.native="handleUpdate()">{{$t("button.add")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "DialogForm",
  props: {
    editFormVisible: {
      type: Boolean,
      default: () => false,
    },
    isAdd: {
      type: Boolean,
      default: () => false,
    },
    rules: {
      type: Object,
      default: () => { },
    },
    form: {
      type: Object,
      default: () => { },
    },
    title: {
      type: String,
      default: () => "",
    }
  },
  data () {
    return {
      editForm: {
        loginid: "",
        username: "",
        password: "",
        repeatpass: "",
        sex: "",
        phone: "",
        email: "",
        card: "",
        stay_date: "",
        room_id: "",
      },
      visible: this.editFormVisible,
    }
  },
  methods: {
    //关闭编辑用户dialog
    handleClose () {
      this.visible = false;
      this.$emit('change-visible', this.visible);
    },
    handleUpdate () {
      this.$emit('update-form', this.editForm);
    },
  },
  watch: {
    form () {
      this.editForm = Object.assign({}, this.form);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/userManage/userManage";
</style>
