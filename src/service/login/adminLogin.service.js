export const adminLogin = async (ruleForm, self) => {
    localStorage.setItem("adminName", ruleForm.loginId);
    localStorage.setItem("admin", JSON.stringify(ruleForm));
    console.log("admin:", localStorage.getItem("admin"));
    let result = self.$http
      .post("/api/adminLogin/adminlogin", {
        loginId: ruleForm.loginId,
        password:ruleForm.password
      }).catch(error => {
        console.log(error.message)
      }) 
      return result
  }
