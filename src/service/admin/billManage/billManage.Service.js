export const getAllBill = async self => {
  const result = await self.$http
    .get('/api/billManage/getAllBill', {})
    .catch(error => {
      console.log(error);
    });
  return result;
}

export const getBillByloginId = async (self, loginid) => {
  const result = await self.$http
    .get('/api/billManage/getBillByloginId', {
      params: {
        loginid
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
}
