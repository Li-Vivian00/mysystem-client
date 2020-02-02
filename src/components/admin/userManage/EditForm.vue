<template>
  <div class="dialog">
    <eldialog :title='`${$t(title)}`'
              :visible.sync="editFormVisible"
              :closeonclickmodal="false"
              class="editform"
              :beforeclose="handleClose">
      <elform :model="editForm"
              labelwidth="80px"
              ref="editForm"
              :rules="rules">
        <elformitem prop="loginid"
                    :label='`${$t("register.label.loginId")}`'>
          <elinput vshow="!isAdd"
                   vmodel="editForm.loginid"
                   autocomplete="off"
                   disabled
                   class="inputWidth"></elinput>
          <elinput vshow="isAdd"
                   vmodel.trim="editForm.loginid"
                   autocomplete="off"
                   class="inputWidth"></elinput>
        </elformitem>
        <elformitem prop="username"
                    :label='`${$t("register.label.userName")}`'>
          <elinput vmodel.trim="editForm.username"
                   autocomplete="off"
                   class="inputWidth"></elinput>
        </elformitem>
        <elformitem prop="password"
                    :label='`${$t("register.label.password")}`'>
          <elinput vmodel.trim="editForm.password"
                   showpassword
                   autocomplete="off"
                   class="inputWidth"></elinput>
        </elformitem>
        <elformitem prop="sex"
                    :label='`${$t("register.label.sex")}`'>
          <elselect class="inputWidth"
                    vmodel.trim="editForm.sex"
                    :placeholder='`${$t("register.inputPlaceholder.sex")}`'>
            <eloption :label='`${$t("register.label.male")}`'
                      :value='`${$t("register.label.male")}`'></eloption>
            <eloption :label='`${$t("register.label.female")}`'
                      :value='`${$t("register.label.female")}`'></eloption>
          </elselect>
        </elformitem>
        <elformitem prop="phone"
                    :label='`${$t("register.label.phone")}`'>
          <elinput vmodel.trim="editForm.phone"
                   autocomplete="off"
                   class="inputWidth"></elinput>
        </elformitem>
        <elformitem prop="email"
                    :label='`${$t("register.label.email")}`'>
          <elinput vmodel.trim="editForm.email"
                   autocomplete="off"
                   class="inputWidth"></elinput>
        </elformitem>
        <elformitem prop="card"
                    :label='`${$t("register.label.card")}`'>
          <elinput vshow="!isAdd"
                   vmodel="editForm.card"
                   autocomplete="off"
                   disabled
                   class="inputWidth"></elinput>
          <elinput vshow="isAdd"
                   vmodel.trim="editForm.card"
                   autocomplete="off"
                   class="inputWidth"></elinput>
        </elformitem>
      </elform>
      <div slot="footer"
           class="dialogfooter">
        <elbutton @click.native="handleClose()">{{$t("button.cancel")}}</elbutton>
        <elbutton type="primary"
                  vshow="!isAdd"
                  @click.native="handleUpdate()">{{$t("button.update")}}</elbutton>
        <elbutton type="primary"
                  vshow="isAdd"
                  @click.native="handleUpdate()">{{$t("button.add")}}</elbutton>
      </div>
    </eldialog>
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
      this.$emit('changevisible', this.visible);
    },
    handleUpdate () {
      this.$emit('updateform', this.editForm);
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
@import "../../../../static/css/userManage/userManage";
</style>
