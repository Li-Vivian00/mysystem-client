export const getUserBill = async (self, loginId) => {
  const result = await self.$http
    .get('/api/billManage/getBillByloginId', {
      params: { loginid: loginId }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getUserBillByItem = async (self, loginId, Item) => {
  const result = await self.$http
    .get('/api/userBill/getUserBillByItem', {
      params: { item: Item, loginid: loginId }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const updateUserBillStatus = async (self, Id, time) => {
  const result = await self.$http
    .get('/api/userBill/changeUserBillStatus', {
      params: { id: Id, date: time }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
