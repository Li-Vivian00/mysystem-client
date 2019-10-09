export const getUserOpinionInfo = async (self, loginid) => {
  const result = await self.$http
    .get('/api/userOpinion/getUserOpinionInfo', {
      params: { loginId: loginid }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
