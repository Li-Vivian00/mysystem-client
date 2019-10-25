export const userLogin = async (ruleForm, self) => {
  let result = await self.$http
    .post('/api/userLogin/login', {
      loginid: ruleForm.loginId,
      password: ruleForm.password
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
