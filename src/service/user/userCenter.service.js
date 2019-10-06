export const userCenter = async (self, userLoginId) => {
  const result = await self.$http
    .get('/api/user/getUserCenterInfo', {
      params: {
        loginId: userLoginId
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
