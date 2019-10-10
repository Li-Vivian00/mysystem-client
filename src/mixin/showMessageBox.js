export default {
  methods: {
    //showMessageBox
    showErrorMessageBox() {
      this.$message({
        type: 'error',
        message: this.$t('manage.showMessage.operateError')
      });
    },

    showSuccessMessageBox() {
      this.$message({
        type: 'success',
        message: this.$t('manage.showMessage.operateSuccess')
      });
    },

    showCancelMessageBox() {
      this.$message({
        type: 'info',
        message: this.$t('manage.showMessage.cancel')
      });
    },

    showWarningSelectType() {
      this.$alert(
        this.$t('manage.showMessage.selectType'),
        this.$t('manage.confirm.warning'),
        {
          confirmButtonText: this.$t('button.ok')
        }
      );
    },

    showWarningBatchDelete() {
      this.$alert(
        this.$t('manage.showMessage.batchDeleteEmpty'),
        this.$t('manage.confirm.warning'),
        {
          confirmButtonText: this.$t('button.ok')
        }
      );
    },

    showWarningInputeValue() {
      this.$alert(
        this.$t('manage.showMessage.inputText'),
        this.$t('manage.confirm.warning'),
        {
          confirmButtonText: this.$t('button.ok')
        }
      );
    },
    verifySuccess() {
      this.$message({
        type: 'success',
        message: this.$t('forgetPwd.message.verifySuccess')
      });
    },

    modifyPwdError() {
      this.$message({
        type: 'error',
        message: this.$t('forgetPwd.message.modifyError')
      });
    },

    modifyPwdSuccess() {
      this.$message({
        type: 'success',
        message: this.$t('forgetPwd.message.modifySuccess')
      });
    },

    loginError() {
      this.$message({
        type: 'error',
        message: this.$t('login.loadingError')
      });
    },

    alertMessage() {
      this.$alert(
        this.$t('register.showMessage.register'),
        this.$t('manage.confirm.warning'),
        {
          confirmButtonText: this.$t('button.ok')
        }
      );
    },

    answerContentIsNull() {
      this.$alert(
        this.$t('opinionManage.answerContentIsNull'),
        this.$t('manage.confirm.warning'),
        {
          confirmButtonText: this.$t('button.ok')
        }
      );
    },

    oldPasswordIsError() {
      this.$message({
        type: 'error',
        message: this.$t('manage.showMessage.oldPasswordIsError')
      });
    },

    successUpdateAndLogin() {
      this.$alert(
        this.$t('manage.showMessage.successUpdatePwd'),
        this.$t('manage.confirm.warning'),
        {
          confirmButtonText: this.$t('button.ok'),
          callback: action => {
            sessionStorage.clear();
            this.$router.push('/');
          }
        }
      );
    },

  }
};
