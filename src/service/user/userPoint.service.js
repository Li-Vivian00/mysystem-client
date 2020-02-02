export const handlePoint = async (self, form) => {
  const result = await self.$http
    .post('/api/userPoint/handlePoint', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getUserpoint = async (self, loginid) => {
  const result = await self.$http
    .get('/api/userPoint/getUserPoint', { params: { loginId: loginid } })
    .catch(error => {
      console.log(error);
    });
  return result;
};
