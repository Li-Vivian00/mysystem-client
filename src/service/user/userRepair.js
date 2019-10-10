export const getUserRepairInfo = async (self, loginid) => {
  const result = await self.$http
    .get('/api/userRepair/getUserRepairInfo', {
      params: { loginId: loginid }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const submitRepair = async (self, form) => {
  const result = await self.$http
    .post('/api/userRepair/submitRepair', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};
