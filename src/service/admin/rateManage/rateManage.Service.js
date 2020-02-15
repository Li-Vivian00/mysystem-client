export const getUserPoint = async self => {
  const result = await self.$http
    .get('/api/rateManage/getAllUserPoint', {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const updateUserPoint = async (self, userRate) => {
  const result = await self.$http
    .post('/api/rateManage/updateUserPoint', userRate, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};
