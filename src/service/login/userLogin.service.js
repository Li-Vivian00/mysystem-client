export const userLogin = async (ruleForm, self) => {
  localStorage.setItem("userLoginId", ruleForm.loginId);
  localStorage.setItem("user", JSON.stringify(ruleForm));
  console.log("user:", localStorage.getItem("user"));
  let result = await self.$http
    .post("/api/userLogin/login", {
      loginId: ruleForm.loginId,
      password: ruleForm.password
    }).catch(error => {
      console.log(error.message)
    })
    return result
}
