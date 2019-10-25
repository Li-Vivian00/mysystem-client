export const adminLogin = async (ruleForm, self) => {
    // localStorage.setItem("adminName", ruleForm.loginId);
    // localStorage.setItem("admin", JSON.stringify(ruleForm));
    let result = self.$http
      .post("/api/adminLogin/adminlogin", {
        loginid: ruleForm.loginId,
        password:ruleForm.password
      }).catch(error => {
        console.log(error)
      })
      return result
  }
